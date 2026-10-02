import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import { startFollowUpCron } from './src/jobs/followUpCron.js';
import prisma from './src/lib/prisma.js';

import contactRoutes from './src/routes/contact.routes.js';
import leadRoutes from './src/routes/lead.routes.js';
import adminRoutes from './src/routes/admin.routes.js';
import appointmentRoutes from './src/routes/appointment.routes.js';
import blogRoutes from './src/routes/blog.routes.js';
import partnerRoutes from './src/routes/partner.routes.js';
import analyticsRoutes from './src/routes/analytics.routes.js';
import caseStudyRoutes from './src/routes/casestudy.routes.js';
import engagementRoutes from './src/routes/engagement.routes.js';

// Fail fast on missing config instead of erroring on the first request
const REQUIRED_ENV = ['DATABASE_URL', 'JWT_SECRET', 'RESEND_API_KEY', 'RECEIVER_EMAIL'];
const missingEnv = REQUIRED_ENV.filter(k => !process.env[k]);
if (missingEnv.length) {
  console.error(`Missing required environment variables: ${missingEnv.join(', ')}`);
  process.exit(1);
}
if (process.env.NODE_ENV === 'production' && !process.env.EMAIL_FROM) {
  console.warn('EMAIL_FROM is not set — emails will only reach the Resend account owner.');
}

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Behind nginx — use X-Forwarded-For so rate limits apply per visitor, not per proxy
app.set('trust proxy', 1);
app.disable('x-powered-by');

app.use((_req, res, next) => {
  res.set({
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
  });
  next();
});

app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({ limit: '1mb' }));
// Express 5 leaves req.body undefined when there's no JSON body — handlers destructure it
app.use((req, _res, next) => { req.body ??= {}; next(); });
app.use(cookieParser());

// Rate limiters
const publicLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 30, message: { error: 'Too many requests, please try again later.' } });
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 10, message: { error: 'Too many login attempts, please try again later.' } });

// Only rate-limit public form submissions — admin GET/PATCH calls on the same paths are behind auth
const limitFormPosts = (req, res, next) => (req.method === 'POST' ? publicLimiter(req, res, next) : next());

app.use('/api/admin/login', authLimiter);

app.use('/api/contact', limitFormPosts, contactRoutes);
app.use('/api/leads', limitFormPosts, leadRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/appointments', limitFormPosts, appointmentRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/partners', limitFormPosts, partnerRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/case-studies', caseStudyRoutes);
app.use('/api/engagement-plans', engagementRoutes);

app.get('/', (_req, res) => res.json({ status: 'TechCore API running' }));

app.get('/api/health', async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: 'ok' });
  } catch {
    res.status(503).json({ status: 'db_unavailable' });
  }
});

app.use('/api', (_req, res) => res.status(404).json({ error: 'Not found.' }));

// Catch-all so malformed JSON and unexpected errors return JSON, never a stack trace
app.use((err, _req, res, _next) => {
  const status = err.status || err.statusCode || 500;
  if (status >= 500) console.error(err);
  res.status(status).json({ error: status >= 500 ? 'Internal server error.' : err.message });
});

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  // Set DISABLE_CRON=true on all but one instance if you run more than one container
  if (process.env.DISABLE_CRON !== 'true') startFollowUpCron();
});

function shutdown(signal) {
  console.log(`${signal} received, shutting down...`);
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
  setTimeout(() => process.exit(1), 10_000).unref();
}
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

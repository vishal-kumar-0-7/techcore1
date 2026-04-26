import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import { startFollowUpCron } from './src/jobs/followUpCron.js';

import contactRoutes from './src/routes/contact.routes.js';
import leadRoutes from './src/routes/lead.routes.js';
import adminRoutes from './src/routes/admin.routes.js';
import appointmentRoutes from './src/routes/appointment.routes.js';
import blogRoutes from './src/routes/blog.routes.js';
import partnerRoutes from './src/routes/partner.routes.js';
import analyticsRoutes from './src/routes/analytics.routes.js';
import caseStudyRoutes from './src/routes/casestudy.routes.js';
import engagementRoutes from './src/routes/engagement.routes.js';

const app = express();
const PORT = 3000;

app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Rate limiters
const publicLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 30, message: { error: 'Too many requests, please try again later.' } });
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 10, message: { error: 'Too many login attempts, please try again later.' } });

app.use('/api/contact', publicLimiter, contactRoutes);
app.use('/api/leads', publicLimiter, leadRoutes);
app.use('/api/admin', authLimiter, adminRoutes);
app.use('/api/appointments', publicLimiter, appointmentRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/partners', publicLimiter, partnerRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/case-studies', caseStudyRoutes);
app.use('/api/engagement-plans', engagementRoutes);

app.get('/', (_req, res) => res.json({ status: 'TechCore API running' }));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  startFollowUpCron();
});

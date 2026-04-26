import prisma from '../lib/prisma.js';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendWelcomeEmail(lead) {
  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: lead.email,
    subject: `Thanks for reaching out, ${lead.name.split(' ')[0]}!`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Hi ${lead.name.split(' ')[0]}, thanks for your interest!</h2>
        <p>We received your enquiry about <strong>${lead.serviceInterest || 'our services'}</strong> and our team will be in touch within 24 hours.</p>
        <p>In the meantime, here are a few things you might find useful:</p>
        <ul>
          <li><a href="https://techcore.dev/work">See our recent work</a></li>
          <li><a href="https://techcore.dev/company/how-we-work">How we work</a></li>
          <li><a href="https://techcore.dev/resources/appointment">Book a call directly</a></li>
        </ul>
        <p>Talk soon,<br/>The TechCore Team</p>
      </div>
    `,
  });
}

async function sendFollowUpEmail(lead) {
  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: lead.email,
    subject: `Still thinking it over, ${lead.name.split(' ')[0]}?`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Hey ${lead.name.split(' ')[0]},</h2>
        <p>Just checking in — we noticed you reached out about <strong>${lead.serviceInterest || 'our services'}</strong> a few days ago.</p>
        <p>If you have any questions or want to explore what we can build together, I'd love to jump on a quick 30-minute call.</p>
        <p><a href="https://techcore.dev/resources/appointment" style="background:#4f46e5;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;display:inline-block;">Book a Free Call</a></p>
        <p>No pressure at all — just here if you need us.</p>
        <p>— TechCore Team</p>
      </div>
    `,
  });
}

export async function createLead(req, res) {
  const { name, email, phone, serviceInterest, sourcePage } = req.body;

  // Pull UTM params from query string or body
  const utmSource = req.body.utmSource || req.query.utm_source || null;
  const utmMedium = req.body.utmMedium || req.query.utm_medium || null;
  const utmCampaign = req.body.utmCampaign || req.query.utm_campaign || null;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required.' });
  }

  try {
    const lead = await prisma.lead.create({
      data: {
        name,
        email,
        phone: phone || null,
        serviceInterest: serviceInterest || null,
        sourcePage: sourcePage || null,
        utmSource,
        utmMedium,
        utmCampaign,
      },
    });

    // Day 0 — welcome email (fire and forget)
    sendWelcomeEmail(lead).catch(e => console.error('Welcome email failed:', e));

    // Day 3 follow-up is handled by the cron job in src/jobs/followUpCron.js

    res.status(201).json({ message: 'Lead captured.', id: lead.id });
  } catch (error) {
    console.error('Lead error:', error);
    res.status(500).json({ error: 'Failed to capture lead.' });
  }
}

export async function getLeads(req, res) {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, parseInt(req.query.limit) || 20);
    const skip = (page - 1) * limit;

    const [leads, total] = await Promise.all([
      prisma.lead.findMany({
        orderBy: { createdAt: 'desc' },
        skip, take: limit,
        include: { appointments: true },
      }),
      prisma.lead.count(),
    ]);

    res.json({ data: leads, total, page, limit, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leads.' });
  }
}

export async function updateLeadStatus(req, res) {
  const { id } = req.params;
  const { status } = req.body;

  const validStatuses = ['new', 'contacted', 'qualified', 'lost', 'won'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid status.' });
  }

  try {
    const lead = await prisma.lead.update({
      where: { id },
      data: { status },
    });
    res.json(lead);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update lead.' });
  }
}

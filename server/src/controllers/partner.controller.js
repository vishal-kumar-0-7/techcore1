import prisma from '../lib/prisma.js';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function createPartnerApplication(req, res) {
  const { companyName, contactName, email, phone, partnershipType, message } = req.body;

  if (!companyName || !contactName || !email || !partnershipType) {
    return res.status(400).json({ error: 'companyName, contactName, email and partnershipType are required.' });
  }

  try {
    const application = await prisma.partnerApplication.create({
      data: { companyName, contactName, email, phone: phone || null, partnershipType, message: message || null },
    });

    // Acknowledgement to applicant
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Partnership Application Received — TechCore',
      html: `
        <h2>Hi ${contactName}, thanks for applying!</h2>
        <p>We've received your <strong>${partnershipType} Partnership</strong> application for <strong>${companyName}</strong>.</p>
        <p>Our partnerships team will review your application and get back to you within 2 business days.</p>
        <p>— TechCore Partnerships Team</p>
      `,
    });

    // Internal notification
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: process.env.RECEIVER_EMAIL,
      subject: `New Partner Application: ${companyName}`,
      html: `
        <h2>New Partnership Application</h2>
        <p><strong>Company:</strong> ${companyName}</p>
        <p><strong>Contact:</strong> ${contactName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
        <p><strong>Type:</strong> ${partnershipType}</p>
        ${message ? `<p><strong>Message:</strong> ${message}</p>` : ''}
      `,
    });

    res.status(201).json({ message: 'Application submitted.', id: application.id });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to submit application.' });
  }
}

export async function getPartnerApplications(req, res) {
  try {
    const apps = await prisma.partnerApplication.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(apps);
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch applications.' });
  }
}

export async function updatePartnerStatus(req, res) {
  const { id } = req.params;
  const { status } = req.body;
  const valid = ['pending', 'in_review', 'approved', 'rejected'];
  if (!valid.includes(status)) return res.status(400).json({ error: 'Invalid status.' });

  try {
    const app = await prisma.partnerApplication.update({ where: { id }, data: { status } });
    res.json(app);
  } catch (e) {
    res.status(500).json({ error: 'Failed to update status.' });
  }
}

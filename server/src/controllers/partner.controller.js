import prisma from '../lib/prisma.js';
import { sendEmail, esc, oneLine } from '../lib/email.js';

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
    await sendEmail({
      to: email,
      subject: 'Partnership Application Received — TechCore',
      html: `
        <h2>Hi ${esc(contactName)}, thanks for applying!</h2>
        <p>We've received your <strong>${esc(partnershipType)} Partnership</strong> application for <strong>${esc(companyName)}</strong>.</p>
        <p>Our partnerships team will review your application and get back to you within 2 business days.</p>
        <p>— TechCore Partnerships Team</p>
      `,
    });

    // Internal notification
    await sendEmail({
      to: process.env.RECEIVER_EMAIL,
      subject: `New Partner Application: ${oneLine(companyName)}`,
      html: `
        <h2>New Partnership Application</h2>
        <p><strong>Company:</strong> ${esc(companyName)}</p>
        <p><strong>Contact:</strong> ${esc(contactName)}</p>
        <p><strong>Email:</strong> ${esc(email)}</p>
        <p><strong>Phone:</strong> ${esc(phone || 'N/A')}</p>
        <p><strong>Type:</strong> ${esc(partnershipType)}</p>
        ${message ? `<p><strong>Message:</strong> ${esc(message)}</p>` : ''}
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

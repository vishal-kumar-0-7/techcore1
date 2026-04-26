import prisma from '../lib/prisma.js';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function createContact(req, res) {
  const { name, email, description } = req.body;

  if (!name || !email || !description) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    // 1. Save to DB first — so we never lose a lead even if email fails
    const contact = await prisma.contact.create({
      data: { name, email, description },
    });

    // 2. Send email notification
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: process.env.RECEIVER_EMAIL,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${description}</p>
      `,
    });

    res.status(201).json({ message: 'Message received.', id: contact.id });
  } catch (error) {
    console.error('Contact error:', error);
    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
}

export async function getContacts(req, res) {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, parseInt(req.query.limit) || 20);
    const skip = (page - 1) * limit;

    const [contacts, total] = await Promise.all([
      prisma.contact.findMany({ orderBy: { createdAt: 'desc' }, skip, take: limit }),
      prisma.contact.count(),
    ]);

    res.json({ data: contacts, total, page, limit, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contacts.' });
  }
}

export async function updateContactStatus(req, res) {
  const { id } = req.params;
  const { status } = req.body;

  const validStatuses = ['new', 'read', 'replied'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid status.' });
  }

  try {
    const contact = await prisma.contact.update({
      where: { id },
      data: { status },
    });
    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update contact.' });
  }
}

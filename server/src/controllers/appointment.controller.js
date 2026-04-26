import prisma from '../lib/prisma.js';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function createAppointment(req, res) {
  const { name, email, phone, preferredDate, preferredTime, message, leadId } = req.body;

  if (!name || !email || !preferredDate || !preferredTime) {
    return res.status(400).json({ error: 'name, email, preferredDate and preferredTime are required.' });
  }

  try {
    const appointment = await prisma.appointment.create({
      data: {
        name, email,
        phone: phone || null,
        preferredDate: new Date(preferredDate),
        preferredTime,
        message: message || null,
        leadId: leadId || null,
      },
    });

    // Confirmation email to user
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Your appointment request is confirmed — TechCore',
      html: `
        <h2>Hi ${name}, we've received your booking!</h2>
        <p><strong>Date:</strong> ${new Date(preferredDate).toDateString()}</p>
        <p><strong>Time:</strong> ${preferredTime}</p>
        ${message ? `<p><strong>Your message:</strong> ${message}</p>` : ''}
        <p>Our team will confirm within 24 hours. Talk soon!</p>
        <p>— TechCore Team</p>
      `,
    });

    // Internal notification
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: process.env.RECEIVER_EMAIL,
      subject: `New Appointment: ${name}`,
      html: `
        <h2>New Appointment Booked</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
        <p><strong>Date:</strong> ${new Date(preferredDate).toDateString()}</p>
        <p><strong>Time:</strong> ${preferredTime}</p>
        ${message ? `<p><strong>Message:</strong> ${message}</p>` : ''}
      `,
    });

    res.status(201).json({ message: 'Appointment booked.', id: appointment.id });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to book appointment.' });
  }
}

export async function getAppointments(req, res) {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, parseInt(req.query.limit) || 20);
    const skip = (page - 1) * limit;

    const [appointments, total] = await Promise.all([
      prisma.appointment.findMany({
        orderBy: { createdAt: 'desc' },
        skip, take: limit,
        include: { lead: { select: { name: true, email: true } } },
      }),
      prisma.appointment.count(),
    ]);

    res.json({ data: appointments, total, page, limit, totalPages: Math.ceil(total / limit) });
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch appointments.' });
  }
}

export async function updateAppointmentStatus(req, res) {
  const { id } = req.params;
  const { status } = req.body;
  const valid = ['pending', 'confirmed', 'cancelled', 'completed'];
  if (!valid.includes(status)) return res.status(400).json({ error: 'Invalid status.' });

  try {
    const appt = await prisma.appointment.update({ where: { id }, data: { status } });
    res.json(appt);
  } catch (e) {
    res.status(500).json({ error: 'Failed to update appointment.' });
  }
}

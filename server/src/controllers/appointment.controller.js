import prisma from '../lib/prisma.js';
import { sendEmail, esc, oneLine } from '../lib/email.js';

export async function createAppointment(req, res) {
  const { name, email, phone, preferredDate, preferredTime, message, leadId } = req.body;

  if (!name || !email || !preferredDate || !preferredTime) {
    return res.status(400).json({ error: 'name, email, preferredDate and preferredTime are required.' });
  }
  if (Number.isNaN(new Date(preferredDate).getTime())) {
    return res.status(400).json({ error: 'preferredDate is not a valid date.' });
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
    await sendEmail({
      to: email,
      subject: 'Your appointment request is confirmed — TechCore',
      html: `
        <h2>Hi ${esc(name)}, we've received your booking!</h2>
        <p><strong>Date:</strong> ${new Date(preferredDate).toDateString()}</p>
        <p><strong>Time:</strong> ${esc(preferredTime)}</p>
        ${message ? `<p><strong>Your message:</strong> ${esc(message)}</p>` : ''}
        <p>Our team will confirm within 24 hours. Talk soon!</p>
        <p>— TechCore Team</p>
      `,
    });

    // Internal notification
    await sendEmail({
      to: process.env.RECEIVER_EMAIL,
      subject: `New Appointment: ${oneLine(name)}`,
      html: `
        <h2>New Appointment Booked</h2>
        <p><strong>Name:</strong> ${esc(name)}</p>
        <p><strong>Email:</strong> ${esc(email)}</p>
        <p><strong>Phone:</strong> ${esc(phone || 'N/A')}</p>
        <p><strong>Date:</strong> ${new Date(preferredDate).toDateString()}</p>
        <p><strong>Time:</strong> ${esc(preferredTime)}</p>
        ${message ? `<p><strong>Message:</strong> ${esc(message)}</p>` : ''}
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

import prisma from '../lib/prisma.js';

export async function getAnalytics(req, res) {
  try {
    const [
      totalContacts,
      totalLeads,
      totalAppointments,
      totalPartnerApps,
      contactsByStatus,
      leadsByStatus,
      appointmentsByStatus,
      leadsByService,
      leadsBySource,
      recentLeads,
      recentContacts,
    ] = await Promise.all([
      prisma.contact.count(),
      prisma.lead.count(),
      prisma.appointment.count(),
      prisma.partnerApplication.count(),

      prisma.contact.groupBy({ by: ['status'], _count: true }),
      prisma.lead.groupBy({ by: ['status'], _count: true }),
      prisma.appointment.groupBy({ by: ['status'], _count: true }),

      prisma.lead.groupBy({ by: ['serviceInterest'], _count: true, orderBy: { _count: { serviceInterest: 'desc' } }, take: 5 }),
      prisma.lead.groupBy({ by: ['utmSource'], _count: true, orderBy: { _count: { utmSource: 'desc' } }, take: 5 }),

      prisma.lead.findMany({ orderBy: { createdAt: 'desc' }, take: 5, select: { id: true, name: true, email: true, serviceInterest: true, status: true, createdAt: true } }),
      prisma.contact.findMany({ orderBy: { createdAt: 'desc' }, take: 5, select: { id: true, name: true, email: true, status: true, createdAt: true } }),
    ]);

    // Leads per day (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const leadsLast7Days = await prisma.lead.findMany({
      where: { createdAt: { gte: sevenDaysAgo } },
      select: { createdAt: true },
    });

    const leadsByDay = {};
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      leadsByDay[d.toISOString().split('T')[0]] = 0;
    }
    leadsLast7Days.forEach(l => {
      const day = l.createdAt.toISOString().split('T')[0];
      if (leadsByDay[day] !== undefined) leadsByDay[day]++;
    });

    res.json({
      totals: { contacts: totalContacts, leads: totalLeads, appointments: totalAppointments, partnerApplications: totalPartnerApps },
      contactsByStatus,
      leadsByStatus,
      appointmentsByStatus,
      topServicePages: leadsByService,
      topTrafficSources: leadsBySource,
      leadsByDay,
      recentLeads,
      recentContacts,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to fetch analytics.' });
  }
}

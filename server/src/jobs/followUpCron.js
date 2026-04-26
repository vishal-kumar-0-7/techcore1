import cron from 'node-cron';
import prisma from '../lib/prisma.js';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

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
        <p>
          <a href="https://techcore.dev/resources/appointment"
            style="background:#4f46e5;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;display:inline-block;">
            Book a Free Call
          </a>
        </p>
        <p>No pressure at all — just here if you need us.</p>
        <p>— TechCore Team</p>
      </div>
    `,
  });
}

export function startFollowUpCron() {
  // Runs every hour — checks for leads that are 3+ days old with no follow-up sent
  cron.schedule('0 * * * *', async () => {
    console.log('[cron] Running follow-up email check...');

    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

    try {
      const leads = await prisma.lead.findMany({
        where: {
          createdAt: { lte: threeDaysAgo },
          followUpSentAt: null,
          // Only follow up with new/contacted leads — not won/lost
          status: { in: ['new', 'contacted'] },
        },
        take: 50, // process max 50 at a time to avoid rate limits
      });

      console.log(`[cron] Found ${leads.length} leads to follow up`);

      for (const lead of leads) {
        try {
          await sendFollowUpEmail(lead);
          await prisma.lead.update({
            where: { id: lead.id },
            data: { followUpSentAt: new Date() },
          });
          console.log(`[cron] Follow-up sent to ${lead.email}`);
        } catch (e) {
          console.error(`[cron] Failed to send follow-up to ${lead.email}:`, e.message);
        }
      }
    } catch (e) {
      console.error('[cron] Follow-up cron error:', e.message);
    }
  });

  console.log('[cron] Follow-up email cron started (runs every hour)');
}

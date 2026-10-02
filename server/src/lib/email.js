import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Must be an address on a domain verified in Resend — onboarding@resend.dev
// can only deliver to the Resend account owner.
const FROM = process.env.EMAIL_FROM || 'TechCore <onboarding@resend.dev>';

// Escape user-supplied values before interpolating them into email HTML
export function esc(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Strip CR/LF so user input can't break out of the subject header
export function oneLine(value) {
  return String(value ?? '').replace(/[\r\n]+/g, ' ').slice(0, 150);
}

// Throws on failure — use for jobs that need to know (e.g. the follow-up cron)
export async function sendEmailOrThrow({ to, subject, html }) {
  const { error } = await resend.emails.send({ from: FROM, to, subject, html });
  if (error) throw new Error(error.message || 'Email send failed');
}

// Never throws — a mail failure must not fail a request whose data is already saved
export async function sendEmail(message) {
  try {
    await sendEmailOrThrow(message);
  } catch (e) {
    console.error(`Email to ${message.to} failed:`, e.message);
  }
}

import { useLocation } from 'react-router-dom';
import { API } from '../lib/api.js';

export function useLeadCapture() {
  const location = useLocation();

  async function captureLead({ name, email, phone, serviceInterest }) {
    const params = new URLSearchParams(location.search);

    const payload = {
      name,
      email,
      phone: phone || null,
      serviceInterest: serviceInterest || null,
      sourcePage: location.pathname,           // e.g. /services/web-development
      utmSource: params.get('utm_source'),     // e.g. google
      utmMedium: params.get('utm_medium'),     // e.g. cpc
      utmCampaign: params.get('utm_campaign'), // e.g. summer_promo
    };

    const res = await fetch(`${API}/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    return res.ok;
  }

  return { captureLead };
}

import { useState } from 'react';
import { Calendar, Clock, User, Mail, Phone, MessageSquare, CheckCircle } from 'lucide-react';
import SEO from '../../components/SEO';
import { API } from '../../lib/api.js';

const timeSlots = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '2:00 PM', '2:30 PM',
  '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM',
];

export default function Appointment() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', preferredDate: '', preferredTime: '', message: '' });
  const [status, setStatus] = useState(null);

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  const minDateStr = minDate.toISOString().split('T')[0];

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch(`${API}/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) setStatus('success');
      else setStatus('error');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-xl p-12 max-w-md w-full text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} className="text-green-500" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-3">Booking Confirmed!</h2>
        <p className="text-slate-600 mb-2">We've received your appointment request for</p>
        <p className="font-bold text-indigo-600 text-lg mb-2">{form.preferredDate} at {form.preferredTime}</p>
        <p className="text-slate-500 text-sm mb-8">A confirmation email has been sent to <strong>{form.email}</strong>. Our team will confirm within 24 hours.</p>
        <button onClick={() => { setStatus(null); setForm({ name: '', email: '', phone: '', preferredDate: '', preferredTime: '', message: '' }); }}
          className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors">
          Book Another
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <SEO title="Book an Appointment" description="Schedule a free 30-minute consultation with TechCore. No sales pitch, just an honest conversation about your project." path="/resources/appointment" />
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-6">
            <Calendar size={14} className="text-indigo-300 mr-2" />
            <span className="text-sm font-semibold text-white/80 uppercase tracking-wide">Book a Call</span>
          </div>
          <h1 className="text-5xl font-extrabold text-white mb-4">Schedule a Free Consultation</h1>
          <p className="text-xl text-slate-300">30 minutes. No sales pitch. Just an honest conversation about your project.</p>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 max-w-2xl mx-auto px-6">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name & Email */}
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  <User size={14} className="inline mr-1" /> Full Name
                </label>
                <input name="name" required value={form.name} onChange={handleChange}
                  placeholder="Your name"
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  <Mail size={14} className="inline mr-1" /> Email
                </label>
                <input name="email" type="email" required value={form.email} onChange={handleChange}
                  placeholder="you@company.com"
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition" />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                <Phone size={14} className="inline mr-1" /> Phone (optional)
              </label>
              <input name="phone" value={form.phone} onChange={handleChange}
                placeholder="+91 98765 43210"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition" />
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                <Calendar size={14} className="inline mr-1" /> Preferred Date
              </label>
              <input name="preferredDate" type="date" required min={minDateStr} value={form.preferredDate} onChange={handleChange}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition" />
            </div>

            {/* Time Slots */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                <Clock size={14} className="inline mr-1" /> Preferred Time (IST)
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {timeSlots.map(slot => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setForm({ ...form, preferredTime: slot })}
                    className={`py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                      form.preferredTime === slot
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-600/30'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
              {!form.preferredTime && <p className="text-xs text-slate-400 mt-2">Please select a time slot</p>}
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                <MessageSquare size={14} className="inline mr-1" /> What would you like to discuss? (optional)
              </label>
              <textarea name="message" rows={4} value={form.message} onChange={handleChange}
                placeholder="Tell us about your project, goals, or any specific questions..."
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition resize-none" />
            </div>

            {status === 'error' && (
              <p className="text-red-500 text-sm text-center">Something went wrong. Please try again.</p>
            )}

            <button
              type="submit"
              disabled={status === 'loading' || !form.preferredTime}
              className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg rounded-xl hover:opacity-90 transition disabled:opacity-50 shadow-xl shadow-indigo-600/30"
            >
              {status === 'loading' ? 'Booking...' : 'Confirm Appointment'}
            </button>
          </form>
        </div>

        {/* Trust signals */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          {[
            { icon: '🔒', text: 'No commitment required' },
            { icon: '⚡', text: 'Confirmed within 24hrs' },
            { icon: '🎯', text: 'Free, no sales pressure' },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
              <div className="text-2xl mb-1">{item.icon}</div>
              <div className="text-xs text-slate-600 font-medium">{item.text}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

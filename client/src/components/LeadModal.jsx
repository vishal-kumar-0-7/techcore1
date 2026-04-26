import { useState } from 'react';
import { useLeadCapture } from '../hooks/useLeadCapture';
import { X, CheckCircle } from 'lucide-react';
import { validateForm, formatPhone } from '../utils/validate';

export default function LeadModal({ onClose, serviceInterest, title = "Let's Talk" }) {
  const { captureLead } = useLeadCapture();
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);

  const validate = (data) => validateForm({ name: data.name, email: data.email, phone: data.phone });

  const handleChange = (e) => {
    let value = e.target.value;
    if (e.target.name === 'phone') value = formatPhone(value);
    const updated = { ...form, [e.target.name]: value };
    setForm(updated);
    if (touched[e.target.name]) setErrors(validate(updated));
  };

  const handleBlur = (e) => {
    setTouched(t => ({ ...t, [e.target.name]: true }));
    setErrors(validate(form));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setTouched({ name: true, email: true, phone: true });
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus('loading');
    const ok = await captureLead({ ...form, serviceInterest });
    setStatus(ok ? 'success' : 'error');
  };

  const inputClass = (field) =>
    `w-full border rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 transition text-sm ${
      touched[field] && errors[field]
        ? 'border-red-400 focus:ring-red-300 bg-red-50'
        : 'border-slate-200 focus:ring-indigo-400'
    }`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 transition-colors">
          <X size={22} />
        </button>

        {status === 'success' ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={32} className="text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">We'll be in touch!</h3>
            <p className="text-slate-500 mb-6">Our team will reach out within 24 hours.</p>
            <button onClick={onClose} className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors">
              Close
            </button>
          </div>
        ) : (
          <>
            <h3 className="text-2xl font-bold text-slate-900 mb-1">{title}</h3>
            {serviceInterest && (
              <p className="text-sm text-indigo-600 font-medium mb-5">Re: {serviceInterest}</p>
            )}
            <form onSubmit={handleSubmit} noValidate className="space-y-4 mt-5">

              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Your full name"
                  maxLength={80}
                  className={inputClass('name')}
                />
                {touched.name && errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Work Email</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="you@company.com"
                  className={inputClass('email')}
                />
                {touched.email && errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Phone <span className="text-slate-400 font-normal">(optional)</span>
                </label>
                <input
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="+91 98765 43210"
                  className={inputClass('phone')}
                />
                {touched.phone && errors.phone
                  ? <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                  : form.phone && <p className="text-slate-400 text-xs mt-1">Format: +country code number</p>
                }
              </div>

              {status === 'error' && (
                <p className="text-red-500 text-sm text-center">Something went wrong. Please try again.</p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:opacity-90 transition disabled:opacity-60 shadow-lg shadow-indigo-600/30"
              >
                {status === 'loading' ? 'Submitting...' : 'Get Free Consultation'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

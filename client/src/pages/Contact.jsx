import { useState } from 'react';
import SEO from '../components/SEO';
import { validateForm, formatPhone, rules } from '../utils/validate';
import { API } from '../lib/api.js';

const Field = ({ label, error, touched, children, hint }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    {children}
    {touched && error
      ? <p className="text-red-500 text-xs mt-1">{error}</p>
      : hint && <p className="text-gray-400 text-xs mt-1">{hint}</p>
    }
  </div>
);

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', description: '' });
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);

  const validate = (data) => validateForm({ name: data.name, email: data.email, message: data.description });

  const handleChange = (e) => {
    const updated = { ...form, [e.target.name]: e.target.value };
    setForm(updated);
    if (touched[e.target.name]) {
      setErrors(validate(updated));
    }
  };

  const handleBlur = (e) => {
    setTouched(t => ({ ...t, [e.target.name]: true }));
    setErrors(validate(form));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const allTouched = { name: true, email: true, description: true };
    setTouched(allTouched);
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus('loading');
    try {
      const res = await fetch(`${API}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', description: '' });
        setTouched({});
        setErrors({});
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const inputClass = (field) =>
    `w-full border rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 transition ${
      touched[field] && errors[field]
        ? 'border-red-400 focus:ring-red-300 bg-red-50'
        : 'border-gray-200 focus:ring-indigo-400'
    }`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center px-4 py-16">
      <SEO title="Contact Us" description="Get in touch with TechCore. Tell us about your project and we'll get back to you within 24 hours." path="/contact" />
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Get in Touch</h1>
        <p className="text-gray-500 mb-8">Fill out the form and we'll get back to you shortly.</p>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
          <Field label="Name" error={errors.name} touched={touched.name}>
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Your full name"
              maxLength={80}
              className={inputClass('name')}
            />
          </Field>

          <Field label="Email" error={errors.email} touched={touched.email}>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="you@company.com"
              className={inputClass('email')}
            />
          </Field>

          <Field
            label="Message"
            error={errors.description}
            touched={touched.description}
            hint={`${form.description.length}/2000`}
          >
            <textarea
              name="description"
              rows={5}
              value={form.description}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Tell us about your project..."
              maxLength={2000}
              className={`${inputClass('description')} resize-none`}
            />
            <div className="flex justify-between mt-1">
              {touched.description && errors.description
                ? <p className="text-red-500 text-xs">{errors.description}</p>
                : <span />
              }
              <span className={`text-xs ml-auto ${form.description.length > 1800 ? 'text-amber-500' : 'text-gray-400'}`}>
                {form.description.length}/2000
              </span>
            </div>
          </Field>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition disabled:opacity-60"
          >
            {status === 'loading' ? 'Sending...' : 'Send Message'}
          </button>

          {status === 'success' && (
            <p className="text-green-600 text-sm text-center">Message sent. We'll be in touch soon.</p>
          )}
          {status === 'error' && (
            <p className="text-red-500 text-sm text-center">Something went wrong. Please try again.</p>
          )}
        </form>
      </div>
    </div>
  );
}

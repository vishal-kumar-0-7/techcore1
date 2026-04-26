export const rules = {
  name: v => {
    if (!v.trim()) return 'Name is required.';
    if (v.trim().length < 2) return 'Name must be at least 2 characters.';
    if (v.trim().length > 80) return 'Name must be under 80 characters.';
    return null;
  },
  email: v => {
    if (!v.trim()) return 'Email is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Enter a valid email address.';
    return null;
  },
  phone: v => {
    if (!v) return null; // optional
    const digits = v.replace(/\D/g, '');
    if (digits.length < 7) return 'Phone number is too short.';
    if (digits.length > 15) return 'Phone number is too long.';
    return null;
  },
  message: v => {
    if (!v.trim()) return 'Message is required.';
    if (v.trim().length < 10) return 'Message must be at least 10 characters.';
    if (v.trim().length > 2000) return 'Message must be under 2000 characters.';
    return null;
  },
};

// Format phone as user types: +91 98765 43210
export function formatPhone(value) {
  const digits = value.replace(/\D/g, '');
  if (digits.length === 0) return '';
  if (digits.length <= 2) return `+${digits}`;
  if (digits.length <= 7) return `+${digits.slice(0, 2)} ${digits.slice(2)}`;
  if (digits.length <= 12) return `+${digits.slice(0, 2)} ${digits.slice(2, 7)} ${digits.slice(7)}`;
  return `+${digits.slice(0, 2)} ${digits.slice(2, 7)} ${digits.slice(7, 12)}`;
}

export function validateForm(fields) {
  const errors = {};
  for (const [key, value] of Object.entries(fields)) {
    if (rules[key]) {
      const err = rules[key](value);
      if (err) errors[key] = err;
    }
  }
  return errors;
}

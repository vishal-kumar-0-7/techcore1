import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../lib/api.js';

export default function AdminGuard({ children }) {
  const [status, setStatus] = useState('checking'); // checking | ok | denied
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API}/admin/me`, { credentials: 'include' })
      .then(r => {
        if (r.ok) setStatus('ok');
        else { setStatus('denied'); navigate('/admin', { replace: true }); }
      })
      .catch(() => { setStatus('denied'); navigate('/admin', { replace: true }); });
  }, [navigate]);

  if (status === 'checking') return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (status === 'denied') return null;
  return children;
}

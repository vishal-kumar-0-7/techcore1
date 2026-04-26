import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, MessageSquare, Calendar, LogOut, Clock, BarChart2, FileText, Handshake, Layers, Trash2, Briefcase } from 'lucide-react';
import { API } from '../../lib/api.js';

// All requests use credentials: 'include' so the HttpOnly cookie is sent automatically
const apiFetch = (url, options = {}) =>
  fetch(url, { ...options, credentials: 'include', headers: { 'Content-Type': 'application/json', ...options.headers } });

const SERVICE_CATEGORIES = [
  'Web Development', 'App Development', 'Software Development',
  'AI & Automation', 'Cloud & DevOps', 'Security & Managed IT',
  'Blockchain Development', 'Growth & Marketing', 'Dedicated Team',
];

const GRADIENT_PRESETS = [
  { label: 'Indigo → Purple', value: 'from-indigo-500 to-purple-600' },
  { label: 'Blue → Cyan', value: 'from-blue-500 to-cyan-500' },
  { label: 'Green → Emerald', value: 'from-green-500 to-emerald-500' },
  { label: 'Amber → Orange', value: 'from-amber-500 to-orange-500' },
  { label: 'Rose → Pink', value: 'from-rose-500 to-pink-500' },
  { label: 'Violet → Purple', value: 'from-violet-500 to-purple-500' },
  { label: 'Sky → Indigo', value: 'from-sky-500 to-indigo-500' },
  { label: 'Teal → Cyan', value: 'from-teal-500 to-cyan-500' },
];

function CaseStudyForm({ study, onClose, onSaved, apiFetch }) {
  const isEdit = !!study;
  const [form, setForm] = useState({
    title: study?.title || '',
    clientName: study?.clientName || '',
    serviceCategory: study?.serviceCategory || 'App Development',
    problem: study?.problem || '',
    solution: study?.solution || '',
    result: study?.result || '',
    techStack: study?.techStack?.join(', ') || '',
    coverImage: study?.coverImage || '',
    gradientColor: study?.gradientColor || 'from-indigo-500 to-purple-600',
    featured: study?.featured || false,
    order: study?.order || 0,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setSaving(true); setError('');
    const payload = {
      ...form,
      techStack: form.techStack.split(',').map(t => t.trim()).filter(Boolean),
      order: parseInt(form.order) || 0,
    };
    try {
      const url = isEdit ? `${API}/case-studies/${study.id}` : `${API}/case-studies`;
      const method = isEdit ? 'PATCH' : 'POST';
      const res = await apiFetch(url, { method, body: JSON.stringify(payload) });
      if (!res.ok) { const d = await res.json(); setError(d.error || 'Failed to save.'); setSaving(false); return; }
      onSaved();
      onClose();
    } catch { setError('Connection failed.'); }
    setSaving(false);
  };

  const inp = 'w-full bg-slate-700 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4 overflow-y-auto">
      <div className="bg-slate-800 rounded-3xl shadow-2xl p-8 w-full max-w-2xl border border-slate-700 my-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">{isEdit ? 'Edit Case Study' : 'Add Case Study'}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-2xl leading-none">×</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-slate-400 mb-1">Title *</label>
              <input required value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="NeoBank Mobile App" className={inp} />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-slate-400 mb-1">Client Name</label>
              <input value={form.clientName} onChange={e => setForm({...form, clientName: e.target.value})} placeholder="FinStart Inc." className={inp} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-slate-400 mb-1">Service Category *</label>
              <select required value={form.serviceCategory} onChange={e => setForm({...form, serviceCategory: e.target.value})} className={inp}>
                {SERVICE_CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-slate-400 mb-1">Result *</label>
              <input required value={form.result} onChange={e => setForm({...form, result: e.target.value})} placeholder="+52% Organic Traffic" className={inp} />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wide text-slate-400 mb-1">Problem *</label>
            <textarea required rows={2} value={form.problem} onChange={e => setForm({...form, problem: e.target.value})} placeholder="What challenge did the client face?" className={`${inp} resize-none`} />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wide text-slate-400 mb-1">Solution *</label>
            <textarea required rows={2} value={form.solution} onChange={e => setForm({...form, solution: e.target.value})} placeholder="What did you build to solve it?" className={`${inp} resize-none`} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-slate-400 mb-1">Tech Stack (comma separated)</label>
              <input value={form.techStack} onChange={e => setForm({...form, techStack: e.target.value})} placeholder="React Native, Node.js, MongoDB" className={inp} />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-slate-400 mb-1">Gradient Color</label>
              <select value={form.gradientColor} onChange={e => setForm({...form, gradientColor: e.target.value})} className={inp}>
                {GRADIENT_PRESETS.map(g => <option key={g.value} value={g.value}>{g.label}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wide text-slate-400 mb-1">Cover Image URL (optional)</label>
            <input value={form.coverImage} onChange={e => setForm({...form, coverImage: e.target.value})} placeholder="https://images.unsplash.com/..." className={inp} />
          </div>

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.featured} onChange={e => setForm({...form, featured: e.target.checked})} className="w-4 h-4 rounded accent-indigo-500" />
              <span className="text-slate-300 text-sm font-medium">Featured (shows first)</span>
            </label>
            <div className="flex items-center gap-2">
              <label className="text-slate-400 text-xs font-bold uppercase tracking-wide">Display Order</label>
              <input type="number" value={form.order} onChange={e => setForm({...form, order: e.target.value})} className="w-16 bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving}
              className="flex-1 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-60">
              {saving ? 'Saving...' : isEdit ? 'Save Changes' : 'Create Case Study'}
            </button>
            <button type="button" onClick={onClose}
              className="px-6 py-3 bg-slate-700 text-slate-300 font-semibold rounded-xl hover:bg-slate-600 transition-colors">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function PaginationBar({ meta, onPage }) {
  if (!meta?.totalPages || meta.totalPages <= 1) return null;
  return (
    <div className="flex items-center gap-3">
      <span className="text-slate-400 text-sm">
        Page {meta.page} of {meta.totalPages}
      </span>
      <button
        disabled={meta.page <= 1}
        onClick={() => onPage(meta.page - 1)}
        className="px-3 py-1.5 rounded-lg bg-slate-700 text-slate-300 text-sm hover:bg-slate-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        ← Prev
      </button>
      <button
        disabled={meta.page >= meta.totalPages}
        onClick={() => onPage(meta.page + 1)}
        className="px-3 py-1.5 rounded-lg bg-slate-700 text-slate-300 text-sm hover:bg-slate-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        Next →
      </button>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }) { // eslint-disable-line no-unused-vars
  return (
    <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 flex items-center gap-5">
      <div className={`h-12 w-12 rounded-xl ${color} flex items-center justify-center shrink-0`}>
        <Icon size={22} className="text-white" />
      </div>
      <div>
        <div className="text-2xl font-black text-white">{value ?? '—'}</div>
        <div className="text-slate-400 text-sm">{label}</div>
      </div>
    </div>
  );
}

const statusColors = {
  new: 'bg-blue-500/20 text-blue-300',
  read: 'bg-slate-500/20 text-slate-300',
  replied: 'bg-green-500/20 text-green-300',
  contacted: 'bg-yellow-500/20 text-yellow-300',
  qualified: 'bg-purple-500/20 text-purple-300',
  won: 'bg-green-500/20 text-green-300',
  lost: 'bg-red-500/20 text-red-300',
  pending: 'bg-yellow-500/20 text-yellow-300',
  confirmed: 'bg-green-500/20 text-green-300',
  cancelled: 'bg-red-500/20 text-red-300',
  completed: 'bg-slate-500/20 text-slate-300',
  approved: 'bg-green-500/20 text-green-300',
  rejected: 'bg-red-500/20 text-red-300',
  in_review: 'bg-blue-500/20 text-blue-300',
  draft: 'bg-slate-500/20 text-slate-300',
  published: 'bg-green-500/20 text-green-300',
};

const tabs = [
  { id: 'overview', label: 'Overview', icon: BarChart2 },
  { id: 'contacts', label: 'Contacts', icon: MessageSquare },
  { id: 'leads', label: 'Leads', icon: Users },
  { id: 'appointments', label: 'Appointments', icon: Calendar },
  { id: 'partners', label: 'Partners', icon: Handshake },
  { id: 'blog', label: 'Blog', icon: FileText },
  { id: 'casestudies', label: 'Case Studies', icon: Briefcase },
  { id: 'plans', label: 'Engagement Plans', icon: Layers },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [activeTab, setActiveTab] = useState('overview');
  const [analytics, setAnalytics] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [leads, setLeads] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [partners, setPartners] = useState([]);
  const [posts, setPosts] = useState([]);
  const [plans, setPlans] = useState([]);
  const [caseStudies, setCaseStudies] = useState([]);
  const [showCaseStudyForm, setShowCaseStudyForm] = useState(false);
  const [editingStudy, setEditingStudy] = useState(null);

  // Pagination state per tab
  const [pages, setPages] = useState({ contacts: 1, leads: 1, appointments: 1 });
  const [totals, setTotals] = useState({ contacts: {}, leads: {}, appointments: {} });
  const LIMIT = 20;

  useEffect(() => {
    apiFetch(`${API}/admin/me`).then(r => r.ok ? r.json() : null).then(u => { if (u) setUser(u); });
    fetchAll(); // eslint-disable-line react-hooks/exhaustive-deps
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Re-fetch paginated tabs when page changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { fetchPaginated('contact', 'contacts', pages.contacts); }, [pages.contacts]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { fetchPaginated('leads', 'leads', pages.leads); }, [pages.leads]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { fetchPaginated('appointments', 'appointments', pages.appointments); }, [pages.appointments]);

  const fetchPaginated = async (endpoint, key, page) => {
    const res = await apiFetch(`${API}/${endpoint}?page=${page}&limit=${LIMIT}`);
    const json = await res.json();
    if (key === 'contacts') { setContacts(json.data ?? []); setTotals(t => ({ ...t, contacts: json })); }
    if (key === 'leads') { setLeads(json.data ?? []); setTotals(t => ({ ...t, leads: json })); }
    if (key === 'appointments') { setAppointments(json.data ?? []); setTotals(t => ({ ...t, appointments: json })); }
  };

  const fetchAll = async () => {
    const [a, c, l, ap, pa, b, pl, cs] = await Promise.all([
      apiFetch(`${API}/analytics`).then(r => r.json()),
      apiFetch(`${API}/contact?page=1&limit=${LIMIT}`).then(r => r.json()),
      apiFetch(`${API}/leads?page=1&limit=${LIMIT}`).then(r => r.json()),
      apiFetch(`${API}/appointments?page=1&limit=${LIMIT}`).then(r => r.json()),
      apiFetch(`${API}/partners`).then(r => r.json()),
      apiFetch(`${API}/blog/admin/all`).then(r => r.json()),
      apiFetch(`${API}/engagement-plans/admin/all`).then(r => r.json()),
      apiFetch(`${API}/case-studies/admin/all`).then(r => r.json()),
    ]);
    setAnalytics(a);
    setContacts(c.data ?? (Array.isArray(c) ? c : []));
    setTotals(t => ({ ...t, contacts: c }));
    setLeads(l.data ?? (Array.isArray(l) ? l : []));
    setTotals(t => ({ ...t, leads: l }));
    setAppointments(ap.data ?? (Array.isArray(ap) ? ap : []));
    setTotals(t => ({ ...t, appointments: ap }));
    setPartners(Array.isArray(pa) ? pa : []);
    setPosts(Array.isArray(b) ? b : []);
    setPlans(Array.isArray(pl) ? pl : []);
    setCaseStudies(Array.isArray(cs) ? cs : []);
  };

  const updateStatus = async (endpoint, id, status) => {
    await apiFetch(`${API}/${endpoint}/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) });
    // Re-fetch only the relevant paginated tab
    if (endpoint === 'contact') fetchPaginated('contact', 'contacts', pages.contacts);
    else if (endpoint === 'leads') fetchPaginated('leads', 'leads', pages.leads);
    else if (endpoint === 'appointments') fetchPaginated('appointments', 'appointments', pages.appointments);
    else fetchAll();
  };

  const logout = async () => {
    await apiFetch(`${API}/admin/logout`, { method: 'POST' });
    navigate('/admin', { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col shrink-0">
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center font-bold text-sm">TC</div>
            <div>
              <div className="font-bold text-sm">TechCore</div>
              <div className="text-slate-400 text-xs">Admin Panel</div>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.id ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-700 hover:text-white'
              }`}>
              <tab.icon size={18} /> {tab.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-700">
          <div className="text-xs text-slate-500 mb-3">{user.name} · {user.role}</div>
          <button onClick={logout} className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-slate-400 hover:bg-slate-700 hover:text-white text-sm transition-all">
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Overview */}
          {activeTab === 'overview' && (
            <div>
              <h1 className="text-2xl font-bold mb-8">Overview</h1>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
                <StatCard icon={MessageSquare} label="Total Contacts" value={analytics?.totals?.contacts} color="bg-blue-600" />
                <StatCard icon={Users} label="Total Leads" value={analytics?.totals?.leads} color="bg-purple-600" />
                <StatCard icon={Calendar} label="Appointments" value={analytics?.totals?.appointments} color="bg-green-600" />
                <StatCard icon={Handshake} label="Partner Apps" value={analytics?.totals?.partnerApplications} color="bg-amber-600" />
              </div>

              {/* Leads by day */}
              {analytics?.leadsByDay && (
                <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 mb-6">
                  <h3 className="font-bold mb-5 text-slate-200">Leads — Last 7 Days</h3>
                  <div className="flex items-end gap-3 h-32">
                    {Object.entries(analytics.leadsByDay).map(([day, count]) => {
                      const max = Math.max(...Object.values(analytics.leadsByDay), 1);
                      return (
                        <div key={day} className="flex-1 flex flex-col items-center gap-2">
                          <div className="text-xs text-slate-400 font-bold">{count}</div>
                          <div className="w-full bg-indigo-500 rounded-t-lg transition-all" style={{ height: `${(count / max) * 80 + 4}px` }} />
                          <div className="text-xs text-slate-500">{day.slice(5)}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                {/* Recent Leads */}
                <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
                  <h3 className="font-bold mb-4 text-slate-200">Recent Leads</h3>
                  <div className="space-y-3">
                    {analytics?.recentLeads?.map(l => (
                      <div key={l.id} className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium">{l.name}</div>
                          <div className="text-xs text-slate-400">{l.serviceInterest || 'General'}</div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[l.status]}`}>{l.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Top Sources */}
                <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
                  <h3 className="font-bold mb-4 text-slate-200">Top Traffic Sources</h3>
                  <div className="space-y-3">
                    {analytics?.topTrafficSources?.map((s, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="text-sm text-slate-300">{s.utmSource || 'Direct'}</div>
                        <div className="text-sm font-bold text-indigo-400">{s._count} leads</div>
                      </div>
                    ))}
                    {!analytics?.topTrafficSources?.length && <p className="text-slate-500 text-sm">No data yet</p>}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Contacts */}
          {activeTab === 'contacts' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Contacts ({totals.contacts.total ?? contacts.length})</h1>
                <PaginationBar meta={totals.contacts} onPage={p => setPages(pg => ({ ...pg, contacts: p }))} />
              </div>
              <div className="space-y-4">
                {contacts.map(c => (
                  <div key={c.id} className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-bold">{c.name}</span>
                          <span className="text-slate-400 text-sm">{c.email}</span>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusColors[c.status]}`}>{c.status}</span>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed">{c.description}</p>
                        <div className="text-xs text-slate-500 mt-2">{new Date(c.createdAt).toLocaleString()}</div>
                      </div>
                      <select value={c.status} onChange={e => updateStatus('contact', c.id, e.target.value)}
                        className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none shrink-0">
                        {['new','read','replied'].map(s => <option key={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                ))}
                {!contacts.length && <p className="text-slate-500 text-center py-12">No contacts yet</p>}
              </div>
            </div>
          )}

          {/* Leads */}
          {activeTab === 'leads' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Leads ({totals.leads.total ?? leads.length})</h1>
                <PaginationBar meta={totals.leads} onPage={p => setPages(pg => ({ ...pg, leads: p }))} />
              </div>
              <div className="space-y-4">
                {leads.map(l => (
                  <div key={l.id} className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <span className="font-bold">{l.name}</span>
                          <span className="text-slate-400 text-sm">{l.email}</span>
                          {l.phone && <span className="text-slate-400 text-sm">{l.phone}</span>}
                          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusColors[l.status]}`}>{l.status}</span>
                        </div>
                        <div className="flex gap-4 text-xs text-slate-500 flex-wrap">
                          {l.serviceInterest && <span>Service: {l.serviceInterest}</span>}
                          {l.sourcePage && <span>Page: {l.sourcePage}</span>}
                          {l.utmSource && <span>Source: {l.utmSource}</span>}
                          <span>{new Date(l.createdAt).toLocaleString()}</span>
                        </div>
                      </div>
                      <select value={l.status} onChange={e => updateStatus('leads', l.id, e.target.value)}
                        className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none shrink-0">
                        {['new','contacted','qualified','lost','won'].map(s => <option key={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                ))}
                {!leads.length && <p className="text-slate-500 text-center py-12">No leads yet</p>}
              </div>
            </div>
          )}

          {/* Appointments */}
          {activeTab === 'appointments' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Appointments ({totals.appointments.total ?? appointments.length})</h1>
                <PaginationBar meta={totals.appointments} onPage={p => setPages(pg => ({ ...pg, appointments: p }))} />
              </div>
              <div className="space-y-4">
                {appointments.map(a => (
                  <div key={a.id} className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <span className="font-bold">{a.name}</span>
                          <span className="text-slate-400 text-sm">{a.email}</span>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusColors[a.status]}`}>{a.status}</span>
                        </div>
                        <div className="flex gap-4 text-sm text-slate-300 flex-wrap">
                          <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(a.preferredDate).toDateString()}</span>
                          <span className="flex items-center gap-1"><Clock size={14} /> {a.preferredTime}</span>
                        </div>
                        {a.message && <p className="text-slate-400 text-sm mt-2">{a.message}</p>}
                      </div>
                      <select value={a.status} onChange={e => updateStatus('appointments', a.id, e.target.value)}
                        className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none shrink-0">
                        {['pending','confirmed','cancelled','completed'].map(s => <option key={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                ))}
                {!appointments.length && <p className="text-slate-500 text-center py-12">No appointments yet</p>}
              </div>
            </div>
          )}

          {/* Partners */}
          {activeTab === 'partners' && (
            <div>
              <h1 className="text-2xl font-bold mb-8">Partner Applications ({partners.length})</h1>
              <div className="space-y-4">
                {partners.map(p => (
                  <div key={p.id} className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <span className="font-bold">{p.companyName}</span>
                          <span className="text-slate-400 text-sm">{p.contactName}</span>
                          <span className="px-2 py-0.5 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-semibold">{p.partnershipType}</span>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusColors[p.status]}`}>{p.status}</span>
                        </div>
                        <div className="text-sm text-slate-400">{p.email} {p.phone && `· ${p.phone}`}</div>
                        {p.message && <p className="text-slate-400 text-sm mt-2">{p.message}</p>}
                        <div className="text-xs text-slate-500 mt-2">{new Date(p.createdAt).toLocaleString()}</div>
                      </div>
                      <select value={p.status} onChange={e => updateStatus('partners', p.id, e.target.value)}
                        className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none shrink-0">
                        {['pending','in_review','approved','rejected'].map(s => <option key={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                ))}
                {!partners.length && <p className="text-slate-500 text-center py-12">No applications yet</p>}
              </div>
            </div>
          )}

          {/* Blog */}
          {activeTab === 'blog' && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold">Blog Posts ({posts.length})</h1>
                <button onClick={() => navigate('/admin/blog/new')}
                  className="px-5 py-2.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors text-sm">
                  + New Post
                </button>
              </div>
              <div className="space-y-4">
                {posts.map(p => (
                  <div key={p.id} className="bg-slate-800 rounded-2xl p-6 border border-slate-700 flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-bold">{p.title}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusColors[p.status]}`}>{p.status}</span>
                        <span className="px-2 py-0.5 bg-slate-700 text-slate-300 rounded-full text-xs">{p.category}</span>
                      </div>
                      <div className="text-sm text-slate-400">{p.excerpt?.slice(0, 100)}...</div>
                      <div className="text-xs text-slate-500 mt-1">By {p.author?.name} · {new Date(p.createdAt).toLocaleDateString()}</div>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button onClick={() => navigate(`/admin/blog/${p.id}`)}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-700 text-slate-300 hover:bg-slate-600 transition-colors">
                        Edit
                      </button>
                      <button onClick={() => updateStatus('blog', p.id, p.status === 'published' ? 'draft' : 'published')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${p.status === 'published' ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-green-600 text-white hover:bg-green-700'}`}>
                        {p.status === 'published' ? 'Unpublish' : 'Publish'}
                      </button>
                    </div>
                  </div>
                ))}
                {!posts.length && <p className="text-slate-500 text-center py-12">No posts yet. Create your first one!</p>}
              </div>
            </div>
          )}
          {/* Case Studies */}
          {activeTab === 'casestudies' && (
            <div>
              {showCaseStudyForm && (
                <CaseStudyForm
                  study={editingStudy}
                  onClose={() => { setShowCaseStudyForm(false); setEditingStudy(null); }}
                  onSaved={fetchAll}
                  apiFetch={apiFetch}
                />
              )}
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold">Case Studies ({caseStudies.length})</h1>
                <button onClick={() => { setEditingStudy(null); setShowCaseStudyForm(true); }}
                  className="px-5 py-2.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors text-sm">
                  + Add Case Study
                </button>
              </div>
              <div className="space-y-4">
                {caseStudies.map(s => (
                  <div key={s.id} className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <span className="font-bold">{s.title}</span>
                          {s.clientName && <span className="text-slate-400 text-sm">{s.clientName}</span>}
                          <span className="px-2 py-0.5 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-semibold">{s.serviceCategory}</span>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${s.published ? 'bg-green-500/20 text-green-300' : 'bg-slate-600 text-slate-400'}`}>
                            {s.published ? 'Published' : 'Draft'}
                          </span>
                          {s.featured && <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 rounded-full text-xs font-semibold">Featured</span>}
                        </div>
                        <div className="text-slate-400 text-sm mb-1"><span className="text-slate-500">Result:</span> {s.result}</div>
                        {s.techStack?.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {s.techStack.map(t => <span key={t} className="px-2 py-0.5 bg-slate-700 text-slate-300 text-xs rounded">{t}</span>)}
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <button onClick={() => { setEditingStudy(s); setShowCaseStudyForm(true); }}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-700 text-slate-300 hover:bg-slate-600 transition-colors">
                          Edit
                        </button>
                        <button onClick={async () => {
                          await apiFetch(`${API}/case-studies/${s.id}`, { method: 'PATCH', body: JSON.stringify({ published: !s.published }) });
                          fetchAll();
                        }} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${s.published ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-green-600 text-white hover:bg-green-700'}`}>
                          {s.published ? 'Unpublish' : 'Publish'}
                        </button>
                        <button onClick={async () => {
                          if (!window.confirm('Delete this case study?')) return;
                          await apiFetch(`${API}/case-studies/${s.id}`, { method: 'DELETE' });
                          fetchAll();
                        }} className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-600/20 text-red-400 hover:bg-red-600/30 transition-colors border border-red-600/30">
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {!caseStudies.length && <p className="text-slate-500 text-center py-12">No case studies yet. Add your first one!</p>}
              </div>
            </div>
          )}

          {/* Engagement Plans */}
          {activeTab === 'plans' && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold">Engagement Plans ({plans.length})</h1>
              </div>
              <div className="space-y-4">
                {plans.map(p => (
                  <div key={p.id} className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <span className="font-bold text-lg">{p.name}</span>
                          {p.badge && <span className="px-2 py-0.5 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-semibold">{p.badge}</span>}
                          {p.popular && <span className="px-2 py-0.5 bg-green-500/20 text-green-300 rounded-full text-xs font-semibold">Popular</span>}
                          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${p.active ? 'bg-green-500/20 text-green-300' : 'bg-slate-600 text-slate-400'}`}>
                            {p.active ? 'Active' : 'Hidden'}
                          </span>
                        </div>
                        <div className="text-slate-400 text-sm mb-3">{p.tagline} — {p.description}</div>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {p.features?.map((f, i) => (
                            <span key={i} className="px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded-lg">✓ {f}</span>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <button
                          onClick={async () => {
                            await apiFetch(`${API}/engagement-plans/${p.id}`, { method: 'PATCH', body: JSON.stringify({ active: !p.active }) });
                            fetchAll();
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${p.active ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-green-600 text-white hover:bg-green-700'}`}>
                          {p.active ? 'Hide' : 'Show'}
                        </button>
                        <button
                          onClick={async () => {
                            if (!window.confirm('Delete this plan?')) return;
                            await apiFetch(`${API}/engagement-plans/${p.id}`, { method: 'DELETE' });
                            fetchAll();
                          }}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-600/20 text-red-400 hover:bg-red-600/30 transition-colors border border-red-600/30">
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {!plans.length && <p className="text-slate-500 text-center py-12">No plans yet. Restart the server to auto-seed defaults.</p>}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

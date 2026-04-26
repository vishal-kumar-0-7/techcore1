import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Eye, Trash2, X } from 'lucide-react';

import { API } from '../../lib/api.js';

const apiFetch = (url, options = {}) =>
  fetch(url, { ...options, credentials: 'include', headers: { 'Content-Type': 'application/json', ...options.headers } });

// Preview modal — renders the post exactly as the public blog would
function PreviewModal({ form, onClose }) {
  const tags = form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : [];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-sm overflow-y-auto">
      {/* Close bar */}
      <div className="sticky top-0 z-10 bg-slate-900 border-b border-slate-700 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Preview</span>
          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${form.status === 'published' ? 'bg-green-500/20 text-green-300' : 'bg-slate-600 text-slate-300'}`}>
            {form.status}
          </span>
        </div>
        <button onClick={onClose} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm">
          <X size={16} /> Close Preview
        </button>
      </div>

      {/* Rendered post */}
      <div className="min-h-screen bg-slate-50">
        {/* Hero */}
        <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 pt-16 pb-12">
          <div className="max-w-3xl mx-auto px-6">
            <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-bold rounded-full border border-indigo-500/30 mb-6 inline-block">
              {form.category || 'Engineering'}
            </span>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
              {form.title || <span className="text-slate-500 italic">No title yet</span>}
            </h1>
            <p className="text-slate-400 text-sm">Preview · {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          </div>
        </div>

        {/* Cover image */}
        {form.coverImage && (
          <div className="max-w-3xl mx-auto px-6 -mt-8">
            <img src={form.coverImage} alt="cover" className="w-full h-64 object-cover rounded-3xl shadow-2xl" />
          </div>
        )}

        {/* Content */}
        <article className="max-w-3xl mx-auto px-6 py-16">
          {form.excerpt && (
            <p className="text-xl text-slate-500 leading-relaxed mb-10 pb-10 border-b border-slate-200 italic">
              {form.excerpt}
            </p>
          )}
          <div className="space-y-5">
            {form.content
              ? form.content.split('\n').map((para, i) =>
                  para.trim()
                    ? <p key={i} className="text-slate-700 leading-relaxed text-lg">{para}</p>
                    : <div key={i} className="h-2" />
                )
              : <p className="text-slate-400 italic">No content yet.</p>
            }
          </div>
          {tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-slate-200 flex flex-wrap gap-2">
              {tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-indigo-50 text-indigo-600 text-sm font-medium rounded-full border border-indigo-100">{tag}</span>
              ))}
            </div>
          )}
        </article>
      </div>
    </div>
  );
}

export default function BlogEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showPreview, setShowPreview] = useState(false);

  const [form, setForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    coverImage: '',
    category: 'Engineering',
    tags: '',
    status: 'draft',
  });
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);

  // Load existing post when editing
  useEffect(() => {
    if (!id) return;
    apiFetch(`${API}/blog/admin/all`)
      .then(r => r.json())
      .then(posts => {
        const post = posts.find(p => p.id === id);
        if (!post) return;
        setForm({
          title: post.title || '',
          excerpt: post.excerpt || '',
          content: post.content || '',
          coverImage: post.coverImage || '',
          category: post.category || 'Engineering',
          tags: Array.isArray(post.tags) ? post.tags.join(', ') : '',
          status: post.status || 'draft',
        });
      });
  }, [id]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async (publishOverride) => {
    if (!form.title || !form.content || !form.excerpt) {
      setError('Title, excerpt and content are required.');
      return;
    }
    setSaving(true); setError('');

    const payload = {
      ...form,
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
      status: publishOverride ?? form.status,
    };

    try {
      const url = id ? `${API}/blog/${id}` : `${API}/blog`;
      const method = id ? 'PATCH' : 'POST';
      const res = await apiFetch(url, { method, body: JSON.stringify(payload) });
      const data = await res.json();

      if (!res.ok) { setError(data.error || 'Failed to save.'); setSaving(false); return; }

      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      if (!id && data.id) navigate(`/admin/blog/${data.id}`, { replace: true });
    } catch {
      setError('Connection failed.');
    }
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!id) return;
    if (!window.confirm('Delete this post permanently?')) return;
    setDeleting(true);
    await apiFetch(`${API}/blog/${id}`, { method: 'DELETE' });
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {showPreview && <PreviewModal form={form} onClose={() => setShowPreview(false)} />}
      {/* Top Bar */}
      <div className="sticky top-0 z-10 bg-slate-800 border-b border-slate-700 px-6 py-4 flex items-center justify-between gap-4">
        <button onClick={() => navigate('/admin/dashboard')}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium">
          <ArrowLeft size={16} /> Back to Dashboard
        </button>

        <div className="flex items-center gap-3">
          {saved && <span className="text-green-400 text-sm font-medium">✓ Saved</span>}
          {error && <span className="text-red-400 text-sm">{error}</span>}

          <select name="status" value={form.status} onChange={handleChange}
            className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none">
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>

          <button onClick={() => setShowPreview(true)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-slate-200 font-semibold rounded-lg hover:bg-slate-600 transition-colors text-sm border border-slate-600">
            <Eye size={15} /> Preview
          </button>

          {form.status === 'draft' && (
            <button onClick={() => handleSave('published')} disabled={saving}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors text-sm disabled:opacity-60">
              <Eye size={15} /> Publish
            </button>
          )}

          <button onClick={() => handleSave()} disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors text-sm disabled:opacity-60">
            <Save size={15} /> {saving ? 'Saving...' : 'Save'}
          </button>

          {id && (
            <button onClick={handleDelete} disabled={deleting}
              className="flex items-center gap-2 px-4 py-2 bg-red-600/20 text-red-400 font-semibold rounded-lg hover:bg-red-600/30 transition-colors text-sm border border-red-600/30">
              <Trash2 size={15} /> {deleting ? 'Deleting...' : 'Delete'}
            </button>
          )}
        </div>
      </div>

      {/* Editor */}
      <div className="max-w-4xl mx-auto px-6 py-10 space-y-6">
        {/* Title */}
        <div>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Post title..."
            className="w-full bg-transparent text-4xl font-extrabold text-white placeholder-slate-600 focus:outline-none border-b border-slate-700 pb-4"
          />
        </div>

        {/* Excerpt */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">Excerpt (shown in blog listing)</label>
          <textarea
            name="excerpt"
            value={form.excerpt}
            onChange={handleChange}
            rows={2}
            placeholder="A short summary of the post..."
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none text-sm"
          />
        </div>

        {/* Meta row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">Category</label>
            <select name="category" value={form.category} onChange={handleChange}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm">
              {categories.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">Tags (comma separated)</label>
            <input
              name="tags"
              value={form.tags}
              onChange={handleChange}
              placeholder="react, node.js, tutorial"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            />
          </div>
        </div>

        {/* Cover Image */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">Cover Image URL (optional)</label>
          <input
            name="coverImage"
            value={form.coverImage}
            onChange={handleChange}
            placeholder="https://images.unsplash.com/..."
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          />
          {form.coverImage && (
            <img src={form.coverImage} alt="cover preview" className="mt-3 h-40 w-full object-cover rounded-xl opacity-80" />
          )}
        </div>

        {/* Content */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">Content</label>
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            rows={24}
            placeholder="Write your post content here...

Each paragraph on a new line will be rendered as a separate paragraph on the blog."
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-5 py-4 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y text-sm leading-relaxed font-mono"
          />
        </div>

        {/* Preview hint */}
        <p className="text-xs text-slate-600 text-center pb-8">
          Tip: Each line break becomes a new paragraph on the public blog. Save as draft to review before publishing.
        </p>
      </div>
    </div>
  );
}

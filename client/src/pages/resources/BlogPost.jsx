import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SEO from '../../components/SEO';
import { API } from '../../lib/api.js';

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`${API}/blog/${slug}`)
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(data => { setPost(data); setLoading(false); })
      .catch(() => { setNotFound(true); setLoading(false); });
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (notFound) return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-4">
      <div className="text-6xl">🔍</div>
      <h2 className="text-2xl font-bold text-slate-900">Post not found</h2>
      <button onClick={() => navigate('/resources/blog')} className="text-indigo-600 font-semibold flex items-center gap-2">
        <ArrowLeft size={16} /> Back to Blog
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {post && <SEO title={post.title} description={post.excerpt} path={`/resources/blog/${post.slug}`} />}
      {/* Hero */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 pt-32 pb-16">
        <div className="max-w-3xl mx-auto px-6">
          <button onClick={() => navigate('/resources/blog')} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 text-sm font-medium">
            <ArrowLeft size={16} /> Back to Blog
          </button>
          <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-bold rounded-full border border-indigo-500/30 mb-6 inline-block">
            {post.category}
          </span>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">{post.title}</h1>
          <div className="flex items-center gap-4 text-slate-400 text-sm">
            <span>{post.author?.name}</span>
            <span>·</span>
            <span>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : ''}</span>
          </div>
        </div>
      </div>

      {/* Cover Image */}
      {post.coverImage && (
        <div className="max-w-3xl mx-auto px-6 -mt-8">
          <img src={post.coverImage} alt={post.title} className="w-full h-64 object-cover rounded-3xl shadow-2xl" />
        </div>
      )}

      {/* Content */}
      <article className="max-w-3xl mx-auto px-6 py-16">
        <div className="prose prose-lg prose-slate max-w-none">
          {post.content.split('\n').map((para, i) => para.trim() && <p key={i} className="text-slate-700 leading-relaxed mb-5">{para}</p>)}
        </div>

        {/* Tags */}
        {post.tags?.length > 0 && (
          <div className="mt-12 pt-8 border-t border-slate-200 flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-indigo-50 text-indigo-600 text-sm font-medium rounded-full border border-indigo-100">{tag}</span>
            ))}
          </div>
        )}

        <button
          onClick={() => navigate('/resources/blog')}
          className="mt-12 flex items-center gap-2 text-indigo-600 font-bold hover:-translate-x-1 transition-transform"
        >
          <ArrowLeft size={16} /> Back to all posts
        </button>
      </article>
    </div>
  );
}

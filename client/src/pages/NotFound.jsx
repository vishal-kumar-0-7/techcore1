import { useNavigate } from 'react-router-dom';
import { ArrowRight, Home } from 'lucide-react';
import SEO from '../components/SEO';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <SEO title="Page Not Found" description="The page you're looking for doesn't exist." path="/404" />
      <div className="text-center max-w-lg">
        <div className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600 mb-4">
          404
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 mb-4">Page not found</h1>
        <p className="text-slate-500 text-lg mb-10">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/')}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/30"
          >
            <Home size={18} /> Go Home
          </button>
          <button
            onClick={() => navigate('/contact')}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-700 font-bold rounded-2xl border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm"
          >
            Contact Us <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

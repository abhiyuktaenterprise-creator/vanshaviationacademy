import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService, ADMIN_CREDENTIALS } from '@/services/authService';
import { 
  Lock, 
  Mail, 
  ShieldCheck, 
  ArrowLeft, 
  Eye, 
  EyeOff, 
  Plane,
  AlertCircle 
} from 'lucide-react';
import { toast } from 'sonner';

const logoImage = '/vanshaviation-logo.png';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Superadmin Login | Vansh Aviation Academy Registry';
    authService.getSession().then((session) => {
      if (session) {
        navigate('/admin', { replace: true });
      }
    });
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!email.trim() || !password) {
      setErrorMsg('Please enter both administrator Email and Password.');
      return;
    }

    setLoading(true);

    try {
      const res = await authService.signInAdmin(email, password);

      if (res.error) {
        setErrorMsg(res.error);
        toast.error('Login Failed', { description: res.error });
        setLoading(false);
        return;
      }

      toast.success('Welcome Registrar!', { description: 'Authenticated successfully.' });
      setLoading(false);
      navigate('/admin', { replace: true });
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred during authentication.');
      setLoading(false);
    }
  };

  const handleFillDemo = () => {
    setEmail(ADMIN_CREDENTIALS.email);
    setPassword(ADMIN_CREDENTIALS.password);
    setErrorMsg(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 relative overflow-hidden selection:bg-aviation-cyan selection:text-slate-950">
      {/* Background aeronautic accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-aviation-cyan/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-600/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Back button */}
      <div className="w-full max-w-md mb-4 text-left">
        <Link 
          to="/" 
          className="inline-flex items-center text-xs text-slate-400 hover:text-aviation-cyan transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          Back to Academy Website
        </Link>
      </div>

      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <img 
            src={logoImage} 
            alt="Vansh Aviation Academy" 
            className="w-16 h-16 object-contain mx-auto mb-3 bg-white/10 rounded-2xl p-1.5"
          />
          <div className="inline-flex items-center gap-1.5 bg-aviation-cyan/10 text-aviation-cyan border border-aviation-cyan/30 px-3 py-1 rounded-full text-xs font-bold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Official Registry Portal</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Registrar & Superadmin
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Secure student records & credential management
          </p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-3.5 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Registrar Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                placeholder="admin@vanshaviationacademy.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 pl-10 pr-4 text-sm bg-slate-800/80 border border-slate-700 rounded-xl text-white focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-aviation-cyan focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Admin Master Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-11 pl-10 pr-10 text-sm bg-slate-800/80 border border-slate-700 rounded-xl text-white focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-aviation-cyan focus:border-transparent transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3.5 text-slate-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-aviation-cyan hover:bg-sky-400 text-slate-950 font-extrabold py-3.5 px-4 rounded-xl text-sm shadow-lg hover:shadow-cyan-500/20 transition-all duration-200 mt-2 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>Enter Administration Panel</span>
              </>
            )}
          </button>
        </form>

        {/* Quick fill button for testing/registrar convenience */}
        <div className="mt-6 pt-5 border-t border-slate-800 text-center">
          <button
            type="button"
            onClick={handleFillDemo}
            className="text-xs text-aviation-cyan/80 hover:text-aviation-cyan underline"
          >
            Fill Academy Registrar Credentials
          </button>
          <div className="text-[11px] text-slate-500 mt-1 font-mono">
            admin@vanshaviationacademy.com
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

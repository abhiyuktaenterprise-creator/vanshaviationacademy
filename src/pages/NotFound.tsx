import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Plane, ArrowLeft, ShieldCheck, Home } from "lucide-react";

const logoImage = '/vanshaviation-logo.png';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = "404 - Page Not Found | Vansh Aviation Academy";
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4 text-center">
      <div className="max-w-md mx-auto bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-slate-200">
        <img 
          src={logoImage} 
          alt="Vansh Aviation Academy" 
          className="w-16 h-16 object-contain mx-auto mb-6"
        />

        <div className="w-16 h-16 rounded-full bg-aviation-navy/5 text-aviation-navy flex items-center justify-center mx-auto mb-4">
          <Plane className="w-8 h-8 text-aviation-gold transform -rotate-45" />
        </div>

        <h1 className="text-5xl font-extrabold text-aviation-navy mb-2">404</h1>
        <h2 className="text-xl font-bold text-slate-800 mb-3">Flight Path Not Found</h2>
        <p className="text-sm text-slate-600 mb-8 leading-relaxed">
          The requested runway or page <code className="bg-slate-100 px-2 py-0.5 rounded text-xs font-mono">{location.pathname}</code> does not exist or has been relocated.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link 
            to="/" 
            className="inline-flex items-center justify-center gap-2 bg-aviation-navy hover:bg-slate-900 text-white font-bold px-6 py-3 rounded-xl text-sm shadow-md transition-all"
          >
            <Home className="w-4 h-4 text-aviation-gold" />
            <span>Return to Home</span>
          </Link>
          <Link 
            to="/verify" 
            className="inline-flex items-center justify-center gap-2 bg-amber-50 hover:bg-aviation-gold hover:text-aviation-navy text-aviation-navy border border-aviation-gold/50 font-bold px-5 py-3 rounded-xl text-sm transition-all"
          >
            <ShieldCheck className="w-4 h-4 text-aviation-gold" />
            <span>Verify Certificate</span>
          </Link>
        </div>
      </div>
      <p className="text-xs text-slate-400 mt-6">
        Vansh Aviation Academy • DGCA Approved Training Institute • Indore
      </p>
    </div>
  );
};

export default NotFound;

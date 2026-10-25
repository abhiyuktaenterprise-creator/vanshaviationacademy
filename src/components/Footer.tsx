import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Phone, 
  Mail, 
  MapPin, 
  ArrowUp, 
  Plane,
  ChevronRight,
  Lock
} from 'lucide-react';

const logoImage = '/vanshaviation-logo.png';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
          {/* Brand Info Column */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <img 
                src={logoImage} 
                alt="Vansh Aviation Academy" 
                className="w-12 h-12 object-contain bg-white rounded-xl p-1"
              />
              <div>
                <span className="text-xl font-extrabold text-white block leading-tight">
                  Vansh Aviation Academy
                </span>
                <span className="text-xs text-sky-400 font-semibold uppercase tracking-wider block">
                  DGCA Approved Training Institute
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Premier aviation training academy in Indore, Madhya Pradesh offering DGCA-approved 
              Commercial Pilot License (CPL), Private Pilot License (PPL), and comprehensive Ground School.
            </p>

            <div className="pt-2 flex flex-wrap gap-2">
              <Link
                to="/verify"
                className="inline-flex items-center gap-2 bg-sky-500/10 hover:bg-sky-500 text-sky-400 hover:text-slate-950 border border-sky-500/30 px-3.5 py-2 rounded-xl text-xs font-bold transition-all"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Verify Certificates Online (24/7)</span>
              </Link>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase text-white tracking-wider mb-2">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a href="#home" className="text-slate-400 hover:text-sky-400 transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-sky-500" />
                  <span>Home</span>
                </a>
              </li>
              <li>
                <a href="#about" className="text-slate-400 hover:text-sky-400 transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-sky-500" />
                  <span>About Us</span>
                </a>
              </li>
              <li>
                <a href="#courses" className="text-slate-400 hover:text-sky-400 transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-sky-500" />
                  <span>Flight Courses</span>
                </a>
              </li>
              <li>
                <a href="#facilities" className="text-slate-400 hover:text-sky-400 transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-sky-500" />
                  <span>Facilities</span>
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-slate-400 hover:text-sky-400 transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-sky-500" />
                  <span>Cadet Reviews</span>
                </a>
              </li>
              <li>
                <a href="#faq" className="text-slate-400 hover:text-sky-400 transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-sky-500" />
                  <span>FAQ</span>
                </a>
              </li>
              <li>
                <a href="#contact" className="text-slate-400 hover:text-sky-400 transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-sky-500" />
                  <span>Contact</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Training Programs */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase text-white tracking-wider mb-2">
              Flight Programs
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li>
                <a href="#courses" className="hover:text-sky-400 transition-colors block">
                  Commercial Pilot License (CPL)
                </a>
              </li>
              <li>
                <a href="#courses" className="hover:text-sky-400 transition-colors block">
                  Private Pilot License (PPL)
                </a>
              </li>
              <li>
                <a href="#courses" className="hover:text-sky-400 transition-colors block">
                  DGCA Ground School Classes
                </a>
              </li>
              <li>
                <a href="#courses" className="hover:text-sky-400 transition-colors block">
                  Multi-Engine Rating (IR)
                </a>
              </li>
              <li>
                <a href="#courses" className="hover:text-sky-400 transition-colors block">
                  Flight Simulator Training
                </a>
              </li>
              <li>
                <Link to="/verify" className="text-sky-400 font-semibold hover:underline block">
                  Student Verification Registry →
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Indore Contact */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase text-white tracking-wider mb-2">
              Campus Location
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-sky-400 mt-0.5 flex-shrink-0" />
                <span>2nd floor Ideal techno building behind konark hotel PU4 Vijay Nagar, Indore (M.P.) - 452010</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <a href="tel:+919506891936" className="text-white hover:text-sky-400 font-bold">
                  +91 9506891936
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <a href="mailto:aviationacademyvansh@gmail.com" className="hover:text-sky-400 break-all">
                  aviationacademyvansh@gmail.com
                </a>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex flex-wrap gap-x-4 gap-y-1.5 text-xs">
              <Link to="/privacy-policy" className="text-slate-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="text-slate-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookie-policy" className="text-slate-400 hover:text-white transition-colors">
                Cookie Policy
              </Link>
              <Link to="/admin/login" className="text-sky-400 hover:underline flex items-center gap-1 font-semibold">
                <Lock className="w-3 h-3" />
                <span>Registrar Login</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Sub-footer */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Vansh Aviation Academy. All rights reserved. DGCA Approved Training Organization.
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-slate-400 hover:text-sky-400 transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

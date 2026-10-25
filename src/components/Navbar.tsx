import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  Phone, 
  Menu, 
  X, 
  Award,
  ChevronRight,
  Lock,
  Plane
} from 'lucide-react';

const logoImage = '/vanshaviation-logo.png';

interface NavbarProps {
  activeSection?: string;
}

export const Navbar = ({ activeSection = 'home' }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Courses', href: '#courses' },
    { label: 'Fleet & Campus', href: '#facilities' },
    { label: 'Cadets', href: '#testimonials' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/' + href);
      return;
    }
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 76;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  const isVerifyPage = location.pathname === '/verify';

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-2.5' 
          : 'bg-white/90 backdrop-blur-md border-b border-slate-200/50 py-3.5'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="flex items-center justify-between">
          
          {/* Logo & Brand Identity */}
          <Link to="/" className="flex items-center gap-3 group select-none">
            <img 
              src={logoImage} 
              alt="Vansh Aviation Academy Logo" 
              className="w-10 h-10 sm:w-11 sm:h-11 object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="leading-tight">
              <span className="text-base sm:text-lg font-black text-slate-900 tracking-tight block">
                Vansh Aviation
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold text-sky-600 tracking-wide block">
                DGCA Approved • Indore Campus
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links - Lightweight, Sentence Case */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-[13px] font-medium text-slate-700 hover:text-sky-600 px-3 py-1.5 rounded-full hover:bg-sky-50/70 transition-all cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Verify Cadet Pill */}
            <Link
              to="/verify"
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border ${
                isVerifyPage
                  ? 'bg-sky-600 text-white border-sky-600 shadow-sm'
                  : 'bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-600 hover:text-white hover:border-sky-600 shadow-sm'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-sky-600 group-hover:text-white" />
              <span>Verify Cadet</span>
            </Link>

            {/* Call Admissions Button */}
            <a 
              href="tel:+919506891936"
              className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-sky-600 text-white px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 shadow-sm hover:shadow"
            >
              <Phone className="w-3.5 h-3.5 text-sky-400" />
              <span>+91 9506891936</span>
            </a>

            {/* Admin / Registrar Portal Quick Access */}
            <Link
              to="/admin/login"
              title="Registrar Admin Portal"
              className="p-2 rounded-full text-slate-400 hover:text-sky-600 hover:bg-sky-50 transition-colors"
            >
              <Lock className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              to="/verify"
              className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-200"
            >
              <ShieldCheck className="w-3 h-3 text-sky-600" />
              <span>Verify</span>
            </Link>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-slate-800 hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white/98 backdrop-blur-xl border-t border-slate-200 px-4 pt-3 pb-5 space-y-2 shadow-2xl animate-in slide-in-from-top-1 duration-200">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-left px-3 py-2.5 rounded-lg text-xs font-semibold text-slate-700 hover:bg-sky-50 hover:text-sky-600 transition-colors"
              >
                {link.label}
              </button>
            ))}
            
            <Link
              to="/verify"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg text-xs font-semibold bg-sky-50 border border-sky-200 text-sky-900 flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-sky-600" />
                Certificate & Cadet Verification
              </span>
              <span className="text-[10px] bg-sky-600 text-white px-2 py-0.5 rounded font-bold uppercase">
                Live
              </span>
            </Link>

            <Link
              to="/admin/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-2 text-xs text-slate-500 hover:text-sky-600 flex items-center gap-2"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Registrar Admin Portal</span>
            </Link>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <a
              href="tel:+919506891936"
              className="w-full text-center bg-slate-900 text-white font-semibold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm"
            >
              <Phone className="w-3.5 h-3.5 text-sky-400" />
              Call Admissions: +91 9506891936
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
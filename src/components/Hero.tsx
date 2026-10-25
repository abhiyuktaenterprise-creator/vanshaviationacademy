import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  ArrowRight, 
  Phone, 
  Plane, 
  Award, 
  Compass, 
  CheckCircle2, 
  Search,
  Sparkles,
  MapPin,
  ExternalLink
} from 'lucide-react';

export const Hero = () => {
  const [quickReg, setQuickReg] = useState('');
  const navigate = useNavigate();

  const handleQuickLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickReg.trim()) {
      navigate(`/verify?q=${encodeURIComponent(quickReg.trim())}`);
    } else {
      navigate('/verify');
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-[90vh] flex items-center pt-24 sm:pt-28 pb-16 bg-gradient-to-b from-sky-50/70 via-white to-slate-50/80 overflow-hidden"
    >
      {/* Aeronautical flight vectors and subtle grid pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#0284c7_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.06]"></div>
      
      {/* Ambient sky aero lighting */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-sky-200/40 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 -right-32 w-96 h-96 bg-cyan-100/50 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Academy Brief & Call to Action */}
          <div className="lg:col-span-7 text-left space-y-6">
            <div className="inline-flex items-center gap-2 bg-sky-50 border border-sky-200 text-sky-800 px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-sm">
              <Award className="w-3.5 h-3.5 text-sky-600" />
              <span>DGCA Approved Aviation Training Institute • Indore Base</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-black text-slate-900 tracking-tight leading-[1.12]">
              Precision Pilot Training for the{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-sky-700 to-slate-900">
                Commercial Cockpit
              </span>
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-slate-600 max-w-2xl leading-relaxed font-normal">
              Earn your <strong>DGCA Commercial Pilot License (CPL)</strong>, Private Pilot License (PPL), 
              and comprehensive Ground School certification in Indore. Train on certified Cessna aircraft 
              and advanced simulators with seasoned airline commanders.
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-1">
              <div className="bg-white border border-slate-200/80 shadow-sm p-3.5 rounded-2xl">
                <div className="text-2xl font-black text-sky-700">200 Hrs</div>
                <div className="text-[11px] text-slate-500 font-semibold">CPL Flying Hours</div>
              </div>
              <div className="bg-white border border-slate-200/80 shadow-sm p-3.5 rounded-2xl">
                <div className="text-2xl font-black text-sky-700">5+ Years</div>
                <div className="text-[11px] text-slate-500 font-semibold">Flight Training</div>
              </div>
              <div className="bg-white border border-slate-200/80 shadow-sm p-3.5 rounded-2xl">
                <div className="text-2xl font-black text-sky-700">50+</div>
                <div className="text-[11px] text-slate-500 font-semibold">Trained Pilots</div>
              </div>
              <div className="bg-white border border-slate-200/80 shadow-sm p-3.5 rounded-2xl">
                <div className="text-2xl font-black text-sky-700">100%</div>
                <div className="text-[11px] text-slate-500 font-semibold">DGCA Aligned</div>
              </div>
            </div>

            {/* Action Buttons Row */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <a
                href="#courses"
                className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-500 text-white font-bold px-6 py-3 rounded-full text-xs sm:text-sm shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
              >
                <span>View Flight Courses</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="tel:+919506891936"
                className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-5 py-3 rounded-full text-xs sm:text-sm shadow-sm transition-all duration-200"
              >
                <Phone className="w-4 h-4 text-sky-400" />
                <span>Call Admissions: +91 9506891936</span>
              </a>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
              <MapPin className="w-4 h-4 text-sky-600 flex-shrink-0" />
              <span>Campus: PU4 Vijay Nagar, Behind Konark Hotel, Indore (M.P.)</span>
            </div>
          </div>

          {/* Right Column: Interactive Academy & Verification Terminal */}
          <div className="lg:col-span-5">
            <div className="bg-white/95 rounded-3xl p-6 sm:p-7 shadow-xl border border-sky-100 backdrop-blur-md relative">
              {/* Terminal Header */}
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-sky-300"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                  <span className="text-xs font-semibold text-slate-700 ml-1.5">
                    Official Registry & Intake
                  </span>
                </div>
                <span className="text-[10px] bg-sky-50 text-sky-700 border border-sky-200 px-2 py-0.5 rounded-full font-bold uppercase">
                  Live Database
                </span>
              </div>

              <div className="space-y-5">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                    Instant Certificate Verification
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Authenticate student credentials and flight log records 24/7.
                  </p>
                </div>

                {/* Instant Verification Search */}
                <form onSubmit={handleQuickLookup} className="space-y-2.5">
                  <label className="block text-xs font-semibold text-slate-700">
                    Enter Registration Number:
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g. VAA-2025-CPL-01"
                      value={quickReg}
                      onChange={(e) => setQuickReg(e.target.value)}
                      className="w-full h-11 pl-3.5 pr-11 font-mono text-xs uppercase bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all"
                    />
                    <button
                      type="submit"
                      className="absolute right-1.5 top-1.5 p-2 bg-sky-600 text-white rounded-lg hover:bg-sky-500 transition-colors shadow-sm"
                      title="Verify"
                    >
                      <Search className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="flex justify-between items-center text-[11px] text-slate-500">
                    <span>Sample: <strong className="font-mono text-sky-700">VAA-2025-CPL-01</strong></span>
                    <Link to="/verify" className="text-sky-600 hover:text-sky-700 font-semibold hover:underline">
                      Open Full Registry →
                    </Link>
                  </div>
                </form>

                <div className="border-t border-slate-100 pt-4 space-y-2.5">
                  <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    2026 Batch Admissions Open:
                  </div>
                  <div className="space-y-2">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-between text-xs hover:border-sky-300 transition-colors">
                      <div>
                        <div className="font-bold text-slate-900">Commercial Pilot License (CPL)</div>
                        <div className="text-[11px] text-slate-500">DGCA 200 Hours • Indore Base</div>
                      </div>
                      <a href="#contact" className="text-sky-600 font-bold hover:underline">
                        Apply →
                      </a>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-between text-xs hover:border-sky-300 transition-colors">
                      <div>
                        <div className="font-bold text-slate-900">DGCA Ground School</div>
                        <div className="text-[11px] text-slate-500">Air Nav, Met, Regs, Tech</div>
                      </div>
                      <a href="#contact" className="text-sky-600 font-bold hover:underline">
                        Apply →
                      </a>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-100">
                  <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    DGCA Authorized Institute
                  </span>
                  <Link to="/admin/login" className="text-slate-400 hover:text-sky-600 transition-colors">
                    Registrar Login
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
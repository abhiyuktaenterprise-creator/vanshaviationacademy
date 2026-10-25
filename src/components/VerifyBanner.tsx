import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight, CheckCircle2, Lock, FileSearch, Building2 } from 'lucide-react';

export const VerifyBanner = () => {
  return (
    <section id="verify-banner" className="py-14 bg-white relative">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0B1528] via-[#0E2038] to-slate-950 p-8 sm:p-12 shadow-2xl border border-slate-800 text-white">
          {/* Ambient Lighting Accents */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold text-sky-400 mb-4 border border-white/10">
                <ShieldCheck className="w-4 h-4 text-sky-400" />
                <span>Official Student & Certificate Registry</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight mb-4">
                Verify Flight & Academic Credentials Online
              </h2>

              <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed mb-6 font-normal">
                Airlines, recruiters, regulatory authorities, and students can instantly verify course completion 
                certificates, flight log transcripts, and DGCA ground school credentials issued by Vansh Aviation Academy 24/7.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-300">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Instant Live Database Verification
                </span>
                <span className="flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-sky-400" />
                  Tamper-Proof Digital Verification
                </span>
                <span className="flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-sky-400" />
                  Airline Recruiter Trusted
                </span>
              </div>
            </div>

            <div className="flex-shrink-0 w-full sm:w-auto text-center">
              <Link
                to="/verify"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold px-7 py-4 rounded-2xl text-sm shadow-xl hover:shadow-cyan-500/20 hover:scale-105 transition-all duration-200"
              >
                <FileSearch className="w-4 h-4" />
                <span>Verify a Certificate</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <div className="text-[11px] text-slate-400 mt-2 font-mono">
                Search by Registration No. or Application ID
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerifyBanner;

import { Award, ShieldCheck, CheckCircle2, Plane, Users, MapPin } from 'lucide-react';

export const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-white relative">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Image with Stats Badge */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Image with rounded corners and shadow */}
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border-4 border-white relative bg-slate-100">
                <img 
                  src="/about-aviation.jpg"
                  alt="Vansh Aviation Academy Pilot Flight Training" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />

                {/* Verified DGCA Stamp at Top-Left (Moved here so bottom text is 100% unobstructed) */}
                <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-lg border border-slate-200/90 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center">
                    <Award className="w-4 h-4 text-sky-600" />
                  </div>
                  <div>
                    <div className="text-[11px] font-black text-slate-900 uppercase tracking-wider leading-tight">
                      DGCA Approved
                    </div>
                    <div className="text-[10px] text-slate-500 font-semibold leading-tight">
                      Flight & Ground School
                    </div>
                  </div>
                </div>

                {/* Dark gradient overlay for bottom text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none"></div>
                
                {/* Bottom Content - 100% Unobstructed and clearly visible */}
                <div className="absolute bottom-6 left-6 right-6 text-white z-10 space-y-1">
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-300 uppercase tracking-wider">
                    <MapPin className="w-3.5 h-3.5 text-sky-400" />
                    <span>Indore, Madhya Pradesh</span>
                  </div>
                  <div className="text-lg sm:text-xl font-bold leading-snug">
                    Excellence in Flight Instruction & DGCA Standards
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-sky-50 text-sky-800 border border-sky-200/80 px-3.5 py-1 rounded-full text-xs font-semibold">
              <Plane className="w-3.5 h-3.5 text-sky-600" />
              <span>About Vansh Aviation Academy</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Shaping India's Next Generation of Airline Pilots
            </h2>

            <p className="text-base text-slate-600 leading-relaxed">
              <strong>Vansh Aviation Academy</strong> is a premier aviation training institute situated in the heart of Indore, Madhya Pradesh. We are dedicated to providing world-class, DGCA-compliant flight education, turning ambitious aviation dreams into professional airline careers.
            </p>

            <p className="text-sm text-slate-600 leading-relaxed">
              Our training programs adhere strictly to Directorate General of Civil Aviation (DGCA) India specifications and International Civil Aviation Organization (ICAO) standards. From foundational aerodynamic theory and simulator maneuvers to solo cross-country flights and multi-engine ratings, our comprehensive methodology ensures students graduate with highest safety benchmarks and cockpit competency.
            </p>

            {/* Core Values Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="flex items-center gap-2.5 text-sm text-slate-800 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>DGCA Authorized Flight Syllabus</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-800 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Experienced Airline Captain Instructors</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-800 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Cessna Fleet & Advanced Simulators</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-800 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Central India Campus in Vijay Nagar</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-3 flex flex-wrap items-center gap-4">
              <a
                href="#courses"
                className="bg-slate-900 hover:bg-sky-600 text-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-full shadow-sm transition-all duration-200"
              >
                Explore Training Programs
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-700 hover:text-sky-600 transition-colors py-3 px-4"
              >
                <span>Visit Our Indore Campus</span>
                <MapPin className="w-4 h-4 text-sky-600" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
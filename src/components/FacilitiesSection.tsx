import { Plane, Building, Monitor, Radio, Shield, Wrench } from 'lucide-react';

export const FacilitiesSection = () => {
  const facilities = [
    {
      icon: Plane,
      title: 'Modern Aircraft Training Fleet',
      subtitle: 'Cessna 152 & Cessna 172 Aircraft',
      description: 'Maintained under strict DGCA continuous airworthiness standards. Equipped with modern VOR, ILS, GPS, and standard cockpit instrumentation for comprehensive primary and advanced flight instruction.'
    },
    {
      icon: Monitor,
      title: 'Advanced Flight Simulators',
      subtitle: 'Certified Synthetic Training Devices (FSTD)',
      description: 'State-of-the-art simulators providing realistic cockpit experiences for instrument flight rules (IFR), engine failure procedures, extreme weather approaches, and night flight simulation.'
    },
    {
      icon: Building,
      title: 'Smart Ground School Classrooms',
      subtitle: 'PU4 Vijay Nagar, Indore Campus',
      description: 'Fully air-conditioned modern classrooms equipped with interactive audio-visual displays, aviation charts, aerodynamic demonstration models, and individual study carrels.'
    },
    {
      icon: Radio,
      title: 'ATC & Radio Telephony Lab',
      subtitle: 'WPC RTR(A) Communication Training',
      description: 'Dedicated acoustic lab simulating live Air Traffic Control transmissions and emergency distress calls, preparing candidates for the Ministry of Communications RTR(A) license.'
    },
    {
      icon: Wrench,
      title: 'Aircraft Maintenance Standards',
      subtitle: 'DGCA CAR-145 Certified Maintenance',
      description: 'Round-the-clock aircraft maintenance and safety inspections conducted by licensed Aircraft Maintenance Engineers (AME) before every student flight sortie.'
    },
    {
      icon: Shield,
      title: 'Pre & Post Flight Briefing Rooms',
      subtitle: '1-on-1 Instructor Cockpit Analysis',
      description: 'Private debriefing cubicles where students review GPS flight tracks, landing touchdown rates, fuel management, and weather radar data with their flight instructors.'
    }
  ];

  return (
    <section id="facilities" className="py-20 bg-white relative">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 bg-sky-50 text-sky-800 border border-sky-200/80 px-3.5 py-1 rounded-full text-xs font-semibold mb-3">
            <Building className="w-3.5 h-3.5 text-sky-600" />
            <span>Infrastructure & Technology</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            World-Class Training Facilities
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            Our campus in PU4 Vijay Nagar, Indore and flight base infrastructure are built to match 
            international airline standards for safety, technical readiness, and learning excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {facilities.map((facility, idx) => {
            const Icon = facility.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50/80 rounded-2xl p-6 sm:p-8 border border-slate-200/80 hover:border-sky-300 shadow-sm hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 text-sky-600 group-hover:bg-sky-600 group-hover:text-white transition-all duration-300 flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold text-sky-600 uppercase tracking-wider mb-1">
                  {facility.subtitle}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {facility.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  {facility.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FacilitiesSection;

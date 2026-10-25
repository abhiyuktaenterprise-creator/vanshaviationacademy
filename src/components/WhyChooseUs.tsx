import { 
  ShieldCheck, 
  Award, 
  Plane, 
  Briefcase, 
  Compass, 
  Clock,
  Sparkles
} from 'lucide-react';

export const WhyChooseUs = () => {
  const reasons = [
    {
      icon: ShieldCheck,
      title: 'DGCA Approved Standards',
      description: 'Certified flight training programs and ground theory meticulously aligned with Directorate General of Civil Aviation regulations.'
    },
    {
      icon: Award,
      title: 'Veteran Flight Instructors',
      description: 'Learn directly from certified flight instructors (CFI), retired airline commanders, and DGCA-approved ground examiners.'
    },
    {
      icon: Plane,
      title: 'Modern Aircraft & Simulators',
      description: 'Hands-on flying experience on well-maintained Cessna 152 and Cessna 172 aircraft with high safety reliability and glass cockpit simulators.'
    },
    {
      icon: Briefcase,
      title: 'Career & Airline Placement Support',
      description: 'Comprehensive preparation for airline entrance tests, Compass simulator screenings, psychometric reviews, and airline interview panels.'
    },
    {
      icon: Compass,
      title: 'Personalized Flight Mentoring',
      description: 'Strict student-to-instructor ratios ensuring individual attention, focused pre-flight briefings, and thorough post-flight analysis.'
    },
    {
      icon: Clock,
      title: 'Flexible Batch Schedules',
      description: 'Weekend and weekday batches designed for college students, 10+2 graduates, and working professionals pursuing their pilot dreams.'
    }
  ];

  return (
    <section className="py-20 bg-slate-50 relative">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 bg-sky-50 text-sky-800 border border-sky-200/80 px-3.5 py-1 rounded-full text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>The Vansh Advantage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Why Choose Vansh Aviation Academy?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            We provide unmatched safety standards, certified fleet infrastructure, and career 
            mentorship to ensure you take flight with absolute confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {reasons.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200/80 group hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center mb-5 group-hover:bg-sky-600 group-hover:border-sky-600 transition-all duration-300">
                  <Icon className="w-6 h-6 text-sky-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

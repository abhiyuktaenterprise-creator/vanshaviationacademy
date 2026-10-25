import { Star, Award, CheckCircle2, Quote } from 'lucide-react';

export const TestimonialsSection = () => {
  const reviews = [
    {
      name: 'Rajesh Kumar Verma',
      role: 'Commercial Pilot License (CPL) Graduate',
      airline: 'Placed at IndiGo Airlines',
      badge: 'CPL Alumnus',
      avatarInitial: 'R',
      quote: 'Vansh Aviation Academy provided the exact structured training I needed to convert my dream into an airline cockpit reality. The ground instructors made complex navigation and meteorology crystal clear, and the flying instructors were uncompromising about flight safety and precision.',
      rating: 5
    },
    {
      name: 'Priya Sharma',
      role: 'First Officer, Commercial Aviation',
      airline: 'SpiceJet Airline Crew',
      badge: 'CPL Alumna',
      avatarInitial: 'P',
      quote: 'The practical approach at Vansh Aviation Academy gave me huge confidence during my airline simulator evaluation. Learning in Indore with their dedicated faculty allowed me to clear all 5 DGCA exams on my very first attempt.',
      rating: 5
    },
    {
      name: 'Aman Deep Singh',
      role: 'Private Pilot License (PPL) Cadet',
      airline: 'Executive Flying Alumnus',
      badge: 'PPL Aviator',
      avatarInitial: 'A',
      quote: 'As a business entrepreneur, pursuing my Private Pilot License was a lifelong passion. The flexible training schedule, modern Cessna fleet, and patient instructors made my solo cross-country flights truly unforgettable.',
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 bg-sky-50 text-sky-800 border border-sky-200/80 px-3.5 py-1 rounded-full text-xs font-semibold mb-3">
            <Award className="w-3.5 h-3.5 text-sky-600" />
            <span>Success Stories & Placements</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            What Our Cadets Say
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            Real experiences from graduates flying with premier domestic and international airlines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {reviews.map((review, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200/80 flex flex-col justify-between relative group hover:-translate-y-1"
            >
              <div>
                {/* Quote Icon */}
                <div className="text-sky-500/20 mb-4">
                  <Quote className="w-8 h-8 text-sky-400" />
                </div>

                {/* Star Rating */}
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-6">
                  "{review.quote}"
                </p>
              </div>

              {/* Author & Placement Information */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-full bg-slate-900 text-sky-400 font-bold flex items-center justify-center text-base flex-shrink-0">
                  {review.avatarInitial}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm leading-snug">
                    {review.name}
                  </h4>
                  <div className="text-[11px] text-slate-500">
                    {review.role}
                  </div>
                  <div className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 mt-0.5">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>{review.airline}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

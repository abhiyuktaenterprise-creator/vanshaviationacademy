import { useState } from 'react';
import { 
  Plane, 
  Clock, 
  Award, 
  BookOpen, 
  CheckCircle2, 
  ArrowRight, 
  Compass, 
  ChevronDown, 
  ChevronUp 
} from 'lucide-react';

interface Course {
  id: string;
  title: string;
  category: string;
  tag: string;
  duration: string;
  flyingHours: string;
  minAge: string;
  education: string;
  description: string;
  highlights: string[];
  syllabus: string[];
  careerOpportunities: string[];
}

export const CoursesSection = () => {
  const [selectedCourse, setSelectedCourse] = useState<string>('cpl');
  const [expandedSyllabus, setExpandedSyllabus] = useState<string | null>(null);

  const courses: Course[] = [
    {
      id: 'cpl',
      title: 'Commercial Pilot License (CPL) Training',
      category: 'Professional Airline Career',
      tag: 'Premier Track',
      duration: '12 - 18 Months',
      flyingHours: '200 Flying Hours (Solo, Dual, Instrument & Multi-Engine)',
      minAge: '18 Years (17 years for enrollment)',
      education: '10+2 with Physics & Mathematics (or NIOS equivalent)',
      description: 'The definitive path to a commercial cockpit career. Comprehensive flight training under DGCA regulations, combining extensive simulator practice, dual-engine flight sorties, and rigorous flight instruction.',
      highlights: [
        'DGCA-approved 200 hours flying curriculum',
        'Multi-Engine rating on twin aircraft (Piper Seneca/Diamond)',
        'Instrument Rating (IR) with advanced cockpit avionics',
        'Airline interview preparation & psychometric test training',
        'Direct career placement guidance with Indian domestic carriers'
      ],
      syllabus: [
        'Air Navigation & Flight Planning',
        'Aviation Meteorology & Weather Hazards',
        'Air Regulations & Indian Aircraft Rules',
        'Aircraft & Engine Technical General',
        'Technical Specific (Cessna 172/152 & Twin Engine)',
        'Radio Telephony RTR(A) License Examination'
      ],
      careerOpportunities: ['Airline First Officer', 'Corporate Jet Pilot', 'Cargo Flight Captain', 'Charter Aviation Pilot']
    },
    {
      id: 'ppl',
      title: 'Private Pilot License (PPL) Training',
      category: 'Recreational & Private Flying',
      tag: 'Private Aviator',
      duration: '3 - 6 Months',
      flyingHours: '40 - 50 Flying Hours (Solo & Cross-Country)',
      minAge: '17 Years',
      education: '10th Standard or equivalent',
      description: 'Designed for aviation enthusiasts, business executives, and future aircraft owners who want the freedom to pilot single-engine aircraft for personal travel, leisure, or as the foundation toward commercial flying.',
      highlights: [
        'DGCA-certified Private Pilot License syllabus',
        'Hands-on aircraft handling on Cessna 152 / Cessna 172',
        'Cross-country navigational flights across Central India',
        'Flexible batch timings tailored for working professionals and students',
        'Comprehensive ground briefing before every flight sortie'
      ],
      syllabus: [
        'Basic Aerodynamics & Aircraft Controls',
        'VFR (Visual Flight Rules) Navigation',
        'Basic Aviation Meteorology',
        'Emergency Flight Procedures & Recovery',
        'Cockpit Resource Management basics'
      ],
      careerOpportunities: ['Personal Aviation Pilot', 'Leisure & Cross-Country Flying', 'Foundation for Commercial License']
    },
    {
      id: 'ground-school',
      title: 'DGCA Aviation Ground School',
      category: 'Theory & DGCA Exams',
      tag: 'High Pass Rate',
      duration: '3 - 4 Months',
      flyingHours: 'Integrated Simulator Sessions',
      minAge: '16+ Years',
      education: '10+2 (Appearing or Passed with Physics & Maths)',
      description: 'Clearing DGCA theoretical exams is the most critical hurdle for any aspiring pilot. Our intensive ground academy in Vijay Nagar, Indore features experienced ground instructors, mock tests, and question banks with a 98% pass rate.',
      highlights: [
        'Covering all 5 DGCA CPL/ATPL theoretical exam papers',
        'Modern air-conditioned smart classrooms with audio-visual charts',
        'Weekly DGCA mock computer exams replicating official DGCA testing',
        'DGCA Computer Number guidance & document assistance',
        'Personalized doubt-clearing sessions and question banks'
      ],
      syllabus: [
        'Paper I: Air Navigation (General Nav, Radio Nav, Flight Planning)',
        'Paper II: Aviation Meteorology (Synoptic charts, monsoon, radar)',
        'Paper III: Air Regulations (CARs, ICAO annexes, airspace rules)',
        'Paper IV: Technical General (Airframes, engines, electrics)',
        'Paper V: Radio Telephony Restricted (Aero) - WPC RTR'
      ],
      careerOpportunities: ['DGCA CPL Theory Clearance', 'Airline Cadet Pilot Theory Foundation', 'Flight Dispatcher']
    },
    {
      id: 'simulator',
      title: 'Flight Simulator & RTR(A) Training',
      category: 'Advanced Proficiency',
      tag: 'Practical Tech',
      duration: '1 - 2 Months',
      flyingHours: '30+ Hours Simulator Instrument Time',
      minAge: '17+ Years',
      education: '10+2 with Physics & Math',
      description: 'Master instrument flying, bad weather approaches, and complex radio communications with our advanced flight simulator and WPC RTR(A) certified guidance.',
      highlights: [
        'Certified flight simulator simulating Cessna 172 and Multi-Engine aircraft',
        'IFR procedures, ILS/VOR approaches, and engine-out emergency practice',
        'Live radio telephony practice mimicking Indian ATC communications',
        'Loggable simulator hours credited toward DGCA requirements'
      ],
      syllabus: [
        'Instrument Flight Procedures (IFR)',
        'Cockpit Avionics & GPS Integration',
        'Non-Normal Emergency Procedures',
        'WPC RTR(A) Part I & Part II Practical Communications'
      ],
      careerOpportunities: ['Instrument Rating Endorsement', 'Airline Screening Preparation', 'WPC RTR License']
    }
  ];

  const currentCourse = courses.find((c) => c.id === selectedCourse) || courses[0];

  const toggleSyllabus = (id: string) => {
    setExpandedSyllabus(expandedSyllabus === id ? null : id);
  };

  return (
    <section id="courses" className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-sky-50 text-sky-800 border border-sky-200/80 px-3.5 py-1 rounded-full text-xs font-semibold mb-3">
            <Award className="w-3.5 h-3.5 text-sky-600" />
            <span>DGCA Approved Programs</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Pilot Training Courses
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            Select your preferred aviation pathway. Every program is meticulously structured according 
            to DGCA India guidelines, equipped with modern aircraft and simulator technology.
          </p>
        </div>

        {/* Course Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-10">
          {courses.map((course) => (
            <button
              key={course.id}
              onClick={() => setSelectedCourse(course.id)}
              className={`px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                selectedCourse === course.id
                  ? 'bg-slate-900 text-white shadow-md border-2 border-sky-400 scale-[1.02]'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Plane className={`w-4 h-4 ${selectedCourse === course.id ? 'text-sky-400' : 'text-slate-400'}`} />
              <span>{course.title.split(' ')[0]} {course.title.split(' ')[1]}</span>
              {course.tag && (
                <span className={`text-[10px] uppercase px-2 py-0.5 rounded-md font-extrabold ${
                  selectedCourse === course.id 
                    ? 'bg-sky-500 text-slate-950' 
                    : 'bg-slate-100 text-slate-500'
                }`}>
                  {course.tag}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Featured Selected Course Detail Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden max-w-5xl mx-auto transition-all duration-300">
          <div className="bg-gradient-to-r from-slate-900 via-[#0C1D33] to-slate-900 p-6 sm:p-8 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wider block mb-1">
                {currentCourse.category}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                {currentCourse.title}
              </h3>
            </div>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-xs sm:text-sm px-5 py-3 rounded-xl shadow-md transition-all duration-200 hover:-translate-y-0.5"
            >
              <span>Enquire for Admission</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="p-6 sm:p-10 space-y-7">
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {currentCourse.description}
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800">
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase block mb-1">
                  Duration
                </span>
                <span className="text-sm sm:text-base font-bold text-slate-900">
                  {currentCourse.duration}
                </span>
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase block mb-1">
                  Flying / Simulator
                </span>
                <span className="text-sm sm:text-base font-bold text-sky-700">
                  {currentCourse.flyingHours.split(' ')[0]} {currentCourse.flyingHours.split(' ')[1]}
                </span>
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase block mb-1">
                  Minimum Age
                </span>
                <span className="text-sm sm:text-base font-bold text-slate-900">
                  {currentCourse.minAge}
                </span>
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase block mb-1">
                  Academic Eligibility
                </span>
                <span className="text-xs sm:text-sm font-semibold text-slate-700">
                  {currentCourse.education}
                </span>
              </div>
            </div>

            {/* Course Highlights & Opportunities */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-slate-900 text-sm sm:text-base mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Program Highlights & Safety Standards</span>
                </h4>
                <ul className="space-y-2">
                  {currentCourse.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-2 flex-shrink-0"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm sm:text-base mb-3 flex items-center gap-2">
                  <Compass className="w-4 h-4 text-sky-600" />
                  <span>Career Pathways & Airline Roles</span>
                </h4>
                <div className="flex flex-wrap gap-2 mb-5">
                  {currentCourse.careerOpportunities.map((role, idx) => (
                    <span 
                      key={idx} 
                      className="bg-sky-50 text-sky-900 border border-sky-200 text-xs font-semibold px-2.5 py-1 rounded-lg"
                    >
                      ✈️ {role}
                    </span>
                  ))}
                </div>

                {/* Syllabus Dropdown Toggle */}
                <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200">
                  <button
                    onClick={() => toggleSyllabus(currentCourse.id)}
                    className="w-full flex items-center justify-between text-left text-xs sm:text-sm font-bold text-slate-900"
                  >
                    <span className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-sky-600" />
                      Detailed DGCA Syllabus Subjects ({currentCourse.syllabus.length})
                    </span>
                    {expandedSyllabus === currentCourse.id ? (
                      <ChevronUp className="w-4 h-4 text-slate-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-500" />
                    )}
                  </button>

                  {expandedSyllabus === currentCourse.id && (
                    <ul className="mt-3 pt-3 border-t border-slate-200 space-y-1.5 animate-in fade-in">
                      {currentCourse.syllabus.map((topic, sIdx) => (
                        <li key={sIdx} className="text-xs text-slate-600 flex items-center gap-2">
                          <span className="font-mono text-sky-600 font-bold">{sIdx + 1}.</span>
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Enquire Strip */}
            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-500 text-center sm:text-left">
                Strict student-to-aircraft ratio maintained for maximum cockpit flying hours.
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <a
                  href="#contact"
                  className="w-full sm:w-auto text-center bg-slate-900 text-white text-xs font-bold px-5 py-2.5 rounded-xl hover:bg-slate-800 transition-colors"
                >
                  Book Free Career Counselling
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;

import { useState } from 'react';
import { CheckCircle2, XCircle, ArrowRight, Sparkles, HelpCircle, Phone } from 'lucide-react';

export const EligibilityChecker = () => {
  const [age, setAge] = useState<string>('18-25');
  const [education, setEducation] = useState<string>('pcm');
  const [medical, setMedical] = useState<string>('fit');
  const [hasEvaluated, setHasEvaluated] = useState<boolean>(false);

  const isEligible = education === 'pcm' && age !== 'under-16' && medical !== 'unfit';

  const handleEvaluate = (e: React.FormEvent) => {
    e.preventDefault();
    setHasEvaluated(true);
  };

  return (
    <section id="eligibility" className="py-20 bg-gradient-to-b from-white to-slate-50 relative">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="bg-gradient-to-r from-slate-900 via-[#0C1D33] to-slate-900 p-6 sm:p-8 text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs font-semibold text-sky-400 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                <span>Instant Self-Assessment</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                DGCA Pilot Eligibility Checker
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Check if you meet the requirements for Commercial Pilot License (CPL) training in India.
              </p>
            </div>
          </div>

          <form onSubmit={handleEvaluate} className="p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Question 1: Age */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  1. Your Current Age
                </label>
                <select
                  value={age}
                  onChange={(e) => {
                    setAge(e.target.value);
                    setHasEvaluated(false);
                  }}
                  className="w-full h-11 px-3 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
                >
                  <option value="under-16">Under 16 Years (Too Young)</option>
                  <option value="16-17">16 - 17 Years (Ground School Ready)</option>
                  <option value="18-25">18 - 25 Years (Prime Pilot Age)</option>
                  <option value="26-35">26 - 35 Years (Career Transition)</option>
                  <option value="36+">36+ Years (PPL / Private Flying)</option>
                </select>
              </div>

              {/* Question 2: Academic Background */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  2. 10+2 Educational Stream
                </label>
                <select
                  value={education}
                  onChange={(e) => {
                    setEducation(e.target.value);
                    setHasEvaluated(false);
                  }}
                  className="w-full h-11 px-3 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
                >
                  <option value="pcm">10+2 with Physics & Math (Eligible)</option>
                  <option value="appearing">Currently in 12th with Physics & Math</option>
                  <option value="non-pcm">10+2 Arts / Commerce / Biology (Need NIOS)</option>
                  <option value="diploma">3-Year Polytechnic Diploma</option>
                </select>
              </div>

              {/* Question 3: Medical Fitness */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  3. Medical & Vision Status
                </label>
                <select
                  value={medical}
                  onChange={(e) => {
                    setMedical(e.target.value);
                    setHasEvaluated(false);
                  }}
                  className="w-full h-11 px-3 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
                >
                  <option value="fit">Physically Fit & Normal Vision (Glasses Allowed)</option>
                  <option value="wearing-glasses">Wear Corrective Spectacles / Lenses</option>
                  <option value="not-tested">Never had an Aviation Medical Test</option>
                  <option value="unfit">Known Color Blindness or Major Heart Issue</option>
                </select>
              </div>
            </div>

            <div className="text-center pt-2">
              <button
                type="submit"
                className="bg-slate-900 hover:bg-sky-600 text-white font-bold py-3 px-8 rounded-xl text-xs sm:text-sm shadow-md transition-all duration-200 inline-flex items-center gap-2"
              >
                <span>Check My Pilot Qualification</span>
                <ArrowRight className="w-4 h-4 text-sky-400" />
              </button>
            </div>

            {/* Evaluation Result Feedback */}
            {hasEvaluated && (
              <div className={`p-6 rounded-2xl border transition-all animate-in fade-in-50 duration-300 ${
                isEligible 
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : 'bg-amber-50 border-amber-300 text-amber-950'
              }`}>
                <div className="flex items-start gap-4">
                  {isEligible ? (
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <HelpCircle className="w-8 h-8 text-amber-600 flex-shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <h4 className="text-base sm:text-lg font-bold mb-1">
                      {isEligible 
                        ? 'Congratulations! You are Eligible for CPL Pilot Training! ✈️'
                        : 'A Customized Pathway is Available for You! 📋'
                      }
                    </h4>
                    <p className="text-xs sm:text-sm leading-relaxed mb-4">
                      {isEligible 
                        ? 'You satisfy the basic DGCA academic requirements and age bracket to commence your Commercial Pilot License (CPL) training immediately.'
                        : education === 'non-pcm'
                        ? 'Students without Physics & Maths in 10+2 can easily clear the required subjects through the National Institute of Open Schooling (NIOS) On-Demand examination. We provide complete NIOS coaching and documentation support.'
                        : 'Contact our admissions team to understand your customized pathway and DGCA Class 2 medical appointment scheduling in Indore.'
                      }
                    </p>

                    <div className="flex flex-wrap gap-3">
                      <a
                        href="#contact"
                        className="bg-slate-900 text-white hover:bg-sky-600 text-xs font-bold px-5 py-2.5 rounded-xl shadow-sm transition-colors"
                      >
                        Book Personal Flight Assessment
                      </a>
                      <a
                        href="tel:+919506891936"
                        className="inline-flex items-center gap-1.5 bg-white text-slate-800 border border-slate-300 hover:bg-slate-100 text-xs font-bold px-4 py-2.5 rounded-xl"
                      >
                        <Phone className="w-3.5 h-3.5 text-sky-600" />
                        Call Counsellor: +91 9506891936
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default EligibilityChecker;

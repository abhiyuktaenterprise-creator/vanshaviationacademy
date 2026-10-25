import { useState } from 'react';
import { toast } from 'sonner';
import { 
  Send, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

export const LeadCaptureForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    course: 'Commercial Pilot License (CPL)',
    qualification: '10+2 with PCM',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim()) {
      toast.error('Please enter your full name and contact phone number.');
      return;
    }

    if (formData.phone.length < 10) {
      toast.error('Please enter a valid 10-digit mobile number.');
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setIsSubmitting(false);
    setIsSubmitted(true);

    toast.success('Inquiry Submitted! 🎉', {
      description: 'Our senior flight counsellor will contact you within 24 hours.'
    });

    const waText = encodeURIComponent(
      `Hello Vansh Aviation Academy! I have submitted an inquiry for ${formData.course}. My Name: ${formData.fullName}, Phone: ${formData.phone}.`
    );
    window.open(`https://wa.me/919506891936?text=${waText}`, '_blank');
  };

  return (
    <section id="contact" className="py-20 bg-slate-50 relative">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 bg-sky-50 text-sky-800 border border-sky-200/80 px-3.5 py-1 rounded-full text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>Admissions & Campus Office</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Connect With Flight Counsellors
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            Have questions about CPL course fees, DGCA medical examinations, or batch schedules? 
            Fill out the form below or reach our Vijay Nagar Indore campus directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Campus Info Card */}
          <div className="lg:col-span-5 bg-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col justify-between border border-slate-800">
            <div>
              <div className="inline-block bg-sky-500/20 text-sky-400 font-bold text-xs px-3 py-1.5 rounded-full mb-6 border border-sky-500/30 uppercase tracking-wide">
                Indore Flight Campus
              </div>

              <h3 className="text-2xl font-black mb-3 text-white">
                Vansh Aviation Academy
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-8">
                Central India's premier DGCA pilot training institute. Visit our academy for 
                1-on-1 counseling with certified flight instructors.
              </p>

              <div className="space-y-4">
                {/* Address */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60">
                  <MapPin className="w-5 h-5 text-sky-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-[11px] font-bold text-slate-400 uppercase">Campus Location</div>
                    <div className="text-sm font-medium text-white leading-snug mt-0.5">
                      2nd floor Ideal techno building behind konark hotel PU4 Vijay Nagar, Indore, Madhya Pradesh - 452010
                    </div>
                    <a
                      href="https://maps.google.com/?q=PU4+Vijay+Nagar+Indore"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-sky-400 hover:underline mt-1 font-semibold"
                    >
                      <span>Open in Google Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60">
                  <Phone className="w-5 h-5 text-sky-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-[11px] font-bold text-slate-400 uppercase">Admissions Helpline</div>
                    <a 
                      href="tel:+919506891936" 
                      className="text-base font-bold text-white hover:text-sky-400 transition-colors mt-0.5 block"
                    >
                      +91 9506891936
                    </a>
                    <span className="text-xs text-slate-400">Available Mon - Sat (9:00 AM - 6:30 PM)</span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60">
                  <Mail className="w-5 h-5 text-sky-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-[11px] font-bold text-slate-400 uppercase">Official Inquiries</div>
                    <a 
                      href="mailto:aviationacademyvansh@gmail.com" 
                      className="text-sm font-semibold text-white hover:text-sky-400 transition-colors mt-0.5 block break-all"
                    >
                      aviationacademyvansh@gmail.com
                    </a>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60">
                  <Clock className="w-5 h-5 text-sky-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-[11px] font-bold text-slate-400 uppercase">Academy Hours</div>
                    <div className="text-sm font-medium text-white mt-0.5">
                      Monday to Saturday: 9:00 AM – 6:30 PM
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800 text-xs text-slate-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>DGCA Regulated Organization • License Verified</span>
            </div>
          </div>

          {/* Right Column: Lead Capture Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              Request Admission & Syllabus Pack
            </h3>
            <p className="text-sm text-slate-600 mb-6">
              Complete this form to receive detailed pilot training syllabus, fee schedules, and next batch timings.
            </p>

            {isSubmitted ? (
              <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-emerald-950">Thank You, {formData.fullName}!</h4>
                <p className="text-sm text-emerald-800 max-w-md mx-auto">
                  Your inquiry has been logged. Our chief flight counselor will reach you at <strong>{formData.phone}</strong> shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="text-xs font-bold text-emerald-800 underline hover:text-emerald-950"
                >
                  Submit another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full h-11 px-4 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Mobile / WhatsApp Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9876543210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full h-11 px-4 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. rahul@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full h-11 px-4 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Interested Course Program
                    </label>
                    <select
                      value={formData.course}
                      onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                      className="w-full h-11 px-3 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
                    >
                      <option value="Commercial Pilot License (CPL)">Commercial Pilot License (CPL)</option>
                      <option value="Private Pilot License (PPL)">Private Pilot License (PPL)</option>
                      <option value="DGCA Ground School Theory">DGCA Aviation Ground School</option>
                      <option value="Flight Simulator & RTR(A)">Flight Simulator & RTR(A)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Highest Education
                    </label>
                    <select
                      value={formData.qualification}
                      onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                      className="w-full h-11 px-3 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
                    >
                      <option value="10+2 with PCM">10+2 (Passed with Physics & Math)</option>
                      <option value="10+2 Appearing">10+2 (Currently Appearing)</option>
                      <option value="Graduate / Engineering">Graduate / Engineering</option>
                      <option value="Non-PCM (Need NIOS)">Non-PCM (Require NIOS assistance)</option>
                      <option value="10th Standard">10th Standard (Planning ahead)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Questions or Specific Objectives
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your flight goals, medical status, or preferred batch start..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-3.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-slate-900 hover:bg-sky-600 text-white font-extrabold py-3.5 px-6 rounded-xl text-xs sm:text-sm shadow-md transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Submitting Application...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-sky-400" />
                      <span>Submit Application & Get Callback</span>
                    </>
                  )}
                </button>

                <p className="text-[11px] text-center text-slate-500 pt-1">
                  🔒 Your contact information is kept strictly confidential and used solely for aviation career counselling.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadCaptureForm;

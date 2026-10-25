import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText } from 'lucide-react';

const TermsOfService = () => {
  useEffect(() => {
    document.title = 'Terms of Service | Vansh Aviation Academy Indore';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-aviation-navy hover:text-aviation-gold font-semibold text-sm mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-aviation-navy text-aviation-gold flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-aviation-navy">Terms of Service</h1>
              <p className="text-xs text-muted-foreground mt-0.5">Last updated: December 2024 • Vansh Aviation Academy Indore</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-slate-200">
          <div className="space-y-8 text-sm text-slate-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-aviation-navy mb-3">1. Aviation Training Services</h2>
              <p className="mb-3">
                Vansh Aviation Academy provides DGCA-approved pilot training services including:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-slate-600">
                <li>Commercial Pilot License (CPL) training in Indore, Madhya Pradesh</li>
                <li>Private Pilot License (PPL) courses with certified flight instructors</li>
                <li>Aviation Ground School programs covering all DGCA syllabus</li>
                <li>Flight training using modern aircraft fleet (Cessna 152/172)</li>
                <li>Aviation career guidance and job placement assistance</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-aviation-navy mb-3">2. Enrollment Requirements</h2>
              <p className="mb-3">
                To enroll in our pilot training programs, students must:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-slate-600">
                <li>Meet DGCA eligibility criteria (age, education, medical fitness)</li>
                <li>Complete medical examination by DGCA-approved medical examiner</li>
                <li>Provide required documentation and certificates</li>
                <li>Pay applicable fees for aviation training courses</li>
                <li>Comply with all safety regulations and flight training protocols</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-aviation-navy mb-3">3. Training Standards</h2>
              <p className="mb-3">
                Our aviation training adheres to:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-slate-600">
                <li>DGCA (Directorate General of Civil Aviation) regulations and standards</li>
                <li>International aviation safety protocols and procedures</li>
                <li>Professional flight training methodologies</li>
                <li>Regular progress assessments and skill evaluations</li>
                <li>Continuous improvement of training curriculum</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-aviation-navy mb-3">4. Safety and Liability</h2>
              <p className="mb-3">
                Flight training involves inherent risks. Students acknowledge that:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-slate-600">
                <li>All aviation activities carry certain risks despite safety measures</li>
                <li>Students must follow all safety instructions and protocols</li>
                <li>Comprehensive insurance coverage is maintained for training aircraft</li>
                <li>Medical fitness is required throughout the training period</li>
                <li>Students participate at their own risk with proper safety precautions</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-aviation-navy mb-3">5. Refund and Cancellation Policy</h2>
              <p className="mb-3">
                Our policy for aviation training courses:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-slate-600">
                <li>Refunds are subject to DGCA regulations and academy policies</li>
                <li>Weather-related flight cancellations will be rescheduled</li>
                <li>Students may request course transfers under specific conditions</li>
                <li>Medical withdrawals require proper documentation</li>
                <li>Contact our admissions office for specific refund inquiries</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-aviation-navy mb-3">6. Contact Information</h2>
              <p className="mb-4">
                For questions about these Terms of Service or our pilot training programs:
              </p>
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-1 text-xs">
                <p className="text-aviation-navy font-bold text-sm">Vansh Aviation Academy</p>
                <p className="text-slate-600">2nd floor Ideal techno building behind konark hotel PU4 Vijay Nagar, Indore (M.P.)</p>
                <p className="text-slate-600">Phone: +91 9506891936</p>
                <p className="text-slate-600">Email: aviationacademyvansh@gmail.com</p>
                <p className="text-slate-600">Website: vanshaviationacademy.com</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;

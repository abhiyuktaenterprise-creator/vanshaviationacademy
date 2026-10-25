import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';

const PrivacyPolicy = () => {
  useEffect(() => {
    document.title = 'Privacy Policy | Vansh Aviation Academy Indore';
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
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-aviation-navy">Privacy Policy</h1>
              <p className="text-xs text-muted-foreground mt-0.5">Last updated: December 2024 • Vansh Aviation Academy Indore</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-slate-200">
          <div className="space-y-8 text-sm text-slate-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-aviation-navy mb-3">1. Information We Collect</h2>
              <p className="mb-3">
                At Vansh Aviation Academy, we collect information that you provide directly to us when you:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-slate-600">
                <li>Inquire about our pilot training programs (CPL, PPL, Ground School)</li>
                <li>Contact us via phone (+91 9506891936) or email (aviationacademyvansh@gmail.com)</li>
                <li>Visit our facility in Indore, Madhya Pradesh</li>
                <li>Subscribe to our aviation training updates</li>
                <li>Apply for DGCA-approved courses</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-aviation-navy mb-3">2. How We Use Your Information</h2>
              <p className="mb-3">
                We use the information we collect for aviation training purposes including:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-slate-600">
                <li>Providing information about pilot training courses in Indore</li>
                <li>Processing applications for commercial pilot license (CPL) training</li>
                <li>Scheduling flight training sessions and ground school classes</li>
                <li>Communicating about DGCA certification requirements</li>
                <li>Sending updates about aviation industry developments</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-aviation-navy mb-3">3. Information Sharing</h2>
              <p className="mb-3">
                We may share your information with:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-slate-600">
                <li>DGCA (Directorate General of Civil Aviation) for certification purposes</li>
                <li>Certified flight instructors for training coordination</li>
                <li>Aviation medical examiners for medical certification</li>
                <li>Partner airlines for job placement assistance</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-aviation-navy mb-3">4. Data Security</h2>
              <p>
                We implement appropriate security measures to protect your personal information against 
                unauthorized access, alteration, disclosure, or destruction. All pilot training records 
                are maintained according to DGCA regulations and aviation industry standards.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-aviation-navy mb-3">5. Contact Information</h2>
              <p className="mb-4">
                For questions about this Privacy Policy or our aviation training programs, contact us:
              </p>
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-1 text-xs">
                <p className="text-aviation-navy font-bold text-sm">Vansh Aviation Academy</p>
                <p className="text-slate-600">2nd floor Ideal techno building behind konark hotel PU4 Vijay Nagar, Indore (M.P.)</p>
                <p className="text-slate-600">Phone: +91 9506891936</p>
                <p className="text-slate-600">Email: aviationacademyvansh@gmail.com</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

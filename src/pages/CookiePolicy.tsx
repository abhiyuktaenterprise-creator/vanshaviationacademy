import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Cookie } from 'lucide-react';

const CookiePolicy = () => {
  useEffect(() => {
    document.title = 'Cookie Policy | Vansh Aviation Academy Indore';
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
              <Cookie className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-aviation-navy">Cookie Policy</h1>
              <p className="text-xs text-muted-foreground mt-0.5">Last updated: December 2024 • Vansh Aviation Academy Indore</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-slate-200">
          <div className="space-y-8 text-sm text-slate-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-aviation-navy mb-3">1. What Are Cookies</h2>
              <p>
                Cookies are small text files that are placed on your device when you visit our aviation 
                academy website. They help us provide better user experience for prospective pilots 
                interested in our DGCA-approved training programs in Indore, Madhya Pradesh.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-aviation-navy mb-4">2. Types of Cookies We Use</h2>
              
              <div className="mb-4">
                <h3 className="text-base font-semibold text-slate-900 mb-1">Essential Cookies</h3>
                <p className="mb-2">
                  These cookies are necessary for our aviation training website to function properly:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-slate-600">
                  <li>Session management for pilot training inquiries</li>
                  <li>Security features for contact form submissions and certificate verification</li>
                  <li>Basic website functionality and navigation</li>
                </ul>
              </div>

              <div className="mb-4">
                <h3 className="text-base font-semibold text-slate-900 mb-1">Analytics Cookies</h3>
                <p className="mb-2">
                  We use analytics cookies to understand how visitors interact with our aviation academy website:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-slate-600">
                  <li>Track interest in CPL and PPL training programs</li>
                  <li>Measure effectiveness of aviation career information</li>
                  <li>Analyze user behavior to improve pilot training content</li>
                  <li>Monitor website performance and loading speeds</li>
                </ul>
              </div>

              <div>
                <h3 className="text-base font-semibold text-slate-900 mb-1">Marketing Cookies</h3>
                <p className="mb-2">
                  These cookies help us show relevant aviation training information:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-slate-600">
                  <li>Display relevant pilot training course advertisements</li>
                  <li>Track conversion from aviation career interest to enrollment</li>
                  <li>Personalize content based on flight training interests</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-aviation-navy mb-3">3. Managing Cookies</h2>
              <p className="mb-2">
                You can control cookies through your browser settings:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-slate-600">
                <li>Block all cookies (may affect website functionality)</li>
                <li>Accept only essential cookies for basic navigation</li>
                <li>Delete existing cookies from our aviation academy website</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-aviation-navy mb-3">4. Contact Information</h2>
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

export default CookiePolicy;

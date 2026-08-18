import { ArrowLeft } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-sky">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <a href="/" className="inline-flex items-center text-aviation-navy hover:text-aviation-gold mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </a>
          <h1 className="text-4xl font-bold text-aviation-navy mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: December 2024</p>
        </div>

        {/* Content */}
        <div className="bg-white/80 rounded-lg p-8 shadow-aviation max-w-4xl mx-auto">
          <div className="prose prose-aviation max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-aviation-navy mb-4">1. Information We Collect</h2>
              <p className="text-muted-foreground mb-4">
                At Vansh Aviation Academy, we collect information that you provide directly to us when you:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Inquire about our pilot training programs (CPL, PPL, Ground School)</li>
                <li>Contact us via phone (+91 9506891936) or email (aviationacademyvansh@gmail.com)</li>
                <li>Visit our facility in Indore, Madhya Pradesh</li>
                <li>Subscribe to our aviation training updates</li>
                <li>Apply for DGCA-approved courses</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-aviation-navy mb-4">2. How We Use Your Information</h2>
              <p className="text-muted-foreground mb-4">
                We use the information we collect for aviation training purposes including:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Providing information about pilot training courses in Indore</li>
                <li>Processing applications for commercial pilot license (CPL) training</li>
                <li>Scheduling flight training sessions and ground school classes</li>
                <li>Communicating about DGCA certification requirements</li>
                <li>Sending updates about aviation industry developments</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-aviation-navy mb-4">3. Information Sharing</h2>
              <p className="text-muted-foreground mb-4">
                We may share your information with:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>DGCA (Directorate General of Civil Aviation) for certification purposes</li>
                <li>Certified flight instructors for training coordination</li>
                <li>Aviation medical examiners for medical certification</li>
                <li>Partner airlines for job placement assistance</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-aviation-navy mb-4">4. Data Security</h2>
              <p className="text-muted-foreground">
                We implement appropriate security measures to protect your personal information against 
                unauthorized access, alteration, disclosure, or destruction. All pilot training records 
                are maintained according to DGCA regulations and aviation industry standards.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-aviation-navy mb-4">5. Contact Information</h2>
              <p className="text-muted-foreground mb-4">
                For questions about this Privacy Policy or our aviation training programs, contact us:
              </p>
              <div className="bg-aviation-sky/10 p-4 rounded-lg">
                <p className="text-aviation-navy font-semibold">Vansh Aviation Academy</p>
                <p className="text-muted-foreground">2nd floor Ideal techno building behind konark hotel PU4 Vijay Nagar Indore</p>
                <p className="text-muted-foreground">Phone: +91 9506891936</p>
                <p className="text-muted-foreground">Email: aviationacademyvansh@gmail.com</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
import { ArrowLeft } from 'lucide-react';

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-sky">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <a href="/" className="inline-flex items-center text-aviation-navy hover:text-aviation-gold mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </a>
          <h1 className="text-4xl font-bold text-aviation-navy mb-4">Cookie Policy</h1>
          <p className="text-muted-foreground">Last updated: December 2024</p>
        </div>

        {/* Content */}
        <div className="bg-white/80 rounded-lg p-8 shadow-aviation max-w-4xl mx-auto">
          <div className="prose prose-aviation max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-aviation-navy mb-4">1. What Are Cookies</h2>
              <p className="text-muted-foreground mb-4">
                Cookies are small text files that are placed on your device when you visit our aviation 
                academy website. They help us provide better user experience for prospective pilots 
                interested in our DGCA-approved training programs in Indore, Madhya Pradesh.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-aviation-navy mb-4">2. Types of Cookies We Use</h2>
              
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-aviation-navy mb-3">Essential Cookies</h3>
                <p className="text-muted-foreground mb-3">
                  These cookies are necessary for our aviation training website to function properly:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Session management for pilot training inquiries</li>
                  <li>Security features for contact form submissions</li>
                  <li>Basic website functionality and navigation</li>
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-aviation-navy mb-3">Analytics Cookies</h3>
                <p className="text-muted-foreground mb-3">
                  We use analytics cookies to understand how visitors interact with our aviation academy website:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Track interest in CPL and PPL training programs</li>
                  <li>Measure effectiveness of aviation career information</li>
                  <li>Analyze user behavior to improve pilot training content</li>
                  <li>Monitor website performance and loading speeds</li>
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-aviation-navy mb-3">Marketing Cookies</h3>
                <p className="text-muted-foreground mb-3">
                  These cookies help us show relevant aviation training information:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Display relevant pilot training course advertisements</li>
                  <li>Track conversion from aviation career interest to enrollment</li>
                  <li>Personalize content based on flight training interests</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-aviation-navy mb-4">3. How We Use Cookies</h2>
              <p className="text-muted-foreground mb-4">
                We use cookies to enhance your experience on our aviation training website:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Remember your preferences for pilot training information</li>
                <li>Provide relevant content about DGCA-approved courses</li>
                <li>Analyze interest in commercial and private pilot licenses</li>
                <li>Improve our aviation academy website functionality</li>
                <li>Track inquiries about flight training programs in Indore</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-aviation-navy mb-4">4. Managing Cookies</h2>
              <p className="text-muted-foreground mb-4">
                You can control cookies through your browser settings:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Block all cookies (may affect website functionality)</li>
                <li>Accept only essential cookies for basic navigation</li>
                <li>Delete existing cookies from our aviation academy website</li>
                <li>Set preferences for future cookie usage</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                Note: Disabling cookies may limit your ability to access certain features of our 
                pilot training information and course inquiry forms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-aviation-navy mb-4">5. Third-Party Cookies</h2>
              <p className="text-muted-foreground mb-4">
                We may use third-party services that place cookies on your device:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Google Analytics for website traffic analysis</li>
                <li>Social media platforms for sharing aviation content</li>
                <li>Marketing platforms for aviation training advertisements</li>
                <li>Map services for locating our Indore training facility</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-aviation-navy mb-4">6. Contact Us</h2>
              <p className="text-muted-foreground mb-4">
                If you have questions about our Cookie Policy or aviation training programs:
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

export default CookiePolicy;
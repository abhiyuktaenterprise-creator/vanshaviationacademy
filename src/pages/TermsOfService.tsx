import { ArrowLeft } from 'lucide-react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-sky">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <a href="/" className="inline-flex items-center text-aviation-navy hover:text-aviation-gold mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </a>
          <h1 className="text-4xl font-bold text-aviation-navy mb-4">Terms of Service</h1>
          <p className="text-muted-foreground">Last updated: December 2024</p>
        </div>

        {/* Content */}
        <div className="bg-white/80 rounded-lg p-8 shadow-aviation max-w-4xl mx-auto">
          <div className="prose prose-aviation max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-aviation-navy mb-4">1. Aviation Training Services</h2>
              <p className="text-muted-foreground mb-4">
                Vansh Aviation Academy provides DGCA-approved pilot training services including:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Commercial Pilot License (CPL) training in Indore, Madhya Pradesh</li>
                <li>Private Pilot License (PPL) courses with certified flight instructors</li>
                <li>Aviation Ground School programs covering all DGCA syllabus</li>
                <li>Flight training using modern aircraft fleet (Cessna 152/172)</li>
                <li>Aviation career guidance and job placement assistance</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-aviation-navy mb-4">2. Enrollment Requirements</h2>
              <p className="text-muted-foreground mb-4">
                To enroll in our pilot training programs, students must:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Meet DGCA eligibility criteria (age, education, medical fitness)</li>
                <li>Complete medical examination by DGCA-approved medical examiner</li>
                <li>Provide required documentation and certificates</li>
                <li>Pay applicable fees for aviation training courses</li>
                <li>Comply with all safety regulations and flight training protocols</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-aviation-navy mb-4">3. Training Standards</h2>
              <p className="text-muted-foreground mb-4">
                Our aviation training adheres to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>DGCA (Directorate General of Civil Aviation) regulations and standards</li>
                <li>International aviation safety protocols and procedures</li>
                <li>Professional flight training methodologies</li>
                <li>Regular progress assessments and skill evaluations</li>
                <li>Continuous improvement of training curriculum</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-aviation-navy mb-4">4. Safety and Liability</h2>
              <p className="text-muted-foreground mb-4">
                Flight training involves inherent risks. Students acknowledge that:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>All aviation activities carry certain risks despite safety measures</li>
                <li>Students must follow all safety instructions and protocols</li>
                <li>Comprehensive insurance coverage is maintained for training aircraft</li>
                <li>Medical fitness is required throughout the training period</li>
                <li>Students participate at their own risk with proper safety precautions</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-aviation-navy mb-4">5. Refund and Cancellation Policy</h2>
              <p className="text-muted-foreground mb-4">
                Our policy for aviation training courses:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Refunds are subject to DGCA regulations and academy policies</li>
                <li>Weather-related flight cancellations will be rescheduled</li>
                <li>Students may request course transfers under specific conditions</li>
                <li>Medical withdrawals require proper documentation</li>
                <li>Contact our admissions office for specific refund inquiries</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-aviation-navy mb-4">6. Contact Information</h2>
              <p className="text-muted-foreground mb-4">
                For questions about these Terms of Service or our pilot training programs:
              </p>
              <div className="bg-aviation-sky/10 p-4 rounded-lg">
                <p className="text-aviation-navy font-semibold">Vansh Aviation Academy</p>
                <p className="text-muted-foreground">2nd floor Ideal techno building behind konark hotel PU4 Vijay Nagar Indore</p>
                <p className="text-muted-foreground">Phone: +91 9506891936</p>
                <p className="text-muted-foreground">Email: aviationacademyvansh@gmail.com</p>
                <p className="text-muted-foreground">Website: vanshaviationacademy.com</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
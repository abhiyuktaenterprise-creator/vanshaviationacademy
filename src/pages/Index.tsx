import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';
import CoursesSection from '@/components/CoursesSection';
import VerifyBanner from '@/components/VerifyBanner';
import WhyChooseUs from '@/components/WhyChooseUs';
import FacilitiesSection from '@/components/FacilitiesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import FAQSection from '@/components/FAQSection';
import LeadCaptureForm from '@/components/LeadCaptureForm';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';

const Index = () => {
  useEffect(() => {
    // Dynamic document title for homepage
    document.title = 'Vansh Aviation Academy Indore | DGCA Approved Pilot Training | CPL PPL Courses';
  }, []);

  return (
    <div className="min-h-screen bg-white selection:bg-aviation-gold selection:text-aviation-navy flex flex-col font-sans antialiased text-slate-800">
      {/* Global Navigation Header */}
      <Navbar />

      {/* Main Page Landmark */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero />

        {/* About Academy Section */}
        <AboutSection />

        {/* Flight Courses & Training Programs */}
        <CoursesSection />

        {/* Dedicated 24/7 Certificate Verification Banner */}
        <VerifyBanner />

        {/* Why Choose Us Feature Matrix */}
        <WhyChooseUs />

        {/* Training Facilities & Fleet */}
        <FacilitiesSection />

        {/* Cadets Testimonials & Placements */}
        <TestimonialsSection />

        {/* Interactive FAQ Accordion */}
        <FAQSection />

        {/* Admissions Lead Capture Form & Campus Location */}
        <LeadCaptureForm />
      </main>

      {/* Comprehensive Footer */}
      <Footer />

      {/* Floating Quick Action Triggers */}
      <FloatingActions />
    </div>
  );
};

export default Index;

import { Link } from 'react-router-dom';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { HelpCircle, ShieldCheck, ArrowRight, Phone } from 'lucide-react';

export const FAQSection = () => {
  const faqs = [
    {
      id: 'item-1',
      question: 'What are the DGCA eligibility criteria for Commercial Pilot License (CPL) training?',
      answer: 'Candidates must be at least 17 years old to enroll (18 years for license issue), have completed 10+2 with Physics and Mathematics (or equivalent from NIOS), and obtain a Class 1 Medical clearance from a DGCA-empanelled medical center. Prior flying experience is not required.'
    },
    {
      id: 'item-2',
      question: 'How can airlines, recruiters, and students verify certificates issued by the academy?',
      answer: 'All course completion certificates and flight training transcripts issued by Vansh Aviation Academy can be verified 24/7 through our official online verification portal at /verify. Recruiters and students simply enter the student\'s unique Registration Number or Application Number to view and print the official authenticated credential.'
    },
    {
      id: 'item-3',
      question: 'How long does it take to complete pilot training at Vansh Aviation Academy?',
      answer: 'Private Pilot License (PPL) typically takes 3 to 6 months. Commercial Pilot License (CPL) with Multi-Engine rating takes 12 to 18 months, covering 200 flying hours and DGCA theoretical exams, depending on candidate progress and weather conditions.'
    },
    {
      id: 'item-4',
      question: 'What is the cost of pilot training and are education loans available?',
      answer: 'Pilot training expenses depend on aircraft fleet hours, simulator sessions, and multi-engine ratings. We provide transparent fee structures with zero hidden fees, flexible stage-wise installment schedules, and official admission documentation to support student education loan applications through leading nationalized and private banks.'
    },
    {
      id: 'item-5',
      question: 'Can students from Arts or Commerce (Non-Science) backgrounds become commercial pilots?',
      answer: 'Yes! Students who did not study Physics and Mathematics in 10+2 can enroll in the National Institute of Open Schooling (NIOS) On-Demand examination for Physics and Maths. Vansh Aviation Academy provides complete guidance, study material, and examination scheduling for non-science students.'
    },
    {
      id: 'item-6',
      question: 'Do you provide airline job placement assistance and interview preparation?',
      answer: 'Yes. We prepare our cadets not just for license issuance, but for real airline cockpits. Our program includes airline psychometric screening practice, Compass test preparation, Group Discussion coaching, simulator assessment briefings, and direct interview placement drives with leading domestic airlines.'
    },
    {
      id: 'item-7',
      question: 'What is the difference between DGCA Class 2 and Class 1 medicals?',
      answer: 'Class 2 Medical is the preliminary medical examination conducted by DGCA-approved medical doctors before commencing flying. Class 1 Medical is the advanced commercial standard conducted at designated Indian Air Force (IAF) medical centers, required for the commercial license. We guide all enrolled students through the appointment and verification process.'
    }
  ];

  return (
    <section id="faq" className="py-20 bg-white relative">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 bg-sky-50 text-sky-800 border border-sky-200/80 px-3.5 py-1 rounded-full text-xs font-semibold mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-sky-600" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            Essential information regarding pilot eligibility, DGCA certification, 
            certificate verification, and career pathways.
          </p>
        </div>

        {/* Accordion FAQ Box */}
        <div className="bg-slate-50/80 rounded-2xl border border-slate-200 p-4 sm:p-8 shadow-sm">
          <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id} className="border-b border-slate-200 last:border-none">
                <AccordionTrigger className="text-left font-bold text-slate-900 text-xs sm:text-sm md:text-base hover:text-sky-600 py-4 sm:py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 text-xs sm:text-sm leading-relaxed pb-5">
                  {faq.answer}
                  {faq.id === 'item-2' && (
                    <div className="mt-3">
                      <Link
                        to="/verify"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-700 bg-sky-100 hover:bg-sky-200 px-3.5 py-1.5 rounded-full transition-colors border border-sky-300"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
                        <span>Go to Online Verification Portal</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Bottom Help Callout */}
        <div className="mt-8 p-6 rounded-2xl bg-sky-50/70 border border-sky-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <div className="font-bold text-slate-900 text-sm">
              Still have specific questions about your pilot career?
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              Speak directly with our chief flight counselor at our Vijay Nagar, Indore campus.
            </div>
          </div>
          <a
            href="tel:+919506891936"
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-sky-600 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-sm transition-colors whitespace-nowrap"
          >
            <Phone className="w-3.5 h-3.5 text-sky-400" />
            <span>Call: +91 9506891936</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;

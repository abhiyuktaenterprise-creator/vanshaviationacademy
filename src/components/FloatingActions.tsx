import { Phone, MessageCircle } from 'lucide-react';

export const FloatingActions = () => {
  const whatsappUrl = `https://wa.me/919506891936?text=${encodeURIComponent(
    'Hello Vansh Aviation Academy, I would like to inquire about Commercial Pilot License (CPL) and Ground School courses.'
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 print:hidden">
      {/* WhatsApp Quick Chat Floating Pill */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Vansh Aviation Academy on WhatsApp"
        className="group flex items-center gap-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-4 rounded-full shadow-2xl hover:scale-105 transition-all duration-300 border-2 border-white/20"
      >
        <MessageCircle className="w-6 h-6 fill-white text-emerald-500" />
        <span className="text-xs tracking-wide hidden sm:inline-block pr-1 font-extrabold">
          Chat on WhatsApp
        </span>
      </a>

      {/* Floating Quick Call Button for Mobile */}
      <a
        href="tel:+919506891936"
        aria-label="Call Vansh Aviation Academy"
        className="sm:hidden flex items-center justify-center w-12 h-12 bg-aviation-navy text-aviation-gold rounded-full shadow-2xl border-2 border-white/20 hover:scale-105 transition-all"
      >
        <Phone className="w-5 h-5" />
      </a>
    </div>
  );
};

export default FloatingActions;

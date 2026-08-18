import { MapPin, Phone, Mail, User } from 'lucide-react';

const ContactInfo = () => {
  const contactDetails = [
    {
      icon: MapPin,
      label: "Address",
      value: "2nd floor Ideal techno building behind konark hotel PU4 Vijay Nagar Indore"
    },
    {
      icon: Phone,
      label: "Contact",
      value: "+91 9506891936"
    },
    {
      icon: Mail,
      label: "Email",
      value: "aviationacademyvansh@gmail.com"
    }
  ];

  return (
    <div className="bg-card rounded-lg shadow-aviation p-6 md:p-8 border border-border">
      <h3 className="text-2xl font-bold text-aviation-navy mb-6 text-center">Contact Information</h3>
      <div className="space-y-4">
        {contactDetails.map((detail, index) => {
          const IconComponent = detail.icon;
          return (
            <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-aviation-sky/30 border border-aviation-sky">
              <IconComponent className="w-5 h-5 text-aviation-gold mt-1 flex-shrink-0" />
              <div className="flex-1">
                <div className="font-semibold text-aviation-navy text-sm mb-1">{detail.label}</div>
                <div className="text-foreground">
                  {detail.label === "Email" ? (
                    <a 
                      href={`mailto:${detail.value}`}
                      className="text-aviation-gold hover:text-aviation-navy transition-colors duration-200"
                    >
                      {detail.value}
                    </a>
                  ) : detail.label === "Contact" || detail.label === "Mobile" ? (
                    <a 
                      href={`tel:${detail.value}`}
                      className="text-aviation-gold hover:text-aviation-navy transition-colors duration-200"
                    >
                      {detail.value}
                    </a>
                  ) : (
                    <span>{detail.value}</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContactInfo;
# Google Analytics & Search Console Setup Guide
## Vansh Aviation Academy - Complete Implementation

## 1. Google Analytics 4 (GA4) Setup

### Step 1: Create Google Analytics Account
1. Go to [analytics.google.com](https://analytics.google.com)
2. Click "Start measuring"
3. Create Account: "Vansh Aviation Academy"
4. Property Name: "Vansh Aviation Academy Website"
5. Select India as country
6. Select "Education" as industry category

### Step 2: Install GA4 Tracking Code
Add this code to your website's `<head>` section in `index.html`:

```html
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  // Basic tracking
  gtag('config', 'G-XXXXXXXXXX', {
    // Enhanced tracking for aviation academy
    custom_map: {
      'custom_parameter_1': 'course_interest',
      'custom_parameter_2': 'student_location'
    }
  });

  // Enhanced E-commerce for course inquiries
  gtag('config', 'G-XXXXXXXXXX', {
    enhanced_conversions: true,
    send_page_view: true
  });
</script>

<!-- Custom Event Tracking for Aviation Academy -->
<script>
// Track course interest interactions
function trackCourseInterest(courseName) {
  gtag('event', 'course_interest', {
    'event_category': 'Aviation Training',
    'event_label': courseName,
    'value': 1
  });
}

// Track contact form submissions
function trackContactSubmission(formType) {
  gtag('event', 'contact_form_submit', {
    'event_category': 'Lead Generation',
    'event_label': formType,
    'value': 1
  });
}

// Track phone number clicks
function trackPhoneCall() {
  gtag('event', 'phone_call', {
    'event_category': 'Contact',
    'event_label': '+91-9506891936',
    'value': 1
  });
}

// Track brochure downloads
function trackBrochureDownload() {
  gtag('event', 'brochure_download', {
    'event_category': 'Content Engagement',
    'event_label': 'Aviation Course Brochure',
    'value': 1
  });
}

// Track scroll depth for engagement
function trackScrollDepth(percentage) {
  gtag('event', 'scroll', {
    'event_category': 'Engagement',
    'event_label': percentage + '%',
    'value': percentage
  });
}
</script>
```

### Step 3: Enhanced Event Tracking Implementation
Add these event listeners to your React components:

```jsx
// In your main Index.tsx component
import { useEffect } from 'react';

const Index = () => {
  useEffect(() => {
    // Track page views
    if (typeof gtag !== 'undefined') {
      gtag('event', 'page_view', {
        page_title: 'Vansh Aviation Academy - DGCA Approved Pilot Training',
        page_location: window.location.href
      });
    }

    // Track scroll depth
    let scrollDepth = 0;
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = Math.round((winScroll / height) * 100);
      
      if (scrolled > scrollDepth + 25) { // Track every 25%
        scrollDepth = Math.floor(scrolled / 25) * 25;
        if (typeof trackScrollDepth !== 'undefined') {
          trackScrollDepth(scrollDepth);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Rest of your component...
};

// Enhanced CTA buttons with tracking
const TrackableCTAButton = ({ courseName, children, ...props }) => {
  const handleClick = () => {
    if (typeof trackCourseInterest !== 'undefined') {
      trackCourseInterest(courseName);
    }
  };

  return (
    <button onClick={handleClick} {...props}>
      {children}
    </button>
  );
};

// Phone number with click tracking
const TrackablePhoneLink = () => {
  const handlePhoneClick = () => {
    if (typeof trackPhoneCall !== 'undefined') {
      trackPhoneCall();
    }
  };

  return (
    <a 
      href="tel:+919506891936" 
      onClick={handlePhoneClick}
      className="text-aviation-gold hover:text-aviation-navy"
    >
      +91 9506891936
    </a>
  );
};
```

## 2. Google Search Console Setup

### Step 1: Property Verification
1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add property: `https://vanshaviationacademy.com`
3. Choose "URL prefix" method
4. Add HTML meta tag to your `index.html`:

```html
<meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />
```

### Step 2: Submit Sitemap
1. In Search Console, go to "Sitemaps"
2. Submit: `https://vanshaviationacademy.com/sitemap.xml`
3. Submit additional sitemaps (if created later):
   - `/blog-sitemap.xml`
   - `/images-sitemap.xml`

### Step 3: Enhanced Rich Results Setup
Add this structured data to your homepage for better search appearance:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "EducationalOrganization",
      "@id": "https://vanshaviationacademy.com/#organization",
      "name": "Vansh Aviation Academy",
      "alternateName": "Vansh Aviation Academy Indore",
      "url": "https://vanshaviationacademy.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://vanshaviationacademy.com/vanshaviation-logo.png",
        "width": 200,
        "height": 200
      },
      "description": "DGCA approved aviation training academy in Indore offering Commercial Pilot License (CPL), Private Pilot License (PPL) and ground school programs",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "2nd floor Ideal techno building behind konark hotel PU4 Vijay Nagar",
        "addressLocality": "Indore",
        "addressRegion": "Madhya Pradesh",
        "postalCode": "452010",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 22.7196,
        "longitude": 75.8577
      },
      "telephone": "+91-9506891936",
      "email": "aviationacademyvansh@gmail.com",
      "sameAs": [
        "https://www.facebook.com/vanshaviationacademy",
        "https://www.instagram.com/vanshaviationacademy"
      ],
      "foundingDate": "2019",
      "hasCredential": {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "DGCA Approved Training Organization"
      }
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://vanshaviationacademy.com/#localbusiness",
      "name": "Vansh Aviation Academy",
      "image": "https://vanshaviationacademy.com/vanshaviation-logo.png",
      "priceRange": "₹₹₹",
      "telephone": "+91-9506891936",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "2nd floor Ideal techno building behind konark hotel PU4 Vijay Nagar",
        "addressLocality": "Indore",
        "addressRegion": "MP",
        "postalCode": "452010",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 22.7196,
        "longitude": 75.8577
      },
      "openingHours": "Mo,Tu,We,Th,Fr,Sa 09:00-18:00",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "47"
      }
    },
    {
      "@type": "Course",
      "@id": "https://vanshaviationacademy.com/#cpl-course",
      "name": "Commercial Pilot License (CPL) Training",
      "description": "DGCA approved commercial pilot license training program in Indore with experienced flight instructors and modern aircraft",
      "provider": {
        "@id": "https://vanshaviationacademy.com/#organization"
      },
      "courseCode": "CPL-2024",
      "hasCourseInstance": {
        "@type": "CourseInstance",
        "courseMode": "In-person",
        "location": {
          "@type": "Place",
          "name": "Vansh Aviation Academy",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Indore",
            "addressRegion": "Madhya Pradesh",
            "addressCountry": "IN"
          }
        }
      }
    },
    {
      "@type": "Course",  
      "@id": "https://vanshaviationacademy.com/#ppl-course",
      "name": "Private Pilot License (PPL) Training",
      "description": "DGCA approved private pilot license training for recreational and career-building flight training",
      "provider": {
        "@id": "https://vanshaviationacademy.com/#organization"
      },
      "courseCode": "PPL-2024"
    }
  ]
}
</script>
```

## 3. Conversion Tracking Setup

### Step 1: Google Ads Conversion Tracking (Future Implementation)
```html
<!-- Google Ads Conversion Tracking -->
<script>
// Lead form conversion
function trackLeadConversion() {
  gtag('event', 'conversion', {
    'send_to': 'AW-XXXXXXXXX/XXXXXXXXX',
    'value': 1000.0,
    'currency': 'INR'
  });
}

// Phone call conversion
function trackPhoneConversion() {
  gtag('event', 'conversion', {
    'send_to': 'AW-XXXXXXXXX/XXXXXXXXX',
    'value': 1500.0,
    'currency': 'INR'
  });
}

// Course inquiry conversion
function trackCourseInquiryConversion(courseType) {
  let conversionValue = courseType === 'CPL' ? 2000 : 1500;
  
  gtag('event', 'conversion', {
    'send_to': 'AW-XXXXXXXXX/XXXXXXXXX',
    'value': conversionValue,
    'currency': 'INR'
  });
}
</script>
```

### Step 2: Facebook Pixel Setup (Optional)
```html
<!-- Facebook Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');

fbq('init', 'YOUR_PIXEL_ID');
fbq('track', 'PageView');

// Aviation-specific events
function trackCourseInterestFB(courseName) {
  fbq('track', 'Lead', {
    content_name: courseName,
    content_category: 'Aviation Training',
    value: 1500,
    currency: 'INR'
  });
}

function trackContactFormFB() {
  fbq('track', 'SubmitApplication', {
    content_name: 'Contact Form',
    value: 1000,
    currency: 'INR'
  });
}
</script>
```

## 4. Performance Monitoring

### Page Speed Monitoring
```html
<!-- Core Web Vitals monitoring -->
<script>
// Monitor Core Web Vitals
function sendToGoogleAnalytics({name, delta, value, id}) {
  gtag('event', name, {
    event_category: 'Web Vitals',
    event_label: id,
    value: Math.round(name === 'CLS' ? delta * 1000 : delta),
    non_interaction: true,
  });
}

// Load web vitals library
import {getCLS, getFID, getFCP, getLCP, getTTFB} from 'web-vitals';

getCLS(sendToGoogleAnalytics);
getFID(sendToGoogleAnalytics);
getFCP(sendToGoogleAnalytics);
getLCP(sendToGoogleAnalytics);
getTTFB(sendToGoogleAnalytics);
</script>
```

### User Behavior Tracking
```javascript
// Advanced user interaction tracking for aviation academy
class AviationWebsiteAnalytics {
  constructor() {
    this.sessionStart = Date.now();
    this.pageViews = [];
    this.interactions = [];
    this.courseInterests = [];
  }

  // Track course-specific interactions
  trackCourseInterest(courseType, section) {
    const event = {
      type: 'course_interest',
      course: courseType,
      section: section,
      timestamp: Date.now(),
      sessionTime: Date.now() - this.sessionStart
    };
    
    this.courseInterests.push(event);
    
    // Send to Google Analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'course_interest_detailed', {
        'event_category': 'Aviation Training',
        'event_label': `${courseType} - ${section}`,
        'custom_parameter_1': courseType,
        'custom_parameter_2': section
      });
    }
  }

  // Track user journey through aviation content
  trackUserJourney(action, details) {
    const journeyEvent = {
      action: action,
      details: details,
      timestamp: Date.now(),
      url: window.location.href,
      sessionTime: Date.now() - this.sessionStart
    };

    this.interactions.push(journeyEvent);

    // Send significant journey points to GA
    if (['contacted', 'downloaded_brochure', 'watched_video', 'read_testimonial'].includes(action)) {
      if (typeof gtag !== 'undefined') {
        gtag('event', 'user_journey', {
          'event_category': 'Student Journey',
          'event_label': action,
          'value': Math.round((Date.now() - this.sessionStart) / 1000)
        });
      }
    }
  }

  // Track engagement quality for aviation content
  trackEngagementQuality() {
    const engagementScore = this.calculateEngagementScore();
    
    if (typeof gtag !== 'undefined') {
      gtag('event', 'engagement_quality', {
        'event_category': 'User Engagement',
        'event_label': this.getEngagementLabel(engagementScore),
        'value': engagementScore
      });
    }
  }

  calculateEngagementScore() {
    let score = 0;
    
    // Time on site (max 30 points)
    const timeOnSite = (Date.now() - this.sessionStart) / 1000;
    score += Math.min(timeOnSite / 60 * 10, 30); // 10 points per minute, max 30
    
    // Course interests (20 points each, max 40)
    score += Math.min(this.courseInterests.length * 20, 40);
    
    // User interactions (5 points each, max 30)  
    score += Math.min(this.interactions.length * 5, 30);
    
    return Math.round(score);
  }

  getEngagementLabel(score) {
    if (score >= 80) return 'Highly Interested';
    if (score >= 50) return 'Moderately Interested';
    if (score >= 20) return 'Browsing';
    return 'Low Engagement';
  }
}

// Initialize analytics
const aviationAnalytics = new AviationWebsiteAnalytics();

// Export for use in components
window.aviationAnalytics = aviationAnalytics;
```

## 5. Implementation Checklist

### Week 1: Basic Setup
- [ ] Create Google Analytics 4 property
- [ ] Install GA4 tracking code
- [ ] Verify Google Search Console
- [ ] Submit sitemap to Search Console
- [ ] Add structured data markup

### Week 2: Enhanced Tracking
- [ ] Implement custom event tracking
- [ ] Set up conversion goals
- [ ] Configure enhanced e-commerce
- [ ] Test all tracking implementations

### Week 3: Advanced Features  
- [ ] Set up custom dimensions and metrics
- [ ] Create audience segments for aviation interests
- [ ] Configure automated reports
- [ ] Set up real-time alerts

### Week 4: Optimization
- [ ] Analyze initial data
- [ ] Optimize tracking based on user behavior
- [ ] Set up A/B testing framework
- [ ] Create custom dashboards

## 6. Key Metrics to Monitor

### Traffic Metrics
- **Organic Search Traffic**: Target 500+ monthly visitors
- **Direct Traffic**: Measure brand awareness
- **Referral Traffic**: Track partnership effectiveness
- **Social Traffic**: Monitor social media performance

### Aviation-Specific Metrics
- **Course Page Views**: CPL vs PPL interest ratio
- **Training Program Engagement**: Time spent on course descriptions
- **Facility Information Views**: Interest in training infrastructure
- **Testimonial Engagement**: Social proof effectiveness

### Conversion Metrics
- **Contact Form Submissions**: Primary lead generation
- **Phone Call Conversions**: Direct inquiry tracking
- **Brochure Downloads**: Interest qualification
- **Course Inquiry Rate**: Conversion efficiency

### Local SEO Metrics
- **Local Search Visibility**: "pilot training Indore" rankings
- **Google My Business Insights**: Local discovery
- **Direction Requests**: Physical location interest
- **Local Review Generation**: Reputation management

This comprehensive setup will provide detailed insights into user behavior, course interests, and conversion optimization opportunities specific to aviation training in India.
export interface Service {
  slug: string;
  title: string;
  h1: string;
  shortDescription: string;
  description: string;
  icon: string;
  heroImage: string;
  metaTitle: string;
  metaDescription: string;
  keywords?: string[];
  serviceType?: string;
  offers?: string[];
  expandedContent?: { heading: string; body: string }[];
  deliverables: string[];
  process: { step: string; title: string; description: string }[];
  faqs: { question: string; answer: string }[];
  portfolioCategory: string;
}

export const services: Service[] = [
  {
    slug: "wedding-photography-peshawar",
    title: "Wedding Photography",
    h1: "Wedding Photography Services in Peshawar",
    shortDescription:
      "Capturing your most cherished moments with cinematic elegance and timeless artistry.",
    description:
      "At Adi Photography, we specialize in capturing the beauty, emotion, and grandeur of weddings across Peshawar and Pakistan. From intimate nikah ceremonies to lavish valima receptions, our team delivers stunning imagery that tells your unique love story. Every frame is composed with cinematic precision, ensuring your wedding album becomes a treasured heirloom.",
    icon: "wedding",
    heroImage: "/images/services/wedding-hero.jpg",
    metaTitle:
      "Wedding Photography in Peshawar | Adi Photography Peshawar",
    metaDescription:
      "Premium wedding photography services in Peshawar. Cinematic coverage of nikah, mehndi, baraat & valima ceremonies. Book Adi Photography for your special day.",
    deliverables: [
      "Full-day coverage (8-12 hours)",
      "Two professional photographers",
      "500+ edited high-resolution images",
      "Online gallery with download access",
      "Cinematic highlight reel (3-5 minutes)",
      "Premium photo album (30 pages)",
      "Pre-wedding consultation",
      "Same-day photo preview",
    ],
    process: [
      {
        step: "01",
        title: "Consultation",
        description:
          "We meet to understand your vision, discuss the timeline, venue details, and specific moments you want captured.",
      },
      {
        step: "02",
        title: "The Shoot",
        description:
          "Our team arrives early to scout locations and lighting. We capture every emotion, from candid moments to formal portraits.",
      },
      {
        step: "03",
        title: "Delivery",
        description:
          "Within 2-3 weeks, receive your professionally edited gallery and cinematic highlight video via private online gallery.",
      },
    ],
    faqs: [
      {
        question: "How far in advance should I book wedding photography in Peshawar?",
        answer:
          "We recommend booking 3-6 months in advance, especially for peak wedding season (October-March). Popular dates fill up quickly, so early booking ensures availability.",
      },
      {
        question: "Do you cover all wedding events (mehndi, baraat, valima)?",
        answer:
          "Yes, we offer comprehensive packages covering all events including mehndi, baraat, nikah, and valima. We also offer individual event coverage if you prefer.",
      },
      {
        question: "What is included in your wedding photography package?",
        answer:
          "Our standard package includes full-day coverage, two photographers, 500+ edited images, an online gallery, a cinematic highlight reel, and a premium photo album.",
      },
      {
        question: "Can you travel outside Peshawar for weddings?",
        answer:
          "Absolutely! We cover weddings throughout Pakistan including Islamabad, Lahore, and Karachi. Travel and accommodation for destination weddings are quoted separately.",
      },
      {
        question: "How long does it take to receive the final photos?",
        answer:
          "You'll receive a same-day preview of select images. The full edited gallery is delivered within 2-3 weeks, and the premium album within 4-6 weeks after the event.",
      },
    ],
    portfolioCategory: "weddings",
  },
  {
    slug: "corporate-photography-peshawar",
    title: "Corporate Photography",
    h1: "Corporate Photography Services in Peshawar",
    shortDescription:
      "Professional imagery that elevates your brand and captures your corporate story.",
    description:
      "Adi Photography delivers polished corporate photography services in Peshawar for businesses of all sizes. From executive headshots and team photos to product launches and annual reports, we create professional imagery that strengthens your brand identity and communicates your company's values with visual impact.",
    icon: "corporate",
    heroImage: "/images/services/corporate-hero.jpg",
    metaTitle:
      "Corporate Photography in Peshawar | Adi Photography Peshawar",
    metaDescription:
      "Professional corporate photography in Peshawar. Executive headshots, team photos, product shoots & event coverage. Elevate your brand with Adi Photography.",
    deliverables: [
      "Professional headshots for team members",
      "Office and workspace photography",
      "Product photography",
      "Corporate event coverage",
      "Brand lifestyle imagery",
      "High-resolution files for print and web",
      "Quick turnaround (5-7 business days)",
      "Usage rights for marketing materials",
    ],
    process: [
      {
        step: "01",
        title: "Briefing",
        description:
          "We review your brand guidelines, discuss the visual direction, and plan the shot list to align with your marketing goals.",
      },
      {
        step: "02",
        title: "The Shoot",
        description:
          "Our team sets up professional lighting at your office or preferred location. We work efficiently to minimize disruption to your team.",
      },
      {
        step: "03",
        title: "Delivery",
        description:
          "Receive your professionally retouched images within 5-7 business days, optimized for both digital and print use.",
      },
    ],
    faqs: [
      {
        question: "Do you shoot corporate photography at our office in Peshawar?",
        answer:
          "Yes, we come to your office with all necessary equipment including professional lighting. We can also arrange studio sessions if preferred.",
      },
      {
        question: "How many headshots can you shoot in one session?",
        answer:
          "In a typical half-day session, we can photograph 15-20 team members. Full-day sessions accommodate larger teams of 30-40 people.",
      },
      {
        question: "Do you provide images for social media use?",
        answer:
          "Yes, all images are delivered in multiple formats optimized for LinkedIn, websites, email signatures, and print materials.",
      },
      {
        question: "What should our team wear for corporate headshots?",
        answer:
          "We provide a pre-shoot style guide. Generally, solid colors work best. Avoid busy patterns and logos. We recommend bringing 2-3 outfit options.",
      },
      {
        question: "Can you photograph our corporate event or conference?",
        answer:
          "Absolutely. We cover corporate events, seminars, product launches, and conferences with both candid and formal photography styles.",
      },
    ],
    portfolioCategory: "corporate",
  },
  {
    slug: "videography-peshawar",
    title: "Videography",
    h1: "Professional Videography Services in Peshawar",
    shortDescription:
      "Cinematic video production that brings your vision to life with stunning motion imagery.",
    description:
      "From wedding films to commercial productions, Adi Photography's videography team in Peshawar creates compelling visual stories. Using cinema-grade equipment and professional editing, we deliver videos that captivate audiences and communicate your message with emotional impact and visual sophistication.",
    icon: "videography",
    heroImage: "/images/services/videography-hero.jpg",
    metaTitle:
      "Professional Videography Services in Peshawar",
    metaDescription:
      "Cinematic videography services in Peshawar. Wedding films, commercials, corporate videos & promotional content. Professional video production by Adi Photography.",
    keywords: [
      "videography Peshawar",
      "video production Peshawar",
      "wedding videography Peshawar",
      "corporate video Peshawar",
      "cinematic video production",
      "Adi Photography videography",
      "professional videographer Peshawar",
      "commercial video production Pakistan",
    ],
    serviceType: "Videography",
    offers: [
      "Wedding Videography",
      "Corporate Video Production",
      "Commercial Video Production",
      "Event Videography",
    ],
    expandedContent: [
      {
        heading: "Why Choose Adi Photography for Videography in Peshawar?",
        body: "With over 8 years of experience in video production across Peshawar and Pakistan, Adi Photography has earned a reputation for delivering cinematic-quality videos that captivate audiences. Our videography team combines technical expertise with creative storytelling, using cinema-grade equipment including Sony FX6, Canon C70, professional gimbals, motorized sliders, and wireless audio systems. Every project receives the same level of dedication — whether it's a wedding highlight reel or a full commercial production for a national brand. What sets us apart is our end-to-end production capability. From initial concept development and storyboarding through to post-production color grading and sound design, we handle every stage in-house. This ensures consistency, quality control, and faster turnaround times compared to agencies that outsource their editing. Our clients across Peshawar, Islamabad, and Lahore trust us because we consistently deliver videos that exceed expectations.",
      },
      {
        heading: "Types of Videography We Offer",
        body: "Our videography services in Peshawar span a wide range of production types. For weddings, we create cinematic highlight reels (3-5 minutes) and full documentary edits (20-30 minutes) that preserve every precious moment of your celebration — from mehndi and baraat to nikah and valima. Our corporate video production covers brand films, company profiles, product demos, training videos, and executive interviews that strengthen your business identity. We also specialize in commercial video production for advertising campaigns, social media content, and promotional videos. Our drone-integrated videography adds breathtaking aerial perspectives to real estate tours, event coverage, and tourism projects. For musicians and artists, we produce music videos with creative direction and professional post-production. Whatever your video production needs in Peshawar, our team has the skills and equipment to bring your vision to life.",
      },
    ],
    deliverables: [
      "4K cinematic video capture",
      "Professional audio recording",
      "Color grading and post-production",
      "Highlight reel (3-5 minutes)",
      "Full-length documentary edit",
      "Licensed background music",
      "Multiple format delivery (social, web, broadcast)",
      "Raw footage available on request",
    ],
    process: [
      {
        step: "01",
        title: "Pre-Production",
        description:
          "We develop the creative concept, storyboard key sequences, and plan the shoot logistics including locations and equipment.",
      },
      {
        step: "02",
        title: "Production",
        description:
          "Our crew captures footage using cinema-grade cameras, stabilizers, and professional audio equipment for broadcast-quality results.",
      },
      {
        step: "03",
        title: "Post-Production",
        description:
          "Our editors craft your story with professional color grading, sound design, and motion graphics. Delivery within 3-4 weeks.",
      },
    ],
    faqs: [
      {
        question: "What equipment do you use for videography?",
        answer:
          "We use cinema-grade cameras (Sony FX6, Canon C70), professional gimbals, sliders, and wireless audio systems for broadcast-quality production.",
      },
      {
        question: "How long is the typical wedding film?",
        answer:
          "We deliver a 3-5 minute cinematic highlight reel plus a 20-30 minute documentary edit covering all key moments of your wedding.",
      },
      {
        question: "Can you produce commercial videos for our business?",
        answer:
          "Yes, we produce brand films, product videos, testimonial videos, and social media content tailored to your marketing objectives.",
      },
      {
        question: "Do you provide licensed music for the videos?",
        answer:
          "Yes, all our videos include professionally licensed music that's cleared for personal and commercial use as applicable.",
      },
      {
        question: "What is the turnaround time for video projects?",
        answer:
          "Highlight reels are typically delivered within 2 weeks. Full documentary edits and commercial projects take 3-4 weeks depending on complexity.",
      },
    ],
    portfolioCategory: "videography",
  },
  {
    slug: "drone-videography-peshawar",
    title: "Drone Videography",
    h1: "Drone Videography & Aerial Photography in Peshawar",
    shortDescription:
      "Breathtaking aerial perspectives that add a cinematic dimension to your project.",
    description:
      "Adi Photography offers professional drone videography and aerial photography services in Peshawar. Our licensed drone pilots capture stunning bird's-eye views of venues, events, properties, and landscapes. From wedding aerials to real estate tours, our drone footage adds a premium cinematic dimension that ground-level cameras simply cannot achieve.",
    icon: "drone",
    heroImage: "/images/services/drone-hero.jpg",
    metaTitle:
      "Drone Videography in Peshawar | Aerial Photography | Adi Photography",
    metaDescription:
      "Professional drone videography & aerial photography in Peshawar. Stunning 4K aerial shots for weddings, real estate, events & commercial projects. Licensed pilots.",
    deliverables: [
      "4K aerial video footage",
      "High-resolution aerial photography",
      "Licensed and insured drone operations",
      "Cinematic aerial highlight reel",
      "360-degree panoramic shots",
      "Real estate aerial tours",
      "Color-graded final delivery",
      "Quick same-day preview available",
    ],
    process: [
      {
        step: "01",
        title: "Planning",
        description:
          "We survey the location, check airspace regulations, plan flight paths, and coordinate with venue management for safe operations.",
      },
      {
        step: "02",
        title: "Aerial Capture",
        description:
          "Our licensed pilots fly professional-grade drones to capture cinematic aerial footage and high-resolution photography from optimal angles.",
      },
      {
        step: "03",
        title: "Editing & Delivery",
        description:
          "Footage is professionally color-graded and edited. Aerial content is delivered as standalone or integrated with ground-level footage.",
      },
    ],
    faqs: [
      {
        question: "Is drone photography legal in Peshawar?",
        answer:
          "Yes, our team operates with all required permissions and follows Pakistan Civil Aviation Authority (PCAA) regulations. We handle all necessary clearances.",
      },
      {
        question: "What drone do you use for aerial photography?",
        answer:
          "We primarily use the DJI Inspire 3 and Mavic 3 Pro for commercial aerial work, offering 5.1K video and 20MP+ photography capabilities.",
      },
      {
        question: "Can you add drone footage to our wedding package?",
        answer:
          "Absolutely! Drone coverage is a popular add-on for weddings. It captures stunning aerial views of the venue and grand entrance sequences.",
      },
      {
        question: "What happens if weather conditions are poor on the day?",
        answer:
          "Safety is our priority. If weather conditions are unsuitable, we reschedule the drone portion at no additional cost. We always have a backup plan.",
      },
      {
        question: "How high and far can your drones fly?",
        answer:
          "Our drones can operate up to 120 meters altitude as per PCAA regulations, with a range of up to 8km, covering even the largest venues and landscapes.",
      },
    ],
    portfolioCategory: "drone",
  },
  {
    slug: "event-photography-peshawar",
    title: "Event Photography",
    h1: "Event Photography Services in Peshawar",
    shortDescription:
      "Complete event coverage that captures every moment, emotion, and detail.",
    description:
      "Whether it's a corporate gala, private celebration, or community event in Peshawar, Adi Photography delivers comprehensive event coverage. Our experienced team works discreetly to capture candid moments, group photographs, and event highlights that tell the complete story of your occasion.",
    icon: "event",
    heroImage: "/images/services/event-hero.jpg",
    metaTitle:
      "Event Photography in Peshawar | Adi Photography Peshawar",
    metaDescription:
      "Professional event photography in Peshawar. Complete coverage for corporate events, celebrations, seminars & private functions. Book Adi Photography today.",
    deliverables: [
      "Full event coverage (arrival to conclusion)",
      "Candid and posed photography",
      "Group and individual portraits",
      "Venue and décor documentation",
      "300+ edited high-resolution images",
      "Online gallery within 7 days",
      "Social media-ready previews within 24 hours",
      "Print-ready files included",
    ],
    process: [
      {
        step: "01",
        title: "Event Briefing",
        description:
          "We discuss the event schedule, key moments to capture, VIP attendees, and any specific requirements or brand guidelines to follow.",
      },
      {
        step: "02",
        title: "Event Coverage",
        description:
          "Our team arrives early to capture venue setup and covers the entire event, blending candid photojournalism with formal group shots.",
      },
      {
        step: "03",
        title: "Post-Event Delivery",
        description:
          "Social media previews within 24 hours. Full edited gallery delivered via online platform within 5-7 days of the event.",
      },
    ],
    faqs: [
      {
        question: "How many photographers do you send for events?",
        answer:
          "Depending on event size, we typically assign 1-3 photographers. Large-scale events with 300+ guests may require additional coverage.",
      },
      {
        question: "Can you provide same-day photos for social media?",
        answer:
          "Yes! We offer a same-day edit service where 10-15 select images are edited and delivered within hours for immediate social media posting.",
      },
      {
        question: "Do you cover outdoor events in Peshawar?",
        answer:
          "Absolutely. We cover both indoor and outdoor events across Peshawar and surrounding areas, with equipment suited for any lighting condition.",
      },
      {
        question: "What types of events do you photograph?",
        answer:
          "We cover corporate events, product launches, seminars, birthday parties, engagement parties, charity galas, university events, and more.",
      },
      {
        question: "Can we get a photo booth at our event?",
        answer:
          "Yes, we offer photo booth services as an add-on with custom backdrops, instant prints, and digital sharing options for your guests.",
      },
    ],
    portfolioCategory: "events",
  },
  {
    slug: "fashion-photography-peshawar",
    title: "Fashion Photography",
    h1: "Fashion Photography Services in Peshawar",
    shortDescription:
      "Editorial and commercial fashion photography that makes your brand stand out.",
    description:
      "Adi Photography brings high-fashion editorial quality to Peshawar. Whether you're a clothing brand, boutique, or designer, our fashion photography services deliver striking visuals for lookbooks, campaigns, e-commerce, and social media. We combine creative direction, professional styling coordination, and expert post-production to create images that sell.",
    icon: "fashion",
    heroImage: "/images/services/fashion-hero.jpg",
    metaTitle:
      "Fashion Photography in Peshawar | Adi Photography Peshawar",
    metaDescription:
      "High-end fashion photography in Peshawar. Lookbooks, campaigns, e-commerce & editorial shoots. Professional fashion photographer for brands and designers.",
    deliverables: [
      "Creative direction and mood boarding",
      "Professional studio or on-location shooting",
      "Model coordination assistance",
      "60+ retouched images per collection",
      "E-commerce white background edits",
      "Social media content package",
      "High-resolution files for print",
      "Web-optimized images for online stores",
    ],
    process: [
      {
        step: "01",
        title: "Creative Direction",
        description:
          "We develop mood boards, plan the visual narrative, coordinate styling, and select locations that align with your brand aesthetic.",
      },
      {
        step: "02",
        title: "The Shoot",
        description:
          "Professional studio or on-location session with expert lighting, direction, and multiple outfit/look changes for maximum variety.",
      },
      {
        step: "03",
        title: "Retouching & Delivery",
        description:
          "Images undergo professional retouching including skin smoothing, color correction, and background cleanup. Delivered within 10-14 days.",
      },
    ],
    faqs: [
      {
        question: "Do you have a studio for fashion shoots in Peshawar?",
        answer:
          "Yes, we have access to a fully equipped studio in Peshawar with professional lighting, backdrops, and changing areas. We also shoot on location.",
      },
      {
        question: "Can you help with styling and model coordination?",
        answer:
          "We offer styling consultation and can recommend professional models and makeup artists from our network of collaborators in Peshawar.",
      },
      {
        question: "What is the cost of a fashion photography session?",
        answer:
          "Pricing depends on the scope — number of looks, location requirements, and deliverables. Contact us for a custom quote tailored to your project.",
      },
      {
        question: "Do you shoot for e-commerce / online stores?",
        answer:
          "Yes, we offer dedicated e-commerce photography with clean white backgrounds, ghost mannequin work, and lifestyle product imagery.",
      },
      {
        question: "How many outfits/looks can be shot in one session?",
        answer:
          "A full-day fashion shoot typically covers 8-12 complete looks. Half-day sessions accommodate 4-6 looks depending on complexity.",
      },
    ],
    portfolioCategory: "fashion",
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return services.map((s) => s.slug);
}

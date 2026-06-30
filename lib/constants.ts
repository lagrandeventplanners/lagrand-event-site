// ── Analytics & Verification (replace placeholders after account creation) ──
export const GOOGLE_TAG_MANAGER_ID = "GTM-M262KTS9";
export const GOOGLE_SEARCH_CONSOLE_ID = ""; // Replace after: search.google.com/search-console
export const GOOGLE_ANALYTICS_ID = "G-8VSR4SC199";

// ── Company Details ──
export const COMPANY_NAME = "La Grandè Events";
export const COMPANY_TAGLINE = "Eventing Future";
export const COMPANY_PHONE = "+91 9989838909";
export const COMPANY_PHONE_2 = "+91 9392015353";
export const COMPANY_EMAIL = "hello@lagrandeevents.in";
export const COMPANY_WHATSAPP = "919989838909";
export const COMPANY_ADDRESS = "Hyderabad, Telangana, India";
export const COMPANY_AREA = "Hyderabad";
export const COMPANY_INSTAGRAM = "https://www.instagram.com/lagrande_events_planners/";
export const COMPANY_FACEBOOK = "https://www.facebook.com/profile.php?id=61558597568999";
export const COMPANY_YOUTUBE = "https://youtube.com/@lagrandeevents";
export const COMPANY_LINKEDIN = "https://linkedin.com/company/lagrandeevents";
export const GOOGLE_REVIEWS_LINK = "https://g.page/r/CYhyF3aG7xQeEAE/review";
export const SITE_URL = "https://www.lagrandeinc.com";
export const SITE_VERSION = "1.1.4";

export const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hello! I'd like to enquire about your event management services."
);
export const WHATSAPP_URL = `https://wa.me/${COMPANY_WHATSAPP}?text=${WHATSAPP_MESSAGE}`;

export const STATS = [
  { value: 1000, suffix: "+", label: "Delegates Managed" },
  { value: 50, suffix: "+", label: "Corporate Events" },
  { value: 3, suffix: "+", label: "Years of Excellence" },
  { value: 4.9, suffix: "", label: "Google Rating" },
];

export const EVENT_TYPES = [
  {
    icon: "🏢",
    title: "Corporate Events",
    sub: "Conferences, Annual Days, Team Outings, Award Nights",
    waText: "I'm interested in Corporate Event management.",
    image: "/images/corporate-events.png",
  },
  {
    icon: "💒",
    title: "Weddings & Sangeet",
    sub: "Mehendi, Sangeet, Wedding Ceremonies, Receptions",
    waText: "I'd like to know about Wedding Event management.",
    image: "/images/weddings.png",
  },
  {
    icon: "🚀",
    title: "Product Launches",
    sub: "Brand Activations, Launch Parties, Press Events",
    waText: "I'm planning a Product Launch event.",
    image: "/images/product-launch.png",
  },
  {
    icon: "🎂",
    title: "Social Celebrations",
    sub: "Birthday Parties, Anniversaries, Baby Showers",
    waText: "I'm planning a Social Celebration.",
    image: "/images/socail.jpg",
  },
  {
    icon: "🤝",
    title: "MICE & Offsites",
    sub: "Corporate Retreats, Incentive Trips, Conferences",
    waText: "I'm interested in MICE or Corporate Offsite planning.",
    image: "/images/mics.png",
  },
  {
    icon: "🎭",
    title: "Entertainment & Décor",
    sub: "Artist Booking, Themed Décor, Stage & AV Production",
    waText: "I need Entertainment & Décor services.",
    image: "/images/entertainment.png",
  },
];

export const PORTFOLIO_ITEMS = [
  {
    src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=720&q=85&auto=format&fit=crop",
    label: "Corporate Annual Day",
    type: "Tech MNC — 400 Guests",
    span: "col-span-2",
    aspect: "aspect-[2/1.2]",
  },
  {
    src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=800&q=85&auto=format&fit=crop",
    label: "Sangeet Night",
    type: "Banjara Hills",
    span: "col-span-1",
    aspect: "aspect-square",
  },
  {
    src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=800&q=85&auto=format&fit=crop",
    label: "Product Launch",
    type: "Pharmaceutical Brand",
    span: "col-span-1",
    aspect: "aspect-square",
  },
  {
    src: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&h=600&q=85&auto=format&fit=crop",
    label: "Gala Dinner",
    type: "200 Guests — Jubilee Hills",
    span: "col-span-2",
    aspect: "aspect-[2/1]",
  },
];

export const WHY_US = [
  {
    number: "01",
    icon: "MapPin",
    title: "Local Expertise",
    body: "Hyderabad-based, Hyderabad-focused. We know the venues, vendors, and vibe of this city like no one else.",
  },
  {
    number: "02",
    icon: "CheckCircle",
    title: "End-to-End Execution",
    body: "From concept to cleanup — we handle every detail so you don't have to worry about a single thing.",
  },
  {
    number: "03",
    icon: "Users",
    title: "Both Corporate & Personal",
    body: "Whether it's 500 employees or an intimate family ceremony, we bring the same level of care and craft to every event.",
  },
  {
    number: "04",
    icon: "Star",
    title: "Trusted by Hyderabad's Best",
    body: "Brands and families across the city have trusted us to deliver flawless experiences, time and time again.",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "They transformed our annual day into something our employees are still talking about months later. Absolutely seamless from start to finish.",
    name: "Rahul Sharma",
    eventType: "Corporate Annual Day — IT Sector",
    rating: 5,
  },
  {
    quote:
      "Our daughter's wedding was a dream. Every detail was perfect. We didn't have to worry about a single thing on the big day.",
    name: "Sunita Reddy",
    eventType: "Wedding Celebration — Jubilee Hills",
    rating: 5,
  },
  {
    quote:
      "The product launch exceeded all our expectations. Professional team, stunning setup, and absolutely zero hiccups.",
    name: "Priya Mehta",
    eventType: "Product Launch — Pharmaceutical Brand",
    rating: 5,
  },
];

export const FAQS = [
  {
    question: "What types of events do you manage?",
    answer:
      "We handle a wide range of events — corporate conferences, annual days, team outings, product launches, weddings, sangeet nights, birthday celebrations, anniversary parties, and more. If you're celebrating or connecting people, we can make it extraordinary.",
  },
  {
    question: "Do you serve clients outside Hyderabad?",
    answer:
      "Our core expertise is in Hyderabad and the surrounding region. For select projects, we also coordinate events in other cities — reach out to discuss your specific needs.",
  },
  {
    question: "How far in advance should I book?",
    answer:
      "For corporate events, we recommend at least 4–6 weeks. For weddings and large celebrations, 3–6 months in advance ensures the best vendor availability and venue options.",
  },
  {
    question: "Do you provide end-to-end services including décor, catering, and AV?",
    answer:
      "Yes. We offer complete event management — venue scouting, décor and theme design, catering coordination, AV and lighting, artist booking, photography, and on-ground execution. One team, zero gaps.",
  },
  {
    question: "What is your pricing model?",
    answer:
      "Every event is unique, so we provide customised quotes based on your requirements, guest count, and scope. Contact us for a free consultation and transparent pricing.",
  },
  {
    question: "Can you handle both small and large events?",
    answer:
      "Absolutely. We've managed intimate gatherings of 20 guests and large corporate events for 500+ attendees with the same level of care and attention to detail.",
  },
  {
    question: "Do I get a dedicated event manager?",
    answer:
      "Yes. Every client is assigned a dedicated event manager who is your single point of contact from planning to execution — someone who truly knows your event inside out.",
  },
  {
    question: "How do I get started?",
    answer:
      "Simply fill out our inquiry form or message us on WhatsApp. We'll schedule a free consultation call within 24 hours to understand your vision and get planning.",
  },
];

export const SERVICES = [
  {
    icon: "Briefcase",
    title: "Corporate Events",
    tagline: "Conferences, Team Outings, Annual Days & More",
    description:
      "We design and execute corporate events that go beyond the ordinary — events your team actually looks forward to. From all-hands conferences to awards galas, we handle venue, AV, décor, catering, and on-ground coordination end-to-end.",
    includes: [
      "Venue selection and booking",
      "Theme and décor design",
      "AV, lighting, and stage setup",
      "Catering coordination",
      "Artist and emcee booking",
      "On-ground event management team",
      "Post-event photography and highlights reel",
    ],
    bestFor: "20–500+ attendees | IT companies, startups, MNCs",
    waText: "I'd like to enquire about Corporate Event management.",
    img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=675&q=85&auto=format&fit=crop",
  },
  {
    icon: "Heart",
    title: "Weddings & Celebrations",
    tagline: "Mehendi, Sangeet, Wedding, Reception",
    description:
      "Your wedding is the most important event of your life. We treat it that way. Our wedding team brings cinematic décor, flawless coordination, and deep Hyderabad vendor relationships to create a celebration as unique as your love story.",
    includes: [
      "Complete wedding planning and management",
      "Mehendi, sangeet, and reception coordination",
      "Themed décor and floral design",
      "Mandap or stage design",
      "Catering, bar, and hospitality",
      "Photography and videography coordination",
      "Guest management and logistics",
    ],
    bestFor: "Intimate ceremonies to 1000+ guest celebrations",
    waText: "I'd like to enquire about Wedding Event management.",
    img: "/images/weddings.png",
  },
  {
    icon: "Rocket",
    title: "Product Launches",
    tagline: "Brand Activations, Launch Events, Press Conferences",
    description:
      "First impressions are everything. We design product launch events that generate buzz, impress media, and leave your audience excited about what you've built. End-to-end production from concept to coverage.",
    includes: [
      "Creative concept and theme development",
      "Venue sourcing and setup",
      "Media and press coordination support",
      "Stage, AV, and LED wall production",
      "Brand activation elements",
      "Live streaming setup (optional)",
      "Guest experience design",
    ],
    bestFor: "Startups, brands, pharmaceutical and tech companies",
    waText: "I'd like to plan a Product Launch event.",
    img: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&h=675&q=85&auto=format&fit=crop",
  },
  {
    icon: "PartyPopper",
    title: "Social Celebrations",
    tagline: "Birthdays, Anniversaries, Baby Showers & More",
    description:
      "Life's milestones deserve to be celebrated properly. Whether it's a milestone birthday, an anniversary surprise, or a baby shower — we bring warmth, creativity, and meticulous planning to every personal celebration.",
    includes: [
      "Event design and theme creation",
      "Venue booking and setup",
      "Décor, flowers, and styling",
      "Catering and cake coordination",
      "Entertainment and music",
      "Photography",
    ],
    bestFor: "Intimate to medium-scale personal events",
    waText: "I'm planning a Social Celebration.",
    img: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1200&h=675&q=85&auto=format&fit=crop",
  },
  {
    icon: "Map",
    title: "MICE & Corporate Offsites",
    tagline: "Corporate Retreats, Incentive Trips, Offsite Conferences",
    description:
      "When your team deserves a break that actually energizes them, we design offsite experiences that blend productivity with genuine fun. Complete logistics, accommodation, activities, and return — handled.",
    includes: [
      "Destination selection and hotel coordination",
      "Travel and logistics management",
      "Team-building activities design",
      "Conference and meeting setup",
      "Gala dinner and entertainment",
      "End-to-end on-ground coordination",
    ],
    bestFor: "Teams of 20–200+ across Hyderabad, South India, and beyond",
    waText: "I'm interested in MICE or Corporate Offsite planning.",
    img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&h=675&q=85&auto=format&fit=crop",
  },
  {
    icon: "Sparkles",
    title: "Décor, Entertainment & Production",
    tagline: "Themed Décor, Artist Booking, Stage & AV",
    description:
      "The details are what people remember. Our in-house creative team designs immersive environments — from floral installations to full themed sets — while our entertainment network brings emcees, live bands, DJs, and artists to elevate the experience.",
    includes: [
      "Themed décor concept and execution",
      "Floral and lighting design",
      "Stage design and fabrication",
      "AV, LED wall, sound system",
      "Emcee and anchor booking",
      "Live band, DJ, or artist coordination",
      "Photobooth and interactive elements",
    ],
    bestFor: "Add-on to any event type",
    waText: "I need Décor, Entertainment & Production services.",
    img: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=1200&h=675&q=85&auto=format&fit=crop",
  },
];

export const PROCESS_STEPS = [
  {
    step: "01",
    title: "Discovery Call",
    body: "Tell us your vision, date, and guest count. We'll ask the right questions to understand exactly what you need.",
  },
  {
    step: "02",
    title: "Concept & Quote",
    body: "We develop a tailored concept and transparent quote within 48 hours. No hidden costs, no surprises.",
  },
  {
    step: "03",
    title: "Planning & Design",
    body: "Your dedicated event manager handles all bookings, vendor coordination, and design approvals — keeping you informed at every stage.",
  },
  {
    step: "04",
    title: "On-Ground Execution",
    body: "Our team arrives hours before your event to set up perfectly. We manage every detail so you can be fully present for your moment.",
  },
  {
    step: "05",
    title: "Post-Event Wrap",
    body: "We handle cleanup, vendor settlements, and deliver your event photography within 48 hours.",
  },
];

export const VALUES = [
  {
    symbol: "✦",
    title: "Craft Over Chaos",
    body: "We obsess over details that others overlook — because the difference between good and extraordinary is in the small things.",
  },
  {
    symbol: "✦",
    title: "People First",
    body: "Every event exists to create a feeling for real people. We never lose sight of the human moment at the centre of every celebration.",
  },
  {
    symbol: "✦",
    title: "Hyderabad Proud",
    body: "We are deeply rooted in this city — its venues, vendors, culture, and energy. That local knowledge is our superpower.",
  },
];

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Our Work", href: "/our-work" },
  { label: "Contact", href: "/contact" },
];

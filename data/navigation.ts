export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}

export const mainNavLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Wedding Photography", href: "/services/wedding-photography-peshawar" },
      { label: "Corporate Photography", href: "/services/corporate-photography-peshawar" },
      { label: "Videography", href: "/services/videography-peshawar" },
      { label: "Drone Videography", href: "/services/drone-videography-peshawar" },
      { label: "Event Photography", href: "/services/event-photography-peshawar" },
      { label: "Fashion Photography", href: "/services/fashion-photography-peshawar" },
    ],
  },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const footerLinks = {
  services: [
    { label: "Wedding Photography", href: "/services/wedding-photography-peshawar" },
    { label: "Corporate Photography", href: "/services/corporate-photography-peshawar" },
    { label: "Videography", href: "/services/videography-peshawar" },
    { label: "Drone Videography", href: "/services/drone-videography-peshawar" },
    { label: "Event Photography", href: "/services/event-photography-peshawar" },
    { label: "Fashion Photography", href: "/services/fashion-photography-peshawar" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  locations: [
    { label: "Peshawar", href: "/" },
    { label: "Islamabad", href: "/locations/islamabad" },
    { label: "Lahore", href: "/locations/lahore" },
    { label: "Karachi", href: "/locations/karachi" },
  ],
};

export const socialLinks = [
  {
    label: "Instagram",
    href: "https://instagram.com/adiphotography",
    icon: "instagram",
  },
  {
    label: "Facebook",
    href: "https://facebook.com/adiphotography",
    icon: "facebook",
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@adiphotography",
    icon: "youtube",
  },
  {
    label: "TikTok",
    href: "https://tiktok.com/@adiphotography",
    icon: "tiktok",
  },
];

export const contactInfo = {
  phone: "+92 XXX XXXXXXX",
  email: "info@adiphotography.pk",
  address: "Peshawar, Khyber Pakhtunkhwa, Pakistan",
  whatsapp: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "92XXXXXXXXXX"}?text=${encodeURIComponent("Hi, I found you on adiphotography.pk and want to enquire about your services.")}`,
};

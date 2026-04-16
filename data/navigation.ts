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
  { label: "Areas", href: "/areas" },
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
    { label: "Areas", href: "/areas" },
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
    href: "https://www.instagram.com/adi.photographyandfilms/",
    icon: "instagram",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/adiPhotograpyandFilms",
    icon: "facebook",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/channel/UCrSrPfmYnFhh0c-Pckt5RtQ",
    icon: "youtube",
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@adi_photographyandfilms",
    icon: "tiktok",
  },
];

export const contactInfo = {
  phone: "+92 311 9512112",
  email: "info@adiphotography.pk",
  address: "UG-453 Deans Trade Center, Peshawar",
  whatsapp: "https://wa.me/923119512112",
};

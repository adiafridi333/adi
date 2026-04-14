export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  rating: number;
  avatar: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Ayesha & Bilal",
    role: "Wedding Clients",
    quote:
      "Adi Photography captured our wedding day with such artistry and emotion. Every photo tells a story, and we couldn't be more thrilled with the results. The team was professional, punctual, and made us feel completely at ease.",
    rating: 5,
    avatar: "/images/testimonials/client-1.jpg",
  },
  {
    name: "Faizan Malik",
    role: "CEO, Malik Enterprises",
    quote:
      "We hired Adi Photography for our corporate headshots and annual report. The quality was outstanding — clean, professional, and perfectly aligned with our brand. They've become our go-to photography partner.",
    rating: 5,
    avatar: "/images/testimonials/client-2.jpg",
  },
  {
    name: "Nadia Hussain",
    role: "Fashion Designer",
    quote:
      "Working with Adi Photography for my collection lookbook was a dream. Their creative direction and attention to detail elevated my designs. The final images exceeded all expectations.",
    rating: 5,
    avatar: "/images/testimonials/client-3.jpg",
  },
];

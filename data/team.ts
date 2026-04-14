export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  yearsExperience: number;
  image: string;
}

export const team: TeamMember[] = [
  {
    name: "Adi Khan",
    role: "Lead Photographer & Founder",
    bio: "With over 10 years of experience capturing weddings and events across Pakistan, Adi brings a cinematic eye and deep passion for storytelling to every project.",
    yearsExperience: 10,
    image: "/images/team/adi-khan.jpg",
  },
  {
    name: "Sara Ahmed",
    role: "Senior Photographer",
    bio: "Specializing in fashion and portrait photography, Sara's editorial style and creative vision have earned recognition from leading brands in Peshawar and beyond.",
    yearsExperience: 7,
    image: "/images/team/sara-ahmed.jpg",
  },
  {
    name: "Usman Ali",
    role: "Videographer & Drone Pilot",
    bio: "A licensed drone pilot and cinematic videographer, Usman delivers breathtaking aerial footage and compelling video stories for weddings and commercial clients.",
    yearsExperience: 5,
    image: "/images/team/usman-ali.jpg",
  },
];

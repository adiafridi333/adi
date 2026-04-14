export interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
}

const R2 = "https://pub-45c507c035214836bf31cb43c8f8946b.r2.dev";

export const team: TeamMember[] = [
  {
    name: "Adnan Afridi",
    role: "Director & Cinematographer",
    image: `${R2}/Adnan-Afridi.png`,
    bio: "Founder of Adi Photography & Films, passionate about crafting visual narratives that engage and inspire.",
  },
  {
    name: "Shahzad Ahmad",
    role: "Lead Photographer",
    image: `${R2}/Shahzad-Ahmad-20-Yers-expereince-Photographer.jpg`,
    bio: "Expert in wedding and event photography with a keen eye for capturing authentic moments.",
  },
  {
    name: "Muhammad Umair",
    role: "Videographer",
    image: `${R2}/umair.png`,
    bio: "Specializing in cinematic wedding films and commercial video production.",
  },
  {
    name: "Saba Shehzad",
    role: "Photographer",
    image: `${R2}/saba.jpg`,
    bio: "Creative professional with expertise in portrait, fashion, and editorial photography.",
  },
  {
    name: "Taimoor Ahmad",
    role: "Drone Operator & Editor",
    image: `${R2}/Taimoor-Ahmad.png`,
    bio: "Licensed drone pilot delivering breathtaking aerial footage and post-production editing.",
  },
  {
    name: "Ali Rehman",
    role: "Editor & Colorist",
    image: `${R2}/Ali-Rehman.png`,
    bio: "Post-production specialist handling color grading, editing, and final delivery.",
  },
];

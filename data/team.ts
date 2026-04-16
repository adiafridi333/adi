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
    role: "Photographer & Drone Operator",
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
    role: "Videographer & OB Operator",
    image: `${R2}/Taimoor-Ahmad.png`,
    bio: "Licensed drone pilot delivering breathtaking aerial footage and post-production editing.",
  },
  {
    name: "Ali Rehman",
    role: "Editor & Colorist",
    image: `${R2}/Ali-Rehman.png`,
    bio: "Post-production specialist handling color grading, editing, and final delivery.",
  },
  {
    name: "Khalid Khan",
    role: "Photographer",
    image: "https://pub-971a12e433134135b6dce1159d9d07e0.r2.dev/Adi/IMG_2072.JPG",
    bio: "Skilled photographer with a passion for capturing stunning portraits and event moments.",
  },
  {
    name: "Abbas Khan",
    role: "Videographer",
    image: `${R2}/Abbas-Khan.png`,
    bio: "Professional videographer specializing in cinematic event coverage and storytelling.",
  },
  {
    name: "Hoor Aqsa",
    role: "Photographer",
    image: "https://pub-971a12e433134135b6dce1159d9d07e0.r2.dev/Adi/hoor.jpg",
    bio: "Creative photographer delivering beautiful imagery for weddings, portraits, and fashion shoots.",
  },
];

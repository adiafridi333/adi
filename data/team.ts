export interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
}

const R2 = "https://pub-dc402653c79a48c997e65f9d97ae5138.r2.dev/team";

export const team: TeamMember[] = [
  {
    name: "Adnan Afridi",
    role: "Photographer & Drone Operator",
    image: `${R2}/mocnjhwj-kza5sm-adnan-afridi.png`,
    bio: "Founder of Adi Photography & Films, passionate about crafting visual narratives that engage and inspire.",
  },
  {
    name: "Shahzad Ahmad",
    role: "Lead Photographer",
    image: `${R2}/mocnjk23-jmia70-shahzad-ahmad-20-yers-expereince-photographer.jpg`,
    bio: "Expert in wedding and event photography with a keen eye for capturing authentic moments.",
  },
  {
    name: "Khalid Khan",
    role: "Photographer",
    image: `${R2}/mocnjokw-2irnfw-img_2072.jpg`,
    bio: "Skilled photographer with a passion for capturing stunning portraits and event moments.",
  },
  {
    name: "Muhammad Umair",
    role: "Videographer",
    image: `${R2}/mocnjkvv-gio2e2-umair.png`,
    bio: "Specializing in cinematic wedding films and commercial video production.",
  },
  {
    name: "Abbas Khan",
    role: "Videographer",
    image: `${R2}/mocnjmix-jpdwv7-whatsapp-image-2026-04-16-at-08.13.31.jpeg`,
    bio: "Professional videographer specializing in cinematic event coverage and storytelling.",
  },
  {
    name: "Taimoor Ahmad",
    role: "Videographer & OB Operator",
    image: `${R2}/mocnjitt-9em7a5-taimoor-ahmad.png`,
    bio: "Licensed drone pilot delivering breathtaking aerial footage and post-production editing.",
  },
  {
    name: "Ali Rehman",
    role: "Editor & Colorist",
    image: `${R2}/mocnjgkz-9ge5f3-ali-rehman.png`,
    bio: "Post-production specialist handling color grading, editing, and final delivery.",
  },
  {
    name: "Saba Shehzad",
    role: "Photographer",
    image: `${R2}/mocnjloo-c4xbsr-saba.jpg`,
    bio: "Creative professional with expertise in portrait, fashion, and editorial photography.",
  },
  {
    name: "Hoor Aqsa",
    role: "Photographer",
    image: `${R2}/mocnjnig-au3wcm-hoor.jpg`,
    bio: "Creative photographer delivering beautiful imagery for weddings, portraits, and fashion shoots.",
  },
];

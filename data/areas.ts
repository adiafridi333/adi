export type AreaCategory =
  | "upscale-residential"
  | "old-city-historical"
  | "commercial-hubs"
  | "town-tehsil-level"
  | "industrial-outskirts"
  | "notable-landmarks"
  | "major-cities-nearby";

export interface AreaCategoryInfo {
  slug: AreaCategory;
  label: string;
  description: string;
}

export interface AreaSeoSection {
  heading: string;
  body: string;
}

export interface AreaFaq {
  question: string;
  answer: string;
}

export interface Area {
  slug: string;
  name: string;
  category: AreaCategory;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  description: string;
  content: string;
  seoSections: AreaSeoSection[];
  faqs: AreaFaq[];
  highlights: string[];
  nearbyAreas?: string[];
  aliases?: string[];
}

type AreaInput = {
  name: string;
  category: AreaCategory;
  slug?: string;
  note?: string;
  placeType?: "peshawar-area" | "city";
  region?: string;
  nearbyAreas?: string[];
  aliases?: string[];
};

type AreaOverrides = Partial<Omit<Area, "name" | "slug" | "category">> & {
  slug?: string;
};

export const areaCategories: AreaCategoryInfo[] = [
  {
    slug: "upscale-residential",
    label: "Upscale / Residential",
    description:
      "Developed residential areas for weddings, family events, private gatherings, portraits, and premium home shoots.",
  },
  {
    slug: "old-city-historical",
    label: "Old City / Historical",
    description:
      "Dense heritage areas and bazaars where street, cultural, wedding, and documentary-style coverage need careful planning.",
  },
  {
    slug: "commercial-hubs",
    label: "Commercial Hubs",
    description:
      "Busy business corridors for brand shoots, product photography, corporate coverage, events, and promotional videos.",
  },
  {
    slug: "town-tehsil-level",
    label: "Town / Tehsil Level Areas",
    description:
      "Wider Peshawar service areas for weddings, functions, family sessions, events, and local business photography.",
  },
  {
    slug: "industrial-outskirts",
    label: "Industrial / Outskirts",
    description:
      "Industrial estates, roads, and outer corridors for commercial shoots, drone footage, site videos, and event coverage.",
  },
  {
    slug: "notable-landmarks",
    label: "Notable Landmarks / Areas",
    description:
      "Well-known Peshawar landmarks and high-search areas for portraits, events, brand content, and family shoots.",
  },
  {
    slug: "major-cities-nearby",
    label: "Major Cities / Nearby Cities",
    description:
      "Important cities and towns where clients search for wedding photographers, event coverage, portraits, drone videos, and professional films.",
  },
];

const categoryCopy: Record<AreaCategory, string> = {
  "upscale-residential":
    "This area is a strong fit for wedding coverage, family portraits, engagement sessions, bridal shoots, and polished private event photography.",
  "old-city-historical":
    "This part of Peshawar is known for dense streets, heritage settings, bazaars, and cultural backdrops, so shoot planning, timing, and compact equipment choices matter.",
  "commercial-hubs":
    "This commercial area is useful for brand photography, corporate events, retail shoots, product content, social media videos, and business coverage.",
  "town-tehsil-level":
    "This wider Peshawar service area is suitable for weddings, mehndi and walima coverage, school events, family functions, and local business shoots.",
  "industrial-outskirts":
    "This outer or industrial area is suitable for factory coverage, site documentation, promotional videos, drone shots, staff portraits, and commercial photography.",
  "notable-landmarks":
    "This recognizable Peshawar area works well for outdoor portraits, student shoots, brand content, family sessions, and event coverage.",
  "major-cities-nearby":
    "This city or town is a strong service location for weddings, events, corporate shoots, portraits, drone videos, and destination coverage.",
};

const defaultHighlights = [
  "Wedding photography and films",
  "Event and corporate coverage",
  "Drone videography",
  "Portrait, fashion, and family sessions",
];

type UniqueSeoCopy = {
  localContext: string;
  planningNote: string;
  bestFor: [string, string, string];
  faqDetail?: string;
};

const fallbackSeoCopy: UniqueSeoCopy = {
  localContext:
    "This location has a mix of private events, family sessions, commercial work, and local celebrations, so each booking needs a practical plan instead of a generic shoot schedule.",
  planningNote:
    "Before the shoot, we confirm timing, access, parking, indoor and outdoor lighting, family priorities, and any restrictions at the venue so the coverage stays smooth on the day.",
  bestFor: ["weddings", "event coverage", "portrait sessions"],
  faqDetail:
    "We ask for the exact address and event schedule first, then recommend coverage hours, team size, and whether stills, video, or drone work will add value.",
};

const uniqueSeoCopy: Record<string, UniqueSeoCopy> = {
  hayatabad: {
    localContext:
      "Hayatabad has planned phases, larger homes, modern streets, and private event spaces, which makes it one of the strongest Peshawar locations for polished wedding and family coverage.",
    planningNote:
      "For Hayatabad shoots, we usually plan around the exact phase, home access, evening light, guest arrival flow, and whether the client wants indoor portraits, outdoor couple photos, or drone establishing shots.",
    bestFor: ["bridal shoots", "home weddings", "family portraits"],
    faqDetail:
      "For Hayatabad, tell us the phase, house or venue location, and whether portraits should be done indoors, outside the home, or at a nearby cleaner backdrop.",
  },
  "university-town": {
    localContext:
      "University Town is popular with professionals, NGOs, offices, clinics, and families, so the photography style here often needs to look clean, credible, and refined.",
    planningNote:
      "For University Town bookings, we confirm office or home timings, parking, background choices, and whether the shoot needs a formal corporate look or a softer family-event style.",
    bestFor: ["corporate portraits", "NGO events", "private functions"],
    faqDetail:
      "For University Town, we usually ask whether the shoot is for an office, NGO event, clinic, residence, or private gathering so the lighting and backdrop style match the client.",
  },
  gulbahar: {
    localContext:
      "Gulbahar is a busy residential and commercial area with fast-moving streets, compact venues, and family homes close to main Peshawar routes.",
    planningNote:
      "For Gulbahar coverage, we plan arrival time, equipment size, room layout, and low-light options carefully so wedding and event moments are not missed in tighter spaces.",
    bestFor: ["mehndi coverage", "family events", "small business shoots"],
    faqDetail:
      "For Gulbahar, we confirm lane access, room size, and event timing early because compact homes and busy streets can affect setup time.",
  },
  saddar: {
    localContext:
      "Saddar has central access, markets, hotels, halls, and Cantonment-side venues, making it practical for formal events and quick professional sessions.",
    planningNote:
      "For Saddar shoots, traffic and parking are the first planning points, followed by timeline control for portraits, family groups, stage moments, and venue lighting.",
    bestFor: ["formal events", "engagement coverage", "business portraits"],
  },
  "peshawar-cantonment-cantt": {
    localContext:
      "Peshawar Cantonment, commonly called Cantt, is suited to formal family events, office shoots, portraits, and polished coverage where presentation matters.",
    planningNote:
      "For Cantt bookings, we confirm access details, security requirements, venue rules, and a clean portrait setup before the event starts.",
    bestFor: ["walima coverage", "formal portraits", "corporate events"],
  },
  "regi-lalma": {
    localContext:
      "Regi Lalma is a developing residential side of Peshawar with wider layouts and growing demand for home-event coverage and modern family sessions.",
    planningNote:
      "For Regi Lalma shoots, we plan route timing, outdoor light, home entrance coverage, and backup indoor setups because venues and streets can vary by block.",
    bestFor: ["home events", "family portraits", "engagement sessions"],
  },
  "qissa-khwani-bazaar": {
    localContext:
      "Qissa Khwani Bazaar has historic streets, dense movement, shopfronts, and strong cultural character that can give photographs a distinctly Peshawar look.",
    planningNote:
      "For Qissa Khwani shoots, we use compact equipment, choose quieter time windows, and plan the route before arrival so portraits and documentary shots feel natural.",
    bestFor: ["cultural portraits", "street-style shoots", "heritage coverage"],
  },
  andarsheher: {
    localContext:
      "Andarsheher sits inside the older fabric of Peshawar, with narrow lanes, heritage homes, and dense local activity that require patient documentary coverage.",
    planningNote:
      "For Andarsheher bookings, we keep lighting portable, coordinate family movement in advance, and plan coverage around lane access and guest flow.",
    bestFor: ["traditional weddings", "heritage portraits", "family functions"],
  },
  "sethi-mohallah": {
    localContext:
      "Sethi Mohallah offers architectural detail, carved wood, heritage facades, and a visual identity that suits editorial-style wedding and cultural photography.",
    planningNote:
      "For Sethi Mohallah shoots, we plan angles, outfit colors, crowd control, and natural-light timing so the architecture supports the subject instead of distracting from it.",
    bestFor: ["bridal editorials", "heritage shoots", "cultural films"],
  },
  "shahi-bagh": {
    localContext:
      "Shahi Bagh gives access to a recognizable old Peshawar setting with open surroundings compared with many inner-city streets.",
    planningNote:
      "For Shahi Bagh sessions, we check public activity, daylight direction, nearby parking, and whether the client needs portraits, event clips, or family group photos.",
    bestFor: ["outdoor portraits", "family sessions", "event highlights"],
  },
  "dabgari-gardens": {
    localContext:
      "Dabgari Gardens is close to old-city movement and medical/commercial activity, so shoots here need a practical approach to timing and backgrounds.",
    planningNote:
      "For Dabgari Gardens coverage, we keep timelines tight, identify cleaner portrait spots early, and prepare for mixed indoor and street-side lighting.",
    bestFor: ["event coverage", "family functions", "professional portraits"],
  },
  "namak-mandi": {
    localContext:
      "Namak Mandi has a strong food, market, and old-city identity, which makes it useful for lifestyle, cultural, and commercial storytelling.",
    planningNote:
      "For Namak Mandi shoots, we plan around crowd levels, shopfront lighting, food-service timing, and clean audio needs for video coverage.",
    bestFor: ["restaurant content", "cultural videos", "street portraits"],
  },
  "gor-gathri": {
    localContext:
      "Gor Gathri connects heritage, old-city movement, and historical atmosphere, making it suitable for shoots that need a Peshawar identity.",
    planningNote:
      "For Gor Gathri coverage, we scout angles first, avoid harsh midday light where possible, and keep equipment mobile for quick changes between spots.",
    bestFor: ["heritage photography", "bridal portraits", "short films"],
  },
  "ring-road-corridor": {
    localContext:
      "The Ring Road Corridor connects venues, businesses, plazas, and residential pockets, so it is useful for both event logistics and commercial coverage.",
    planningNote:
      "For Ring Road bookings, we plan travel buffers, parking, drone permissions where needed, and a shot list that works across multiple stops.",
    bestFor: ["event films", "commercial videos", "drone footage"],
  },
  "islamia-road": {
    localContext:
      "Islamia Road links educational, professional, and commercial activity near University Town, which makes it practical for portraits and brand work.",
    planningNote:
      "For Islamia Road shoots, we choose calmer time windows, confirm indoor backup spaces, and plan clean backgrounds for headshots or product content.",
    bestFor: ["student portraits", "brand shoots", "professional headshots"],
  },
  "gt-road-belt": {
    localContext:
      "The GT Road Belt is a high-movement commercial route with showrooms, halls, shops, and quick access to multiple sides of Peshawar.",
    planningNote:
      "For GT Road coverage, we factor in traffic noise, signage, parking, and fast setup requirements so the shoot stays efficient.",
    bestFor: ["business videos", "event coverage", "retail photography"],
  },
  "khyber-bazaar": {
    localContext:
      "Khyber Bazaar is a recognizable commercial and historical area with busy streets, shops, and local character suited to documentary visuals.",
    planningNote:
      "For Khyber Bazaar shoots, we plan movement carefully, use compact lighting, and keep the timeline realistic for crowded streets.",
    bestFor: ["market photography", "brand content", "cultural coverage"],
  },
  "chowk-yadgar": {
    localContext:
      "Chowk Yadgar is a central old-city point where commercial, historical, and local activity overlap.",
    planningNote:
      "For Chowk Yadgar coverage, we work with short shot windows, careful framing, and planned meeting points to avoid losing time in the crowd.",
    bestFor: ["street portraits", "documentary clips", "local campaigns"],
  },
  "peshawar-city-town": {
    localContext:
      "Peshawar City Town covers a broad urban mix, from old neighborhoods and markets to family homes and local event venues.",
    planningNote:
      "For City Town bookings, we confirm the exact mohalla or venue first, then build the coverage plan around travel, family schedule, and lighting.",
    bestFor: ["wedding coverage", "family functions", "local events"],
  },
  mattani: {
    localContext:
      "Mattani is an outer Peshawar area where family events and local gatherings often need travel planning and dependable full-day coverage.",
    planningNote:
      "For Mattani shoots, we plan the route, arrival buffer, equipment backup, and evening lighting before committing the event timeline.",
    bestFor: ["full-day weddings", "family events", "drone videos"],
  },
  chamkani: {
    localContext:
      "Chamkani connects residential, route-side, and local business activity, with many events needing flexible timing and practical coverage.",
    planningNote:
      "For Chamkani coverage, we confirm the exact location, access from main roads, room size, and whether the event requires stage lighting or outdoor portraits.",
    bestFor: ["weddings", "school events", "business shoots"],
  },
  badaber: {
    localContext:
      "Badaber is a wider service area where wedding and family bookings often need strong coordination between home, venue, and route timing.",
    planningNote:
      "For Badaber shoots, we prepare for longer travel, mixed lighting, and a clear order for bridal, family, and event highlight coverage.",
    bestFor: ["baraat coverage", "family gatherings", "drone coverage"],
  },
  pishtakhara: {
    localContext:
      "Pishtakhara sits near important route connections and residential pockets, making it useful for home events and smaller venue coverage.",
    planningNote:
      "For Pishtakhara bookings, we confirm lane access, parking, and available portrait space so the team can work without delaying the event.",
    bestFor: ["home weddings", "engagements", "family portraits"],
  },
  "warsak-road": {
    localContext:
      "Warsak Road covers a long residential stretch with schools, homes, and growing event activity, so location precision matters.",
    planningNote:
      "For Warsak Road coverage, we confirm the exact stop, time traffic carefully, and plan outdoor photos around clean backgrounds and softer light.",
    bestFor: ["family sessions", "school coverage", "wedding films"],
  },
  "nauthia-nauthia-jadeed": {
    localContext:
      "Nauthia and Nauthia Jadeed are central residential areas close to Saddar and Cantt, often used for family events and traditional ceremonies.",
    planningNote:
      "For Nauthia bookings, we keep the setup compact, plan indoor lighting, and schedule family portraits before the busiest part of the event.",
    bestFor: ["nikah coverage", "mehndi events", "family portraits"],
  },
  faqirabad: {
    localContext:
      "Faqirabad has dense residential streets and quick access to Gulbahar and Chamkani, so it is common for local family and wedding coverage.",
    planningNote:
      "For Faqirabad shoots, we plan arrival points, room lighting, and short portrait sessions that work even when space is limited.",
    bestFor: ["family events", "weddings", "portrait sessions"],
  },
  urmar: {
    localContext:
      "Urmar is a wider local service area where outdoor space and family gatherings can create strong opportunities for natural coverage.",
    planningNote:
      "For Urmar bookings, we plan travel time, backup lighting, and whether the client wants more documentary coverage or formal family portraits.",
    bestFor: ["family gatherings", "outdoor shoots", "wedding videos"],
  },
  "hayatabad-industrial-estate": {
    localContext:
      "Hayatabad Industrial Estate is suited to business, factory, team, and site photography where the goal is usually credibility and clear documentation.",
    planningNote:
      "For industrial estate shoots, we confirm safety requirements, work zones, staff availability, machinery schedules, and drone restrictions before filming.",
    bestFor: ["factory videos", "staff portraits", "industrial photography"],
  },
  "kohat-road-industrial-area": {
    localContext:
      "Kohat Road Industrial Area is useful for site documentation, commercial video, and industrial coverage outside the normal wedding workflow.",
    planningNote:
      "For Kohat Road industrial shoots, we plan safety gear, access gates, equipment movement, and a shot list for facilities, people, and process.",
    bestFor: ["site documentation", "commercial films", "team photography"],
  },
  "bara-road": {
    localContext:
      "Bara Road links outer residential, commercial, and industrial activity, so shoots here can range from family events to business documentation.",
    planningNote:
      "For Bara Road coverage, we clarify whether the shoot is event-based or commercial, then plan travel, parking, lighting, and drone feasibility.",
    bestFor: ["event coverage", "commercial shoots", "drone footage"],
  },
  "ring-road-south": {
    localContext:
      "Ring Road South is a route-focused outer area that suits venue access, commercial coverage, and drone-led establishing footage.",
    planningNote:
      "For Ring Road South shoots, we prepare for road noise, timing changes, and safe drone or video angles where the location allows.",
    bestFor: ["venue coverage", "promotional videos", "aerial footage"],
  },
  shahkas: {
    localContext:
      "Shahkas is an outer area where shoots often require planned travel, flexible timing, and a practical mix of event and documentary coverage.",
    planningNote:
      "For Shahkas bookings, we confirm the exact route, daylight availability, and whether the priority is family coverage, venue details, or drone visuals.",
    bestFor: ["wedding events", "outdoor coverage", "drone videos"],
  },
  "university-of-peshawar-area": {
    localContext:
      "The University of Peshawar area is strong for student portraits, academic events, professional sessions, and youth-focused brand content.",
    planningNote:
      "For this area, we plan around campus-side movement, available permissions, outfit changes, and clean outdoor backgrounds.",
    bestFor: ["graduation portraits", "student shoots", "academic events"],
  },
  "phase-5-6-hayatabad": {
    localContext:
      "Phase 5 and Phase 6 Hayatabad have a newer residential feel, making them suitable for modern home events and clean lifestyle portraits.",
    planningNote:
      "For Phase 5 and Phase 6 shoots, we plan house-front angles, indoor lighting, and family portrait timing before guests fill the space.",
    bestFor: ["modern home events", "bridal portraits", "family shoots"],
  },
  "board-bazaar": {
    localContext:
      "Board Bazaar is a busy student, retail, and route-side area near Hayatabad and University-side movement.",
    planningNote:
      "For Board Bazaar coverage, we keep setups fast, choose backgrounds carefully, and plan around traffic, shop signs, and crowd flow.",
    bestFor: ["student portraits", "retail content", "quick event coverage"],
  },
  tehkal: {
    localContext:
      "Tehkal connects University Town, Board Bazaar, and Islamia Road, giving it a useful mix of residential, student, and commercial demand.",
    planningNote:
      "For Tehkal shoots, we check the exact street, plan parking, and choose portrait angles that avoid clutter while keeping the local feel.",
    bestFor: ["family events", "student shoots", "business portraits"],
  },
  swat: {
    localContext:
      "Swat is a destination-style location with mountain scenery, hotels, outdoor venues, and family events that often need cinematic planning.",
    planningNote:
      "For Swat coverage, we plan travel days, weather backup, daylight windows, drone feasibility, and a shot list for landscapes, family moments, and venue details.",
    bestFor: ["destination weddings", "cinematic films", "outdoor portraits"],
  },
  islamabad: {
    localContext:
      "Islamabad has hotels, farmhouses, corporate venues, clean urban backdrops, and scenic outdoor points suited to premium photo and video coverage.",
    planningNote:
      "For Islamabad shoots, we plan travel from Peshawar, venue rules, hotel timelines, traffic buffers, and whether the client wants a formal or cinematic look.",
    bestFor: ["destination weddings", "corporate shoots", "couple portraits"],
  },
  timergara: {
    localContext:
      "Timergara is a key Lower Dir location where weddings and family events often need reliable travel planning and full event coverage.",
    planningNote:
      "For Timergara bookings, we plan travel buffers, equipment backup, family portrait timing, and lighting for evening events.",
    bestFor: ["wedding coverage", "family events", "event films"],
  },
  batkhela: {
    localContext:
      "Batkhela sits on an important Malakand route and is practical for weddings, local business shoots, and events connected to Swat and Lower Dir.",
    planningNote:
      "For Batkhela coverage, we confirm travel timing, venue access, road conditions, and whether the shoot needs drone footage or mainly event documentation.",
    bestFor: ["weddings", "commercial shoots", "family functions"],
  },
  mingora: {
    localContext:
      "Mingora is one of Swat's busiest centers, with hotels, markets, homes, and nearby scenic routes for wedding and portrait coverage.",
    planningNote:
      "For Mingora shoots, we plan around traffic, hotel schedules, daylight for outdoor portraits, and optional scenic add-on sessions.",
    bestFor: ["hotel events", "outdoor portraits", "wedding films"],
  },
  charsadda: {
    localContext:
      "Charsadda is close enough for Peshawar-based coverage while still needing its own schedule for weddings, family functions, and local events.",
    planningNote:
      "For Charsadda bookings, we confirm the tehsil or venue, plan travel buffers, and prepare for both home-based coverage and hall events.",
    bestFor: ["weddings", "nikah events", "family coverage"],
  },
  mardan: {
    localContext:
      "Mardan is a major KP city with strong wedding, education, business, and family-event demand.",
    planningNote:
      "For Mardan shoots, we plan highway travel, venue access, event timing, and a separate portrait window so the coverage does not feel rushed.",
    bestFor: ["large weddings", "corporate events", "family portraits"],
  },
  nowshera: {
    localContext:
      "Nowshera has cantonment-side, residential, and route-based event demand, with many clients searching from both Nowshera and Nowshehra spellings.",
    planningNote:
      "For Nowshera coverage, we confirm the exact town or venue, plan travel from Peshawar, and prepare for formal portraits, stage coverage, and family moments.",
    bestFor: ["walima events", "formal portraits", "family functions"],
  },
  taxila: {
    localContext:
      "Taxila has historic identity, nearby urban venues, and access to Wah Cantt, Hasan Abdal, and Islamabad for linked wedding schedules.",
    planningNote:
      "For Taxila shoots, we plan the travel route, venue timing, and whether the client wants heritage-style portraits or formal event coverage.",
    bestFor: ["wedding films", "heritage portraits", "event photography"],
  },
  "wah-cantt": {
    localContext:
      "Wah Cantt has a structured cantonment setting, family homes, offices, and venues that suit formal and polished event coverage.",
    planningNote:
      "For Wah Cantt bookings, we confirm access, venue rules, portrait space, and whether the schedule includes Taxila or Hasan Abdal stops.",
    bestFor: ["formal weddings", "family portraits", "corporate coverage"],
  },
  "hasan-abdal": {
    localContext:
      "Hasan Abdal is a recognizable town near Taxila and Wah Cantt, with religious, travel, and family-event movement.",
    planningNote:
      "For Hasan Abdal shoots, we plan travel, crowd timing around busy areas, and whether portraits should be formal, documentary, or scenic.",
    bestFor: ["family events", "travel portraits", "wedding coverage"],
  },
  tangi: {
    localContext:
      "Tangi is a Charsadda district town where local weddings and family events often need dependable travel and lighting preparation.",
    planningNote:
      "For Tangi coverage, we confirm the route, event start time, available power and lighting, and the priority family members for portraits.",
    bestFor: ["local weddings", "family gatherings", "event videos"],
  },
  shabqadar: {
    localContext:
      "Shabqadar is an important Charsadda-side service location with wedding, family, and community event demand.",
    planningNote:
      "For Shabqadar bookings, we plan travel time from Peshawar, venue access, and a clear coverage order for bride, groom, family, stage, and guests.",
    bestFor: ["wedding coverage", "community events", "family portraits"],
  },
};

function toAreaSlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function buildAreaFaqs(
  input: AreaInput,
  placeLabel: string,
  seoCopy: UniqueSeoCopy
): AreaFaq[] {
  const primaryService = seoCopy.bestFor[0];
  const secondaryService = seoCopy.bestFor[1];
  const tertiaryService = seoCopy.bestFor[2];
  const faqDetail = seoCopy.faqDetail || fallbackSeoCopy.faqDetail;
  const routeText =
    input.placeType === "city" || input.category === "major-cities-nearby"
      ? `travel and timing for ${placeLabel}`
      : `access, parking, and venue timing in ${placeLabel}`;
  const droneText =
    input.category === "old-city-historical"
      ? "Drone work is limited in dense old-city areas, so we confirm safe and legal options first and use ground-level cinematic coverage when aerial shots are not practical."
      : input.category === "industrial-outskirts"
        ? "Drone coverage can be useful for site, factory, and route visuals, but we confirm safety rules, permissions, and flight conditions before adding it to the plan."
        : "Drone coverage is available where the location, permissions, weather, and safety conditions allow it.";

  return [
    {
      question: `Do you provide photography in ${placeLabel}?`,
      answer: `Yes. Adi Photography provides photo and video coverage in ${placeLabel}, including ${primaryService}, ${secondaryService}, and ${tertiaryService}. ${seoCopy.localContext}`,
    },
    {
      question: `What should I share before booking a shoot in ${input.name}?`,
      answer: `${faqDetail} We also confirm ${routeText}, the number of guests or participants, and whether you need photography, videography, drone footage, or all three.`,
    },
    {
      question: `Can you cover weddings and family events in ${input.name}?`,
      answer: `Yes. For weddings and family events in ${input.name}, we plan the timeline around bridal or groom preparation, family portraits, stage coverage, guest moments, and highlight video requirements. ${seoCopy.planningNote}`,
    },
    {
      question: `Is drone videography available in ${input.name}?`,
      answer: `${droneText} If drone footage is not suitable for ${input.name}, we can still create strong establishing shots, venue details, and cinematic movement with ground cameras.`,
    },
  ];
}

function buildArea(input: AreaInput): Area {
  const slug = input.slug || toAreaSlug(input.name);
  const isCity =
    input.placeType === "city" || input.category === "major-cities-nearby";
  const placeLabel = isCity ? input.name : `${input.name}, Peshawar`;
  const aliasText =
    input.aliases && input.aliases.length > 0
      ? ` Also searched as ${input.aliases.join(", ")}.`
      : "";
  const noteText = input.note ? ` ${input.note}` : "";
  const regionText = input.region ? `, ${input.region}` : "";
  const seoCopy = uniqueSeoCopy[slug] || fallbackSeoCopy;
  const bestForText = seoCopy.bestFor.join(", ");

  return {
    slug,
    name: input.name,
    category: input.category,
    h1: `Photographer in ${placeLabel}`,
    metaTitle: `Photographer in ${placeLabel}`,
    metaDescription: `Book a professional photographer in ${placeLabel} for ${bestForText}. Adi Photography covers photo, video, drone, portraits, and event films.`,
    description: `Professional photography and videography services in ${placeLabel} for ${bestForText}.`,
    content: `Adi Photography provides complete photo and video coverage in ${placeLabel}${regionText}. ${seoCopy.localContext}${noteText}${aliasText}`,
    seoSections: [
      {
        heading: `Local photography coverage in ${placeLabel}`,
        body: `${categoryCopy[input.category]} ${seoCopy.localContext}`,
      },
      {
        heading: `How we plan shoots in ${input.name}`,
        body: seoCopy.planningNote,
      },
      {
        heading: `Popular photography services in ${input.name}`,
        body: `Clients usually book Adi Photography in ${placeLabel} for ${seoCopy.bestFor[0]}, ${seoCopy.bestFor[1]}, and ${seoCopy.bestFor[2]}. We can cover still photography, cinematic video, drone footage where suitable, family portraits, and short social media edits depending on the event plan.`,
      },
    ],
    faqs: buildAreaFaqs(input, placeLabel, seoCopy),
    highlights: defaultHighlights,
    nearbyAreas: input.nearbyAreas,
    aliases: input.aliases,
  };
}

export function createArea(
  name: string,
  category: AreaCategory,
  overrides: AreaOverrides = {}
): Area {
  return {
    ...buildArea({ name, category, slug: overrides.slug }),
    ...overrides,
    name,
    category,
    slug: overrides.slug || toAreaSlug(name),
  };
}

const areaInputs: AreaInput[] = [
  {
    name: "Hayatabad",
    category: "upscale-residential",
    slug: "hayatabad",
    note:
      "Hayatabad is one of the most developed areas of Peshawar, with Phase 1 to Phase 7 offering strong options for wedding homes, bridal shoots, family sessions, and modern event coverage.",
    nearbyAreas: [
      "Hayatabad Phase 1-7",
      "Hayatabad Phase 5 / 6",
      "Board Bazaar",
      "Regi Lalma",
    ],
    aliases: ["Hayatabad Phase 1-7", "Hayatabad Peshawar"],
  },
  {
    name: "University Town",
    category: "upscale-residential",
    note:
      "University Town is popular with professionals, NGOs, offices, families, and private clients who need clean portraits, corporate photography, event coverage, and brand content.",
    nearbyAreas: ["University of Peshawar area", "Tehkal", "Islamia Road"],
  },
  {
    name: "Gulbahar",
    category: "upscale-residential",
    nearbyAreas: ["Faqirabad", "Nauthia", "GT Road Belt"],
  },
  {
    name: "Saddar",
    category: "upscale-residential",
    note:
      "Saddar is central and busy, so we plan coverage around traffic, parking, lighting, and event timing.",
    nearbyAreas: ["Peshawar Cantonment", "Nauthia", "GT Road Belt"],
  },
  {
    name: "Peshawar Cantonment",
    category: "upscale-residential",
    slug: "peshawar-cantonment-cantt",
    note:
      "Peshawar Cantonment, also known as Cantt, is a key area for formal events, family functions, portraits, and professional shoots.",
    nearbyAreas: ["Saddar", "Nauthia", "Peshawar City Town"],
    aliases: ["Cantonment", "Cantt", "Peshawar Cantt"],
  },
  {
    name: "Regi Lalma",
    category: "upscale-residential",
    nearbyAreas: ["Hayatabad", "Warsak Road", "Phase 5 / 6 Hayatabad"],
  },
  {
    name: "Qissa Khwani Bazaar",
    category: "old-city-historical",
    nearbyAreas: ["Khyber Bazaar", "Chowk Yadgar area", "Namak Mandi"],
  },
  {
    name: "Andarsheher",
    category: "old-city-historical",
    nearbyAreas: ["Sethi Mohallah", "Gor Gathri", "Qissa Khwani Bazaar"],
  },
  {
    name: "Sethi Mohallah",
    category: "old-city-historical",
    note:
      "Sethi Mohallah offers historic architecture and heritage character, which works especially well for cultural, bridal, and editorial-style shoots.",
    nearbyAreas: ["Andarsheher", "Gor Gathri", "Qissa Khwani Bazaar"],
  },
  {
    name: "Shahi Bagh",
    category: "old-city-historical",
    nearbyAreas: ["Dabgari Gardens", "Peshawar City Town", "Khyber Bazaar"],
  },
  {
    name: "Dabgari Gardens",
    category: "old-city-historical",
    nearbyAreas: ["Shahi Bagh", "Khyber Bazaar", "Peshawar City Town"],
  },
  {
    name: "Namak Mandi",
    category: "old-city-historical",
    nearbyAreas: ["Qissa Khwani Bazaar", "Khyber Bazaar", "Chowk Yadgar area"],
  },
  {
    name: "Gor Gathri",
    category: "old-city-historical",
    nearbyAreas: ["Andarsheher", "Sethi Mohallah", "Qissa Khwani Bazaar"],
  },
  {
    name: "Ring Road Corridor",
    category: "commercial-hubs",
    slug: "ring-road-corridor",
    nearbyAreas: ["Ring Road South", "GT Road Belt", "Bara Road"],
    aliases: ["Ring Road Peshawar"],
  },
  {
    name: "Islamia Road",
    category: "commercial-hubs",
    nearbyAreas: ["University Town", "University of Peshawar area", "Tehkal"],
  },
  {
    name: "GT Road Belt",
    category: "commercial-hubs",
    slug: "gt-road-belt",
    nearbyAreas: ["Gulbahar", "Chamkani", "Faqirabad"],
    aliases: ["GT Road Peshawar"],
  },
  {
    name: "Khyber Bazaar",
    category: "commercial-hubs",
    nearbyAreas: ["Qissa Khwani Bazaar", "Chowk Yadgar area", "Namak Mandi"],
  },
  {
    name: "Chowk Yadgar area",
    category: "commercial-hubs",
    slug: "chowk-yadgar",
    nearbyAreas: ["Khyber Bazaar", "Qissa Khwani Bazaar", "Namak Mandi"],
    aliases: ["Chowk Yadgar"],
  },
  {
    name: "Peshawar City Town",
    category: "town-tehsil-level",
    nearbyAreas: ["Khyber Bazaar", "Dabgari Gardens", "Shahi Bagh"],
  },
  {
    name: "Mattani",
    category: "town-tehsil-level",
    nearbyAreas: ["Badaber", "Kohat Road Industrial Area", "Bara Road"],
  },
  {
    name: "Chamkani",
    category: "town-tehsil-level",
    nearbyAreas: ["GT Road Belt", "Faqirabad", "Gulbahar"],
  },
  {
    name: "Badaber",
    category: "town-tehsil-level",
    nearbyAreas: ["Mattani", "Kohat Road Industrial Area", "Bara Road"],
  },
  {
    name: "Pishtakhara",
    category: "town-tehsil-level",
    nearbyAreas: ["Bara Road", "Hayatabad", "Ring Road South"],
  },
  {
    name: "Warsak Road",
    category: "town-tehsil-level",
    nearbyAreas: ["Regi Lalma", "Peshawar City Town", "Faqirabad"],
  },
  {
    name: "Nauthia / Nauthia Jadeed",
    category: "town-tehsil-level",
    slug: "nauthia-nauthia-jadeed",
    nearbyAreas: ["Saddar", "Peshawar Cantonment", "Gulbahar"],
    aliases: ["Nauthia", "Nauthia Jadeed"],
  },
  {
    name: "Faqirabad",
    category: "town-tehsil-level",
    nearbyAreas: ["Gulbahar", "Chamkani", "Warsak Road"],
  },
  {
    name: "Urmar",
    category: "town-tehsil-level",
    nearbyAreas: ["Chamkani", "GT Road Belt", "Warsak Road"],
  },
  {
    name: "Hayatabad Industrial Estate",
    category: "industrial-outskirts",
    nearbyAreas: ["Hayatabad", "Board Bazaar", "Bara Road"],
  },
  {
    name: "Kohat Road Industrial Area",
    category: "industrial-outskirts",
    nearbyAreas: ["Mattani", "Badaber", "Bara Road"],
  },
  {
    name: "Bara Road",
    category: "industrial-outskirts",
    nearbyAreas: ["Pishtakhara", "Ring Road South", "Hayatabad"],
  },
  {
    name: "Ring Road South",
    category: "industrial-outskirts",
    nearbyAreas: ["Ring Road Corridor", "Bara Road", "Pishtakhara"],
  },
  {
    name: "Shahkas",
    category: "industrial-outskirts",
    nearbyAreas: ["Bara Road", "Hayatabad", "Ring Road South"],
  },
  {
    name: "University of Peshawar area",
    category: "notable-landmarks",
    slug: "university-of-peshawar-area",
    nearbyAreas: ["University Town", "Islamia Road", "Tehkal"],
    aliases: ["University of Peshawar"],
  },
  {
    name: "Phase 5 / 6 Hayatabad",
    category: "notable-landmarks",
    slug: "phase-5-6-hayatabad",
    note:
      "Phase 5 and Phase 6 Hayatabad are part of the newer development pattern in Hayatabad, often suitable for modern home events, portraits, and family coverage.",
    nearbyAreas: ["Hayatabad", "Regi Lalma", "Board Bazaar"],
    aliases: ["Hayatabad Phase 5", "Hayatabad Phase 6"],
  },
  {
    name: "Board Bazaar",
    category: "notable-landmarks",
    nearbyAreas: ["Hayatabad", "University of Peshawar area", "Tehkal"],
  },
  {
    name: "Tehkal",
    category: "notable-landmarks",
    nearbyAreas: ["University Town", "Islamia Road", "Board Bazaar"],
  },
  {
    name: "Swat",
    category: "major-cities-nearby",
    placeType: "city",
    region: "Khyber Pakhtunkhwa",
    note:
      "Swat is a key destination for weddings, outdoor shoots, cinematic films, travel sessions, and event coverage.",
    nearbyAreas: ["Mingora", "Batkhela", "Timergara"],
    aliases: ["Swat Valley"],
  },
  {
    name: "Islamabad",
    category: "major-cities-nearby",
    placeType: "city",
    region: "Islamabad Capital Territory",
    note:
      "Islamabad is one of our major destination coverage cities for weddings, corporate shoots, portraits, drone footage, and private events.",
    nearbyAreas: ["Taxila", "Wah Cantt", "Hasan Abdal"],
  },
  {
    name: "Timergara",
    category: "major-cities-nearby",
    placeType: "city",
    region: "Lower Dir, Khyber Pakhtunkhwa",
    nearbyAreas: ["Batkhela", "Swat", "Mingora"],
  },
  {
    name: "Batkhela",
    category: "major-cities-nearby",
    placeType: "city",
    region: "Malakand, Khyber Pakhtunkhwa",
    nearbyAreas: ["Swat", "Mingora", "Timergara"],
  },
  {
    name: "Mingora",
    category: "major-cities-nearby",
    placeType: "city",
    region: "Swat, Khyber Pakhtunkhwa",
    nearbyAreas: ["Swat", "Batkhela", "Timergara"],
  },
  {
    name: "Charsadda",
    category: "major-cities-nearby",
    placeType: "city",
    region: "Khyber Pakhtunkhwa",
    nearbyAreas: ["Tangi", "Shabqadar", "Peshawar City Town"],
  },
  {
    name: "Mardan",
    category: "major-cities-nearby",
    placeType: "city",
    region: "Khyber Pakhtunkhwa",
    nearbyAreas: ["Charsadda", "Nowshera", "Peshawar City Town"],
  },
  {
    name: "Nowshera",
    category: "major-cities-nearby",
    placeType: "city",
    region: "Khyber Pakhtunkhwa",
    note:
      "Nowshera is the corrected spelling for the city often typed as Nowshehra.",
    nearbyAreas: ["Mardan", "Charsadda", "Peshawar Cantonment"],
    aliases: ["Nowshehra"],
  },
  {
    name: "Taxila",
    category: "major-cities-nearby",
    placeType: "city",
    region: "Punjab",
    nearbyAreas: ["Wah Cantt", "Hasan Abdal", "Islamabad"],
  },
  {
    name: "Wah Cantt",
    category: "major-cities-nearby",
    placeType: "city",
    region: "Punjab",
    note:
      "Wah Cantt is the common short name for Wah Cantonment.",
    nearbyAreas: ["Taxila", "Hasan Abdal", "Islamabad"],
    aliases: ["Wah Cantonment"],
  },
  {
    name: "Hasan Abdal",
    category: "major-cities-nearby",
    placeType: "city",
    region: "Punjab",
    note:
      "Hasan Abdal is also commonly written as Hassan Abdal in local listings and route references.",
    nearbyAreas: ["Taxila", "Wah Cantt", "Islamabad"],
    aliases: ["Hassan Abdal"],
  },
  {
    name: "Tangi",
    category: "major-cities-nearby",
    placeType: "city",
    region: "Charsadda District, Khyber Pakhtunkhwa",
    nearbyAreas: ["Charsadda", "Shabqadar", "Peshawar City Town"],
  },
  {
    name: "Shabqadar",
    category: "major-cities-nearby",
    placeType: "city",
    region: "Charsadda District, Khyber Pakhtunkhwa",
    nearbyAreas: ["Charsadda", "Tangi", "Peshawar City Town"],
  },
];

export const areas: Area[] = areaInputs.map(buildArea);

export function getAreaBySlug(slug: string): Area | undefined {
  return areas.find((area) => area.slug === slug);
}

export function getAllAreaSlugs(): string[] {
  return areas.map((area) => area.slug);
}

export function getAreasByCategory(category: AreaCategory): Area[] {
  return areas.filter((area) => area.category === category);
}

export function getAreaByNameOrAlias(name: string): Area | undefined {
  const normalizedName = name.toLowerCase();

  return areas.find(
    (area) =>
      area.name.toLowerCase() === normalizedName ||
      area.aliases?.some((alias) => alias.toLowerCase() === normalizedName)
  );
}

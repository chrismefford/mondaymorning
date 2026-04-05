// Kava Haven neighborhood SEO landing page data

export interface KavaNeighborhood {
  slug: string;
  name: string;
  headline: string;
  heroSubtext: string;
  nearbyStore: {
    name: string;
    address: string;
    neighborhood: string;
  };
  nearbyPartners: {
    name: string;
    address: string;
    type: string;
  }[];
  intro: string;
  whyKava: string;
  localAngle: string;
  faqs: { question: string; answer: string }[];
  peopleAlsoAsk: { question: string; answer: string }[];
}

export const kavaNeighborhoods: KavaNeighborhood[] = [
  {
    slug: "north-park",
    name: "North Park",
    headline: "Kava Haven in North Park, San Diego",
    heroSubtext: "Discover kava drinks in one of San Diego's most vibrant neighborhoods. Try Kava Haven at Monday Morning or at your favorite North Park spot.",
    nearbyStore: {
      name: "Pacific Beach",
      address: "1854 Garnet Ave, San Diego, CA 92109",
      neighborhood: "Pacific Beach",
    },
    nearbyPartners: [
      { name: "Fall Brewing Company", address: "4542 30th St, San Diego, CA 92116", type: "brewery" },
      { name: "Collins & Coupe", address: "2876 El Cajon Blvd #100, San Diego, CA 92104", type: "bar" },
      { name: "Louisiana Purchase", address: "2305 University Ave, San Diego, CA 92104", type: "restaurant" },
      { name: "Dunedin New Zealand Eats", address: "3501 30th St, San Diego, CA 92104", type: "restaurant" },
      { name: "Good News Bar", address: "3076 University Ave, San Diego, CA 92104", type: "bar" },
    ],
    intro: "North Park is known for craft cocktails, independent coffee shops, and a crowd that cares about what they put in their bodies. Kava Haven fits right in. Whether you are skipping alcohol for the night, exploring plant-based relaxation, or just curious about kava, North Park is one of the best neighborhoods in San Diego to try it. Monday Morning carries Kava Haven at both of our bottle shops, and several North Park bars and restaurants pour it too.",
    whyKava: "Kava is a plant-based drink made from the root of the Piper methysticum plant. It has been consumed in Pacific Island cultures for centuries for its calming, social effects. Kava Haven brings that tradition into a modern, ready-to-drink format that tastes great and delivers real relaxation without alcohol, without hangovers, and without the morning-after fog. It is the kind of drink that fits the North Park ethos: intentional, thoughtful, and a little bit different.",
    localAngle: "North Park's bar scene has always been ahead of the curve. From craft beer to natural wine to zero-proof cocktails, this neighborhood sets the tone for San Diego nightlife. Kava Haven is the next step in that evolution. You can find it at Collins & Coupe, Good News Bar, Louisiana Purchase, Dunedin New Zealand Eats, and Fall Brewing Company. Or pick up a bottle at Monday Morning and bring it to your next dinner party on 30th Street.",
    faqs: [
      { question: "Where can I buy Kava Haven in North Park?", answer: "You can find Kava Haven at several North Park locations including Collins & Coupe, Good News Bar, Louisiana Purchase, Dunedin New Zealand Eats, and Fall Brewing Company. You can also visit Monday Morning's Pacific Beach or Ocean Beach bottle shops to pick up bottles to take home." },
      { question: "What does Kava Haven taste like?", answer: "Kava Haven has a smooth, earthy flavor with subtle tropical notes. It is nothing like the chalky kava bowls you might have tried before. The ready-to-drink format is crafted to be approachable and enjoyable, even for first-time kava drinkers." },
      { question: "Does kava get you drunk?", answer: "No. Kava is not alcohol. It produces a calm, clear-headed relaxation without impairing your judgment or motor skills. There is no hangover. Many people describe the feeling as social and present, making it a perfect fit for a night out in North Park." },
      { question: "Can I try Kava Haven before I buy it?", answer: "Yes. Visit Monday Morning's tasting bar in Pacific Beach or Ocean Beach. We let you try any product on the shelf before you commit to a full bottle or pack." },
    ],
  },
  {
    slug: "pacific-beach",
    name: "Pacific Beach",
    headline: "Kava Haven in Pacific Beach, San Diego",
    heroSubtext: "The beach lifestyle meets plant-based relaxation. Try Kava Haven at Monday Morning's PB flagship store.",
    nearbyStore: {
      name: "Pacific Beach",
      address: "1854 Garnet Ave, San Diego, CA 92109",
      neighborhood: "Pacific Beach",
    },
    nearbyPartners: [
      { name: "Bare Back Grill", address: "4640 Mission Blvd, San Diego, CA 92109", type: "restaurant" },
    ],
    intro: "Pacific Beach is sun, surf, and good vibes. It is also home to Monday Morning's flagship bottle shop on Garnet Ave, where you can walk in and try Kava Haven at our tasting bar before you buy. Whether you are winding down after a surf session, pregaming a sunset dinner, or looking for something to sip on a Tuesday night that won't wreck your Wednesday morning, Kava Haven is the move.",
    whyKava: "Kava is a plant-based drink made from the root of the Piper methysticum plant, used for centuries across the Pacific Islands for its calming and social effects. Kava Haven takes that tradition and puts it in a clean, modern, ready-to-drink format. No alcohol, no hangover, no jitters. Just smooth, grounded relaxation. It is the kind of drink that makes sense in Pacific Beach, where wellness and nightlife meet on the boardwalk.",
    localAngle: "PB has always been a neighborhood that lives outside. Beach bonfires, rooftop hangs, boardwalk strolls. Kava Haven fits into all of it. Grab a bottle from Monday Morning at 1854 Garnet Ave and bring it to the beach. Or sit at our tasting bar and try a few options before you pick your favorite. You can also find Kava Haven on the menu at Bare Back Grill on Mission Blvd.",
    faqs: [
      { question: "Where can I buy Kava Haven in Pacific Beach?", answer: "Visit Monday Morning's flagship store at 1854 Garnet Ave in Pacific Beach. You can try Kava Haven at our tasting bar and take bottles home. It is also available at Bare Back Grill on Mission Blvd." },
      { question: "Is kava legal?", answer: "Yes. Kava is completely legal in the United States. It is classified as a dietary supplement and has been safely consumed for centuries in Pacific Island cultures." },
      { question: "What does kava feel like?", answer: "Kava produces a calm, relaxed state without impairing your thinking. Many people describe it as feeling present, social, and at ease. It is not a sedative, and it does not cause intoxication." },
      { question: "Can I try Kava Haven before buying?", answer: "Absolutely. Monday Morning's Pacific Beach location has a full tasting bar. Walk in during business hours and sample Kava Haven along with any of our 500+ non alcoholic drinks." },
    ],
  },
  {
    slug: "ocean-beach",
    name: "Ocean Beach",
    headline: "Kava Haven in Ocean Beach, San Diego",
    heroSubtext: "OB's laid-back spirit meets the calming power of kava. Find Kava Haven at Monday Morning and local OB favorites.",
    nearbyStore: {
      name: "Ocean Beach",
      address: "4967 Newport Ave, San Diego, CA 92107",
      neighborhood: "Ocean Beach",
    },
    nearbyPartners: [
      { name: "Raglan Public House", address: "1851 Bacon St, San Diego, CA 92107", type: "bar" },
      { name: "The Polished Pigeon", address: "4906 Voltaire St, San Diego, CA 92107", type: "bar" },
    ],
    intro: "Ocean Beach has its own pace. It is the kind of neighborhood where people actually slow down, where the vibe is authentic, and where plant-based living is not a trend but a lifestyle. That is exactly why Kava Haven landed here. Monday Morning's OB shop on Newport Ave is your go-to spot to try kava drinks, and you can find Kava Haven at a couple of the best bars in the neighborhood.",
    whyKava: "Kava is made from the root of the Piper methysticum plant, a staple in Pacific Island culture for centuries. Kava Haven brings that into a ready-to-drink format that delivers calm, social relaxation without alcohol. No hangover, no brain fog, no regrets. It fits the OB mindset perfectly: natural, intentional, and unpretentious.",
    localAngle: "OB does not follow trends, it starts them. From surf culture to plant-based eating to the zero-proof movement, this neighborhood has always been ahead. Kava Haven is available at Monday Morning on Newport Ave, at Raglan Public House on Bacon St, and at The Polished Pigeon on Voltaire. Whether you are catching sunset at the pier or posted up at your favorite dive, kava is the new way to keep the night going without the morning-after cost.",
    faqs: [
      { question: "Where can I buy Kava Haven in Ocean Beach?", answer: "Visit Monday Morning at 4967 Newport Ave in Ocean Beach. You can also find Kava Haven at Raglan Public House and The Polished Pigeon." },
      { question: "What is kava?", answer: "Kava is a plant-based drink made from the root of the Piper methysticum plant. It has been used for centuries in Pacific Island cultures for relaxation and social bonding. Kava Haven is a modern, ready-to-drink version that is smooth, approachable, and alcohol-free." },
      { question: "Does kava have side effects?", answer: "When consumed responsibly, kava is generally well-tolerated. Some people experience mild relaxation of the muscles or a slight tingling on the lips, which is normal and a sign of quality kava. It does not cause hangovers or impairment." },
      { question: "Can I try kava at Monday Morning OB?", answer: "Yes. Our Ocean Beach location has a tasting bar where you can sample Kava Haven and any of our 500+ non alcoholic drinks before you buy." },
    ],
  },
  {
    slug: "little-italy",
    name: "Little Italy",
    headline: "Kava Haven in Little Italy, San Diego",
    heroSubtext: "From aperitivos to adaptogens. Try Kava Haven in San Diego's most walkable neighborhood.",
    nearbyStore: {
      name: "Pacific Beach",
      address: "1854 Garnet Ave, San Diego, CA 92109",
      neighborhood: "Pacific Beach",
    },
    nearbyPartners: [
      { name: "Coco Maya by Miss B's", address: "1660 India St, San Diego, CA 92101", type: "bar" },
      { name: "Queenstown Public House", address: "1557 Columbia St, San Diego, CA 92101", type: "bar" },
    ],
    intro: "Little Italy is San Diego's dining capital. It is where food and drink culture meets walkability, where every block has a new flavor to discover. Kava Haven is the latest addition to that landscape. Whether you are looking for something to sip after dinner, a zero-proof option at a cocktail bar, or a bottle to take home from Monday Morning, kava is making its mark in Little Italy.",
    whyKava: "Kava is a plant-based drink with centuries of history in Pacific Island cultures. Kava Haven modernizes that tradition into a clean, ready-to-drink format. It delivers calm, social relaxation without alcohol, hangovers, or impairment. In a neighborhood known for its sophisticated palate, Kava Haven holds its own alongside craft cocktails and fine wine.",
    localAngle: "Little Italy's bar scene is evolving. The zero-proof movement has arrived, and Kava Haven is leading the charge. You can find it at Coco Maya by Miss B's on India St and Queenstown Public House on Columbia St. Both offer it as part of their cocktail programs. For bottles to take home, visit Monday Morning in Pacific Beach or Ocean Beach, both a short drive from the neighborhood.",
    faqs: [
      { question: "Where can I find Kava Haven in Little Italy?", answer: "Kava Haven is available at Coco Maya by Miss B's on India St and Queenstown Public House on Columbia St. For bottles to take home, visit Monday Morning's stores in Pacific Beach or Ocean Beach." },
      { question: "Is kava a good alternative to alcohol?", answer: "Many people use kava as an alcohol alternative for social situations. It produces calm relaxation without intoxication, making it a great option for dinners, nights out, or any time you want to unwind without the effects of alcohol." },
      { question: "Can I order Kava Haven online?", answer: "Yes. Visit mondaymorning-af.com to shop Kava Haven and have it shipped directly to your door." },
      { question: "What makes Kava Haven different from kava bars?", answer: "Kava Haven is a modern, ready-to-drink kava product that tastes great out of the bottle. Traditional kava bars serve fresh-ground kava, which has a much stronger, earthier taste. Kava Haven is designed to be approachable and enjoyable for everyone." },
    ],
  },
  {
    slug: "mission-beach",
    name: "Mission Beach",
    headline: "Kava Haven in Mission Beach, San Diego",
    heroSubtext: "Boardwalk vibes and botanical calm. Find Kava Haven at Mission Beach's best spots.",
    nearbyStore: {
      name: "Pacific Beach",
      address: "1854 Garnet Ave, San Diego, CA 92109",
      neighborhood: "Pacific Beach",
    },
    nearbyPartners: [
      { name: "Miss B's Coconut Club", address: "3704 Mission Blvd, San Diego, CA 92109", type: "bar" },
    ],
    intro: "Mission Beach lives between the bay and the ocean, and the energy here is unlike anywhere else in San Diego. It is a place for sunset sessions, bonfire nights, and slow mornings. Kava Haven fits that rhythm. A calming, plant-based drink that keeps the night going without the fallout. You can find it at Miss B's Coconut Club or pick up a bottle at Monday Morning, just a few blocks north in Pacific Beach.",
    whyKava: "Kava is a root-based drink from the Pacific Islands, consumed for centuries for its calming, social effects. Kava Haven packages that tradition in a modern, ready-to-drink format. No alcohol, no sugar crash, no morning-after regret. It is the kind of drink that makes sense when you are living the Mission Beach lifestyle.",
    localAngle: "Miss B's Coconut Club on Mission Blvd is the go-to spot for Kava Haven in Mission Beach. The tropical atmosphere pairs perfectly with kava's smooth, calming character. For a wider selection or to try before you buy, Monday Morning's Pacific Beach store is a five-minute walk up Garnet Ave.",
    faqs: [
      { question: "Where can I buy Kava Haven in Mission Beach?", answer: "Find Kava Haven at Miss B's Coconut Club on Mission Blvd. For bottles to take home, visit Monday Morning at 1854 Garnet Ave in nearby Pacific Beach." },
      { question: "Is kava safe?", answer: "Yes. Kava has been safely consumed for centuries in Pacific Island cultures. It is legal in the United States and classified as a dietary supplement. As with anything, consume responsibly." },
      { question: "Can I bring Kava Haven to the beach?", answer: "Absolutely. Pick up a bottle from Monday Morning and enjoy it at a beach bonfire or sunset session. It is a great social drink that keeps everyone feeling good without alcohol." },
      { question: "How much kava should I drink?", answer: "Start with one serving and see how you feel. Kava Haven is formulated for a smooth, gradual relaxation. Most people enjoy one to two servings in a session." },
    ],
  },
  {
    slug: "mission-valley",
    name: "Mission Valley",
    headline: "Kava Haven in Mission Valley, San Diego",
    heroSubtext: "Central San Diego's gateway to plant-based relaxation. Discover Kava Haven near you.",
    nearbyStore: {
      name: "Pacific Beach",
      address: "1854 Garnet Ave, San Diego, CA 92109",
      neighborhood: "Pacific Beach",
    },
    nearbyPartners: [
      { name: "Selva Coffee House", address: "3535 Camino del Rio W, San Diego, CA 92110", type: "restaurant" },
    ],
    intro: "Mission Valley sits at the center of San Diego, connecting every major neighborhood. It is a hub for shopping, dining, and living. Kava Haven brings something new to the area: a plant-based, alcohol-free drink that helps you unwind without compromise. You can find it at Selva Coffee House or visit Monday Morning's stores a short drive away.",
    whyKava: "Kava is made from the root of the Piper methysticum plant, a botanical staple in Pacific Island cultures for centuries. Kava Haven takes that heritage and puts it in a clean, modern format. It delivers real relaxation: calm, present, and social, without alcohol, without hangovers, without the fog.",
    localAngle: "Selva Coffee House on Camino del Rio W is the spot for Kava Haven in Mission Valley. It is a perfect pairing for the coffeehouse atmosphere, offering an evening alternative to caffeine that brings the same intentional, elevated feel. For a full selection, visit Monday Morning in Pacific Beach or Ocean Beach.",
    faqs: [
      { question: "Where can I buy Kava Haven in Mission Valley?", answer: "Kava Haven is available at Selva Coffee House in Mission Valley. For bottles and a full tasting experience, visit Monday Morning in Pacific Beach or Ocean Beach." },
      { question: "What is the difference between kava and CBD?", answer: "Kava and CBD are both plant-based and promote relaxation, but they work differently. Kava acts on GABA receptors to produce a calm, social feeling. CBD interacts with the endocannabinoid system. Many people prefer kava for social situations because its effects are more noticeable and immediate." },
      { question: "Can I buy Kava Haven online?", answer: "Yes. Shop at mondaymorning-af.com for Kava Haven and have it shipped to your door." },
    ],
  },
  {
    slug: "normal-heights",
    name: "Normal Heights",
    headline: "Kava Haven in Normal Heights, San Diego",
    heroSubtext: "Adams Ave's best-kept secret. Try Kava Haven in Normal Heights.",
    nearbyStore: {
      name: "Pacific Beach",
      address: "1854 Garnet Ave, San Diego, CA 92109",
      neighborhood: "Pacific Beach",
    },
    nearbyPartners: [
      { name: "Maya Moon Collective", address: "3349 Adams Ave, San Diego, CA 92116", type: "restaurant" },
    ],
    intro: "Normal Heights is where community meets creativity. Adams Ave is lined with spots that care about ingredients, intention, and doing things differently. Kava Haven is a natural fit. This plant-based drink delivers calm relaxation without alcohol, and you can find it at Maya Moon Collective on Adams Ave.",
    whyKava: "Kava comes from the Piper methysticum root and has been part of Pacific Island culture for centuries. Kava Haven modernizes that experience into a ready-to-drink format that is smooth, social, and completely alcohol-free. No hangovers, no impairment, no compromise.",
    localAngle: "Maya Moon Collective is the go-to for Kava Haven in Normal Heights. The holistic, community-focused vibe of the space pairs perfectly with kava's calming energy. For a deeper selection, head to Monday Morning in Pacific Beach or Ocean Beach to try before you buy at our tasting bar.",
    faqs: [
      { question: "Where can I buy Kava Haven in Normal Heights?", answer: "Find Kava Haven at Maya Moon Collective on Adams Ave. For bottles and a tasting experience, visit Monday Morning in Pacific Beach or Ocean Beach." },
      { question: "Does kava help with anxiety?", answer: "Many people use kava for its calming effects. While we cannot make medical claims, kava has been traditionally used for centuries to promote relaxation and ease social tension. It is a natural alternative worth exploring." },
      { question: "What does Kava Haven taste like?", answer: "Kava Haven has a smooth, slightly earthy flavor with tropical undertones. It is crafted to be approachable, even if you have never tried kava before." },
    ],
  },
  {
    slug: "coronado",
    name: "Coronado",
    headline: "Kava Haven in Coronado, San Diego",
    heroSubtext: "Island living, elevated. Find Kava Haven on Coronado Island.",
    nearbyStore: {
      name: "Ocean Beach",
      address: "4967 Newport Ave, San Diego, CA 92107",
      neighborhood: "Ocean Beach",
    },
    nearbyPartners: [
      { name: "Boney's Bayside Market", address: "155 Orange Ave, Coronado, CA 92118", type: "restaurant" },
    ],
    intro: "Coronado is San Diego's island escape. Clean beaches, slower pace, and a community that values quality over quantity. Kava Haven fits right in. This plant-based, alcohol-free drink offers real relaxation for people who want to feel good without compromise. Find it at Boney's Bayside Market on Orange Ave or visit Monday Morning in nearby Ocean Beach.",
    whyKava: "Kava is a centuries-old botanical drink from the Pacific Islands. Kava Haven brings that tradition into a modern, ready-to-drink format. Smooth, calming, and completely alcohol-free. No hangover, no fog, no regret. It is a drink that matches Coronado's elevated, intentional lifestyle.",
    localAngle: "Boney's Bayside Market on Orange Ave carries Kava Haven for Coronado residents and visitors. It is a quick grab for a beach day, a dinner party, or a quiet evening at home. For a full tasting experience with 500+ non alcoholic options, Monday Morning's Ocean Beach store is just across the bridge.",
    faqs: [
      { question: "Where can I buy Kava Haven in Coronado?", answer: "Kava Haven is available at Boney's Bayside Market on Orange Ave in Coronado. For a wider selection, visit Monday Morning in Ocean Beach, just across the bridge." },
      { question: "Is kava addictive?", answer: "No. Kava is not considered addictive. It does not contain alcohol or nicotine, and it does not produce the dependency patterns associated with those substances." },
      { question: "Can I drink kava every day?", answer: "Many people enjoy kava regularly. As with any supplement, listen to your body and consume in moderation. Kava Haven is formulated for easy, responsible enjoyment." },
    ],
  },
  {
    slug: "la-jolla",
    name: "La Jolla",
    headline: "Kava Haven in La Jolla, San Diego",
    heroSubtext: "Coastal sophistication meets plant-based calm. Discover Kava Haven in La Jolla.",
    nearbyStore: {
      name: "Pacific Beach",
      address: "1854 Garnet Ave, San Diego, CA 92109",
      neighborhood: "Pacific Beach",
    },
    nearbyPartners: [
      { name: "Queenstown Village", address: "1044 Wall St, La Jolla, CA 92037", type: "restaurant" },
    ],
    intro: "La Jolla is where San Diego gets polished. The dining scene is world-class, the views are unmatched, and the standards are high. Kava Haven meets those standards. A refined, plant-based drink that delivers calm relaxation without alcohol, it is the perfect fit for La Jolla's discerning crowd. Find it at Queenstown Village on Wall St or at Monday Morning's nearby Pacific Beach location.",
    whyKava: "Kava is a botanical drink with deep roots in Pacific Island culture. Kava Haven brings it into the modern era with a smooth, ready-to-drink format that tastes great and works fast. Calm, social, present: no alcohol, no hangover, no compromise. It is the kind of drink La Jolla deserves.",
    localAngle: "Queenstown Village on Wall St is your La Jolla source for Kava Haven. The restaurant's elevated atmosphere pairs perfectly with kava's sophisticated, calming profile. For bottles to take home or to try at the tasting bar, Monday Morning's Pacific Beach shop is just a short drive down the coast.",
    faqs: [
      { question: "Where can I find Kava Haven in La Jolla?", answer: "Kava Haven is available at Queenstown Village on Wall St in La Jolla. For bottles and tastings, visit Monday Morning at 1854 Garnet Ave in Pacific Beach." },
      { question: "Is kava good for social events?", answer: "Absolutely. Kava promotes a calm, social state of mind without alcohol's downsides. Many people prefer it for dinners, gatherings, and events where they want to feel relaxed and present." },
      { question: "How quickly does kava work?", answer: "Most people feel the effects of Kava Haven within 15 to 30 minutes. The relaxation is gradual and smooth, building into a calm, clear-headed feeling." },
    ],
  },
  {
    slug: "liberty-station",
    name: "Liberty Station",
    headline: "Kava Haven in Liberty Station, San Diego",
    heroSubtext: "Where history meets modern wellness. Find Kava Haven at Liberty Station.",
    nearbyStore: {
      name: "Ocean Beach",
      address: "4967 Newport Ave, San Diego, CA 92107",
      neighborhood: "Ocean Beach",
    },
    nearbyPartners: [
      { name: "Moniker General", address: "2860 Sims Rd, San Diego, CA 92106", type: "restaurant" },
    ],
    intro: "Liberty Station is a hub of food, art, and community. The repurposed naval base is home to some of San Diego's best restaurants and shops. Kava Haven adds a new dimension to the offerings. Find it at Moniker General on Sims Rd or visit Monday Morning in nearby Ocean Beach for a full tasting experience.",
    whyKava: "Kava is a plant-based drink from the Pacific Islands, used for centuries for relaxation and social bonding. Kava Haven modernizes that tradition into a ready-to-drink format. Clean, smooth, and alcohol-free. It fits Liberty Station's blend of creativity and intentional living.",
    localAngle: "Moniker General is the spot for Kava Haven at Liberty Station. The curated, design-forward space is a natural home for a product like Kava Haven. For a wider selection, Monday Morning's Ocean Beach store is just minutes away on Newport Ave.",
    faqs: [
      { question: "Where can I buy Kava Haven at Liberty Station?", answer: "Find Kava Haven at Moniker General on Sims Rd in Liberty Station. For a full tasting bar experience, visit Monday Morning in nearby Ocean Beach." },
      { question: "What pairs well with kava?", answer: "Kava pairs well with food, especially lighter dishes, seafood, and tropical flavors. It is also great on its own as a pre-dinner or after-dinner drink." },
      { question: "Is kava vegan?", answer: "Yes. Kava Haven is plant-based and vegan-friendly." },
    ],
  },
  {
    slug: "carlsbad",
    name: "Carlsbad",
    headline: "Kava Haven in Carlsbad, San Diego County",
    heroSubtext: "North County's coastal gem meets plant-based relaxation. Discover Kava Haven in Carlsbad.",
    nearbyStore: {
      name: "Pacific Beach",
      address: "1854 Garnet Ave, San Diego, CA 92109",
      neighborhood: "Pacific Beach",
    },
    nearbyPartners: [
      { name: "Park 101", address: "3040 Carlsbad Blvd, Carlsbad, CA 92008", type: "bar" },
    ],
    intro: "Carlsbad is where North County comes to play. Beachfront dining, family-friendly boardwalks, and a wellness-forward community. Kava Haven is the drink this town has been waiting for. A plant-based, alcohol-free option that delivers real calm without any of the downsides. Find it at Park 101 on Carlsbad Blvd or shop online from Monday Morning.",
    whyKava: "Kava is a centuries-old botanical drink from the Pacific Islands. Kava Haven turns it into something accessible and modern: a ready-to-drink format that tastes great and works fast. Calm, social, present. No alcohol, no hangover. It is perfect for Carlsbad's active, health-conscious lifestyle.",
    localAngle: "Park 101 on Carlsbad Blvd is the go-to for Kava Haven in Carlsbad. The beachfront setting is a perfect match for kava's relaxed, social energy. For bottles to take home, shop Monday Morning online at mondaymorning-af.com or visit our stores in Pacific Beach or Ocean Beach.",
    faqs: [
      { question: "Where can I buy Kava Haven in Carlsbad?", answer: "Find Kava Haven at Park 101 on Carlsbad Blvd. You can also shop online at mondaymorning-af.com or visit Monday Morning's stores in Pacific Beach or Ocean Beach." },
      { question: "Does Kava Haven contain caffeine?", answer: "No. Kava Haven is caffeine-free. It promotes relaxation rather than stimulation, making it ideal for evening enjoyment." },
      { question: "Can I get Kava Haven delivered to Carlsbad?", answer: "Yes. Order from mondaymorning-af.com and get Kava Haven shipped directly to your door in Carlsbad." },
    ],
  },
  {
    slug: "oceanside",
    name: "Oceanside",
    headline: "Kava Haven in Oceanside, San Diego County",
    heroSubtext: "Pier-side vibes and plant-based calm. Find Kava Haven in Oceanside.",
    nearbyStore: {
      name: "Pacific Beach",
      address: "1854 Garnet Ave, San Diego, CA 92109",
      neighborhood: "Pacific Beach",
    },
    nearbyPartners: [
      { name: "The Lobby Tiki Bar", address: "408 Pier View Wy, Oceanside, CA 92054", type: "bar" },
      { name: "Cococabana", address: "408 Pier View Wy Suite 401, Oceanside, CA 92054", type: "bar" },
    ],
    intro: "Oceanside is having a moment. The pier, the surf, the growing food and drink scene: it is all coming together. Kava Haven adds another layer. A plant-based, alcohol-free drink that delivers smooth relaxation, perfect for Oceanside's laid-back, ocean-forward lifestyle. Find it at The Lobby Tiki Bar and Cococabana on Pier View Way.",
    whyKava: "Kava is a root-based drink from the Pacific Islands with centuries of tradition behind it. Kava Haven brings that into a modern, ready-to-drink format. No alcohol, no hangover, no compromise. Just calm, social relaxation. It is the kind of drink that matches Oceanside's evolving identity.",
    localAngle: "The Lobby Tiki Bar and Cococabana, both on Pier View Way near the pier, serve Kava Haven as part of their drink menus. The tropical atmosphere of both spots pairs naturally with kava's Pacific Island roots. For bottles to take home, shop Monday Morning online or visit our stores in PB and OB.",
    faqs: [
      { question: "Where can I buy Kava Haven in Oceanside?", answer: "Find Kava Haven at The Lobby Tiki Bar and Cococabana on Pier View Way near the Oceanside Pier. You can also shop online at mondaymorning-af.com." },
      { question: "Is kava good for relaxation?", answer: "Yes. Kava has been used for centuries specifically for its calming, relaxing effects. Kava Haven delivers those benefits in a modern, great-tasting format." },
      { question: "Can I mix kava with other drinks?", answer: "Kava Haven is designed to be enjoyed on its own, but some people mix it into mocktails. It pairs well with tropical flavors like coconut, pineapple, and citrus." },
    ],
  },
];

export function getNeighborhoodBySlug(slug: string): KavaNeighborhood | undefined {
  return kavaNeighborhoods.find(n => n.slug === slug);
}

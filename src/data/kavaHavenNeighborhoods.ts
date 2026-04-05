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
      { question: "Is Kava Haven available on tap in North Park?", answer: "Some North Park locations serve Kava Haven as part of their drink menu. Check with Collins & Coupe and Good News Bar for their current kava offerings. For canned options, visit Monday Morning." },
      { question: "How much does Kava Haven cost?", answer: "Kava Haven is competitively priced with other premium non alcoholic beverages. Visit mondaymorning-af.com or stop by one of our stores for current pricing. Most bars in North Park price it similar to a craft cocktail." },
      { question: "Can I mix Kava Haven into cocktails?", answer: "Yes. Kava Haven works great as a base for zero-proof cocktails. Many bartenders in North Park use it in creative mocktail recipes. It pairs well with citrus, coconut, and tropical flavors." },
    ],
    peopleAlsoAsk: [
      { question: "What is kava and why is it popular in San Diego?", answer: "Kava is a plant-based drink made from the root of the Piper methysticum plant, traditionally consumed in Pacific Island cultures. It has become popular in San Diego because of the city's wellness-forward culture and growing interest in alcohol alternatives. Kava delivers calm relaxation without the effects of alcohol." },
      { question: "Is kava legal in California?", answer: "Yes. Kava is completely legal in California and throughout the United States. It is classified as a dietary supplement by the FDA and is widely available at bars, restaurants, and retail shops across San Diego." },
      { question: "What are the benefits of drinking kava instead of alcohol?", answer: "Kava provides relaxation and social ease without the negative effects of alcohol. There is no hangover, no impaired judgment, no calories from alcohol, and no dependency risk. Many people find it helps them enjoy social situations while staying clear-headed." },
      { question: "Where can I buy non alcoholic drinks in North Park?", answer: "Monday Morning is San Diego's largest non alcoholic bottle shop with over 500 options. While our stores are in Pacific Beach and Ocean Beach, many North Park bars and restaurants carry our products including Kava Haven. You can also shop online at mondaymorning-af.com." },
      { question: "Does kava show up on a drug test?", answer: "No. Kava is not a controlled substance and does not show up on standard drug tests. It is a legal, plant-based beverage that is widely consumed and accepted." },
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
      { question: "What are the best non alcoholic drinks for the beach?", answer: "Kava Haven is one of the best beach drinks because it promotes relaxation without alcohol. It pairs perfectly with a sunset session or bonfire. Monday Morning also carries non alcoholic beers, wines, spirits, and adaptogen drinks." },
      { question: "Does Monday Morning PB have parking?", answer: "Yes. There is street parking available on Garnet Ave and surrounding streets. The store is also easily accessible by bike or on foot from anywhere in Pacific Beach." },
      { question: "Can I order Kava Haven for delivery in Pacific Beach?", answer: "Yes. Shop at mondaymorning-af.com to order Kava Haven for shipping. You can also visit us in person at 1854 Garnet Ave for the full tasting bar experience." },
    ],
    peopleAlsoAsk: [
      { question: "What is the best kava bar near Pacific Beach?", answer: "Monday Morning at 1854 Garnet Ave is the best spot to try kava in Pacific Beach. While not a traditional kava bar, our tasting bar lets you sample Kava Haven and over 500 other non alcoholic options before you buy." },
      { question: "Is kava better than alcohol for relaxation?", answer: "Many people prefer kava over alcohol for relaxation because it provides calm without impairment, hangovers, or empty calories. Kava works on GABA receptors to produce a gentle, clear-headed relaxation that lets you stay present and social." },
      { question: "Can you drink kava at the beach in San Diego?", answer: "Yes. Kava is a non alcoholic beverage, so it is legal to enjoy at the beach. Pick up Kava Haven from Monday Morning in Pacific Beach and bring it to your next beach day or bonfire." },
      { question: "What is the sober curious movement?", answer: "The sober curious movement is about questioning your relationship with alcohol and exploring alternatives. It does not require total abstinence. Many sober curious people in Pacific Beach choose drinks like Kava Haven for social situations because they deliver relaxation without alcohol's downsides." },
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
      { question: "Is Kava Haven gluten free?", answer: "Yes. Kava Haven is made from plant-based ingredients and is gluten free, making it suitable for people with gluten sensitivities or celiac disease." },
      { question: "What hours is Monday Morning OB open?", answer: "Monday Morning Ocean Beach is open Tuesday through Sunday, 11 AM to 8 PM. We are closed on Mondays. Visit us at 4967 Newport Ave." },
      { question: "Can I buy Kava Haven in bulk?", answer: "Yes. Monday Morning offers multi-pack options and you can also shop in bulk online at mondaymorning-af.com. Contact us for wholesale inquiries if you are a bar or restaurant in Ocean Beach." },
    ],
    peopleAlsoAsk: [
      { question: "What are the best alcohol alternatives in Ocean Beach?", answer: "Monday Morning on Newport Ave is San Diego's premier non alcoholic bottle shop with over 500 options. Top picks include Kava Haven for relaxation, adaptogen drinks for energy, and non alcoholic craft beers and wines for familiar flavors without the buzz." },
      { question: "Is kava the same as kratom?", answer: "No. Kava and kratom are completely different plants with different effects. Kava comes from the Piper methysticum root and promotes gentle relaxation. Kratom comes from the Mitragyna speciosa tree and has different pharmacological properties. They should not be confused." },
      { question: "Can you drink kava while pregnant?", answer: "Consult your healthcare provider before consuming kava or any supplement during pregnancy. As with most herbal products, it is best to seek professional medical advice for your specific situation." },
      { question: "What does zero proof mean?", answer: "Zero proof refers to beverages that contain no alcohol. The term comes from the proof system used to measure alcohol content. Zero proof drinks like Kava Haven offer the social experience of drinking without any alcohol content." },
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
      { question: "Does Kava Haven pair well with food?", answer: "Absolutely. Kava Haven's smooth, subtle flavor complements many cuisines. It works especially well with lighter dishes, seafood, and Mediterranean flavors that are common in Little Italy's restaurant scene." },
      { question: "Is there a non alcoholic bar in Little Italy?", answer: "While Little Italy does not yet have a dedicated non alcoholic bar, several restaurants and bars carry zero-proof options including Kava Haven. Monday Morning in Pacific Beach and Ocean Beach is San Diego's dedicated non alcoholic bottle shop with over 500 options." },
    ],
    peopleAlsoAsk: [
      { question: "What is the non alcoholic drink scene like in San Diego?", answer: "San Diego has one of the fastest-growing non alcoholic drink scenes in the country. Monday Morning is the city's largest dedicated non alcoholic bottle shop, and dozens of bars and restaurants now carry zero-proof options. From craft NA beers to kava to adaptogen drinks, the options are expanding every month." },
      { question: "Can you get a buzz from kava?", answer: "Kava does not produce a buzz in the way alcohol does. Instead, it creates a calm, clear-headed feeling of relaxation. Some people describe a pleasant warmth and social ease. You remain fully aware and in control, which is one of the main reasons people choose kava over alcohol." },
      { question: "What is an adaptogen drink?", answer: "Adaptogen drinks contain herbs and plants that help your body manage stress. Kava is one example. Other adaptogens include ashwagandha, reishi, and lion's mane. These drinks are part of the growing wellness beverage category available at Monday Morning." },
      { question: "Are non alcoholic drinks healthier than alcohol?", answer: "Generally, yes. Non alcoholic drinks eliminate the health risks associated with alcohol consumption, including liver damage, impaired sleep quality, and empty calories. Options like Kava Haven offer relaxation benefits without the physical downsides of alcohol." },
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
      { question: "Does Kava Haven need to be refrigerated?", answer: "Kava Haven is best served chilled. Keep it in the fridge for the best taste experience. Unopened cans can be stored at room temperature." },
      { question: "What is the difference between noble kava and tudei kava?", answer: "Kava Haven uses noble kava, which is the highest quality variety. Noble kava produces pleasant, clear-headed relaxation. Tudei kava is a lower-quality variety that can cause lingering grogginess. Always look for noble kava products." },
    ],
    peopleAlsoAsk: [
      { question: "What are the best things to drink at a beach bonfire?", answer: "Kava Haven is perfect for bonfires because it promotes relaxation and social connection without alcohol. Other great options from Monday Morning include non alcoholic craft beers, sparkling botanicals, and adaptogen sodas." },
      { question: "Is kava a drug?", answer: "Kava is not classified as a drug. It is a plant-based dietary supplement that has been consumed safely for centuries. It is legal throughout the United States and available at bars, restaurants, and retail shops." },
      { question: "How long does kava last?", answer: "The effects of kava typically last two to four hours, depending on the amount consumed and your individual tolerance. The relaxation is gradual and smooth, fading naturally without any crash or hangover." },
      { question: "Can kava help with sleep?", answer: "Some people find that kava's relaxing properties help them unwind before bed. While Kava Haven is designed as a social drink, its calming effects can support a restful evening routine. It is not a sleep aid, but it can help quiet the mind." },
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
      { question: "Is kava good for stress relief?", answer: "Many people turn to kava specifically for stress relief. Its calming effects on the nervous system have been valued for centuries. Kava Haven offers a convenient way to experience those benefits in a modern format." },
      { question: "Does Kava Haven contain sugar?", answer: "Kava Haven is crafted with clean ingredients. Check the label for specific nutritional information. It is designed to be a healthier alternative to sugary cocktails and alcoholic beverages." },
      { question: "Where is the closest Monday Morning store to Mission Valley?", answer: "The closest Monday Morning locations are in Pacific Beach (1854 Garnet Ave) and Ocean Beach (4967 Newport Ave). Both are a short drive from Mission Valley and offer full tasting bars." },
    ],
    peopleAlsoAsk: [
      { question: "What drinks help you relax without alcohol?", answer: "Kava Haven is one of the most effective alcohol-free relaxation drinks available. Other options include adaptogen beverages with ashwagandha or reishi, CBD-infused drinks, and herbal teas. Monday Morning carries over 500 non alcoholic options across all categories." },
      { question: "Is kava safe to drink every day?", answer: "Many people enjoy kava regularly as part of their routine. Noble kava, the variety used in Kava Haven, has a long history of safe daily consumption in Pacific Island cultures. As with any supplement, moderation is key and consulting a healthcare provider is recommended." },
      { question: "What is the best non alcoholic drink for social events?", answer: "Kava Haven is ideal for social events because it promotes relaxation and social connection. Non alcoholic wines, craft NA beers, and botanical spirits are also popular choices. Monday Morning can help you find the right option for any occasion." },
      { question: "Can kava interact with medications?", answer: "Kava may interact with certain medications, particularly those processed by the liver. If you take prescription medications, consult your healthcare provider before consuming kava products." },
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
      { question: "Is kava the same as matcha?", answer: "No. Kava and matcha are completely different. Matcha is a green tea that provides caffeine and alertness. Kava is a root-based drink that promotes relaxation and calm. They serve opposite purposes and can complement each other at different times of day." },
      { question: "Can I host a kava tasting event?", answer: "Yes. Monday Morning offers tasting experiences and can help you set up a kava tasting for your group. Contact us through our website to learn more about private tastings and events." },
      { question: "What is the Adams Ave food and drink scene like?", answer: "Adams Ave in Normal Heights is home to a diverse mix of independent restaurants, bars, and cafes. It is known for its community-focused, creative approach to food and drink. Kava Haven fits right into this culture of intentional living." },
    ],
    peopleAlsoAsk: [
      { question: "What is the best natural remedy for stress?", answer: "Kava is one of the most well-known natural remedies for stress, with centuries of traditional use. Other options include meditation, exercise, and adaptogenic herbs. Kava Haven offers a convenient, enjoyable way to incorporate kava into your stress management routine." },
      { question: "Is kava vegan?", answer: "Yes. Kava Haven is made from plant-based ingredients and is suitable for vegans. The Piper methysticum root is the primary ingredient, and the ready-to-drink format contains no animal products." },
      { question: "What neighborhoods in San Diego have kava?", answer: "Kava Haven is available across San Diego including North Park, Pacific Beach, Ocean Beach, Little Italy, Mission Beach, Normal Heights, La Jolla, Coronado, Liberty Station, Carlsbad, and Oceanside. Monday Morning's stores in PB and OB carry the full selection." },
      { question: "How is kava prepared traditionally?", answer: "Traditionally, kava root is ground into a powder and mixed with water, then strained through a cloth. The resulting drink is consumed communally in Pacific Island ceremonies. Kava Haven modernizes this process into a convenient, great-tasting ready-to-drink format." },
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
      { question: "Is Kava Haven available at Coronado restaurants?", answer: "Currently, Boney's Bayside Market is the primary retail location for Kava Haven in Coronado. As the kava movement grows, expect to see it at more Coronado establishments. Check mondaymorning-af.com for the latest availability." },
      { question: "What is the shelf life of Kava Haven?", answer: "Kava Haven has a shelf life printed on each can. Store in a cool, dry place for best quality. Once opened, consume promptly for the freshest taste." },
      { question: "Can kids drink kava?", answer: "Kava Haven is intended for adult consumption. While kava is a natural, non alcoholic product, it is best suited for adults. Consult a pediatrician if you have questions about kava and minors." },
    ],
    peopleAlsoAsk: [
      { question: "What are the best non alcoholic drinks in Coronado?", answer: "Boney's Bayside Market carries Kava Haven and other non alcoholic options. For San Diego's largest selection of over 500 non alcoholic drinks, visit Monday Morning in Ocean Beach, just a short drive across the Coronado Bridge." },
      { question: "Does kava taste like alcohol?", answer: "No. Kava has its own unique flavor profile that is earthy and slightly tropical. It does not taste like any alcoholic beverage. Kava Haven is formulated to be smooth and enjoyable with a clean finish." },
      { question: "What is Dry January?", answer: "Dry January is an annual movement where people abstain from alcohol for the month of January. Many participants discover drinks like Kava Haven during this time and continue enjoying them year-round as a permanent alcohol alternative." },
      { question: "Can I bring non alcoholic drinks to Coronado Beach?", answer: "Non alcoholic beverages like Kava Haven are permitted on Coronado beaches. Unlike alcohol, which is banned on San Diego County beaches, non alcoholic options can be enjoyed freely." },
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
      { question: "Does Kava Haven have calories?", answer: "Kava Haven is a low-calorie option compared to most alcoholic beverages. Check the label for specific nutritional information. It contains significantly fewer calories than a typical cocktail or glass of wine." },
      { question: "Can I serve Kava Haven at a dinner party?", answer: "Yes. Kava Haven is an excellent addition to any dinner party. It gives guests a sophisticated, alcohol-free option that still promotes social relaxation. Serve it chilled alongside your food for the best experience." },
      { question: "Is there a kava community in San Diego?", answer: "San Diego has a growing kava community. From dedicated kava bars to restaurants and shops carrying products like Kava Haven, the local scene is expanding. Monday Morning is at the center of this movement, offering tastings and education about kava and other non alcoholic options." },
    ],
    peopleAlsoAsk: [
      { question: "What are the best restaurants in La Jolla with non alcoholic options?", answer: "Queenstown Village on Wall St carries Kava Haven and is one of La Jolla's best spots for elevated dining with non alcoholic options. Many La Jolla restaurants are expanding their zero-proof menus as demand grows." },
      { question: "Is kava better than wine for relaxation?", answer: "Kava and wine produce different types of relaxation. Wine contains alcohol, which can impair judgment and cause hangovers. Kava delivers calm without impairment or next-day effects. For people seeking relaxation without the downsides of alcohol, kava is often the preferred choice." },
      { question: "What is a mocktail vs a non alcoholic drink?", answer: "A mocktail is a specific type of non alcoholic drink that mimics a cocktail. Non alcoholic drinks is a broader category that includes NA beers, wines, spirits, kava, adaptogens, and more. Kava Haven falls into the functional beverage category, offering relaxation benefits beyond what a simple mocktail provides." },
      { question: "Where can I buy kava near UCSD?", answer: "The closest source for Kava Haven near UCSD is Queenstown Village in La Jolla or Monday Morning in Pacific Beach. Both are a short drive from campus. You can also order online at mondaymorning-af.com for delivery." },
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
      { question: "Is kava vegan?", answer: "Yes. Kava Haven is plant-based and vegan-friendly. It is made from the root of the Piper methysticum plant with no animal products." },
      { question: "What other non alcoholic drinks are at Moniker General?", answer: "Moniker General carries a curated selection of beverages. For the widest selection of non alcoholic options in the area, visit Monday Morning in Ocean Beach, which stocks over 500 non alcoholic drinks." },
      { question: "Is Liberty Station family friendly?", answer: "Yes. Liberty Station is one of San Diego's most family-friendly destinations. Kava Haven is an adult beverage, but the setting at Moniker General and surrounding Liberty Station is welcoming for all ages." },
      { question: "How do I get to Liberty Station from downtown?", answer: "Liberty Station is a short drive from downtown San Diego, accessible via Rosecrans St or Nimitz Blvd. The area has ample parking and is also reachable by bus. Moniker General is located at 2860 Sims Rd." },
    ],
    peopleAlsoAsk: [
      { question: "What is Liberty Station San Diego known for?", answer: "Liberty Station is a repurposed naval training center that is now home to restaurants, shops, galleries, and public markets. It is known for its food scene, arts district, and community events. Moniker General is one of its standout shops, carrying products like Kava Haven." },
      { question: "What are functional beverages?", answer: "Functional beverages are drinks designed to provide benefits beyond basic hydration. Kava Haven is a functional beverage that promotes relaxation. Other examples include adaptogen drinks, probiotic sodas, and nootropic beverages. Monday Morning carries a wide selection across all categories." },
      { question: "Is kava a nootropic?", answer: "Kava is sometimes grouped with nootropics because of its effects on mental state, but it is more accurately described as an anxiolytic, meaning it reduces anxiety. It promotes calm and social ease rather than cognitive enhancement." },
      { question: "What is the difference between kava and kombucha?", answer: "Kava and kombucha are very different. Kombucha is a fermented tea that contains probiotics and trace amounts of alcohol. Kava is a root-based drink that promotes relaxation. They serve different purposes and have completely different flavor profiles." },
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
      { question: "Is kava good for athletes?", answer: "Many athletes enjoy kava for post-workout or post-competition relaxation. It helps ease tension without the negative effects of alcohol. It is caffeine-free and low-calorie, making it a clean option for active lifestyles." },
      { question: "Are there kava events in Carlsbad?", answer: "The kava scene in North County is growing. Follow Monday Morning on social media for updates on kava tastings and events in the Carlsbad area. Park 101 occasionally features Kava Haven in their drink specials." },
      { question: "What is the best non alcoholic drink for golfers?", answer: "Kava Haven is a great choice for golfers looking to relax without affecting their game. It promotes calm focus without impairment. Many Carlsbad golfers are switching from beer to kava and other non alcoholic options." },
    ],
    peopleAlsoAsk: [
      { question: "Where can I buy non alcoholic drinks in North County San Diego?", answer: "Monday Morning is San Diego's largest non alcoholic bottle shop. While our physical stores are in Pacific Beach and Ocean Beach, we ship throughout North County including Carlsbad. Park 101 in Carlsbad also carries Kava Haven." },
      { question: "Is kava popular in California?", answer: "Yes. Kava is growing rapidly in popularity across California, particularly in wellness-focused coastal communities. San Diego, Los Angeles, and the Bay Area all have thriving kava scenes. Kava Haven is helping bring the drink to a broader audience." },
      { question: "What is the best drink for a sober lifestyle?", answer: "The best drink depends on your preferences. Kava Haven is ideal for social relaxation. Non alcoholic craft beers are great for familiar flavors. Adaptogen drinks offer functional benefits. Monday Morning carries over 500 options to fit any sober or sober curious lifestyle." },
      { question: "Can you buy kava at grocery stores?", answer: "Some grocery stores and natural food markets carry kava products. In Carlsbad, Boney's and other specialty shops may stock Kava Haven. For guaranteed availability and the widest selection, shop Monday Morning online or in-store." },
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
      { question: "Is Kava Haven available at the Oceanside Sunset Market?", answer: "Check Monday Morning's social media for the latest on events and market appearances in Oceanside. We are always expanding our presence in North County." },
      { question: "What is the kava scene like in Oceanside?", answer: "Oceanside's kava scene is growing alongside the broader wellness movement in North County. The Lobby Tiki Bar and Cococabana are leading the way by offering Kava Haven alongside their regular menus. Expect more spots to follow." },
      { question: "Does kava have any taste?", answer: "Yes. Kava has a distinctive earthy, slightly peppery flavor. Kava Haven is formulated to be smoother and more approachable than traditional kava preparations, with subtle tropical notes that make it enjoyable for newcomers." },
    ],
    peopleAlsoAsk: [
      { question: "What is the best tiki bar in Oceanside?", answer: "The Lobby Tiki Bar on Pier View Way is one of Oceanside's standout spots, known for its tropical atmosphere and creative drink menu. They carry Kava Haven as part of their offerings, blending the tiki tradition with modern wellness-forward options." },
      { question: "Is Oceanside a good place to live sober?", answer: "Oceanside is an increasingly great place for sober and sober curious living. The beach culture, outdoor activities, and growing non alcoholic drink scene make it easy to enjoy an active social life without alcohol. Spots like The Lobby Tiki Bar offer kava and other zero-proof options." },
      { question: "What are kavalactones?", answer: "Kavalactones are the active compounds in kava root responsible for its relaxing effects. There are 18 different kavalactones, and the specific combination determines the character of each kava variety. Kava Haven uses noble kava with a balanced kavalactone profile for smooth, pleasant relaxation." },
      { question: "Can kava replace alcohol permanently?", answer: "Many people have successfully replaced alcohol with kava as their social drink of choice. While it does not replicate the taste or buzz of alcohol, it fills the same social role, providing relaxation and connection in group settings without the negative health effects." },
    ],
  },
];

export function getNeighborhoodBySlug(slug: string): KavaNeighborhood | undefined {
  return kavaNeighborhoods.find(n => n.slug === slug);
}

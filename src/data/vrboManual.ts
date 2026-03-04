/**
 * Hand-curated per-unit data pulled directly from VRBO listings.
 * Add more units here as you collect their data.
 * Fields here override the base placeholders in units.ts.
 */
export const vrboManual: Record<
  string,
  {
    title: string;
    description: string;
    highlights: string[];
    images: string[];
    reviews: { name: string; date: string; rating: number; quote: string }[];
  }
> = {
  "87": {
    title: "Garden Lanai Condo",

    description: `Newly renovated 1-bedroom, 1-bath condo in the heart of Kiahuna Plantation — just a short 3-minute walk to Poipu Beach.

This ground-floor unit features dual AC in both the living room and bedroom, a king bed, updated kitchen, and a lanai that opens directly onto Kiahuna's beautiful great lawn.

Perfect for couples or small families looking for an easy, walkable stay on Kauai's south shore.`,

    highlights: [
      "King bed + sofa bed (sleeps 4)",
      "Dual AC (living room + bedroom)",
      "Fully remodeled interior (2023)",
      '55" Smart TV + bedroom TV',
      "Fast WiFi",
      "Ground-floor lanai with lawn access",
      "Free on-site parking",
      "Self-service laundry on property",
      "Beach chairs, umbrella & boogie boards included",
      "Complimentary access to Poipu Beach Athletic Club",
    ],

    images: [
      "https://media.vrbo.com/lodging/97000000/96110000/96104400/96104334/f57a2e28.jpg",
      "https://media.vrbo.com/lodging/97000000/96110000/96104400/96104334/8b11082b.jpg",
      "https://media.vrbo.com/lodging/97000000/96110000/96104400/96104334/7da1caf3.jpg",
      "https://media.vrbo.com/lodging/97000000/96110000/96104400/96104334/a308c38d.jpg",
      "https://media.vrbo.com/lodging/97000000/96110000/96104400/96104334/7b1fe4a9.jpg",
      "https://media.vrbo.com/lodging/97000000/96110000/96104400/96104334/c04a3ccb.jpg",
      "https://media.vrbo.com/lodging/97000000/96110000/96104400/96104334/4ead83ef.jpg",
      "https://media.vrbo.com/lodging/97000000/96110000/96104400/96104334/76799475.jpg",
      "https://media.vrbo.com/lodging/97000000/96110000/96104400/96104334/ebec80af.jpg",
    ],

    reviews: [
      {
        name: "Rebecca S.",
        date: "September 2025",
        rating: 10,
        quote:
          "Perfect for a getaway. Clean, well maintained, and fully stocked — including beach chairs and boogie boards. The beach is just a short walk and the host was incredibly responsive. We'll definitely be back.",
      },
      {
        name: "Howard J.",
        date: "October 2025",
        rating: 10,
        quote:
          "Excellent location near Poipu Beach. We loved walking over for sunsets each evening. Access to the Poipu Beach Athletic Club pool was a bonus.",
      },
      {
        name: "Nancy T.",
        date: "November 2025",
        rating: 10,
        quote:
          "The unit was exactly as advertised and pictured. The host provided helpful information and checked in to make sure everything was perfect.",
      },
      {
        name: "Lisa H.",
        date: "December 2025",
        rating: 10,
        quote:
          "Very well-appointed unit. We appreciated the thoughtful welcome note and personal touches.",
      },
      {
        name: "Kristen M.",
        date: "September 2025",
        rating: 10,
        quote: "Great condo! Looking forward to going back.",
      },
    ],
  },

  "35": {
    title: "Ocean View Balcony Condo",

    description: `A rare top-floor corner unit in Building 7 with a sweeping ocean view over Kiahuna's Great Lawn — plus the comfort upgrade of AC in both the living room and bedroom.

This remodeled 1-bedroom, 1-bath condo features a Cal king bed, a queen sofa bed, updated kitchen and bathroom, new flooring, and a private lanai that looks straight out toward the water. With no unit above you, it's a quiet, breezy stay in one of Kiahuna's most iconic locations.

Ideal for couples or small families who want ocean views, walkable beach access, and modern comfort in the heart of Poipu.`,

    highlights: [
      "Ocean view over Kiahuna's Great Lawn",
      "Top-floor corner unit (2nd floor) — no one above",
      "Dual AC (living room + bedroom)",
      "Cal king bed + sofa bed (sleeps 4)",
      "Remodeled kitchen & bathroom",
      'Brand new 55" Smart TV + TV in bedroom',
      "Fast WiFi",
      "Free parking",
      "Beach chairs, umbrella, boogie board & cooler included",
      "Complimentary access to Poipu Beach Athletic Club",
      "On-site washer/dryer (coin operated)",
    ],

    images: [
      "https://media.vrbo.com/lodging/63000000/62960000/62954900/62954874/3307de68.jpg",
      "https://media.vrbo.com/lodging/63000000/62960000/62954900/62954874/2f5b9551.jpg",
      "https://media.vrbo.com/lodging/63000000/62960000/62954900/62954874/b8a9e042.jpg",
      "https://media.vrbo.com/lodging/63000000/62960000/62954900/62954874/746ac849.jpg",
      "https://media.vrbo.com/lodging/63000000/62960000/62954900/62954874/038893d8.jpg",
    ],

    reviews: [
      {
        name: "Julie A.",
        date: "August 2025",
        rating: 10,
        quote:
          "Beautiful and comfortable space with amazing views. We were so relieved to have the AC in the afternoons. Will definitely be back!",
      },
      {
        name: "Patricia",
        date: "September 2025",
        rating: 10,
        quote:
          "The view of the ocean and sunset is amazing. Deena is a terrific host—quick to respond and thoughtful with details. Clean, comfy, quiet. Highly recommend.",
      },
      {
        name: "G K.",
        date: "June 2025",
        rating: 10,
        quote:
          "Perfect location with a great view of the beach. Lovely decor with quality upgrades. We've been coming to Kauai for decades and this is the best spot we've found.",
      },
      {
        name: "Steve J.",
        date: "March 2025",
        rating: 10,
        quote:
          "Property was clean and as advertised. Owners went above and beyond to be helpful. The grounds were spectacular and the views were stunning.",
      },
      {
        name: "Jodie W.",
        date: "January 2025",
        rating: 10,
        quote:
          "Fabulous location. Beautifully decorated and we appreciated the upgraded kitchen. We loved the relaxing ocean view.",
      },
    ],
  },

  "56": {
    title: "Corner Garden Lanai Condo",

    description: `A beautifully remodeled ground-floor corner unit in Building 11, offering one of the most comfortable and convenient stays at Kiahuna Plantation.

This 1-bedroom, 1-bath condo features dual AC in both the living room and bedroom, a king bed, upgraded flooring, and a fully renovated kitchen and bathroom. The private lanai opens directly onto the lawn, creating a relaxed indoor-outdoor space perfect for morning coffee or sunset drinks.

Ideal for couples or small families looking for a quiet garden setting with modern upgrades — all just a short walk to Poipu Beach.`,

    highlights: [
      "Dual AC (living room + bedroom)",
      "King bed + sofa bed (sleeps 4)",
      "Fully remodeled kitchen & bathroom",
      "Ground-floor corner unit",
      "Private lanai opening to lawn",
      "Fast WiFi",
      "Free parking",
      "Beach chairs, umbrella, boogie boards & cooler included",
      "Complimentary access to Poipu Beach Athletic Club",
      "On-site washer/dryer (coin operated)",
    ],

    images: [
      "https://media.vrbo.com/lodging/104000000/103640000/103636400/103636320/a99c9521.jpg",
      "https://media.vrbo.com/lodging/104000000/103640000/103636400/103636320/6cc53114.jpg",
      "https://media.vrbo.com/lodging/104000000/103640000/103636400/103636320/f5690a51.jpg",
      "https://media.vrbo.com/lodging/104000000/103640000/103636400/103636320/9ae49d55.jpg",
      "https://media.vrbo.com/lodging/104000000/103640000/103636400/103636320/79f2281b.jpg",
      "https://media.vrbo.com/lodging/104000000/103640000/103636400/103636320/d2bc311b.jpg",
      "https://media.vrbo.com/lodging/104000000/103640000/103636400/103636320/04ed2c0d.jpg",
      "https://media.vrbo.com/lodging/104000000/103640000/103636400/103636320/47a162bb.jpg",
      "https://media.vrbo.com/lodging/104000000/103640000/103636400/103636320/958b70f5.jpg",
    ],

    reviews: [
      {
        name: "Sam R.",
        date: "January 2026",
        rating: 10,
        quote:
          "Incredible stay here. The thoughtful personal recommendations were amazing and made our honeymoon trip even more special. Quiet, calm, and beautifully maintained.",
      },
      {
        name: "Sabrina C.",
        date: "November 2025",
        rating: 10,
        quote:
          "Beautiful condo with everything we needed to make our trip great. The owners were wonderful and easy to reach.",
      },
      {
        name: "Robert P.",
        date: "January 2026",
        rating: 10,
        quote:
          "Deena was an outstanding host and provided incredibly helpful information before our trip. It made celebrating our 60th wedding anniversary here even more special.",
      },
      {
        name: "Penny L.",
        date: "October 2025",
        rating: 10,
        quote:
          "Beautifully remodeled unit. The AC worked great and the corner location gives a really nice breeze.",
      },
      {
        name: "Charles M.",
        date: "October 2025",
        rating: 10,
        quote:
          "Great stay and great communication. The beach equipment was a huge help and the location was perfect.",
      },
    ],
  },

  "151": {
    title: "Garden Lanai Condo",

    description: `One of the rare Kiahuna condos with dual AC in both the living room and bedroom — a true comfort upgrade on Kauai's south shore.

This newly remodeled 1-bedroom, 1-bath ground-floor condo features a king bed, updated kitchen, new furnishings, and a private lanai that opens directly to the lawn. You're perfectly positioned for an easy walk to the beach, plus quick access to the Poipu Shopping Village.

Ideal for couples or small families who want modern comfort, a calm garden setting, and a walkable Poipu stay.`,

    highlights: [
      "Dual AC (living room + bedroom)",
      "King bed + sofa bed (sleeps 4)",
      "Remodeled interior + updated furnishings",
      "Ground-floor lanai opening to lawn",
      "Fast WiFi",
      "Smart TV in living room + TV in bedroom",
      "Free parking",
      "Beach chairs, umbrella, boogie board & cooler included",
      "Complimentary access to Poipu Beach Athletic Club",
      "On-site washer/dryer (coin operated)",
    ],

    images: [
      "https://media.vrbo.com/lodging/36000000/35380000/35379600/35379574/2eb051c0.jpg",
      "https://media.vrbo.com/lodging/36000000/35380000/35379600/35379574/3059bc48.jpg",
      "https://media.vrbo.com/lodging/36000000/35380000/35379600/35379574/3fad433e.jpg",
      "https://media.vrbo.com/lodging/36000000/35380000/35379600/35379574/5bd0842a.jpg",
      "https://media.vrbo.com/lodging/36000000/35380000/35379600/35379574/513bff40.jpg",
    ],

    reviews: [
      {
        name: "Brenda F.",
        date: "June 2025",
        rating: 10,
        quote:
          "Highly recommend. Ground-level access, A/C, newly remodeled, and a super responsive owner — the lawn right outside was perfect for our family.",
      },
      {
        name: "Kenneth W.",
        date: "February 2025",
        rating: 10,
        quote:
          "The property was absolutely gorgeous and the location couldn't have been better. The owner was a pleasure to work with and really wanted us to have the best experience.",
      },
      {
        name: "Kevin M.",
        date: "March 2025",
        rating: 10,
        quote:
          "Beautifully appointed, clean, and in a fabulous location. Exactly as advertised.",
      },
      {
        name: "Joseph G.",
        date: "November 2024",
        rating: 10,
        quote:
          "Amazing location and a beautiful unit. We loved the lanai opening to the grass and the short path to the beach.",
      },
      {
        name: "Carol P.",
        date: "June 2024",
        rating: 10,
        quote:
          "Outstanding stay — supplies, decor, comfort, and location were all perfect. We highly recommend this unit.",
      },
    ],
  },

  "128": {
    title: "Garden Lanai Condo · Dual AC",

    description: `One of the rare Kiahuna units with dual AC in both the living room and bedroom — a true comfort upgrade on Kauai's south shore.

This fully renovated 1-bedroom, 1-bath ground-floor condo features a king bed, updated kitchen, wood floors, and a private lanai just steps from the lawn and BBQ area.

Ideal for couples or small families looking for a walkable beach stay with modern comfort.`,

    highlights: [
      "Dual AC (living room + bedroom)",
      "King bed + sofa bed (sleeps 4)",
      "Fully renovated interior",
      "Ground-floor lanai near BBQ",
      "Fast WiFi",
      "Free parking",
      "Beach chairs, umbrella & cooler included",
      "Complimentary access to Poipu Beach Athletic Club",
      "On-site washer/dryer (coin operated)",
    ],

    images: [
      "https://media.vrbo.com/lodging/34000000/33500000/33492900/33492811/96a13c8c.jpg",
      "https://media.vrbo.com/lodging/34000000/33500000/3349492811/1d192752.jpg",
      "https://media.vrbo.com/lodging/34000000/33500000/33492900/33492811/813e1182.jpg",
      "https://media.vrbo.com/lodging/34000000/33500000/33492900/33492811/e14d6f47.jpg",
      "https://media.vrbo.com/lodging/34000000/33500000/33492900/33492811/740988ec.jpg",
      "https://media.vrbo.com/lodging/34000000/33500000/33492900/33492811/00bfe2b1.jpg",
      "https://media.vrbo.com/lodging/34000000/33500000/33492900/33492811/54d202fc.jpg",
      "https://media.vrbo.com/lodging/34000000/33500000/33492900/33492811/045f378c.jpg",
      "https://media.vrbo.com/lodging/34000000/33500000/33492900/33492811/763a3ce5.jpg",
      "https://media.vrbo.com/lodging/34000000/33500000/33492900/33492811/w1919h1124x5y0-2adf76ae.jpg",
    ],

    reviews: [
      {
        name: "Denise M.",
        date: "July 2025",
        rating: 10,
        quote:
          "Updated, immaculate, and comfortable. Check-in was smooth and checkout was effortless. Now that's a vacation.",
      },
      {
        name: "Carol B.",
        date: "August 2025",
        rating: 10,
        quote:
          "Clean and comfortable. Equipped with everything you need for the beach — chairs, umbrella, and cooler. The AC is a huge plus.",
      },
      {
        name: "Diane P.",
        date: "July 2025",
        rating: 10,
        quote:
          "Excellent location close to the beach, pool, and shady lawn & BBQ area. Perfect vacation.",
      },
      {
        name: "Tricia P.",
        date: "August 2025",
        rating: 10,
        quote:
          "Loved the condo and property. Easy access to beaches by walking or short drive. We'll return.",
      },
      {
        name: "Karen K.",
        date: "April 2025",
        rating: 10,
        quote: "The best place we've stayed in the plantation. Love it and the helpful owners!",
      },
    ],
  },
};

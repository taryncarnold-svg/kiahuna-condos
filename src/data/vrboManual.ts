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
    title: "Remodeled Ground Floor Condo · AC · 3-Min Walk to Poipu Beach",

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
};

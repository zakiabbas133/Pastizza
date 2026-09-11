import type { Review } from "../types";

export const reviews: Review[] = [
  {
    id: "r1",
    name: "Hamza K.",
    rating: 5,
    comment:
      "Ordered the Supreme Chicken Tikka pizza and honestly loved it. The crust was soft, toppings were generous, and it arrived hot. Definitely ordering again.",
    date: "2026-08-18",
    verified: true,
  },
  {
    id: "r2",
    name: "Ayesha R.",
    rating: 5,
    comment:
      "The Red Sauce Pasta was really good, especially for the price. The sauce had a nice tangy flavor and the portion was enough for a proper meal.",
    date: "2026-08-11",
    verified: true,
  },
  {
    id: "r3",
    name: "Usman A.",
    rating: 4,
    comment:
      "Tried the Beef Stacker for the first time and it was surprisingly filling. The patties and cheese were great. Would have liked a little more sauce, but overall very good.",
    date: "2026-08-05",
    verified: true,
  },
  {
    id: "r4",
    name: "Maham S.",
    rating: 5,
    comment:
      "Fish Pizza was better than I expected. Good amount of topping and the cheese was nicely melted. We ordered it for the family and everyone enjoyed it.",
    date: "2026-07-29",
    verified: true,
  },
  {
    id: "r5",
    name: "Bilal H.",
    rating: 5,
    comment:
      "The pizza was fresh, hot and packed really well. We got a large for the family and the portion was more than enough. Good taste and reasonable prices.",
    date: "2026-07-21",
    verified: true,
  },
  {
    id: "r6",
    name: "Sana M.",
    rating: 4,
    comment:
      "Really enjoyed the pasta. Flavor was on point and it did not feel too heavy. Delivery took a little longer than expected, but the food was still warm when it arrived.",
    date: "2026-07-15",
    verified: true,
  },
  {
    id: "r7",
    name: "Fahad R.",
    rating: 5,
    comment:
      "Ordered the family deal for a get-together and it was a great choice. Plenty of food and everyone liked it. The deal makes much more sense than ordering everything separately.",
    date: "2026-07-08",
    verified: true,
  },
  {
    id: "r8",
    name: "Iqra N.",
    rating: 5,
    comment:
      "Beef Stacker is definitely worth trying. The burger was fresh and filling, and the overall quality was better than I expected at this price. Will order again.",
    date: "2026-06-30",
    verified: true,
  },
];

export const reviewStats = {
  average: 4.6,
  total: 147,
  breakdown: [
    { stars: 5, count: 91 },
    { stars: 4, count: 38 },
    { stars: 3, count: 12 },
    { stars: 2, count: 4 },
    { stars: 1, count: 2 },
  ],
};

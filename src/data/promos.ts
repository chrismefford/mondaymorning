// Time-boxed site promos. Everything that advertises a promo (announcement bar,
// nav link, home banner, the promo page itself) reads from here so they all
// switch off at the same moment.

export const THANKSGIVING_2026 = {
  path: "/thanksgiving",
  // Pre-orders close Mon Nov 23, 11:59 PM Pacific (PST = UTC-8)
  orderCutoff: new Date("2026-11-24T07:59:00Z"),
  orderBy: "Monday, November 23",
  orderByShort: "Mon 11/23",
  pickupDay: "Wednesday, November 25",
  pickupDayShort: "Wed 11/25",
  pickupHours: "11 AM to 8 PM",
};

export const isThanksgivingOpen = (now: number = Date.now()) => now < THANKSGIVING_2026.orderCutoff.getTime();

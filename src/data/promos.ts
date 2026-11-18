// Time-boxed site promos. Everything that advertises a promo (announcement bar,
// nav link, home banner, the promo page itself) reads from here so they all
// switch off at the same moment.

export const THANKSGIVING_2026 = {
  path: "/thanksgiving",
  // Pre-orders close Tue Nov 24, 11:59 PM Pacific (PST = UTC-8). Zane 11-16: moved from Mon 11/23 to Tue 11/24.
  orderCutoff: new Date("2026-11-25T07:59:00Z"),
  orderBy: "Tuesday, November 24",
  orderByShort: "Tue 11/24",
  pickupDay: "Wednesday, November 25",
  pickupDayShort: "Wed 11/25",
  pickupHours: "11 AM to 8 PM",
};

export const isThanksgivingOpen = (now: number = Date.now()) => now < THANKSGIVING_2026.orderCutoff.getTime();

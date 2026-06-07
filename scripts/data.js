/*
  Becoming Bergkamp :: Wedding Party Hub
  All content lives here. Edit copy, add a bachelorette look, or change a time
  by editing this file only. Layout code never needs to change.

  Hard rules honored throughout this file:
   - No em dashes anywhere.
   - Wedding colors are always written exactly as
     "black and white with hints of greenery and notes of antique gold".
*/

/* Build a keyless Google Maps embed + link pair from a plain text query. */
function mapFor(query) {
  var q = encodeURIComponent(query);
  return {
    query: query,
    embed: "https://www.google.com/maps?q=" + q + "&output=embed",
    link: "https://www.google.com/maps?q=" + q
  };
}

var DATA = {

  /* ---------------------------------------------------------------- HOME */
  home: {
    kicker: "we're getting married",
    headline: ["Becoming ", "Bergkamp"], // second word renders italic gold
    meta: "March 20, 2027 · Wichita, Kansas",
    cards: [
      {
        route: "#/bachelorette",
        theme: "card--sea",
        tag: "all you sea is love",
        title: "Bachelorette Trip",
        subtitle: "Myrtle Beach · August 2026"
      },
      {
        route: "#/day-before",
        theme: "card--greenery",
        tag: "friday",
        title: "The Day Before",
        subtitle: "Rehearsal, blessing & dinner"
      },
      {
        route: "#/day-of",
        theme: "card--blackgold",
        tag: "the big day",
        title: "The Day Of",
        subtitle: "Ceremony, reception & attire"
      }
    ],
    footerScript: "sea you soon",
    footerLine: "Built for our people, with love"
  },

  /* -------------------------------------------------------- BACHELORETTE */
  bachelorette: {
    hero: {
      kicker: "all you",
      headline: "SEA is Love",
      subtitle: "Myrtle Beach, South Carolina · August 2026"
    },

    // Sticky day-jump pills. anchor matches each day's id.
    jump: [
      { label: "The House", anchor: "house" },
      { label: "Thu · Beach Club", anchor: "thursday" },
      { label: "Fri · Something Blue", anchor: "friday-blue" },
      { label: "Fri · Rainbow Fish", anchor: "friday-rainbow" },
      { label: "Sat · Boardwalk", anchor: "boardwalk" },
      { label: "Sat · Coco Nuts", anchor: "coconuts" },
      { label: "Sunday", anchor: "sunday" }
    ],

    house: {
      eyebrow: "Home Base",
      title: "The River Club House",
      address: "83 Carrington Dr, Pawleys Island, SC",
      note: "Inside the River Club golf community, steps from Litchfield Beach.",
      map: mapFor("83 Carrington Dr Pawleys Island SC")
    },

    days: [
      {
        id: "thursday",
        theme: "day--thursday",
        label: "thursday",
        title: "Beach Club",
        hook: "Members Only",
        vibe: "We kick things off low-key and luxe. A members-only night in at the house, with palms-and-gold-rimmed-glasses energy and nowhere to be.",
        wear: "resort chic, white or cream",
        swatches: [
          { name: "emerald", hex: "#2C5C4F" },
          { name: "hunter", hex: "#2C5F34" },
          { name: "cream", hex: "#F4EFE3" },
          { name: "white", hex: "#FFFFFF" },
          { name: "gold", hex: "#C9A24B" }
        ]
      },
      {
        id: "friday-blue",
        theme: "day--blue",
        label: "friday · day",
        title: "Something Blue",
        hook: "Something Blue",
        vibe: "Beach day, all in blue. Toes in the sand at Litchfield, drinks the color of the ocean, the brightest day of the trip.",
        wear: "a blue swimsuit, any blue you love",
        swatches: [
          { name: "sky", hex: "#8EC5E8" },
          { name: "cobalt", hex: "#1366C9" },
          { name: "turquoise", hex: "#2BB3C0" },
          { name: "navy", hex: "#16314E" },
          { name: "sand", hex: "#E6D8BD" }
        ]
      },
      {
        id: "friday-rainbow",
        theme: "day--rainbow",
        label: "friday · night",
        title: "Rainbow Fish",
        // Iridescent background and hand-lettered banner for this section.
        bg: "assets/img/rainbow/rainbow-bg.png",
        banner: "assets/img/rainbow/rainbow-banner.png",
        hook: "Catch the Shimmer",
        vibe: "The showstopper. Iridescent everything, glitter scales on our arms, the whole crew shimmering under the lights.",
        wear: "any rainbow color, shimmery, glittery or silky",
        secondary: "No need to match anyone. Pick your shade and shine.",
        swatches: [
          { name: "opal", hex: "#EAE6F2" },
          { name: "pink", hex: "#FF3FA4" },
          { name: "tangerine", hex: "#FF8A3D" },
          { name: "gold", hex: "#FFD23F" },
          { name: "emerald", hex: "#2FBF71" },
          { name: "azure", hex: "#3FA9FF" },
          { name: "violet", hex: "#8A4FFF" }
        ]
      },
      {
        id: "boardwalk",
        theme: "day--boardwalk",
        label: "saturday · day",
        title: "Boardwalk",
        hook: "Boardwalk & Chill",
        vibe: "Slow morning, then we wander Broadway at the Beach. Shops, snacks, sunshine and string lights when the sky goes pink.",
        wear: "whatever's comfy, sundress and sneakers",
        looksWidget: true, // renders the Pick Your Shorts widget inline
        location: {
          eyebrow: "On the Map",
          title: "Broadway at the Beach",
          detail: "Myrtle Beach, SC · about 30 minutes north of the house",
          map: mapFor("Broadway at the Beach Myrtle Beach SC")
        }
      },
      {
        id: "coconuts",
        theme: "day--coconuts",
        label: "saturday · night",
        title: "Let's Go Coco Nuts",
        hook: "Golden Hour, Golden Crew",
        vibe: "Our fancy night. A sunset catamaran cruise through the Murrells Inlet marsh, dressed to the nines as the sky turns gold.",
        wear: "any shade of brown, bronze, coconut or coffee",
        swatches: [
          { name: "bronze", hex: "#A9742E" },
          { name: "coconut", hex: "#6B4226" },
          { name: "terracotta", hex: "#C56B4A" },
          { name: "coral", hex: "#E58A6F" },
          { name: "sungold", hex: "#E8B14C" }
        ],
        location: {
          eyebrow: "On the Map",
          title: "Murrells Inlet Sunset Cruise",
          detail: "MarshWalk, Murrells Inlet, SC · catamaran departs at golden hour",
          map: mapFor("Murrells Inlet MarshWalk SC")
        }
      },
      {
        id: "sunday",
        theme: "day--sunday",
        label: "sunday",
        title: "Slow Goodbyes",
        vibe: "One last coffee, big hugs, and home we go. Travel safe, and sea you soon."
      }
    ],

    footerScript: "all you sea is love",
    footerLine: "Bachelorette · Myrtle Beach 2026"
  },

  /* --------------------------------------------------------- DAY BEFORE */
  dayBefore: {
    hero: {
      kicker: "friday",
      headline: "The Day Before",
      subtitle: "March 19, 2027"
    },
    schedule: [
      {
        time: "11 to 1",
        name: "Rehearsal",
        venue: "Central Community Church",
        place: "Wichita, Kansas",
        when: "11:00 AM to 1:00 PM",
        map: mapFor("Central Community Church Wichita KS")
      },
      {
        time: "4:00",
        name: "Blessing Ceremony",
        venue: "The Chapel at Saint Rose Mount Vernon",
        place: "Cheney, Kansas",
        when: "4:00 PM",
        map: mapFor("Saint Rose Mount Vernon Cheney KS")
      },
      {
        time: "After",
        name: "Rehearsal Dinner",
        venue: "The Hall at Saint Rose Mount Vernon",
        place: "Cheney, Kansas",
        when: "to follow the blessing"
        // no map for this one
      }
    ],
    footerScript: "see you there",
    footerLine: "Friday · March 19, 2027"
  },

  /* ------------------------------------------------------------ DAY OF */
  dayOf: {
    hero: {
      kicker: "at last",
      headline: ["The ", "Day Of"], // first word renders gold italic
      subtitle: "March 20, 2027 · Wichita, Kansas"
    },
    schedule: [
      {
        time: "4:00",
        name: "Ceremony",
        venue: "Central Community Church",
        place: "Wichita, Kansas",
        when: "4:00 PM",
        map: mapFor("Central Community Church Wichita KS")
      },
      {
        time: "6:00",
        name: "Reception",
        venue: "Brick + Mortar",
        place: "Wichita, Kansas",
        when: "6:00 PM",
        map: mapFor("Brick and Mortar Wichita KS")
      }
    ],
    scheduleNote: "All times are subject to change",
    colors: {
      eyebrow: "The Palette",
      title: "Our Colors",
      dots: [
        { name: "black", hex: "#15130F" },
        { name: "white", hex: "#FFFFFF" },
        { name: "greenery", hex: "#4A7A4E" },
        { name: "antique gold", hex: "#C9A24B" }
      ],
      statement: "Black and white with hints of greenery and notes of antique gold."
    },
    attire: {
      eyebrow: "Bridesmaids",
      title: "What to Wear",
      body: "Long black silk. The neckline and the cut are completely yours. The goal is simple: feel sexy, and choose a dress you will reach for again.",
      tag: "Inspiration coming soon"
    },
    footerScript: "becoming bergkamp",
    footerLine: "March 20, 2027"
  },

  /* ----------------------------------------- BOARDWALK SHORTS (WIDGET) */
  boardwalk: {
    kicker: "saturday · boardwalk",
    title: "Pick Your Shorts",
    intro: "Same shirt for everyone, your choice of shorts. Tap a look to see it bigger, then shop your favorite.",
    teeNote: "Everyone gets the same tee",
    teeSub: "It's a surprise, so it's shown blank here. Just pick your shorts.",
    footerScript: "boardwalk & chill",
    footerLine: "All You Sea Is Love · Myrtle Beach 2026",

    // Add a look later: drop an image in assets/img/looks/ and append one object.
    // shop: "" or "#" renders a non-clickable "Link coming soon" pill.
    looks: [
      {
        img: "assets/img/looks/lace-trim.jpg",
        num: "01",
        name: "The Lace Trim",
        desc: "Soft drawstring shorts with a scalloped lace hem. Sweet and breezy.",
        shop: ""
      },
      {
        img: "assets/img/looks/denim-cutoffs.jpg",
        num: "02",
        name: "The Denim Cutoffs",
        desc: "Light-wash frayed denim. The easy, classic boardwalk look.",
        shop: ""
      },
      {
        img: "assets/img/looks/seersucker-ruffle.jpg",
        num: "03",
        name: "The Seersucker Ruffle",
        desc: "Blue striped smocked shorts with a bow and ruffle hem.",
        shop: ""
      }
    ]
  }
};

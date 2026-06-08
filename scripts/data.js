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
      subtitle: "Myrtle Beach, South Carolina · August 2026",
      // Full-width header art for the whole bachelorette page. Leads the page
      // with the banner instead of the round badge. Set to "" to fall back to
      // the badge + lettering hero.
      banner: "assets/img/brand/sea-header.png"
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
        label: "thursday · night in",
        title: "Beach Club",
        // Hero crest on blue, plus the matching no-text wash behind the section.
        banner: "assets/img/beachclub/beachclub-banner.png",
        bannerKeepsTitle: true, // crest art does not spell the day, keep the word
        bg: "assets/img/beachclub/beachclub-bg.png",
        hook: "Members Only",
        vibe: "We kick the weekend off with a cozy night in at the house. Crafts at the table, a few rounds of trivia, and silly get to know you games to break the ice. Low key, low pressure, and where all the inside jokes start.",
        wear: "comfy and cute, beach club lounge",
        meals: {
          dinner: "Dinner in at the house"
        },
        // Forms feed the trivia and games. Links land here later (href "" shows
        // a non-clickable "coming soon" pill, no submissions on this site).
        forms: {
          eyebrow: "Before the games",
          title: "Fill these out for us",
          note: "A few quick forms feed into the trivia and games we will play that night. The links land here soon, so check back before the trip.",
          items: [
            { label: "Get to know the bride", href: "" },
            { label: "How well do you know Laura & William", href: "" },
            { label: "Two truths and a lie", href: "" }
          ]
        },
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
        // Hand-lettered "Something Blue Before I Do" banner over clear water.
        banner: "assets/img/blue/something-blue-banner.png",
        bg: "assets/img/blue/something-blue-bg.jpg",
        hook: "Toes in the Sand",
        vibe: "Beach day, all in blue. We post up at Litchfield Beach, drinks the color of the ocean, the brightest, easiest day of the trip.",
        wear: "a blue swimsuit, any blue you love",
        transport: "Litchfield Beach is a quick three minute drive from the house, and we have the ride covered. Just hop in.",
        meals: {
          breakfast: "At the house",
          lunch: "Beach picnic at Litchfield, packed from the house"
        },
        swatches: [
          { name: "sky", hex: "#8EC5E8" },
          { name: "cobalt", hex: "#1366C9" },
          { name: "turquoise", hex: "#2BB3C0" },
          { name: "navy", hex: "#16314E" },
          { name: "sand", hex: "#E6D8BD" }
        ],
        location: {
          eyebrow: "On the Map",
          title: "Litchfield Beach",
          detail: "Pawleys Island, SC · about three minutes from the house, transportation provided",
          map: mapFor("Litchfield Beach Pawleys Island SC")
        }
      },
      {
        id: "friday-rainbow",
        theme: "day--rainbow",
        label: "friday · night",
        title: "Rainbow Fish",
        // Iridescent mermaid-scale background and hand-lettered banner.
        bg: "assets/img/rainbow/rainbow-bg.png",
        banner: "assets/img/rainbow/rainbow-banner.png",
        hook: "Catch the Shimmer",
        vibe: "The showstopper. Iridescent everything, glitter scales on our arms, the whole crew shimmering as we head out for the night.",
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
        ],
        location: {
          eyebrow: "Dinner & Out",
          title: "RipTydz Oceanfront Grille & Rooftop Bar",
          detail: "Myrtle Beach, SC · oceanfront dinner and a rooftop bar to kick the night off",
          address: "1210 N Ocean Blvd, Myrtle Beach, SC 29577",
          website: "https://riptydz.com",
          links: [
            { label: "Food menu", href: "https://riptydz.com/food-menu" },
            { label: "Drink menu", href: "https://riptydz.com/drink-menu" }
          ],
          map: mapFor("RipTydz 1210 N Ocean Blvd Myrtle Beach SC 29577"),
          photos: [
            { src: "assets/img/photos/rainbow/riptydz-exterior.jpeg", label: "RipTydz · outside", alt: "RipTydz Oceanfront Grille seen from the beach boardwalk" },
            { src: "assets/img/photos/rainbow/riptydz-rooftop-sunset.jpeg", label: "The rooftop bar", alt: "RipTydz rooftop bar at sunset, string lights over the ocean" },
            { src: "assets/img/photos/rainbow/oceanfront-pier-sunset.jpeg", label: "Oceanfront, golden hour", alt: "Myrtle Beach oceanfront, the pier and SkyWheel at sunset" }
          ]
        }
      },
      {
        id: "boardwalk",
        theme: "day--boardwalk",
        label: "saturday · day",
        title: "Boardwalk",
        hook: "Boardwalk & Chill",
        vibe: "Slow morning, then we wander Broadway at the Beach. Shops, snacks, sunshine, and string lights when the sky goes pink.",
        wear: "whatever's comfy, sundress and sneakers",
        meals: {
          breakfast: "At the house",
          lunch: {
            place: "Margaritaville at Broadway at the Beach",
            address: "1114 Celebrity Circle, Myrtle Beach, SC 29577",
            website: "https://www.margaritavillemyrtlebeach.com",
            links: [
              { label: "Menu", href: "https://www.margaritavillemyrtlebeach.com/menu" }
            ],
            photos: [
              { src: "assets/img/photos/boardwalk/margaritaville-exterior-fountain.jpeg", label: "Margaritaville · outside", alt: "Margaritaville exterior with the fountain and pirate ship" },
              { src: "assets/img/photos/boardwalk/margaritaville-interior.jpeg", label: "Margaritaville · inside", alt: "Colorful Margaritaville dining room" }
            ]
          }
        },
        looksWidget: true, // renders the Pick Your Shorts carousel inline
        location: {
          eyebrow: "On the Map",
          title: "Broadway at the Beach",
          detail: "Myrtle Beach, SC · about 30 minutes north of the house",
          website: "https://www.broadwayatthebeach.com",
          map: mapFor("Broadway at the Beach Myrtle Beach SC"),
          photos: [
            { src: "assets/img/photos/boardwalk/broadway-aerial-lighthouse.jpeg", label: "Broadway at the Beach", alt: "Aerial of Broadway at the Beach, the lake and the lighthouse" },
            { src: "assets/img/photos/boardwalk/broadway-shops-kaldis.jpeg", label: "The promenade", alt: "Shop promenade at Broadway at the Beach" }
          ]
        }
      },
      {
        id: "coconuts",
        theme: "day--coconuts",
        label: "saturday · night",
        title: "Let's Go Coco Nuts",
        // Retro "Let's Go Coconuts" banner over warm tan stripes.
        banner: "assets/img/coconuts/coconuts-banner.png",
        bg: "assets/img/coconuts/coconuts-bg.png",
        hook: "Golden Hour, Golden Crew",
        vibe: "Our fancy night. Dressed to the nines, out on the water, then dinner along the Murrells Inlet MarshWalk as we keep the night going right there in the inlet.",
        // Sunset tour gets its own warm, layered sunset panel.
        sunset: {
          eyebrow: "The Sunset Tour",
          title: "Happy hour on the water",
          body: "First a happy hour catamaran cruise through the Murrells Inlet marsh as the sky turns gold and pink.",
          cost: "Happy hour and sunset cruises run about $30 to $60 per person depending on the boat and the season.",
          link: { label: "Sunset cruise details", href: "https://myrtlebeachsailingcruises.com/sunset-cruise" },
          photos: [
            { src: "assets/img/photos/coconuts/sunset-cruise-deck.jpeg", label: "The sunset cruise", alt: "Watching the sun set from the deck of the cruise boat" }
          ]
        },
        wear: "any shade of brown, bronze, coconut or coffee",
        meals: {
          dinner: {
            place: "Wicked Tuna on the MarshWalk",
            address: "4123 US-17 BUS, Murrells Inlet, SC 29576",
            website: "https://www.thewickedtuna.com",
            links: [
              { label: "Menus", href: "https://www.thewickedtuna.com/murrells-inlet-menus" },
              { label: "Drink menu", href: "https://www.thewickedtuna.com/menu/drink-menu" }
            ],
            photos: [
              { src: "assets/img/photos/coconuts/wickedtuna-deck.png", label: "Wicked Tuna · outside", alt: "Wicked Tuna waterfront deck over the marina" },
              { src: "assets/img/photos/coconuts/wickedtuna-interior-dining.jpeg", label: "Wicked Tuna · inside", alt: "Wicked Tuna dining room over the inlet at night" }
            ]
          }
        },
        swatches: [
          { name: "bronze", hex: "#A9742E" },
          { name: "coconut", hex: "#6B4226" },
          { name: "terracotta", hex: "#C56B4A" },
          { name: "coral", hex: "#E58A6F" },
          { name: "sungold", hex: "#E8B14C" }
        ],
        location: {
          eyebrow: "On the Map",
          title: "Murrells Inlet MarshWalk",
          detail: "Murrells Inlet, SC · happy hour cruise, then dinner and drinks at Wicked Tuna on the MarshWalk",
          website: "https://marshwalk.com",
          map: mapFor("Murrells Inlet MarshWalk SC"),
          photos: [
            { src: "assets/img/photos/coconuts/marshwalk-sunset.webp", label: "Murrells Inlet MarshWalk", alt: "Murrells Inlet MarshWalk glowing at sunset" },
            { src: "assets/img/photos/coconuts/marshwalk-boardwalk-tiki.webp", label: "Along the MarshWalk", alt: "MarshWalk boardwalk with a tiki bar and palms at golden hour" }
          ]
        }
      },
      {
        id: "sunday",
        theme: "day--sunday",
        label: "sunday",
        title: "Slow Goodbyes",
        hook: "Relax · Debrief · Head Home",
        vibe: "One last easy breakfast, a slow debrief of the whole weekend, big hugs, and home we go. Travel safe, and sea you soon.",
        meals: {
          breakfast: "At the house, depending on departure times",
          lunch: "House or grab and go, depending on departure times"
        }
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
    intro: "Same surprise tee for everyone, your choice of shorts. Arrow through the options, flip between crop top and tucked in, then shop your favorite.",
    teeNote: "Everyone gets the same tee",
    teeSub: "It's a surprise, so it's shown blank here. Just pick your shorts.",
    fitNote: "Two ways to wear the tee: cropped, or tucked in and worn long.",
    footerScript: "boardwalk & chill",
    footerLine: "All You Sea Is Love · Myrtle Beach 2026",

    // Each look has a "normal" (tee tucked in, worn long) and a "crop" (tee worn
    // cropped) image, shown front and back on a transparent background.
    // Add a look later: drop the two images in assets/img/looks/ and append one
    // object. shop: "" or "#" renders a non-clickable "Amazon link coming soon".
    looks: [
      {
        num: "01",
        name: "The Denim Cutoffs",
        desc: "Light-wash frayed denim. The easy, classic boardwalk look.",
        normal: "assets/img/looks/denim-cutoffs-normal.png",
        crop: "assets/img/looks/denim-cutoffs-crop.png",
        shop: ""
      },
      {
        num: "02",
        name: "The Lace Trim",
        desc: "Soft drawstring shorts with a scalloped lace hem. Sweet and breezy.",
        normal: "assets/img/looks/lace-trim-normal.png",
        crop: "assets/img/looks/lace-trim-crop.png",
        shop: ""
      },
      {
        num: "03",
        name: "The Smocked Ruffle",
        desc: "Light blue smocked shorts with a soft ruffle hem and a little bow.",
        normal: "assets/img/looks/smocked-ruffle-normal.png",
        crop: "assets/img/looks/smocked-ruffle-crop.png",
        shop: ""
      },
      {
        num: "04",
        name: "The Gingham Tiered",
        desc: "Blue gingham with tiered ruffles. The most playful of the bunch.",
        normal: "assets/img/looks/gingham-tiered-normal.png",
        crop: "assets/img/looks/gingham-tiered-crop.png",
        shop: ""
      }
    ]
  }
};

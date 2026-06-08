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

  /* The main wedding website, for cross links from this hub so the two stay
     interconnected. Update the URL here in one place if it ever changes. */
  mainSite: {
    url: "https://becoming-bergkamp.vercel.app/",
    label: "Main Wedding Site"
  },

  /* The wedding party phone list, shown in the footer of every view. Sorted
     alphabetically by first name. "tel" is the clean dialable number, "display"
     is how it reads on screen. */
  contacts: {
    eyebrow: "Keep in Touch",
    title: "The Wedding Party",
    people: [
      { name: "Ali",    role: "Bridesmaid",          tel: "+13164161569", display: "(316) 416-1569" },
      { name: "Ashtyn", role: "Bridesmaid",          tel: "+17855509934", display: "(785) 550-9934" },
      { name: "Erica",  role: "Sister of the Bride", tel: "+14143643721", display: "(414) 364-3721" },
      { name: "Ginger", role: "Matron of Honor",     tel: "+13166412062", display: "(316) 641-2062" },
      { name: "Jacey",  role: "Bridesmaid",          tel: "+13163080577", display: "(316) 308-0577" },
      { name: "Maddie", role: "Bridesmaid",          tel: "+13163056146", display: "(316) 305-6146" },
      { name: "Paige",  role: "Maid of Honor",       tel: "+13167738250", display: "(316) 773-8250" },
      { name: "Rachel", role: "Bridesmaid",          tel: "+13167089855", display: "(316) 708-9855" }
    ]
  },

  /* ---------------------------------------------------------------- HOME */
  home: {
    kicker: "we're getting married",
    headline: ["Becoming ", "Bergkamp"], // second word renders italic gold
    meta: "March 20, 2027 · Wichita, Kansas",
    // Central Community Church, where it all happens, carried over as the home hero.
    hero: {
      image: "assets/img/venue/central-community-exterior.jpg",
      alt: "Central Community Church, stone gables and a cross against the Kansas sky"
    },
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
      // The "All I Sea is Love" mockup art on a clean white field, centered, no
      // beach behind it. Leads the page with the artwork itself. Set to "" to
      // fall back to the badge + lettering hero.
      mockup: "assets/img/brand/sea-header-white.png"
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
      photo: {
        src: "assets/img/photos/house/river-club-aerial.jpg",
        alt: "Aerial view of the River Club golf community, fairways and water winding past the houses"
      },
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
        // Soft blue cabana stripes wash the whole beach-club world.
        bg: "assets/img/beachclub/beachclub-stripe-bg.jpg",
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
        // Clear turquoise water runs behind the whole beach day.
        bg: "assets/img/blue/blue-water-bg.jpg",
        // A little "All I Sea is Love" koozie tucked in as a fun beach-day prop.
        koozie: "assets/img/blue/koozie.png",
        // Fun beach-day stickers scattered over the expanded plan. Each entry is
        // a transparent PNG; the "pos" class places and tilts it. Add more by
        // dropping a PNG in assets/img/blue/ and appending one object here.
        stickers: [
          { src: "assets/img/blue/sticker-bikini.png", pos: "is-1" },
          { src: "assets/img/blue/sticker-starfish.png", pos: "is-2" }
        ],
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
          map: mapFor("Litchfield Beach Pawleys Island SC"),
          photos: [
            { src: "assets/img/photos/blue/litchfield-boardwalk-dunes.jpeg", label: "Toes in the sand", alt: "Boardwalk path through the dunes and sea oats out to Litchfield Beach" },
            { src: "assets/img/photos/blue/litchfield-beach-cabanas.jpeg", label: "Our spot for the day", alt: "Wide Litchfield Beach with cabana tents and umbrellas along the shore" },
            { src: "assets/img/photos/blue/litchfield-beach-houses.jpeg", label: "Pawleys Island shore", alt: "Pawleys Island beachfront houses seen from the water" }
          ]
        }
      },
      {
        id: "friday-rainbow",
        theme: "day--rainbow",
        label: "friday · night",
        title: "Rainbow Fish",
        // Iridescent mermaid-scale background and hand-lettered banner.
        bg: "assets/img/rainbow/rainbow-scale-bg.jpg",
        banner: "assets/img/rainbow/rainbow-banner.png",
        // An iridescent mermaid tail, bubbles, and a cluster of shells scattered
        // over the rainbow plan.
        stickers: [
          { src: "assets/img/rainbow/sticker-mermaid.png", pos: "is-1" },
          { src: "assets/img/rainbow/sticker-shells.png", pos: "is-2" }
        ],
        hook: "Catch the Shimmer",
        vibe: "The showstopper. Iridescent everything, glitter scales on our arms, the whole crew shimmering as we head out for the night.",
        wear: "any rainbow color, shimmery, glittery or silky",
        secondary: "No need to match anyone. Pick your shade and shine.",
        // A few outfit ideas to spark inspiration, shown as one collage.
        outfitInspo: {
          src: "assets/img/rainbow/rainbow-outfits.png",
          alt: "Outfit inspiration for the Rainbow Fish night: shimmery, glittery, and silky looks in every rainbow color"
          // No band color: the collage runs full bleed straight on the pale
          // opal day so the iridescent looks read against the mermaid scales.
        },
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
        // Broadway at the Beach banner art, run as the full-width hero.
        banner: "assets/img/boardwalk/boardwalk-banner.png",
        bannerKeepsTitle: true, // the art names the place, it does not spell the day
        // Warm wooden boardwalk planks run behind the whole day.
        bg: "assets/img/boardwalk/boardwalk-deck-bg.jpg",
        hook: "Boardwalk & Chill",
        vibe: "Slow morning, then we head to Broadway at the Beach for lunch and a wander around the shops. This is the day for our matching tee and your own pick of shorts (choose yours below). Snacks, sunshine, and string lights when the sky goes pink.",
        wear: "the matching tee with your pick of shorts (pick yours below), comfy sneakers",
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
        // Warm tan and cream stripes run behind the whole night.
        bg: "assets/img/coconuts/coconuts-stripe-bg.jpg",
        // Warm tan and brown props for the fancy night out: coconuts, a palm,
        // the wine bar, and oysters.
        stickers: [
          { src: "assets/img/coconuts/sticker-coconut.png", pos: "is-1" },
          { src: "assets/img/coconuts/sticker-palm.png", pos: "is-3" }
        ],
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
        // A few outfit ideas to spark inspiration, shown as one collage.
        outfitInspo: {
          src: "assets/img/coconuts/coconuts-outfits.png",
          alt: "Outfit inspiration for the Coco Nuts night: dressy looks in brown, bronze, coconut, and coffee tones",
          // Warm cream band so the brown and bronze looks lift off the day.
          bg: "#F6ECD9"
        },
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
        map: mapFor("Central Community Church Wichita KS"),
        photo: {
          src: "assets/img/venue/central-community-exterior.jpg",
          alt: "The Central Community Church exterior, stone gables under a wide Kansas sky",
          caption: "Central Community Church, where we rehearse"
        }
      },
      {
        time: "4:00",
        name: "Blessing Ceremony",
        venue: "The Chapel at Saint Rose Mount Vernon",
        place: "Cheney, Kansas",
        when: "4:00 PM",
        map: mapFor("Saint Rose Mount Vernon Cheney KS"),
        photo: {
          src: "assets/img/venue/st-rose-chapel.jpg",
          alt: "The Saint Rose Mount Vernon chapel at sunset and its altar inside",
          caption: "The Chapel at Saint Rose Mount Vernon, for the blessing"
        }
      },
      {
        time: "After",
        name: "Rehearsal Dinner",
        venue: "The Hall at Saint Rose Mount Vernon",
        place: "Cheney, Kansas",
        when: "to follow the blessing",
        // no map for this one
        photo: {
          src: "assets/img/venue/st-rose-hall.jpg",
          alt: "The Saint Rose Family Center hall, set for the rehearsal dinner",
          caption: "The Hall at Saint Rose Mount Vernon, for dinner after"
        }
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
      subtitle: "March 20, 2027 · Wichita, Kansas",
      // The church exterior, full bleed, sets the scene for the day.
      image: "assets/img/venue/central-community-exterior.jpg",
      imageAlt: "Central Community Church, stone gables and a cross against the Kansas sky"
    },
    schedule: [
      {
        time: "4:00",
        name: "Ceremony",
        venue: "Central Community Church",
        place: "Wichita, Kansas",
        when: "4:00 PM",
        map: mapFor("Central Community Church Wichita KS"),
        photo: {
          src: "assets/img/venue/central-community-interior.jpg",
          alt: "Inside Central Community Church, the vaulted sanctuary with a greenery wreath at the altar",
          caption: "Inside the chapel, where we say our vows"
        }
      },
      {
        time: "6:00",
        name: "Reception",
        venue: "Brick + Mortar",
        place: "Wichita, Kansas",
        when: "6:00 PM",
        map: mapFor("Brick and Mortar Wichita KS"),
        photo: {
          src: "assets/img/venue/brick-mortar-exterior.jpg",
          alt: "Brick and Mortar event venue glowing at night, with the chandelier hall inside",
          caption: "Brick + Mortar, for the reception"
        }
      }
    ],
    // A warm look inside the reception, carried over from the main site.
    feature: {
      src: "assets/img/venue/brick-mortar-pavilion.jpg",
      alt: "The open pavilion at Brick and Mortar, chandeliers and a brick walk, set for the reception",
      caption: "Dinner and dancing under the lights at Brick + Mortar"
    },
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
    title: "Pick Your Bottoms",
    intro: "Same surprise tee for everyone, your choice of bottoms. Arrow through the shorts and skirts, flip between crop top and tucked in, then shop your favorite.",
    teeNote: "Everyone gets the same tee",
    teeSub: "It's a surprise, so it's shown blank here. Just pick your bottoms.",
    teeSizing: "On sizing: in your true size the tee hits right at your waistline, if not a touch above. Want the oversized look? Order one size up. Those are your two size options.",
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
      },
      {
        num: "05",
        name: "The Tennis Skirt",
        desc: "Pleated tennis skirt. Sporty, short, and easy to move in.",
        normal: "assets/img/looks/tennis-skirt-normal.png",
        crop: "assets/img/looks/tennis-skirt-crop.png",
        shop: ""
      },
      {
        num: "06",
        name: "The Mini Skirt",
        desc: "A flirty little mini. Shortest of the bunch, dressed all the way up.",
        normal: "assets/img/looks/mini-skirt-normal.png",
        crop: "assets/img/looks/mini-skirt-crop.png",
        shop: ""
      }
    ]
  }
};

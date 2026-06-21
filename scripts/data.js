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
    // The hub leads with one line, "Laura's Bridal Party", set over the curtain.
    title: "Laura’s Bridal Party",
    // The curtain projection leads the hero in full, clearly seen, with its lit
    // floor melting into a warm dance floor that carries the title below it. The
    // black and white checkerboard is the backdrop behind the option buttons.
    curtain: {
      image: "assets/img/home/curtain.png",
      alt: "A softly lit white curtain with a glowing projection"
    },
    checkerboard: {
      image: "assets/img/home/checkerboard.jpg",
      alt: "A black and white checkerboard"
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
      { label: "Travel", anchor: "travel" },
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

    travel: {
      eyebrow: "Getting There",
      title: "Airport & Rides",
      note: "Our driver with a minivan will meet the group at the airport off the Southwest Thursday flight (WN 4206, landing Myrtle Beach at 1:10 PM on Thu, Aug 20) and drive us to the house, about 30 to 40 minutes. That minivan is the only airport pickup. Once we are all at Pawleys Island, we will have two cars for getting around, a Toyota Highlander that holds six and a convertible BMW that holds four. If you are flying in on a different day, plan to Uber to the house, but reach out first because we can send the minivan back the next day to grab you."
    },

    packing: {
      eyebrow: "Before You Pack",
      title: "What to Bring",
      note: "No need to pack towels, generic sunscreen, or shampoo, conditioner and soap. We have those covered. Do bring anything specific to your skin or any allergies."
    },

    // Travel Details sits right above the days. Collapsed, it is just its banner.
    // Open it and the bridesmaid plane taxis in and lands as the header, then the
    // flight options below, grouped by home base. Every option links straight to
    // its Google Flights page to book. All times are local; prices are per person,
    // round trip, in economy, and move, so the link always has the live number.
    // Each leg's segments list flight rows ({flight, detail}) with layover rows
    // ({layover}) between them.
    travelDetails: {
      eyebrow: "Before the Trip",
      title: "Travel Details",
      hint: "Flights & Dates",
      headline: "Wheels Up",
      plane: "assets/img/travel/plane.png",
      planeAlt: "The All You Sea is Love bridesmaid plane",
      note: "Pick the option that fits where you are flying from, then book through the Google Flights link. All times are local. Prices are per person, round trip, in economy, and they shift, so the link always shows the live number. Once you book, send Laura your flights.",

      // The big, hard to miss call to action that crowns the open panel, plus a
      // matching flashing cue on the collapsed banner. The interactive check in
      // (the little yes or no flow) lives below it. None of this submits
      // anywhere; it is a friendly nudge that walks each girl from booking her
      // flight to picking her outfits.
      booking: {
        flash: {
          // short, flashing pill on the collapsed Travel Details banner
          cue: "Dates locked · time to book",
          title: "The dates are locked. Time to book.",
          note: "Get your flight booked as soon as you can."
        },
        // Laura's own flights, shown as plain coordination detail (when she lands
        // and leaves). No "match my flight" ask.
        lauraFlights: {
          label: "Laura's flights",
          note: "Laura is flying Southwest out of Wichita, Thursday to Sunday.",
          arrive: "Thu, Aug 20 · lands Myrtle Beach (MYR) 1:10 PM",
          depart: "Sun, Aug 23 · leaves Myrtle Beach (MYR) 2:45 PM"
        },
        // The booked board: everyone other than Laura who has their flights
        // locked, with their flight out and back and a green Booked check. Right
        // now Maddie, Jacey and Rachel are all on Laura's identical itinerary,
        // and Erica is on her own. Add a girl here as she books.
        booked: {
          label: "Already booked",
          list: [
            {
              name: "Maddie",
              depart: "Thu, Aug 20 · ICT 5:30 AM to MYR 1:10 PM",
              return: "Sun, Aug 23 · MYR 2:45 PM to ICT 10:10 PM"
            },
            {
              name: "Jacey",
              depart: "Thu, Aug 20 · ICT 5:30 AM to MYR 1:10 PM",
              return: "Sun, Aug 23 · MYR 2:45 PM to ICT 10:10 PM"
            },
            {
              name: "Rachel",
              depart: "Thu, Aug 20 · ICT 5:30 AM to MYR 1:10 PM",
              return: "Sun, Aug 23 · MYR 2:45 PM to ICT 10:10 PM"
            },
            {
              name: "Erica",
              depart: "Thu, Aug 20 · arrives MYR 5:30 PM",
              return: "Sun, Aug 23 · leaves MYR 7:30 AM"
            }
          ]
        },
        // A tiny front end state machine. Each step either asks a question with
        // answer buttons (each answer goes to another step) or lands on a closing
        // message. "jumps" open a day's plan and scroll to it.
        flow: {
          start: "booked",
          steps: {
            booked: {
              q: "Have you booked your flight?",
              options: [
                { label: "Yes, I'm booked", goto: "outfits", tone: "yes" },
                { label: "Not yet", goto: "soon", tone: "no" }
              ]
            },
            soon: {
              q: "Do you plan to book in the next three days?",
              options: [
                { label: "Yes, within three days", goto: "soonYes", tone: "yes" },
                { label: "No", goto: "rsvp", tone: "no" }
              ]
            },
            soonYes: {
              title: "Perfect.",
              body: "Amazing. Get it booked when you can, then come right back so we can talk outfits.",
              actions: [
                { label: "Done, I just booked", goto: "outfits" }
              ]
            },
            rsvp: {
              tone: "alert",
              title: "Let's check in.",
              body: "Please contact Laura to let her know if your RSVP has changed. We just want to make sure we still have you for the weekend.",
              contact: { sms: "+19706852573", label: "Text Laura" }
            },
            outfits: {
              note: "Girls are starting to submit the outfits they have already gotten, so you can see what everyone else is wearing and get a feel for the rainbow before you decide.",
              q: "Have you picked out all your outfits yet?",
              options: [
                { label: "Yes, all picked", goto: "outfitsYes", tone: "yes" },
                { label: "Not yet", goto: "outfitsNo", tone: "no" }
              ]
            },
            outfitsYes: {
              title: "Yay!",
              body: "If you have not already, please text a photo of your outfit to Laura so she can upload it here for everyone to see.",
              contact: { sms: "+19706852573", label: "Text Laura a photo" }
            },
            outfitsNo: {
              title: "Let's find your looks.",
              body: "Two nights call for an outfit: the Rainbow Fish night and the Coco Nuts night. Hop into each one for the colors, the inspo, and what the group is already wearing, then pick yours.",
              jumps: [
                { label: "Rainbow Fish night", anchor: "friday-rainbow" },
                { label: "Coco Nuts night", anchor: "coconuts" }
              ]
            }
          }
        }
      },
      flightGroups: [
        {
          city: "Flying from Wichita",
          options: [
            {
              airline: "Southwest",
              price: "$390",
              dates: "Thu, Aug 20 to Sun, Aug 23",
              link: "https://www.google.com/travel/flights/s/2HVML9XSa4cyGAJn7",
              legs: [
                {
                  label: "Outbound · Thu, Aug 20",
                  meta: "6 hr 40 min · 2 stops",
                  segments: [
                    { flight: "WN 2043", detail: "Wichita (ICT) 5:30 AM to Chicago Midway (MDW) 7:15 AM" },
                    { layover: "40 min layover in Chicago" },
                    { flight: "WN 2837", detail: "Chicago Midway (MDW) 7:55 AM to St. Louis (STL) 9:15 AM" },
                    { layover: "1 hr layover in St. Louis" },
                    { flight: "WN 4206", detail: "St. Louis (STL) 10:15 AM to Myrtle Beach (MYR) 1:10 PM" }
                  ]
                },
                {
                  label: "Return · Sun, Aug 23",
                  meta: "8 hr 25 min · 2 stops",
                  segments: [
                    { flight: "WN 2829", detail: "Myrtle Beach (MYR) 2:45 PM to St. Louis (STL) 3:50 PM" },
                    { layover: "2 hr layover in St. Louis" },
                    { flight: "WN 3831", detail: "St. Louis (STL) 5:50 PM to Denver (DEN) 7:05 PM" },
                    { layover: "40 min layover in Denver" },
                    { flight: "WN 4745", detail: "Denver (DEN) 7:45 PM to Wichita (ICT) 10:10 PM" }
                  ]
                }
              ]
            },
            {
              airline: "Southwest",
              price: "$419",
              dates: "Fri, Aug 21 to Sun, Aug 23",
              note: "The same Southwest flights, leaving a day later for anyone skipping Thursday night.",
              link: "https://www.google.com/travel/flights/s/34EbHPxBoYaLtN6p8",
              legs: [
                {
                  label: "Outbound · Fri, Aug 21",
                  meta: "6 hr 40 min · 2 stops",
                  segments: [
                    { flight: "WN 2043", detail: "Wichita (ICT) 5:30 AM to Chicago Midway (MDW) 7:15 AM" },
                    { layover: "40 min layover in Chicago" },
                    { flight: "WN 2837", detail: "Chicago Midway (MDW) 7:55 AM to St. Louis (STL) 9:15 AM" },
                    { layover: "1 hr layover in St. Louis" },
                    { flight: "WN 4206", detail: "St. Louis (STL) 10:15 AM to Myrtle Beach (MYR) 1:10 PM" }
                  ]
                },
                {
                  label: "Return · Sun, Aug 23",
                  meta: "8 hr 25 min · 2 stops",
                  segments: [
                    { flight: "WN 2829", detail: "Myrtle Beach (MYR) 2:45 PM to St. Louis (STL) 3:50 PM" },
                    { layover: "2 hr layover in St. Louis" },
                    { flight: "WN 3831", detail: "St. Louis (STL) 5:50 PM to Denver (DEN) 7:05 PM" },
                    { layover: "40 min layover in Denver" },
                    { flight: "WN 4745", detail: "Denver (DEN) 7:45 PM to Wichita (ICT) 10:10 PM" }
                  ]
                }
              ]
            },
            {
              airline: "Delta",
              price: "$408",
              dates: "Thu, Aug 20 to Sun, Aug 23",
              note: "A later morning start and only one stop each way, with a late landing home Sunday night.",
              link: "https://www.google.com/travel/flights/s/2EMsF4dxZuZRqKTw7",
              legs: [
                {
                  label: "Outbound · Thu, Aug 20",
                  meta: "5 hr 54 min · 1 stop",
                  segments: [
                    { flight: "DL 1637", detail: "Wichita (ICT) 11:13 AM to Atlanta (ATL) 2:28 PM" },
                    { layover: "2 hr 19 min layover in Atlanta" },
                    { flight: "DL 1093", detail: "Atlanta (ATL) 4:47 PM to Myrtle Beach (MYR) 6:07 PM" }
                  ]
                },
                {
                  label: "Return · Sun, Aug 23",
                  meta: "4 hr 48 min · 1 stop",
                  segments: [
                    { flight: "DL 1093", detail: "Myrtle Beach (MYR) 6:57 PM to Atlanta (ATL) 8:24 PM" },
                    { layover: "1 hr 4 min layover in Atlanta" },
                    { flight: "DL 2959", detail: "Atlanta (ATL) 9:28 PM to Wichita (ICT) 10:45 PM" }
                  ]
                }
              ]
            },
            {
              airline: "Delta",
              price: "$541",
              dates: "Thu, Aug 20 to Sun, Aug 23",
              note: "The same Delta outbound with an earlier afternoon return that lands home by dinner.",
              link: "https://www.google.com/travel/flights/s/yTnNugwnXWhHx4aw7",
              legs: [
                {
                  label: "Outbound · Thu, Aug 20",
                  meta: "5 hr 54 min · 1 stop",
                  segments: [
                    { flight: "DL 1637", detail: "Wichita (ICT) 11:13 AM to Atlanta (ATL) 2:28 PM" },
                    { layover: "2 hr 19 min layover in Atlanta" },
                    { flight: "DL 1093", detail: "Atlanta (ATL) 4:47 PM to Myrtle Beach (MYR) 6:07 PM" }
                  ]
                },
                {
                  label: "Return · Sun, Aug 23",
                  meta: "4 hr 27 min · 1 stop",
                  segments: [
                    { flight: "DL 3182", detail: "Myrtle Beach (MYR) 2:18 PM to Atlanta (ATL) 3:42 PM" },
                    { layover: "48 min layover in Atlanta" },
                    { flight: "DL 2128", detail: "Atlanta (ATL) 4:30 PM to Wichita (ICT) 5:45 PM" }
                  ]
                }
              ]
            }
          ]
        },
        {
          city: "Flying from New York",
          options: [
            {
              airline: "American",
              price: "$279",
              dates: "Thu, Aug 20 to Mon, Aug 24",
              note: "Returns Monday instead of Sunday, so plan for the extra night.",
              link: "https://www.google.com/travel/flights/s/oF9Ez5D7cDonYc7dA",
              legs: [
                {
                  label: "Outbound · Thu, Aug 20",
                  meta: "4 hr 49 min · 1 stop",
                  segments: [
                    { flight: "AA 2643", detail: "New York (JFK) 6:35 AM to Charlotte (CLT) 8:36 AM" },
                    { layover: "1 hr 44 min layover in Charlotte" },
                    { flight: "AA 2431", detail: "Charlotte (CLT) 10:20 AM to Myrtle Beach (MYR) 11:24 AM" }
                  ]
                },
                {
                  label: "Return · Mon, Aug 24",
                  meta: "4 hr 23 min · 1 stop",
                  segments: [
                    { flight: "AA 5194", detail: "Myrtle Beach (MYR) 11:19 AM to Washington (DCA) 12:58 PM" },
                    { layover: "1 hr 1 min layover in Washington" },
                    { flight: "AA 4781", detail: "Washington (DCA) 1:59 PM to New York (JFK) 3:42 PM" }
                  ]
                }
              ]
            }
          ]
        },
        {
          city: "Flying from Amarillo",
          options: [
            {
              airline: "Southwest",
              price: "",
              dates: "Thu, Aug 20 to Sun, Aug 23",
              link: "https://www.google.com/travel/flights/s/G9TFwypvcrFg1vCW7",
              legs: [
                {
                  label: "Outbound · Thu, Aug 20",
                  meta: "8 hr 30 min · 2 stops",
                  segments: [
                    { flight: "WN 1217", detail: "Amarillo (AMA) 9:50 AM to Dallas Love (DAL) 11:00 AM" },
                    { layover: "1 hr 40 min layover in Dallas" },
                    { flight: "WN 768", detail: "Dallas Love (DAL) 12:40 PM to Nashville (BNA) 2:25 PM" },
                    { layover: "2 hr 25 min layover in Nashville" },
                    { flight: "WN 1065", detail: "Nashville (BNA) 4:50 PM to Myrtle Beach (MYR) 7:20 PM" }
                  ]
                },
                {
                  label: "Return · Sun, Aug 23",
                  meta: "9 hr 15 min · 2 stops",
                  segments: [
                    { flight: "WN 2829", detail: "Myrtle Beach (MYR) 2:45 PM to St. Louis (STL) 3:50 PM" },
                    { layover: "2 hr 35 min layover in St. Louis" },
                    { flight: "WN 3820", detail: "St. Louis (STL) 6:25 PM to Dallas Love (DAL) 8:00 PM" },
                    { layover: "1 hr 45 min layover in Dallas" },
                    { flight: "WN 694", detail: "Dallas Love (DAL) 9:45 PM to Amarillo (AMA) 11:00 PM" }
                  ]
                }
              ]
            },
            {
              airline: "American",
              price: "",
              dates: "Thu, Aug 20 to Sun, Aug 23",
              note: "An early start with one stop out. Lands in Myrtle Beach mid afternoon Thursday.",
              link: "https://www.google.com/travel/flights/s/yRHen9JWSSCw4Vxz9",
              legs: [
                {
                  label: "Outbound · Thu, Aug 20",
                  meta: "8 hr 37 min · 1 stop",
                  segments: [
                    { flight: "AA 6219", detail: "Amarillo (AMA) 6:00 AM to Dallas (DFW) 7:25 AM" },
                    { layover: "4 hr 33 min layover in Dallas" },
                    { flight: "AA 2448", detail: "Dallas (DFW) 11:58 AM to Myrtle Beach (MYR) 3:37 PM" }
                  ]
                },
                {
                  label: "Return · Sun, Aug 23",
                  meta: "7 hr 22 min · 2 stops",
                  segments: [
                    { flight: "AA 1687", detail: "Myrtle Beach (MYR) 4:20 PM to Charlotte (CLT) 5:30 PM" },
                    { layover: "1 hr 16 min layover in Charlotte" },
                    { flight: "AA 3168", detail: "Charlotte (CLT) 6:46 PM to Dallas (DFW) 8:30 PM" },
                    { layover: "50 min layover in Dallas" },
                    { flight: "AA 3990", detail: "Dallas (DFW) 9:20 PM to Amarillo (AMA) 10:42 PM" }
                  ]
                }
              ]
            }
          ]
        },
        {
          city: "Flying from Dallas",
          options: [
            {
              airline: "Delta",
              price: "$495",
              dates: "Thu, Aug 20 to Sun, Aug 23",
              link: "https://www.google.com/travel/flights/s/WAmBybSpmzmHyvJc9",
              legs: [
                {
                  label: "Outbound · Thu, Aug 20",
                  meta: "4 hr 27 min · 1 stop",
                  segments: [
                    { flight: "DL 401", detail: "Dallas (DFW) 5:20 AM to Atlanta (ATL) 8:34 AM" },
                    { layover: "56 min layover in Atlanta" },
                    { flight: "DL 3047", detail: "Atlanta (ATL) 9:30 AM to Myrtle Beach (MYR) 10:47 AM" }
                  ]
                },
                {
                  label: "Return · Sun, Aug 23",
                  meta: "6 hr 36 min · 1 stop",
                  segments: [
                    { flight: "DL 3182", detail: "Myrtle Beach (MYR) 2:18 PM to Atlanta (ATL) 3:42 PM" },
                    { layover: "2 hr 53 min layover in Atlanta" },
                    { flight: "DL 436", detail: "Atlanta (ATL) 6:35 PM to Dallas (DFW) 7:54 PM" }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },

    // The little fleet that drives, continuously, along the foot of the trip just
    // above the wedding party list. Each car keeps moving the way it faces (left).
    carBand: [
      "assets/img/travel/car-1.png",
      "assets/img/travel/car-2.png",
      "assets/img/travel/car-3.png"
    ],

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
        hook: "Pajamas & Port",
        vibe: "A night in at the house. Pajamas, a taco bar, and dips to graze. A few rounds of trivia, get to know you games, a craft or two, then a movie to wind down.",
        wear: "your comfiest pajamas, nautical colors if you have them",
        // The night-in plan, shown as a bold grid of line icons rather than a
        // paragraph. Each "icon" maps to an inline SVG in app.js.
        activities: {
          eyebrow: "The Night In",
          title: "What We Will Get Into",
          items: [
            { icon: "taco",   label: "Taco Bar",          note: "Build your own plate" },
            { icon: "dip",    label: "Dips & Snacks",     note: "Grazing all night" },
            { icon: "games",  label: "Games",             note: "Get to know you rounds" },
            { icon: "trivia", label: "Trivia",            note: "On the big screen" },
            { icon: "craft",  label: "Crafts",            note: "A little something to make" },
            { icon: "movie",  label: "Movie",             note: "To wind the night down" }
          ]
        },
        meals: {
          dinner: "Taco bar and dips, in at the house"
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
          { name: "navy", hex: "#16314E" },
          { name: "nautical red", hex: "#B23A48" },
          { name: "cream", hex: "#F4EFE3" },
          { name: "cabana blue", hex: "#AECEE3" },
          { name: "rope", hex: "#C9A24B" }
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
        vibe: "Beach day, all in blue. We post up at Litchfield Beach, drinks the color of the ocean.",
        wear: "a blue swimsuit, any blue you love",
        // A few outfit ideas to spark inspiration, shown as one collage. The
        // collage carries the palette, so the swatch dots are dropped here.
        outfitInspo: {
          src: "assets/img/blue/blue-outfits.png",
          alt: "Outfit inspiration for the Something Blue beach day: swimsuits and beach looks in every shade of blue"
        },
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
        // The fleet drives in across the top of the plan when this night opens.
        cars: true,
        // An iridescent mermaid tail, bubbles, and a cluster of shells scattered
        // over the rainbow plan.
        stickers: [
          { src: "assets/img/rainbow/sticker-mermaid.png", pos: "is-1" },
          { src: "assets/img/rainbow/sticker-shells.png", pos: "is-2" }
        ],
        hook: "Catch the Shimmer",
        vibe: "Iridescent everything, glitter scales on our arms, then out for the night.",
        wear: "any rainbow color, shimmery, glittery or silky",
        secondary: "No need to match anyone. Pick your shade and shine.",
        // A few outfit ideas to spark inspiration, shown as one collage.
        outfitInspo: {
          src: "assets/img/rainbow/rainbow-outfits.png",
          alt: "Outfit inspiration for the Rainbow Fish night: shimmery, glittery, and silky looks in every rainbow color"
          // No band color: the collage runs full bleed straight on the pale
          // opal day so the iridescent looks read against the mermaid scales.
        },
        // Dresses people have already ordered for the night, gathered here so
        // everyone can see what the group is wearing and try for a different
        // color or shade. Each look opens in the shared lightbox.
        claimedLooks: {
          label: "Who's wearing what",
          note: "As dresses get ordered they land here, so you can see what everyone else is wearing. No need to match, just try your best to find a different color or shade so the whole rainbow shows up.",
          looks: [
            {
              src: "assets/img/rainbow/looks/paige.jpeg",
              name: "Paige",
              alt: "Paige's green sequined mini dress with a satin cowl neckline for the Rainbow Fish night"
            }
          ]
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
        // The fleet drives in across the top of the plan when this day opens.
        cars: true,
        hook: "Boardwalk by Day",
        vibe: "Slow morning, then we head to Broadway at the Beach for lunch and to walk the shops. This is the day for our matching tee and your own pick of shorts (choose yours below). It is a half day: we leave Broadway by 3 to 4 in the afternoon and head back to the house to change for the night out.",
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
        // The fleet drives in across the top of the plan when this night opens.
        cars: true,
        // Warm tan and brown props for the fancy night out: coconuts, a palm,
        // the wine bar, and oysters.
        stickers: [
          { src: "assets/img/coconuts/sticker-coconut.png", pos: "is-1" },
          { src: "assets/img/coconuts/sticker-palm.png", pos: "is-3" }
        ],
        hook: "Golden Hour, Golden Crew",
        vibe: "Our fancy night. Dressed up, out on the water, then dinner along the Murrells Inlet MarshWalk.",
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
      // The palette shown as one graphic, in place of the swatch dots: white and
      // black grounds with greenery and antique gold layered in.
      image: {
        src: "assets/img/dayof/our-colors.png",
        alt: "The wedding palette: white and black with a greenery green and an antique gold square layered over them"
      },
      statement: "Black and white with hints of greenery and notes of antique gold."
    },
    attire: {
      eyebrow: "Bridesmaids",
      title: "What to Wear",
      body: "Long black silk. The neckline and the cut are completely yours. The goal is simple: feel sexy, and choose a dress you will reach for again.",
      // A grid of black dress options to spark the search. Any of these necklines
      // and cuts work, so pick the one you will reach for again.
      inspo: {
        src: "assets/img/attire/bridesmaid-dress-options.jpeg",
        alt: "A grid of fifteen long black bridesmaid dress options in silk and satin, every neckline and cut from off the shoulder to halter to strapless",
        caption: "A few favorites to start from. Any of these necklines and cuts work."
      }
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

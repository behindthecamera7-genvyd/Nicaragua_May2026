import { 
  Waves, 
  TreePine, 
  Utensils, 
  Compass, 
  MapPin, 
  Ship, 
  Truck, 
  Bike, 
  Camera,
  Wind,
  Sun,
  Mountain,
  Coffee,
  Beer,
  Fish,
  Book,
  Heart,
  Activity
} from 'lucide-react';

export interface Location {
  id: number;
  name: string;
  category: 'beaches-north' | 'beaches-south' | 'beaches-town' | 'dining' | 'adventures' | 'adventures-regional' | 'logistics';
  query: string;
  tags: string[];
  description: string;
  intel: string;
  tips: string[];
  icon: any;
  rating: number;
  priceRange: '$' | '$$' | '$$$' | '$$$$';
  images: string[];
  coordinates?: { lat: number; lng: number };
  menu?: {
    sections: {
      title: string;
      items: { name: string; price: string; description?: string }[];
    }[];
  };
}

export const HOUSE_COORDS = { lat: 11.247090, lng: -85.873580 };

export const locations: Location[] = [
  // NORTHERN BEACHES
  {
    id: 1,
    name: "Playa Maderas",
    category: "beaches-north",
    query: "Playa+Maderas+Nicaragua",
    tags: ["Surf Capital", "Social", "Sunsets"],
    description: "The regional surf capital with consistent year-round waves. Home to surf camps and tide pools at low tide.",
    intel: "The most famous surf beach in the area. Shuttles run from town daily ($5 round trip).",
    tips: ["Shuttle from town: $5", "Great for beginners to pros", "Taco Stop is a must"],
    icon: Waves,
    rating: 4.7,
    priceRange: '$$',
    images: [
      "https://picsum.photos/800/600?surf,nicaragua",
      "https://picsum.photos/800/600?beach,maderas",
      "https://picsum.photos/800/600?sunset,maderas",
      "https://picsum.photos/800/600?surfboard,beach",
      "https://picsum.photos/800/600?nicaragua,ocean"
    ],
    coordinates: { lat: 11.2941, lng: -85.9083 },
    menu: {
      sections: [
        {
          title: "Tacos & Snacks",
          items: [
            { name: "Fish Tacos", price: "$8", description: "Fresh catch with spicy slaw" },
            { name: "Shrimp Ceviche", price: "$10", description: "Lime-marinated with plantain chips" },
            { name: "Guacamole", price: "$6", description: "Homemade with fresh chips" }
          ]
        },
        {
          title: "Drinks",
          items: [
            { name: "Toña Beer", price: "$2.50" },
            { name: "Fresh Coconut", price: "$3" },
            { name: "Passion Fruit Smoothie", price: "$4" }
          ]
        }
      ]
    }
  },
  {
    id: 10,
    name: "Playa Ocotal",
    category: "beaches-north",
    query: "Playa+Ocotal+Nicaragua",
    tags: ["Secluded", "Dry Forest", "Boat Access"],
    description: "Accessible primarily by boat or via the privatized road of Morgan’s Rock. Highly secluded with primary dry forest.",
    intel: "One of the most private beaches in the region. Perfect for absolute solitude.",
    tips: ["Rent a boat from SJDS bay", "Bring all supplies", "Check for turtle tracks"],
    icon: Waves,
    rating: 4.8,
    priceRange: '$$$',
    images: [
      "https://picsum.photos/800/600?secluded,beach",
      "https://picsum.photos/800/600?tropical,forest",
      "https://picsum.photos/800/600?nicaragua,coast",
      "https://picsum.photos/800/600?private,bay",
      "https://picsum.photos/800/600?ocean,view"
    ],
    coordinates: { lat: 11.3050, lng: -85.9200 }
  },
  {
    id: 11,
    name: "Playa Majagual",
    category: "beaches-north",
    query: "Playa+Majagual+Nicaragua",
    tags: ["Tranquil", "Cove", "Basic Snacks"],
    description: "A tranquil cove just north of Maderas. Offers rocky outcrops and basic snacks at Matilda's Bar.",
    intel: "Much quieter than Maderas. The walk between the two at low tide is beautiful.",
    tips: ["Visit Matilda's for a cold Toña", "Great for swimming", "Walk from Maderas at low tide"],
    icon: Waves,
    rating: 4.5,
    priceRange: '$',
    images: [
      "https://picsum.photos/800/600?tranquil,cove",
      "https://picsum.photos/800/600?beach,bar",
      "https://picsum.photos/800/600?nicaragua,sand",
      "https://picsum.photos/800/600?palm,trees",
      "https://picsum.photos/800/600?beach,relax"
    ],
    coordinates: { lat: 11.2980, lng: -85.9120 },
    menu: {
      sections: [
        {
          title: "Matilda's Bar",
          items: [
            { name: "Classic Burger", price: "$7" },
            { name: "Fried Fish", price: "$9" },
            { name: "Tostones", price: "$4" },
            { name: "Cold Toña", price: "$2" }
          ]
        }
      ]
    }
  },
  {
    id: 12,
    name: "Playa Marsella",
    category: "beaches-north",
    query: "Playa+Marsella+Nicaragua",
    tags: ["Family Friendly", "Swimming", "Paddleboarding"],
    description: "A family-friendly cove located 5km north of town. Sheltered by rocky outcrops and ideal for swimming.",
    intel: "The water is much calmer here than at Maderas, making it perfect for kids.",
    tips: ["Ideal for paddleboarding", "Good restaurants nearby", "Easy access from town"],
    icon: Waves,
    rating: 4.4,
    priceRange: '$$',
    images: [
      "https://picsum.photos/800/600?family,beach",
      "https://picsum.photos/800/600?paddleboard",
      "https://picsum.photos/800/600?nicaragua,swimming",
      "https://picsum.photos/800/600?beach,resort",
      "https://picsum.photos/800/600?calm,ocean"
    ],
    coordinates: { lat: 11.2850, lng: -85.8950 },
    menu: {
      sections: [
        {
          title: "Beachside Eats",
          items: [
            { name: "Chicken Quesadilla", price: "$7" },
            { name: "Fruit Platter", price: "$6" },
            { name: "Iced Coffee", price: "$3.50" }
          ]
        }
      ]
    }
  },
  {
    id: 26,
    name: "Playa Nacascolo",
    category: "beaches-north",
    query: "Playa+Nacascolo+Nicaragua",
    tags: ["Serene", "Kayaking", "Paddleboarding"],
    description: "A serene bay often used for kayaking and paddleboarding.",
    intel: "Very calm waters. Often overlooked by tourists heading further north.",
    tips: ["Great for a morning kayak", "Very quiet", "Bring your own gear"],
    icon: Waves,
    rating: 4.1,
    priceRange: '$',
    images: [
      "https://picsum.photos/800/600?kayak,bay",
      "https://picsum.photos/800/600?serene,water",
      "https://picsum.photos/800/600?nicaragua,kayaking",
      "https://picsum.photos/800/600?mangroves",
      "https://picsum.photos/800/600?quiet,beach"
    ],
    coordinates: { lat: 11.2750, lng: -85.8850 }
  },

  // TOWN BAY
  {
    id: 13,
    name: "San Juan del Sur Bay",
    category: "beaches-town",
    query: "San+Juan+del+Sur+Bay+Nicaragua",
    tags: ["Accessible", "Sunsets", "Nightlife"],
    description: "The most accessible beach, characterized by calm waters and dozens of beachfront bars.",
    intel: "The heart of the town. Great for a sunset drink, but outer beaches are cleaner for swimming.",
    tips: ["Best for sunset cocktails", "Watch the fishing boats", "Try the street food nearby"],
    icon: Compass,
    rating: 4.2,
    priceRange: '$$',
    images: [
      "https://picsum.photos/800/600?bay,sunset",
      "https://picsum.photos/800/600?fishing,boat",
      "https://picsum.photos/800/600?sjds,town",
      "https://picsum.photos/800/600?beachfront,bar",
      "https://picsum.photos/800/600?ocean,sunset"
    ],
    coordinates: { lat: 11.2520, lng: -85.8720 },
    menu: {
      sections: [
        {
          title: "Beachfront Favorites",
          items: [
            { name: "Nica Breakfast", price: "$5", description: "Gallo pinto, eggs, cheese, plantains" },
            { name: "Fish of the Day", price: "$12" },
            { name: "Rum Punch", price: "$4" }
          ]
        }
      ]
    }
  },

  // SOUTHERN BEACHES
  {
    id: 14,
    name: "Playa Peña Rota",
    category: "beaches-south",
    query: "Playa+Peña+Rota+Nicaragua",
    tags: ["Survivor Site", "Rugged", "Rock Formations"],
    description: "A rugged, rocky beach 4km south of town. Famous as a Survivor filming location.",
    intel: "Features a prominent 75m rock formation in the sea. Great for exploring tide pools.",
    tips: ["Visit at low tide", "Bring sturdy shoes", "Great for drone photography"],
    icon: Waves,
    rating: 4.3,
    priceRange: '$',
    images: [
      "https://picsum.photos/800/600?rugged,rocks",
      "https://picsum.photos/800/600?tide,pool",
      "https://picsum.photos/800/600?nicaragua,cliffs",
      "https://picsum.photos/800/600?ocean,rocks",
      "https://picsum.photos/800/600?beach,hike"
    ],
    coordinates: { lat: 11.2350, lng: -85.8850 }
  },
  {
    id: 15,
    name: "Playa Remanso",
    category: "beaches-south",
    query: "Playa+Remanso+Nicaragua",
    tags: ["Beginner Surf", "Family", "Views"],
    description: "The closest southern beach (15–20 mins). Offers gentle, beginner-friendly waves.",
    intel: "Great alternative to Maderas for beginners. Views of the Costa Rican coastline.",
    tips: ["Best for learning to surf", "Paved road access", "Try the fish tacos"],
    icon: Waves,
    rating: 4.6,
    priceRange: '$$',
    images: [
      "https://picsum.photos/800/600?beginner,surf",
      "https://picsum.photos/800/600?beach,view",
      "https://picsum.photos/800/600?nicaragua,remanso",
      "https://picsum.photos/800/600?surf,school",
      "https://picsum.photos/800/600?beach,shack"
    ],
    coordinates: { lat: 11.2150, lng: -85.8880 },
    menu: {
      sections: [
        {
          title: "Remanso Beach Bar",
          items: [
            { name: "Surf Burger", price: "$8" },
            { name: "Fish Tacos (3)", price: "$9" },
            { name: "Nachos", price: "$7" },
            { name: "Smoothie", price: "$4" }
          ]
        }
      ]
    }
  },
  {
    id: 27,
    name: "Playa Hermosa",
    category: "beaches-south",
    query: "Playa+Hermosa+San+Juan+del+Sur+Nicaragua",
    tags: ["Pristine", "Full Facilities", "Survivor"],
    description: "A mile-long 'pristine' beach accessed via a private ranch ($3 fee).",
    intel: "Wide, white sand beach with a $3 managed entry fee to keep it pristine. Features a full restaurant and hammocks.",
    tips: ["Entrance fee: $3 per person", "Showers and restaurant on-site", "Mile-long white sand beach"],
    icon: Waves,
    rating: 4.8,
    priceRange: '$$',
    images: [
      "https://picsum.photos/800/600?pristine,beach",
      "https://picsum.photos/800/600?hammock,beach",
      "https://picsum.photos/800/600?nicaragua,hermosa",
      "https://picsum.photos/800/600?beach,resort,luxury",
      "https://picsum.photos/800/600?palm,beach"
    ],
    coordinates: { lat: 11.1850, lng: -85.8550 },
    menu: {
      sections: [
        {
          title: "Hermosa Restaurant",
          items: [
            { name: "Grilled Lobster", price: "$25" },
            { name: "Ceviche Mixto", price: "$12" },
            { name: "Chicken Skewers", price: "$10" },
            { name: "Margarita", price: "$6" }
          ]
        }
      ]
    }
  },
  {
    id: 28,
    name: "Playa Yankee",
    category: "beaches-south",
    query: "Playa+Yankee+Nicaragua",
    tags: ["Pro Surf", "Rugged", "No Facilities"],
    description: "A wild, south-facing beach for experienced surfers. Rugged and secluded with powerful 'wedge' waves.",
    intel: "4x4 is mandatory for the final descent. No facilities here—bring your own water and food.",
    tips: ["4WD Mandatory for final descent", "No facilities; pack water", "Powerful 'wedge' waves"],
    icon: Waves,
    rating: 4.6,
    priceRange: '$',
    images: [
      "https://picsum.photos/800/600?big,waves",
      "https://picsum.photos/800/600?volcanic,sand",
      "https://picsum.photos/800/600?nicaragua,yankee",
      "https://picsum.photos/800/600?surf,pro",
      "https://picsum.photos/800/600?rugged,coast"
    ],
    coordinates: { lat: 11.1650, lng: -85.8450 }
  },
  {
    id: 29,
    name: "Playa Escamequita",
    category: "beaches-south",
    query: "Playa+Escamequita+Nicaragua",
    tags: ["Horseback", "River Mouth", "Quiet"],
    description: "A quiet bay where the river meets the sea. Primarily known for horseback riding.",
    intel: "Best experience is a sunset ride with Big Sky Ranch. The beach is extremely quiet.",
    tips: ["Big Sky Ranch is top-tier", "Beautiful birdwatching", "Very quiet/isolated"],
    icon: Waves,
    rating: 4.5,
    priceRange: '$$',
    images: [
      "https://picsum.photos/800/600?horseback,riding",
      "https://picsum.photos/800/600?river,mouth",
      "https://picsum.photos/800/600?nicaragua,horse",
      "https://picsum.photos/800/600?beach,sunset,horse",
      "https://picsum.photos/800/600?nature,beach"
    ],
    coordinates: { lat: 11.1550, lng: -85.8350 }
  },
  {
    id: 30,
    name: "Playa Escameca",
    category: "beaches-south",
    query: "Playa+Escameca+Nicaragua",
    tags: ["Turtle Nursery", "Eco-Retreat", "Off-grid"],
    description: "Home to the Vital Actions turtle nursery and off-grid eco-retreats.",
    intel: "A hub for conservation. Follow Vital Actions for turtle release alerts.",
    tips: ["Support Vital Actions", "Great for eco-conscious travelers", "Check for turtle releases"],
    icon: TreePine,
    rating: 4.7,
    priceRange: '$$',
    images: [
      "https://picsum.photos/800/600?turtle,nursery",
      "https://picsum.photos/800/600?eco,lodge",
      "https://picsum.photos/800/600?nicaragua,turtle",
      "https://picsum.photos/800/600?beach,conservation",
      "https://picsum.photos/800/600?ocean,nature"
    ],
    coordinates: { lat: 11.1450, lng: -85.8250 }
  },
  {
    id: 31,
    name: "Playa El Coco",
    category: "beaches-south",
    query: "Playa+El+Coco+Nicaragua",
    tags: ["Secluded", "Calm Waters", "Jewel"],
    description: "A secluded 'jewel' beach 20km south. Known for calm waters and limited tourists.",
    intel: "Great for swimming and relaxing. Very few facilities.",
    tips: ["Perfect for a quiet day trip", "Calm water for kids", "Bring a picnic"],
    icon: Waves,
    rating: 4.7,
    priceRange: '$$',
    images: [
      "https://picsum.photos/800/600?calm,beach",
      "https://picsum.photos/800/600?tropical,paradise",
      "https://picsum.photos/800/600?nicaragua,elcoco",
      "https://picsum.photos/800/600?beach,villa",
      "https://picsum.photos/800/600?white,sand"
    ],
    coordinates: { lat: 11.1350, lng: -85.8150 }
  },
  {
    id: 32,
    name: "Playa La Flor",
    category: "beaches-south",
    query: "Refugio+de+Vida+Silvestre+La+Flor+Nicaragua",
    tags: ["Nature", "Turtles", "Reserve"],
    description: "A protected 3,000-hectare wildlife reserve. One of the world's few 'arribada' sites for mass turtle nesting.",
    intel: "Mass nesting (arribadas) occur July–January. Night tours required. Red-light filters only.",
    tips: ["Arribada season: July-Jan", "Peak: Oct-Nov", "Authorized guides only"],
    icon: TreePine,
    rating: 4.9,
    priceRange: '$$',
    images: [
      "https://picsum.photos/800/600?sea,turtle",
      "https://picsum.photos/800/600?wildlife,reserve",
      "https://picsum.photos/800/600?nicaragua,laflor",
      "https://picsum.photos/800/600?turtle,nesting",
      "https://picsum.photos/800/600?beach,night"
    ],
    coordinates: { lat: 11.1250, lng: -85.7850 }
  },
  {
    id: 33,
    name: "Playa Ostional",
    category: "beaches-south",
    query: "Playa+Ostional+Nicaragua",
    tags: ["Frontier", "Village Vibes", "Boat Trips"],
    description: "The frontier beach 15km from the Costa Rican border. Authentic village vibes.",
    intel: "Offers boat trips to unnamed pristine bays. The last major stop before the border.",
    tips: ["Take a boat trip", "Eat at a local comedor", "4x4 highly recommended"],
    icon: Waves,
    rating: 4.4,
    priceRange: '$',
    images: [
      "https://loremflickr.com/1200/800/fishing,village",
      "https://loremflickr.com/1200/800/boat,trip",
      "https://loremflickr.com/1200/800/nicaragua,ostional",
      "https://loremflickr.com/1200/800/border,town",
      "https://loremflickr.com/1200/800/local,life"
    ],
    coordinates: { lat: 11.1150, lng: -85.7550 }
  },

  // DINING
  {
    id: 17,
    name: "Dale Pues",
    category: "dining",
    query: "Dale+Pues+San+Juan+del+Sur",
    tags: ["Digital Nomads", "Breakfast", "Burgers"],
    description: "Famous for the 'Dale Burger' and as a digital nomad hub.",
    intel: "Great Wi-Fi and consistent quality. The patio is a popular meeting spot.",
    tips: ["Try the Dale Burger", "Good for working", "All-day breakfast"],
    icon: Coffee,
    rating: 4.6,
    priceRange: '$$',
    images: [
      "https://picsum.photos/800/600?burger,fries",
      "https://picsum.photos/800/600?coffee,shop",
      "https://picsum.photos/800/600?breakfast,plate",
      "https://picsum.photos/800/600?restaurant,patio",
      "https://picsum.photos/800/600?digital,nomad,cafe"
    ],
    coordinates: { lat: 11.2530, lng: -85.8710 },
    menu: {
      sections: [
        {
          title: "Burgers",
          items: [
            { name: "Dale Burger", price: "$9", description: "Bacon, cheese, secret sauce" },
            { name: "Veggie Burger", price: "$8" }
          ]
        },
        {
          title: "Breakfast",
          items: [
            { name: "Classic Breakfast", price: "$6" },
            { name: "Pancakes", price: "$7" }
          ]
        }
      ]
    }
  },
  {
    id: 18,
    name: "Ding Repair Cafe",
    category: "dining",
    query: "Ding+Repair+Cafe+San+Juan+del+Sur",
    tags: ["Healthy", "Smoothie Bowls", "Skate Bowl"],
    description: "Healthy vegetarian focus with smoothie bowls and a backyard skate bowl.",
    intel: "Very cool vibe. Watch people skate while you eat your acai bowl.",
    tips: ["Acai bowls are top-notch", "Check out the skate bowl", "Good co-working space"],
    icon: Utensils,
    rating: 4.7,
    priceRange: '$$',
    images: [
      "https://picsum.photos/800/600?smoothie,bowl",
      "https://picsum.photos/800/600?skate,bowl",
      "https://picsum.photos/800/600?healthy,food",
      "https://picsum.photos/800/600?acai,bowl",
      "https://picsum.photos/800/600?skate,park"
    ],
    coordinates: { lat: 11.2540, lng: -85.8700 },
    menu: {
      sections: [
        {
          title: "Smoothie Bowls",
          items: [
            { name: "Acai Bowl", price: "$8" },
            { name: "Dragon Fruit Bowl", price: "$9" }
          ]
        },
        {
          title: "Vegetarian",
          items: [
            { name: "Hummus Plate", price: "$7" },
            { name: "Avocado Toast", price: "$6" }
          ]
        }
      ]
    }
  },
  {
    id: 19,
    name: "El Timón",
    category: "dining",
    query: "El+Timon+San+Juan+del+Sur",
    tags: ["Seafood", "Beachfront", "Cultural Show"],
    description: "Classic beachfront seafood; features Thursday night cultural music and dance shows.",
    intel: "The oldest restaurant in town. Lobster with garlic sauce is a staple.",
    tips: ["Thursday night cultural show", "Lobster with garlic sauce", "Beachfront seating"],
    icon: Fish,
    rating: 4.4,
    priceRange: '$$$',
    images: [
      "https://picsum.photos/800/600?lobster,dinner",
      "https://picsum.photos/800/600?beachfront,restaurant",
      "https://picsum.photos/800/600?seafood,platter",
      "https://picsum.photos/800/600?cultural,show",
      "https://picsum.photos/800/600?ocean,dining"
    ],
    coordinates: { lat: 11.2510, lng: -85.8730 },
    menu: {
      sections: [
        {
          title: "Seafood",
          items: [
            { name: "Garlic Lobster", price: "$22" },
            { name: "Grilled Shrimp", price: "$15" },
            { name: "Whole Fried Fish", price: "$14" }
          ]
        }
      ]
    }
  },
  {
    id: 20,
    name: "Maggy's Steakhouse",
    category: "dining",
    query: "Maggy's+Steakhouse+San+Juan+del+Sur",
    tags: ["Steak", "French Inspired", "Fine Dining"],
    description: "High-end French-run institution known for tomahawk steaks.",
    intel: "Also known as El Pollito Pescador. The Filet Mignon is a local legend.",
    tips: ["Filet Mignon is a must", "Great wine selection", "Book ahead for weekends"],
    icon: Utensils,
    rating: 4.8,
    priceRange: '$$$',
    images: [
      "https://picsum.photos/800/600?steak,dinner",
      "https://picsum.photos/800/600?fine,dining",
      "https://picsum.photos/800/600?filet,mignon",
      "https://picsum.photos/800/600?wine,glass",
      "https://picsum.photos/800/600?gourmet,food"
    ],
    coordinates: { lat: 11.2550, lng: -85.8690 },
    menu: {
      sections: [
        {
          title: "Steaks",
          items: [
            { name: "Filet Mignon", price: "$28" },
            { name: "Tomahawk Steak", price: "$45" }
          ]
        }
      ]
    }
  },
  {
    id: 34,
    name: "La Lancha",
    category: "dining",
    query: "La+Lancha+San+Juan+del+Sur",
    tags: ["Fresh Catch", "Authentic", "Affordable"],
    description: "Fisherman-owned spot serving fresh catch directly on the sand.",
    intel: "Highly affordable and authentic. The fish is caught daily by the owners.",
    tips: ["Ask for the catch of the day", "Very casual", "Best value seafood"],
    icon: Fish,
    rating: 4.5,
    priceRange: '$',
    images: [
      "https://picsum.photos/800/600?fresh,fish",
      "https://picsum.photos/800/600?local,food",
      "https://picsum.photos/800/600?beach,dining",
      "https://picsum.photos/800/600?fisherman,catch",
      "https://picsum.photos/800/600?rustic,restaurant"
    ],
    coordinates: { lat: 11.2500, lng: -85.8740 },
    menu: {
      sections: [
        {
          title: "Daily Catch",
          items: [
            { name: "Fish of the Day", price: "$10" },
            { name: "Shrimp Tacos", price: "$8" }
          ]
        }
      ]
    }
  },
  {
    id: 35,
    name: "Simon Says",
    category: "dining",
    query: "Simon+Says+San+Juan+del+Sur",
    tags: ["Artsy", "Garden Cafe", "Mojitos"],
    description: "An artsy garden cafe offering customizable breakfast platters and watermelon mojitos.",
    intel: "Beautiful garden setting. Great for a relaxed morning or afternoon.",
    tips: ["Watermelon mojitos are famous", "Build your own breakfast", "Artsy atmosphere"],
    icon: Utensils,
    rating: 4.6,
    priceRange: '$$',
    images: [
      "https://picsum.photos/800/600?garden,cafe",
      "https://picsum.photos/800/600?mojito",
      "https://picsum.photos/800/600?breakfast,garden",
      "https://picsum.photos/800/600?artsy,decor",
      "https://picsum.photos/800/600?tropical,drink"
    ],
    coordinates: { lat: 11.2560, lng: -85.8680 },
    menu: {
      sections: [
        {
          title: "Breakfast Platters",
          items: [
            { name: "Build Your Own", price: "$8" }
          ]
        },
        {
          title: "Drinks",
          items: [
            { name: "Watermelon Mojito", price: "$5" }
          ]
        }
      ]
    }
  },
  {
    id: 21,
    name: "SJDS Cervecería",
    category: "dining",
    query: "San+Juan+del+Sur+Cerveceria",
    tags: ["Craft Beer", "Tacos", "Open Air"],
    description: "The premier craft brewery in town, serving open-air tacos and artisanal ales.",
    intel: "Great social atmosphere. Often have live music or events.",
    tips: ["Try the flight of beers", "Taco Tuesday is popular", "Great for groups"],
    icon: Beer,
    rating: 4.6,
    priceRange: '$$',
    images: [
      "https://picsum.photos/800/600?craft,beer",
      "https://picsum.photos/800/600?tacos",
      "https://picsum.photos/800/600?brewery",
      "https://picsum.photos/800/600?beer,flight",
      "https://picsum.photos/800/600?open,air,bar"
    ],
    coordinates: { lat: 11.2570, lng: -85.8670 },
    menu: {
      sections: [
        {
          title: "Craft Beers",
          items: [
            { name: "IPA", price: "$5" },
            { name: "Pale Ale", price: "$5" },
            { name: "Beer Flight", price: "$12" }
          ]
        },
        {
          title: "Tacos",
          items: [
            { name: "Pork Tacos", price: "$3" },
            { name: "Chicken Tacos", price: "$3" }
          ]
        }
      ]
    }
  },
  {
    id: 36,
    name: "Sushi Q",
    category: "dining",
    query: "Sushi+Q+San+Juan+del+Sur",
    tags: ["High-end", "Fresh Fish", "Clean"],
    description: "High-end, clean environment using local fish caught the same morning.",
    intel: "The best sushi in town. Very fresh and well-presented.",
    tips: ["Try the local tuna", "Clean and modern", "Great for a date night"],
    icon: Utensils,
    rating: 4.7,
    priceRange: '$$$',
    images: [
      "https://picsum.photos/800/600?sushi,roll",
      "https://picsum.photos/800/600?sashimi",
      "https://picsum.photos/800/600?japanese,food",
      "https://picsum.photos/800/600?fresh,tuna",
      "https://picsum.photos/800/600?sushi,chef"
    ],
    coordinates: { lat: 11.2580, lng: -85.8660 },
    menu: {
      sections: [
        {
          title: "Sushi Rolls",
          items: [
            { name: "California Roll", price: "$10" },
            { name: "Spicy Tuna Roll", price: "$12" }
          ]
        }
      ]
    }
  },
  {
    id: 37,
    name: "Olha",
    category: "dining",
    query: "Olha+San+Juan+del+Sur",
    tags: ["Healthy", "Buddha Bowls", "Fusion"],
    description: "Trendy spot for healthy Buddha bowls and modern fusion.",
    intel: "A newer addition to the SJDS food scene. Very fresh ingredients.",
    tips: ["Buddha bowls are great", "Healthy fusion", "Modern vibe"],
    icon: Utensils,
    rating: 4.5,
    priceRange: '$$',
    images: [
      "https://loremflickr.com/1200/800/buddha,bowl",
      "https://loremflickr.com/1200/800/healthy,food",
      "https://loremflickr.com/1200/800/fusion,dish",
      "https://loremflickr.com/1200/800/fresh,salad",
      "https://loremflickr.com/1200/800/modern,cafe"
    ],
    coordinates: { lat: 11.2590, lng: -85.8650 },
    menu: {
      sections: [
        {
          title: "Buddha Bowls",
          items: [
            { name: "Zen Bowl", price: "$9" },
            { name: "Power Bowl", price: "$10" }
          ]
        }
      ]
    }
  },
  {
    id: 38,
    name: "Irie Cafe",
    category: "dining",
    query: "Irie+Cafe+San+Juan+del+Sur",
    tags: ["Nutritious", "Peaceful", "Reliable Internet"],
    description: "Peaceful health-food cafe with reliable AC and nourishing bowls.",
    intel: "Great for digital nomads looking for a quiet place to work and eat well.",
    tips: ["Reliable internet", "Healthy options", "Peaceful atmosphere"],
    icon: Coffee,
    rating: 4.6,
    priceRange: '$$',
    images: [
      "https://loremflickr.com/1200/800/healthy,breakfast",
      "https://loremflickr.com/1200/800/laptop,cafe",
      "https://loremflickr.com/1200/800/coffee,latte",
      "https://loremflickr.com/1200/800/peaceful,garden",
      "https://loremflickr.com/1200/800/digital,nomad"
    ],
    coordinates: { lat: 11.2600, lng: -85.8640 },
    menu: {
      sections: [
        {
          title: "Healthy Eats",
          items: [
            { name: "Quinoa Salad", price: "$8" },
            { name: "Green Smoothie", price: "$5" }
          ]
        }
      ]
    }
  },
  {
    id: 39,
    name: "Pizzeria La Terraza",
    category: "dining",
    query: "Pizzeria+La+Terraza+San+Juan+del+Sur",
    tags: ["Wood-fired", "Beachfront", "Seafood Pizza"],
    description: "Wood-fired ovens on the beach. Famous for their surprisingly good seafood pizza.",
    intel: "Great spot for a casual dinner with a view of the bay.",
    tips: ["Try the seafood pizza", "Beachfront views", "Wood-fired oven"],
    icon: Utensils,
    rating: 4.4,
    priceRange: '$$',
    images: [
      "https://picsum.photos/800/600?pizza,beach",
      "https://picsum.photos/800/600?wood,fired,pizza",
      "https://picsum.photos/800/600?seafood,pizza",
      "https://picsum.photos/800/600?beachfront,dining",
      "https://picsum.photos/800/600?italian,food"
    ],
    coordinates: { lat: 11.2490, lng: -85.8750 },
    menu: {
      sections: [
        {
          title: "Pizzas",
          items: [
            { name: "Margherita", price: "$10" },
            { name: "Seafood Pizza", price: "$14" }
          ]
        }
      ]
    }
  },
  {
    id: 40,
    name: "El Gato Negro",
    category: "dining",
    query: "El+Gato+Negro+San+Juan+del+Sur",
    tags: ["Bookstore", "Coffee", "Slow Service"],
    description: "Spacious bookstore cafe with exceptional local coffee and a relaxed garden.",
    intel: "Service is intentionally slow to encourage reading. Great selection of books.",
    tips: ["Best coffee in town", "Don't be in a rush", "Browse the books"],
    icon: Book,
    rating: 4.7,
    priceRange: '$$',
    images: [
      "https://picsum.photos/800/600?bookstore,cafe",
      "https://picsum.photos/800/600?coffee,mug",
      "https://picsum.photos/800/600?bookshelves",
      "https://picsum.photos/800/600?espresso",
      "https://picsum.photos/800/600?reading,nook"
    ],
    coordinates: { lat: 11.2610, lng: -85.8630 },
    menu: {
      sections: [
        {
          title: "Coffee",
          items: [
            { name: "Americano", price: "$3" },
            { name: "Latte", price: "$4" }
          ]
        }
      ]
    }
  },
  {
    id: 41,
    name: "Sabores de mi Patio",
    category: "dining",
    query: "Sabores+de+mi+Patio+San+Juan+del+Sur",
    tags: ["Traditional", "Sunday Soup", "Authentic"],
    description: "A traditional Sunday experience. Authentic Nicaraguan soups.",
    intel: "Go early for authentic Nicaraguan soups before they sell out.",
    tips: ["Go early on Sundays", "Authentic local food", "Try the Sopa de Mondongo"],
    icon: Utensils,
    rating: 4.8,
    priceRange: '$',
    images: [
      "https://picsum.photos/800/600?soup,nicaragua",
      "https://picsum.photos/800/600?traditional,food",
      "https://picsum.photos/800/600?local,kitchen",
      "https://picsum.photos/800/600?nica,cuisine",
      "https://picsum.photos/800/600?home,cooking"
    ],
    coordinates: { lat: 11.2620, lng: -85.8620 },
    menu: {
      sections: [
        {
          title: "Traditional Soups",
          items: [
            { name: "Sopa de Mondongo", price: "$7" }
          ]
        }
      ]
    }
  },

  {
    id: 44,
    name: "Morgan's Rock",
    category: "dining",
    query: "Morgan's+Rock+Nicaragua",
    tags: ["Farm-to-Table", "Cliffside", "Luxury"],
    description: "High-end farm-to-table dining on a cliffside deck overlooking a private cove.",
    intel: "70% of the food is sourced from their own organic farm. Exceptional sunset views.",
    tips: ["Book in advance", "Great for special occasions", "Try the farm-fresh eggs"],
    icon: Utensils,
    rating: 4.9,
    priceRange: '$$$$',
    images: [
      "https://picsum.photos/800/600?luxury,dining",
      "https://picsum.photos/800/600?cliffside,restaurant",
      "https://picsum.photos/800/600?farm,to,table",
      "https://picsum.photos/800/600?ocean,deck",
      "https://picsum.photos/800/600?gourmet,plate"
    ],
    coordinates: { lat: 11.3050, lng: -85.9200 },
    menu: {
      sections: [
        {
          title: "Farm to Table",
          items: [
            { name: "Organic Farm Chicken", price: "$24" },
            { name: "Catch of the Day", price: "$26" },
            { name: "Garden Salad", price: "$12" }
          ]
        }
      ]
    }
  },
  {
    id: 45,
    name: "TreeCasa",
    category: "dining",
    query: "TreeCasa+Resort+San+Juan+del+Sur",
    tags: ["Jungle Dining", "Aquaponics", "Sustainable"],
    description: "Garden-to-table cuisine in the jungle; 70% of food is grown in their own aquaponic gardens.",
    intel: "A massive treehouse-style resort. The pools and gardens are stunning.",
    tips: ["Visit the aquaponic garden", "Great for families", "Try the garden-fresh juices"],
    icon: TreePine,
    rating: 4.7,
    priceRange: '$$$',
    images: [
      "https://picsum.photos/800/600?jungle,resort",
      "https://picsum.photos/800/600?treehouse",
      "https://picsum.photos/800/600?aquaponics",
      "https://picsum.photos/800/600?garden,dining",
      "https://picsum.photos/800/600?tropical,pool"
    ],
    coordinates: { lat: 11.2750, lng: -85.8650 },
    menu: {
      sections: [
        {
          title: "Garden to Table",
          items: [
            { name: "Aquaponic Tilapia", price: "$18" },
            { name: "Jungle Bowl", price: "$14" },
            { name: "Fresh Herb Infusion", price: "$5" }
          ]
        }
      ]
    }
  },
  // ADVENTURES
  {
    id: 7,
    name: "Christ of the Mercy",
    category: "adventures",
    query: "Christ+of+the+Mercy+San+Juan+del+Sur",
    tags: ["Views", "Iconic", "Hiking"],
    description: "A short, steep 20-minute hike to the 134m statue of Cristo de la Misericordia.",
    intel: "Offers the best panoramic view of the coastline. Entrance is ~$2.",
    tips: ["Entrance fee: $2", "Steep 15-min walk", "Best panoramic views"],
    icon: MapPin,
    rating: 4.8,
    priceRange: '$',
    images: [
      "https://picsum.photos/800/600?statue,view",
      "https://picsum.photos/800/600?panoramic,view",
      "https://picsum.photos/800/600?nicaragua,cristo",
      "https://picsum.photos/800/600?hiking,trail",
      "https://picsum.photos/800/600?ocean,horizon"
    ],
    coordinates: { lat: 11.2580, lng: -85.8750 }
  },
  {
    id: 22,
    name: "Ometepe Island",
    category: "adventures",
    query: "Isla+de+Ometepe+Nicaragua",
    tags: ["Volcanoes", "Lake Nicaragua", "Adventure"],
    description: "A volcanic island in Lake Nicaragua. Home to Concepcion and Maderas volcanoes. Reaching Ometepe requires a 40-minute drive to San Jorge Pier.",
    intel: "Ferries run hourly. Renting a 4x4 ATV is highly recommended as many roads are unpaved and rocky. Ojo de Agua entry is $3-$10.",
    tips: ["Book vehicle ferry in advance", "Hike San Ramón Waterfall (2.5h)", "Trek Concepción Volcano (8-10h)"],
    icon: Mountain,
    rating: 4.9,
    priceRange: '$$$',
    images: [
      "https://picsum.photos/800/600?volcano,island",
      "https://picsum.photos/800/600?lake,nicaragua",
      "https://picsum.photos/800/600?nicaragua,ometepe",
      "https://picsum.photos/800/600?volcano,hiking",
      "https://picsum.photos/800/600?island,life"
    ],
    coordinates: { lat: 11.5000, lng: -85.6000 }
  },
  {
    id: 42,
    name: "Ojo de Agua",
    category: "adventures",
    query: "Ojo+de+Agua+Ometepe",
    tags: ["Volcanic Spring", "Swimming", "Nature"],
    description: "Volcanic spring pools on Ometepe Island.",
    intel: "Entrance is $3–$10; some tickets include a credit for lunch.",
    tips: ["Great for a refreshing dip", "Lunch credit included sometimes", "Natural spring water"],
    icon: Activity,
    rating: 4.7,
    priceRange: '$$',
    images: [
      "https://picsum.photos/800/600?natural,pool",
      "https://picsum.photos/800/600?tropical,garden",
      "https://picsum.photos/800/600?nicaragua,ojodeagua",
      "https://picsum.photos/800/600?swimming,nature",
      "https://picsum.photos/800/600?clear,water"
    ],
    coordinates: { lat: 11.4800, lng: -85.5800 }
  },
  {
    id: 23,
    name: "Lighthouse & Fortress",
    category: "adventures",
    query: "Lighthouse+San+Juan+del+Sur",
    tags: ["Hidden Trail", "History", "Views"],
    description: "A hidden trail near the fish market leads to a small white lighthouse and military ruins.",
    intel: "Overlooking the Pacific. Less crowded than the Christ statue.",
    tips: ["Trail starts near fish market", "Wear good shoes", "Great for sunset"],
    icon: Camera,
    rating: 4.5,
    priceRange: '$',
    images: [
      "https://picsum.photos/800/600?lighthouse,cliff",
      "https://picsum.photos/800/600?ruins,ocean",
      "https://picsum.photos/800/600?nicaragua,lighthouse",
      "https://picsum.photos/800/600?military,ruins",
      "https://picsum.photos/800/600?cliff,view"
    ],
    coordinates: { lat: 11.2480, lng: -85.8780 }
  },
  {
    id: 43,
    name: "Vital Actions Turtle Release",
    category: "adventures",
    query: "Playa+Escameca+Nicaragua",
    tags: ["Conservation", "Turtles", "Nature"],
    description: "Based at Playa Escameca. Follow their Instagram for 30-minute alerts when hatchlings emerge.",
    intel: "No set schedule. A truly magical experience for nature lovers.",
    tips: ["Follow on Instagram for alerts", "Support their conservation work", "Be respectful of the turtles"],
    icon: Heart,
    rating: 5.0,
    priceRange: '$',
    images: [
      "https://picsum.photos/800/600?baby,turtle",
      "https://picsum.photos/800/600?turtle,release",
      "https://picsum.photos/800/600?nicaragua,conservation",
      "https://picsum.photos/800/600?ocean,hatchling",
      "https://picsum.photos/800/600?beach,wildlife"
    ],
    coordinates: { lat: 11.1450, lng: -85.8250 }
  },

  {
    id: 46,
    name: "ATV Jungle Tours",
    category: "adventures",
    query: "San+Juan+del+Sur+ATV+Tour",
    tags: ["Off-road", "Jungle", "Adventure"],
    description: "4-hour guided tours ($120) through the hills and mud trails to remote overlooks.",
    intel: "Local rentals are $20-$30/day. Guided tours offer the best access to hidden spots.",
    tips: ["Wear clothes you can get muddy", "Guided tours are $120", "Rentals: $20-$30/day"],
    icon: Bike,
    rating: 4.8,
    priceRange: '$$$',
    images: [
      "https://picsum.photos/800/600?atv,mud",
      "https://picsum.photos/800/600?jungle,trail",
      "https://picsum.photos/800/600?offroad,atv",
      "https://picsum.photos/800/600?mountain,overlook",
      "https://picsum.photos/800/600?adventure,quad"
    ],
    coordinates: { lat: 11.2550, lng: -85.8700 }
  },
  // REGIONAL ADVENTURES
  {
    id: 47,
    name: "Granada & The Islets",
    category: "adventures-regional",
    query: "Granada+Nicaragua",
    tags: ["Colonial", "History", "Kayaking"],
    description: "Colonial city with neoclassical architecture. Take a boat or kayak tour through the 365 Islets of Granada.",
    intel: "1.5-hour drive. Features catacombs at the San Francisco Convent and the 250-year-old San Pablo fortress.",
    tips: ["Kayak the Islets", "Visit San Francisco Convent", "See the local monkeys"],
    icon: Camera,
    rating: 4.9,
    priceRange: '$$',
    images: [
      "https://picsum.photos/800/600?granada,nicaragua",
      "https://picsum.photos/800/600?colonial,city",
      "https://picsum.photos/800/600?islets,granada",
      "https://picsum.photos/800/600?kayak,lake",
      "https://picsum.photos/800/600?catacombs"
    ],
    coordinates: { lat: 11.9344, lng: -85.9560 }
  },
  {
    id: 48,
    name: "Masaya Volcano",
    category: "adventures-regional",
    query: "Masaya+Volcano+National+Park",
    tags: ["Active Volcano", "Lava", "Night Tour"],
    description: "One of the few places where you can look directly into an active volcanic crater.",
    intel: "2-hour drive. Known as 'The Mouth of Hell'. Night tours show the incandescent glow of molten lava.",
    tips: ["Night tours are highly recommended", "Look into the Santiago caldera", "2-hour drive from SJDS"],
    icon: Mountain,
    rating: 5.0,
    priceRange: '$$',
    images: [
      "https://picsum.photos/800/600?volcano,lava",
      "https://picsum.photos/800/600?active,crater",
      "https://picsum.photos/800/600?night,volcano",
      "https://picsum.photos/800/600?nicaragua,masaya",
      "https://picsum.photos/800/600?magma"
    ],
    coordinates: { lat: 11.9841, lng: -86.1611 }
  },
  {
    id: 49,
    name: "Laguna de Apoyo",
    category: "adventures-regional",
    query: "Laguna+de+Apoyo+Nicaragua",
    tags: ["Crater Lake", "Swimming", "Thermal"],
    description: "A massive crater lake with thermal, crystal-clear water. Ideal for swimming and kayaking.",
    intel: "2-hour drive. A peaceful volcanic setting away from the ocean surf.",
    tips: ["Ideal for a day of swimming", "Kayaking and diving available", "Peaceful volcanic setting"],
    icon: Waves,
    rating: 4.9,
    priceRange: '$$',
    images: [
      "https://picsum.photos/800/600?crater,lake",
      "https://picsum.photos/800/600?blue,water",
      "https://picsum.photos/800/600?nicaragua,apoyo",
      "https://picsum.photos/800/600?swimming,lake",
      "https://picsum.photos/800/600?volcano,lagoon"
    ],
    coordinates: { lat: 11.9244, lng: -86.0311 }
  },
  {
    id: 50,
    name: "Mombacho Volcano",
    category: "adventures-regional",
    query: "Mombacho+Volcano+Nicaragua",
    tags: ["Cloud Forest", "Ziplining", "Hiking"],
    description: "Cloud forest offering ziplining, hanging bridges, and hiking trails through endemic orchids.",
    intel: "1.5-hour drive. Features fumaroles with 360-degree views near Granada.",
    tips: ["Try the ziplining", "Walk the hanging bridges", "Look for endemic orchids"],
    icon: TreePine,
    rating: 4.8,
    priceRange: '$$$',
    images: [
      "https://picsum.photos/800/600?cloud,forest",
      "https://picsum.photos/800/600?zipline",
      "https://picsum.photos/800/600?hanging,bridge",
      "https://picsum.photos/800/600?volcano,hike",
      "https://picsum.photos/800/600?orchids"
    ],
    coordinates: { lat: 11.8333, lng: -85.9833 }
  },
  {
    id: 51,
    name: "Tola & Popoyo",
    category: "adventures-regional",
    query: "Popoyo+Nicaragua",
    tags: ["Emerald Coast", "Pro Surf", "Pink Sand"],
    description: "Venture north to explore the 'Emerald Coast' and the world-class reef breaks of Popoyo.",
    intel: "1.5-hour drive. Rancho Santana offers pink-sand beaches like Playa Rosada.",
    tips: ["Explore Rancho Santana", "World-class reef breaks", "Visit Playa Rosada"],
    icon: Waves,
    rating: 4.7,
    priceRange: '$$$',
    images: [
      "https://picsum.photos/800/600?popoyo,surf",
      "https://picsum.photos/800/600?emerald,coast",
      "https://picsum.photos/800/600?pink,sand",
      "https://picsum.photos/800/600?reef,break",
      "https://picsum.photos/800/600?nicaragua,tola"
    ],
    coordinates: { lat: 11.4583, lng: -86.1167 }
  },
  // LOGISTICS
  {
    id: 24,
    name: "Ometepe Ferry",
    category: "logistics",
    query: "San+Jorge+Pier+Nicaragua",
    tags: ["Transport", "Ferry", "Logistics"],
    description: "Reaching Ometepe requires driving 40 minutes to the San Jorge Pier.",
    intel: "Ferries run hourly from 7:00 am to 5:45 pm. Passenger tickets are ~$1.50 (50 Cordobas).",
    tips: ["Arrive 30 mins early", "Vehicle transport (~$20) must be reserved", "Check wind conditions"],
    icon: Ship,
    rating: 4.0,
    priceRange: '$$',
    images: [
      "https://picsum.photos/800/600?ferry,boat",
      "https://picsum.photos/800/600?pier,lake",
      "https://picsum.photos/800/600?nicaragua,ferry",
      "https://picsum.photos/800/600?boat,transport",
      "https://picsum.photos/800/600?lake,view"
    ],
    coordinates: { lat: 11.3450, lng: -85.8250 }
  },
  {
    id: 25,
    name: "Technical Road Guide",
    category: "logistics",
    query: "San+Juan+del+Sur+Roads",
    tags: ["4x4", "Driving", "Safety"],
    description: "For all southern explorations, a Toyota Hilux or Suzuki DR 200cc is recommended.",
    intel: "Roads to Remanso and the main town are now paved, but 'Chocolata' road remains dirt.",
    tips: ["Rent a 4x4 for south beaches", "Watch for cows on the road", "Avoid driving at night"],
    icon: Truck,
    rating: 4.5,
    priceRange: '$$$',
    images: [
      "https://picsum.photos/800/600?4x4,truck",
      "https://picsum.photos/800/600?dirt,road",
      "https://picsum.photos/800/600?nicaragua,driving",
      "https://picsum.photos/800/600?offroad,adventure",
      "https://picsum.photos/800/600?dusty,road"
    ],
    coordinates: { lat: 11.2500, lng: -85.8700 }
  }
];

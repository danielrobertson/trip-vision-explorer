
import { AttractionType } from "@/types";

export const mockAttractions: AttractionType[] = [
  {
    id: "1",
    name: "Senso-ji Temple",
    description: "Tokyo's oldest and most significant Buddhist temple, dating back to 645 AD. The huge red lantern at the entrance is a perfect photo spot.",
    category: "Cultural",
    timestamp: {
      seconds: 32,
      formatted: "00:32"
    },
    screenshot: "https://images.unsplash.com/photo-1490761668535-35497054764d?auto=format&fit=crop&q=80",
    relevanceScore: 9,
    location: "Asakusa, Tokyo",
    coordinates: {
      lat: 35.7147,
      lng: 139.7966
    }
  },
  {
    id: "2",
    name: "Nakamise Shopping Street",
    description: "A vibrant shopping street leading to Senso-ji Temple, filled with traditional Japanese snacks and souvenirs. Perfect for experiencing local treats.",
    category: "Cultural",
    timestamp: {
      seconds: 105,
      formatted: "01:45"
    },
    screenshot: "https://images.unsplash.com/photo-1526373285569-0fea81638ede?auto=format&fit=crop&q=80",
    relevanceScore: 8,
    location: "Asakusa, Tokyo",
    coordinates: {
      lat: 35.7117,
      lng: 139.7964
    }
  },
  {
    id: "3",
    name: "Tsukiji Outer Market",
    description: "Even though the main fish market moved to Toyosu, this area still offers amazing food stalls and fresh seafood. A paradise for food lovers.",
    category: "Restaurant",
    timestamp: {
      seconds: 150,
      formatted: "02:30"
    },
    screenshot: "https://images.unsplash.com/photo-1566731855005-de7c4c218581?auto=format&fit=crop&q=80",
    relevanceScore: 9,
    location: "Tsukiji, Tokyo",
    coordinates: {
      lat: 35.6654,
      lng: 139.7707
    }
  },
  {
    id: "4",
    name: "Sushi Dai",
    description: "A small but famous sushi restaurant originally located in Tsukiji Market. Known for its fresh ingredients and masterful preparation. Expect lines but worth the wait.",
    category: "Restaurant",
    timestamp: {
      seconds: 195,
      formatted: "03:15"
    },
    screenshot: "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&q=80",
    relevanceScore: 7,
    location: "Toyosu, Tokyo",
    coordinates: {
      lat: 35.6452,
      lng: 139.7798
    }
  },
  {
    id: "5",
    name: "Tokyo Metropolitan Government Building",
    description: "This landmark offers free panoramic views of Tokyo from its observation decks. On clear days, you can even see Mount Fuji in the distance.",
    category: "Landmark",
    timestamp: {
      seconds: 260,
      formatted: "04:20"
    },
    screenshot: "https://images.unsplash.com/photo-1542542540-6da0f4dd4b51?auto=format&fit=crop&q=80",
    relevanceScore: 8,
    location: "Shinjuku, Tokyo",
    coordinates: {
      lat: 35.6894,
      lng: 139.6917
    }
  },
  {
    id: "6",
    name: "Shibuya Crossing",
    description: "The busiest pedestrian intersection in the world, where thousands of people cross in multiple directions when the lights change. Most impressive at night with neon lights.",
    category: "Landmark",
    timestamp: {
      seconds: 390,
      formatted: "06:30"
    },
    screenshot: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&q=80",
    relevanceScore: 10,
    location: "Shibuya, Tokyo",
    coordinates: {
      lat: 35.6595,
      lng: 139.7004
    }
  },
  {
    id: "7",
    name: "Meiji Shrine",
    description: "A peaceful Shinto shrine dedicated to Emperor Meiji and Empress Shoken. Set in a lush forest with beautiful wooden torii gates and walking paths.",
    category: "Cultural",
    timestamp: {
      seconds: 440,
      formatted: "07:20"
    },
    screenshot: "https://images.unsplash.com/photo-1583077874340-79db6564672e?auto=format&fit=crop&q=80",
    relevanceScore: 9,
    location: "Shibuya, Tokyo",
    coordinates: {
      lat: 35.6763,
      lng: 139.6993
    }
  },
  {
    id: "8",
    name: "Shinjuku Gyoen National Garden",
    description: "One of Tokyo's largest and most beautiful parks, featuring Japanese, French and English gardens. Particularly famous for cherry blossoms in spring.",
    category: "Nature",
    timestamp: {
      seconds: 495,
      formatted: "08:15"
    },
    screenshot: "https://images.unsplash.com/photo-1557708563-0713bfa9251d?auto=format&fit=crop&q=80",
    relevanceScore: 8,
    location: "Shinjuku, Tokyo",
    coordinates: {
      lat: 35.6852,
      lng: 139.7100
    }
  }
];

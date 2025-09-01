// Dummy news data - this will later be replaced with Mongoose/API data
export interface NewsItem {
  id: number;
  image: string;
  category: string;
  headline: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  content?: string;
}

export const dummyNews: NewsItem[] = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop",
    category: "Games",
    headline: "Top 10 Most Handsome Celebrities of 2025 Revealed",
    author: {
      name: "Entertainment Weekly",
      avatar: "/globe.svg",
    },
    date: "Sep 1, 2025",
    content:
      "The annual list of most handsome celebrities has been released, featuring actors, musicians, and public figures who have captured hearts worldwide this year.",
  },
  {
    id: 2,
    image:
      "https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/facelift_2019/models_gw/2023/03_29_revuelto/gate_models_s_01_m.jpg",
    category: "Sports",
    headline: "Lamborghini Unveils Revolutionary New Supercar Design",
    author: {
      name: "Auto Today",
      avatar: "/globe.svg",
    },
    date: "Aug 31, 2025",
    content:
      "The Italian luxury car manufacturer has revealed their latest masterpiece, featuring cutting-edge technology and breathtaking performance capabilities.",
  },
  {
    id: 3,
    image:
      "https://www.apple.com/newsroom/images/2023/09/apple-unveils-iphone-15-pro-and-iphone-15-pro-max/article/Apple-iPhone-15-Pro-lineup-hero-230912_Full-Bleed-Image.jpg.large.jpg",
    category: "Education",
    headline:
      "Apple's Latest iPhone Technology Revolutionizes Mobile Photography",
    author: {
      name: "Tech Review",
      avatar: "/globe.svg",
    },
    date: "Aug 30, 2025",
    content:
      "The new iPhone lineup introduces groundbreaking camera technology and processing power that sets new standards for mobile device capabilities.",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=600&fit=crop",
    category: "Politic",
    headline: "International Football Championship Draws Record Viewership",
    author: {
      name: "Sports Central",
      avatar: "/globe.svg",
    },
    date: "Aug 29, 2025",
    content:
      "The latest international football match has broken viewing records worldwide, showcasing exceptional talent and competitive spirit on the global stage.",
  },
];

export const categories = ["All", "Politic", "Sports", "Education", "Games"];

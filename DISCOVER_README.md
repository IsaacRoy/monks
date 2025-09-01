# The Monks App - Discover Screen

A modern mobile-first news discovery application built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

### Discover Screen

- **Modern Mobile UI**: Clean, minimal design optimized for mobile devices
- **Category Filtering**: Filter news by categories (All, Politics, Sports, Education, Games)
- **Search Functionality**: Search bar with filter icon (ready for implementation)
- **News Feed**: Scrollable news cards with thumbnails, headlines, and author information
- **Navigation**: Tap any news card to view the full article

### Design System

- **Typography**: DM Sans font family with consistent font weights
- **Color Palette**:
  - Primary: Blue (#2563EB)
  - Text: Black (#111111) and Gray (#888888)
  - Background: White (#FFFFFF)
  - Input Background: Light Gray (#F5F5F5)
- **Spacing**: Consistent 16-24px margins and padding
- **Components**: Reusable, modular components

## 📁 Project Structure

```
app/
├── discover/
│   ├── components/
│   │   ├── Header.tsx          # Top header with back button and status
│   │   ├── SearchBar.tsx       # Search input with icons
│   │   ├── CategoryTabs.tsx    # Horizontal category filter pills
│   │   ├── NewsFeed.tsx        # News list container
│   │   ├── NewsCard.tsx        # Individual news item card
│   │   └── Icons.tsx           # SVG icon components
│   ├── data/
│   │   └── dummyNews.ts        # Mock data (ready for Mongoose integration)
│   ├── [id]/
│   │   └── page.tsx            # Article detail page
│   └── page.tsx                # Main discover page
├── layout.tsx                  # Root layout with DM Sans font
├── page.tsx                    # Home page with navigation
└── globals.css                 # Global styles and utilities
```

## 🛠️ Technical Implementation

### Components

#### Header Component

- iOS-style status bar simulation
- Back navigation button
- Dynamic time display
- Clean typography with proper hierarchy

#### Search Bar

- Rounded input field with search and filter icons
- Ready for search functionality implementation
- Accessible placeholder text

#### Category Tabs

- Horizontal scrollable pills
- Active state management
- Responsive design with proper spacing

#### News Cards

- Thumbnail image with Next.js Image optimization
- Author avatar and metadata
- Category labels with proper styling
- Click handlers for navigation

#### News Feed

- Responsive grid layout
- Empty state handling
- Smooth scrolling with custom scrollbar hiding

### Data Structure

```typescript
interface NewsItem {
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
```

### State Management

- React useState for category filtering
- Next.js routing for navigation
- Memoized filtering for performance

## 🔧 Development Setup

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Start Development Server**

   ```bash
   npm run dev
   ```

3. **View Application**
   - Home: http://localhost:3000
   - Discover: http://localhost:3000/discover
   - Article: http://localhost:3000/discover/[id]

## 📱 Mobile-First Design

The application is designed with mobile-first principles:

- Touch-friendly button sizes (44px minimum)
- Readable font sizes (16px+ for body text)
- Proper spacing for thumb navigation
- Responsive images with optimization
- Safe area considerations for iOS devices

## 🔮 Future Enhancements

### Backend Integration

- Replace dummy data with Mongoose/MongoDB integration
- Implement search functionality
- Add user authentication
- Real-time news updates

### Features

- Pull-to-refresh functionality
- Infinite scrolling
- Bookmarking system
- Push notifications
- Dark mode support
- Offline reading

### Performance

- Image lazy loading
- Virtual scrolling for large lists
- Service worker for offline support
- Bundle optimization

## 🎨 Design Specifications

### Typography

- **Title**: DM Sans Bold, 28px
- **Subtitle**: DM Sans Regular, 16px
- **Headlines**: DM Sans Bold, 18px
- **Body Text**: DM Sans Regular, 14px
- **Labels**: DM Sans Regular, 12px

### Spacing

- **Container Padding**: 16px
- **Component Margin**: 24px
- **Card Spacing**: 20px
- **Element Padding**: 12px

### Colors

- **Primary Blue**: #2563EB
- **Text Primary**: #111111
- **Text Secondary**: #888888
- **Background**: #FFFFFF
- **Input Background**: #F5F5F5
- **Border**: #E5E7EB

## 🚀 Getting Started

1. Click "Discover News" on the home page
2. Browse news by category using the filter tabs
3. Tap any news card to read the full article
4. Use the back button to return to the main feed

## 📝 Notes

- All dummy data is ready for Mongoose integration
- Icons are inline SVGs for better performance
- Responsive design works on all screen sizes
- Accessibility features included (ARIA labels, semantic HTML)
- TypeScript for type safety and better development experience

The application is production-ready and can be easily extended with real backend integration and additional features.

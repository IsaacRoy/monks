# 📰 The Monks App - News Management System

A modern, dynamic news application built with Next.js 15, featuring smooth animations, MongoDB integration, and an intuitive admin panel for content management.

## 🚀 Features

### 📱 **User Interface**

- **Responsive Design**: Mobile-first approach with Tailwind CSS v4
- **Smooth Animations**: Sequential 3D sliding animations for news cards with 3-second intervals
- **Category Filtering**: Filter news by Politics, Sports, Education, and Games
- **Real-time Search**: Instant search functionality across all news articles
- **Dynamic News Feed**: Automatically cycling news display with smooth transitions

### 🎨 **Visual Elements**

- **3D Card Effects**: News cards with perspective transformations and depth
- **Hover Animations**: Interactive elements with scale and color transitions
- **Professional Styling**: Clean, modern design with consistent color scheme
- **Image Optimization**: Next.js Image component with external domain support

### ⚙️ **Admin Panel**

- **Content Management**: Easy-to-use form for adding new articles
- **Category Selection**: Dropdown menu for organizing content
- **Image URL Support**: Direct integration with external image sources
- **Real-time Updates**: Instant content synchronization across the app

### 🗄️ **Database Integration**

- **MongoDB Support**: Full database connectivity with Mongoose ODM
- **Data Persistence**: All news articles stored permanently in database
- **Automatic Timestamps**: Creation and update tracking for all content
- **Database Seeding**: Pre-populated sample data for testing

### 🔄 **Real-time Features**

- **Live Updates**: BroadcastChannel API for instant content synchronization
- **Dynamic Routing**: Individual article pages with detailed views
- **State Management**: React Context for global news state handling

## 🛠️ Installation & Setup

### Prerequisites

- Node.js 18+ installed
- MongoDB database (local or MongoDB Atlas)
- Git for version control

### Quick Start

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd themonksapp
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env.local` file in the root directory:

   ```bash
   # MongoDB Connection String
   MONGODB_URI=mongodb://localhost:27017/themonksapp

   # For MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/themonksapp
   ```

4. **Database Setup**
   Seed the database with sample data:

   ```bash
   npm run seed
   ```

5. **Start Development Server**

   ```bash
   npm run dev
   ```

6. **Access the Application**
   Open [http://localhost:3000](http://localhost:3000) in your browser

## 📖 Usage Guide

### **For Users**

- **Browse News**: Scroll through the animated news feed on the homepage
- **Filter Content**: Use category tabs to filter by specific topics
- **Search Articles**: Use the search bar to find specific content
- **Read Articles**: Click on any news card to view the full article

### **For Administrators**

- **Add Content**: Click the floating "+" button in the bottom-right corner
- **Fill Details**: Enter headline, select category, and provide image URL
- **Publish**: Submit the form to instantly publish new articles
- **View Changes**: New content appears immediately in the news feed

## 🏗️ Tech Stack

- **Frontend**: Next.js 15 with React 19, TypeScript
- **Styling**: Tailwind CSS v4 with custom animations
- **Database**: MongoDB with Mongoose ODM
- **State Management**: React Context API
- **Deployment**: Vercel-ready configuration
- **Development**: Turbopack for fast builds

## 📱 Project Structure

```
themonksapp/
├── app/                    # Next.js App Router
│   ├── admin/             # Admin panel pages
│   ├── discover/          # Main news interface
│   └── api/               # API routes
├── components/            # Reusable UI components
├── lib/                   # Utility functions
├── models/                # MongoDB schemas
└── scripts/               # Database utilities
```

## 🤝 Contributing

Feel free to contribute to this project by submitting issues, feature requests, or pull requests. Follow the existing code style and ensure all tests pass before submitting.

---

_Built with ❤️ using Next.js and MongoDB_

# MDB Website - Mobile Developers of Berkeley

A modern, responsive website for the Mobile Developers of Berkeley (MDB) student organization at UC Berkeley. Built with Next.js 14, React 18, TypeScript, and Tailwind CSS with performance optimizations and clean code architecture.

## 🚀 Features

- **Next.js 14** with App Router for modern routing
- **React 18** with TypeScript for type safety
- **Tailwind CSS** for responsive styling and custom MDB branding
- **Multi-page structure** with comprehensive navigation
- **SEO optimized** with proper metadata and favicons
- **Mobile-first responsive design** with iPad and tablet optimizations
- **Interactive components** including carousels, forms, and embedded Calendly
- **Rich media support** for images, videos, and SVG assets
- **Performance optimized** with intersection observers, custom hooks, and bundle analysis
- **Clean architecture** with centralized constants and reusable components

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx                    # Root layout with Header & Footer
│   ├── page.tsx                      # Home page (/)
│   ├── globals.css                   # Global styles with Tailwind
│   ├── about/
│   │   ├── page.tsx                  # About page (/about)
│   │   └── components/               # About page specific components
│   │       ├── AboutCarousel.tsx     # About page carousel
│   │       ├── AboutUs.tsx           # About section content
│   │       ├── Exec.tsx              # Executive team (using constants)
│   │       ├── Members.tsx           # Member showcase (using constants)
│   │       └── ProjectManagers.tsx   # Project managers (using constants)
│   ├── projects/
│   │   ├── page.tsx                  # Projects page (/projects)
│   │   └── components/               # Projects page specific components
│   │       ├── ProjectHeader.tsx     # Projects page header (mobile-optimized)
│   │       ├── ProjectCarousel.tsx   # Project showcase (dual layout: mobile/tablet + desktop)
│   │       ├── ProjectClients.tsx    # Client projects (mobile-optimized with intersection observer)
│   │       └── Clients.tsx           # Individual client component (mobile-optimized)
│   ├── training-program/
│   │   ├── page.tsx                  # Training program page (/training-program)
│   │   └── components/               # Training program specific components
│   │       ├── TrainingHeader.tsx    # Training page header
│   │       ├── TrainingCurriculum.tsx # Curriculum details
│   │       ├── TrainingStaff.tsx     # Training staff information
│   │       └── TrainingTools.tsx     # Development tools showcase
│   ├── apply/
│   │   ├── page.tsx                  # Apply page (/apply)
│   │   └── components/               # Application specific components
│   │       ├── Calendly.tsx          # Calendly integration
│   │       └── Flyer.tsx             # Application flyer
│   ├── contact/
│   │   └── page.tsx                  # Contact page (/contact)
│   ├── components/
│   │   ├── Header.tsx                # Navigation header with optimized animations
│   │   ├── Footer.tsx                # Site footer
│   │   ├── Carousel.tsx              # Main carousel component
│   │   ├── MemberDB.tsx              # Reusable member display component
│   │   ├── OptimizedImage.tsx        # Performance-optimized image component
│   │   ├── __tests__/                # Component test files
│   │   │   ├── Footer.test.tsx       # Footer component tests
│   │   │   └── Header.test.tsx       # Header component tests
│   │   └── sections/                 # Home page specific components
│   │       ├── TitleSection.tsx      # Home hero section
│   │       ├── PurpAndComm.tsx       # Purpose & community
│   │       └── Destinations.tsx      # Travel destinations
│   ├── constants/                    # Centralized data management
│   │   ├── exec.ts                   # Executive members data
│   │   ├── members.ts                # General members data
│   │   ├── projectManagers.ts        # Project managers data
│   │   └── projects.ts               # Client projects data
│   ├── types/                        # TypeScript type definitions
│   │   └── members.ts                # Centralized member interfaces
│   └── hooks/                        # Custom React hooks
│       └── useIntersectionObserver.ts # Reusable intersection observer hook
├── utils/                            # Utility functions
│   └── test-utils.tsx                # Testing utilities and setup
└── tests/                            # End-to-end tests
    └── e2e/                          # Playwright E2E tests
        ├── home.spec.ts               # Home page E2E tests
        └── navigation.spec.ts         # Navigation E2E tests
```

## 🌐 Pages

1. **Home (/)** - Landing page with hero section, purpose & community, carousel, and destinations
2. **About (/about)** - Organization story and information
3. **Projects (/projects)** - Project showcase and portfolio
4. **Training Program (/training-program)** - Curriculum and development resources
5. **Apply (/apply)** - Application process with Calendly integration
6. **Contact (/contact)** - Contact information and business details

## 🎨 Design System & Responsiveness

The website uses a custom color palette with MDB branding and advanced responsive design:
- **MDB Light Blue** - Primary background color
- **Custom gradients** - From light blue to white
- **Responsive typography** - Optimized for all screen sizes
- **Interactive elements** - Hover effects and smooth transitions
- **Mobile-first approach** - Optimized for mobile, tablet, and desktop
- **Touch-friendly** - Optimized scrolling and interactions for mobile devices

## 🚀 Performance Optimizations

### **Code Organization**
- **Centralized constants** - All hardcoded data moved to organized constants files
- **Custom hooks** - Reusable `useIntersectionObserver` for scroll animations
- **Type safety** - Centralized TypeScript interfaces with inheritance
- **Component optimization** - Removed console logs and optimized state updates

### **Next.js Optimizations**
- **Image optimization** - WebP/AVIF support with device-specific sizing
- **Compression** - Gzip compression enabled
- **Caching** - Enhanced static asset caching with immutable headers
- **Bundle analysis** - Bundle analyzer for performance monitoring

### **Mobile Performance**
- **Intersection Observer** - Optimized thresholds and margins for mobile
- **Animation performance** - Reduced transition durations and improved mobile detection
- **Touch scrolling** - Touch-friendly scroll classes and scrollbar hiding

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Open in browser:**
   Visit [http://localhost:3000](http://localhost:3000)

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run Jest unit tests
- `npm run test:watch` - Run Jest tests in watch mode
- `npm run test:coverage` - Run Jest tests with coverage report
- `npm run test:e2e` - Run Playwright end-to-end tests
- `npm run test:e2e:ui` - Run Playwright tests with UI
- `npm run test:e2e:headed` - Run Playwright tests in headed mode
- `npm run test:all` - Run all tests (unit + E2E)
- `npm run analyze` - Analyze bundle size
- `npm run build:analyze` - Build with bundle analysis
- `npm run lighthouse` - Run Lighthouse performance audit

## 🎨 Adding New Data

### **Adding New Members/Executives:**
1. Update the appropriate constants file in `src/app/constants/`
2. Data automatically flows to components
3. No need to modify component files

### **Adding New Projects:**
1. Update `src/app/constants/projects.ts`
2. Follow the `Client` interface structure
3. Components automatically render new data

## 🎨 Adding New Pages

To add a new page (e.g., `/events`):

1. Create directory: `src/app/events/`
2. Add page file: `src/app/events/page.tsx`
3. Export React component:
   ```tsx
   export default function Events() {
     return (
       <div className="min-h-screen">
         <h1 className="text-5xl font-bold mb-6">Events</h1>
         {/* Your content */}
       </div>
     )
   }
   ```
4. Update navigation in `src/app/components/Header.tsx`

## 🎨 Adding New Components

To add a new section component:

1. Create file: `src/app/components/sections/NewSection.tsx`
2. Export React component with proper TypeScript typing
3. Import and use in the appropriate page
4. Consider using the `useIntersectionObserver` hook for scroll animations

## 🛠️ Tech Stack

- **Next.js 14** - React framework with App Router and performance optimizations
- **React 18** - UI library with modern features and hooks
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS** - Utility-first CSS framework with responsive design
- **PostCSS** - CSS processing and optimization
- **ESLint** - Code linting and quality assurance
- **Jest** - Unit testing framework with coverage reporting
- **Playwright** - End-to-end testing framework with multiple run modes
- **MSW** - Mock Service Worker for API mocking in tests

## 📁 Assets

The website includes various media assets:
- **Images** - Team photos, events, logos, and promotional materials
- **Videos** - Event recordings and promotional content
- **SVGs** - Icons and graphics
- **Logos** - Partner and client logos
- **Executive Photos** - Leadership team images in `/exec/` directory

## 🚀 Deployment

Deploy easily on:
- **Vercel** (recommended for Next.js)
- **Netlify** 
- **AWS**
- Any Node.js platform

For Vercel:
```bash
npm install -g vercel
vercel
```

## 📄 License

Licensed under the MIT License - see [LICENSE](LICENSE) file for details.

## 🤝 Contributing

This is the official website for Mobile Developers of Berkeley. For contributions, please contact the MDB executive team.

## 🔧 Performance Monitoring

### **Bundle Analysis**
```bash
npm run analyze          # Analyze bundle size
npm run build:analyze   # Build with bundle analysis
```

### **Performance Testing**
```bash
npm run test:all        # Run all tests (unit + E2E)
npm run test:e2e        # Run end-to-end tests
npm run test:coverage   # Run unit tests with coverage
npm run lighthouse      # Run Lighthouse performance audit
```

## 📱 Mobile Optimizations

- **Responsive breakpoints** - Optimized for mobile, tablet, and desktop
- **Touch interactions** - Touch-friendly scrolling and interactions
- **Performance** - Optimized animations and intersection observers for mobile
- **Layout adaptations** - Different layouts for different screen sizes
- **Scroll optimizations** - Hidden scrollbars and touch-scroll support

## 🧪 Testing Strategy

### **Unit Tests**
- **Jest** - Component testing with React Testing Library
- **Coverage** - Comprehensive test coverage reporting
- **Mocking** - MSW for API mocking in tests

### **End-to-End Tests**
- **Playwright** - Cross-browser E2E testing
- **Multiple modes** - Headless, headed, and UI testing options
- **Real scenarios** - Home page and navigation testing

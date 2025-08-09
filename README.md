# MDB Website - Mobile Developers of Berkeley

A modern, responsive website for the Mobile Developers of Berkeley (MDB) student organization at UC Berkeley. Built with Next.js 14, React 18, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Next.js 14** with App Router for modern routing
- **React 18** with TypeScript for type safety
- **Tailwind CSS** for responsive styling and custom MDB branding
- **Multi-page structure** with comprehensive navigation
- **SEO optimized** with proper metadata and favicons
- **Mobile-first responsive design**
- **Interactive components** including carousels, forms, and embedded Calendly
- **Rich media support** for images, videos, and SVG assets

## 📁 Project Structure

```
src/
└── app/
    ├── layout.tsx                    # Root layout with Header & Footer
    ├── page.tsx                      # Home page (/)
    ├── globals.css                   # Global styles with Tailwind
    ├── about/
    │   └── page.tsx                  # About page (/about)
    ├── projects/
    │   └── page.tsx                  # Projects page (/projects)
    ├── training-program/
    │   └── page.tsx                  # Training program page (/training-program)
    ├── apply/
    │   ├── page.tsx                  # Apply page (/apply)
    │   └── components/
    │       ├── Calendly.tsx          # Calendly integration
    │       └── Flyer.tsx             # Application flyer
    ├── contact/
    │   └── page.tsx                  # Contact page (/contact)
    └── components/
        ├── Header.tsx                # Navigation header
        ├── Footer.tsx                # Site footer
        └── sections/                 # Page-specific components
            ├── TitleSection.tsx      # Home hero section
            ├── PurpAndComm.tsx       # Purpose & community
            ├── Carousel.tsx          # Image carousel
            ├── Destinations.tsx      # Travel destinations
            ├── AboutUs.tsx           # About section
            ├── AboutCarousel.tsx     # About page carousel
            ├── Exec.tsx              # Executive team
            ├── ProjectManagers.tsx   # Project managers
            ├── Members.tsx           # Member showcase
            ├── ProjectHeader.tsx     # Projects page header
            ├── ProjectCarousel.tsx   # Project showcase
            ├── ProjectClients.tsx    # Client logos
            ├── TrainingHeader.tsx    # Training page header
            ├── TrainingCurriculum.tsx # Curriculum details
            ├── TrainingStaff.tsx     # Training staff
            └── TrainingTools.tsx     # Development tools
```

## 🌐 Pages

1. **Home (/)** - Landing page with hero section, purpose & community, carousel, and destinations
2. **About (/about)** - Organization story, executive team, project managers, and member showcase
3. **Projects (/projects)** - Project showcase, client partnerships, and portfolio
4. **Training Program (/training-program)** - Curriculum, staff, and development tools
5. **Apply (/apply)** - Application process with Calendly integration
6. **Contact (/contact)** - Contact information and business details

## 🎨 Design System

The website uses a custom color palette with MDB branding:
- **MDB Light Blue** - Primary background color
- **Custom gradients** - From light blue to white
- **Responsive typography** - Optimized for all screen sizes
- **Interactive elements** - Hover effects and smooth transitions

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

## 🛠️ Tech Stack

- **Next.js 14** - React framework with App Router
- **React 18** - UI library with modern features
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS processing and optimization
- **ESLint** - Code linting and quality assurance

## 📁 Assets

The website includes various media assets:
- **Images** - Team photos, events, logos, and promotional materials
- **Videos** - Event recordings and promotional content
- **SVGs** - Icons and graphics
- **Logos** - Partner and client logos

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

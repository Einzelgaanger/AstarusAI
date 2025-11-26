# Astarus AI Platform

## Overview

Astarus AI is a marketing website showcasing a memory-augmented transformer technology called LUT-LLM (Lookup Table - Large Language Model). The platform demonstrates a novel approach to continuous learning AI systems that can adapt in real-time without expensive retraining cycles. The website serves as both an informational resource and interactive demonstration platform for this technology.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes (November 2025)

### Complete Professional UI/UX Revamp
The website has undergone a comprehensive redesign with modern, professional styling:

**Design System Enhancements:**
- Extended color palette with HSL-based primary (purple), secondary (orange), and success (green) colors
- Multiple gradient utilities: `bg-gradient-primary`, `bg-gradient-secondary`, `text-gradient`, `text-gradient-secondary`
- Glass morphism effects: `glass`, `glass-sm` utilities with backdrop blur
- Mesh gradient backgrounds using radial gradients
- Professional section badges with `section-badge` class
- Enhanced CTA buttons with gradient borders and hover effects

**Stock Images Added:**
All major sections now feature professional stock imagery:
- Hero section: AI robot/technology background
- Problem section: Business challenges imagery in cards
- Solution section: AI technology visual
- UseCases section: Thumbnail images for each use case card
- Technology page: Abstract neural network art background
- Team page: Professional team collaboration background
- Investors page: Business/investment background
- Contact page: Customer support/communication background

**Component Improvements:**
- Navbar: Glass morphism effect with transparent blur backdrop
- Hero: Full-screen background image with gradient overlays
- Problem: Cards with image thumbnails and enhanced hover states
- Solution: Background imagery with gradient overlays
- Advantages: Gradient icon backgrounds and improved metrics display
- UseCases: Image thumbnails in corner of cards
- Footer: Modern professional layout with improved sections
- Chat/Try It: Professional AI demo interface with enhanced styling

**All Secondary Pages Enhanced:**
Technology, Team, Investors, and Contact pages now feature hero sections with professional background images and consistent styling.

## System Architecture

### Frontend Architecture

**Core Stack:**
- **Framework**: React 18 with TypeScript for type-safe component development
- **Build Tool**: Vite for fast development and optimized production builds
- **Routing**: React Router for client-side navigation with a catch-all 404 route
- **Styling**: Tailwind CSS with a custom design system featuring glass morphism effects and gradient overlays
- **Component Library**: shadcn/ui (Radix UI primitives) providing accessible, pre-built UI components
- **Animations**: Framer Motion for declarative animations and transitions

**Design System:**
The application uses a sophisticated visual identity centered around:
- Custom CSS variables for theming (primary purple, secondary orange, success green)
- Gradient mesh backgrounds using radial gradients with opacity layers
- Glass morphism effects on navigation and cards (backdrop blur with border transparency)
- Custom animation presets defined in `lib/motion.ts` for consistent fade-in and stagger effects
- Two primary fonts: Space Grotesk and Exo 2 loaded from Google Fonts

**Component Architecture:**
- **Pages** (`src/pages/`): Route-level components (Index, Technology, Team, Investors, Contact, Chat, NotFound)
- **Layout Components** (`src/components/`): Reusable sections like Hero, Navbar, Footer, Problem, Solution, Advantages, UseCases, CTA
- **UI Components** (`src/components/ui/`): shadcn/ui primitives for buttons, cards, forms, dialogs, etc.
- **Shared Utilities**: ScrollToTop component for route change scroll behavior

**State Management:**
- React Query (TanStack Query) for server state management and caching
- Local component state using React hooks (useState, useRef, useEffect)
- Form handling with react-hook-form and zod validation (via @hookform/resolvers)

**Routing Strategy:**
The application uses client-side routing with React Router. A `vercel.json` configuration ensures all routes fall back to `index.html` for proper SPA behavior on static hosting platforms.

### Interactive Demo Architecture

**Chat Interface** (`src/pages/Chat.tsx`):
The most complex component is the interactive demo that communicates with a backend AI service:

- **API Integration**: Connects to a RunPod-hosted backend at `https://dhzzxfr41qjcz7-8000.proxy.runpod.net`
- **Model**: Uses "mistral" as the base transformer model
- **LUT Configuration**: Supports multiple pretrained lookup tables with configurable block placements and residual thresholds
- **Real-time Interaction**: Users can chat with the AI, train custom LUTs, and observe perplexity improvements
- **State Management**: Complex local state for messages, LUT configurations, training data, and performance metrics

**Key Features:**
- Multiple conversation modes (base model, pretrained LUTs, custom LUTs)
- Dynamic LUT training with custom prompt/completion pairs
- Residual threshold adjustment for fine-tuning correction application
- Performance visualization showing perplexity reduction

### Static Asset Management

**Public Assets:**
- Logo and favicon: `/Astarus Logo.jpeg`
- Background images for sections (AI backgrounds, team photos, technology visuals)
- `robots.txt` for search engine crawling configuration

**Build Output:**
- Production builds output to `dist/` directory
- Static assets are served from the project root by Vite
- Preview mode available via `vite preview` for testing production builds locally

### Deployment Architecture

**Static Hosting:**
The application is designed for static hosting platforms (Vercel, Netlify, GitHub Pages):
- No backend dependencies for the marketing site itself
- All dynamic functionality isolated to the Chat demo page
- Rewrite rules configured for SPA routing (`vercel.json`)

**Development vs. Production:**
- Development: Runs on `localhost:5000` with hot module replacement
- Preview: Configured to run on `0.0.0.0` with allowed hosts for deployment environments
- Build modes: Standard production build (`npm run build`) and development build (`npm run build:dev`)

## External Dependencies

### UI Component Libraries
- **shadcn/ui**: Complete set of Radix UI primitives (accordion, alert-dialog, avatar, badge, breadcrumb, button, calendar, card, carousel, chart, checkbox, collapsible, command, context-menu, dialog, drawer, dropdown-menu, form, hover-card, input, input-otp, label, menubar, navigation-menu, pagination, popover, progress, radio-group, resizable, scroll-area, select, separator, sheet, sidebar, skeleton, slider, sonner, switch, tabs, textarea, toast, toggle, toggle-group, tooltip)
- **Radix UI**: Unstyled, accessible component primitives
- **class-variance-authority**: Utility for creating variant-based component styles
- **cmdk**: Command menu component for keyboard-driven navigation
- **embla-carousel-react**: Carousel/slider functionality
- **lucide-react**: Icon library (300+ icons used throughout the site)

### Animation and Interaction
- **framer-motion**: Declarative animation library for React
- **next-themes**: Theme management (though currently only light theme implemented)

### Form Management
- **react-hook-form**: Performant form validation and submission
- **@hookform/resolvers**: Validation schema resolvers
- **zod**: TypeScript-first schema validation (implied via resolvers)

### Date Handling
- **date-fns**: Modern JavaScript date utility library
- **react-day-picker**: Date picker component

### Development Tools
- **TypeScript**: Static type checking with relaxed strictness for faster development
- **ESLint**: Code linting with React-specific rules
- **PostCSS**: CSS processing with Tailwind and Autoprefixer
- **Vite Plugins**: @vitejs/plugin-react-swc for fast refresh using SWC compiler

### Backend Integration (Demo Only)
- **RunPod API**: External AI inference service for the interactive demo
- **Mistral Model**: Base transformer model hosted on RunPod
- **Custom LUT Service**: Memory-augmented transformer API endpoints for training and inference

### Analytics and SEO
- Open Graph meta tags configured for social media sharing
- Twitter Card metadata for enhanced Twitter previews
- Google Fonts integration for custom typography
- Structured HTML with semantic markup for SEO

### Build and Deployment
- **Vercel**: Primary deployment target with rewrite configuration
- **Static Hosting Compatible**: Works with Netlify, GitHub Pages, or any static host
- **Environment Variables**: PORT configuration for flexible deployment
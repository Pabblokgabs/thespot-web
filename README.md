# TheSpot Web

A modern, full-featured web application for discovering and exploring local spots and events. Built with React, TypeScript, and powered by Vite for optimal performance and developer experience.

## Overview

**TheSpot** is a comprehensive platform that connects users with amazing local venues, events, and experiences. The application features separate user flows for regular users and venue owners, with comprehensive discovery tools, detailed spot/event information, user profiles, and owner management dashboards.

## Key Features

- **Discovery & Search**: Browse, search, and filter local spots and events with advanced filtering capabilities
- **Spot & Event Details**: Comprehensive information pages for venues and events with rich content
- **User Authentication**: Secure signup, login, password reset, and email verification flows
- **User Profiles**: Personalized user dashboards and profile management
- **Owner Dashboard**: Complete management suite for venue owners including analytics and bookings
- **Subscription Plans**: Flexible pricing tiers for premium features
- **Responsive Design**: Fully responsive UI optimized for desktop and mobile devices
- **Dark Mode Support**: Theme switching for enhanced user experience
- **Real-time Data**: TanStack Query integration for efficient data fetching and caching

## Tech Stack

### Frontend Framework

- **React 19.0** - Modern UI library with latest features
- **TypeScript ~5.7** - Type-safe development
- **Vite 6.3** - Next-generation frontend build tool with lightning-fast HMR

### Styling & UI

- **Tailwind CSS 4.1** - Utility-first CSS framework
- **Tailwind Vite Plugin** - Seamless Tailwind integration
- **shadcn/ui** - High-quality, accessible React components
- **Radix UI** - Unstyled, accessible component primitives
- **DaisyUI 5.0** - Tailwind CSS component library

### State & Data Management

- **TanStack React Query 5.81** - Powerful server state management
- **React Context API** - App-level state management
- **React Router DOM 7.5** - Client-side routing

### UI Components & Libraries

- **Lucide React** - Beautiful, consistent icon library
- **Ant Design Icons 5.6** - Extended icon collection
- **Swiper 11.2** - Touch slider library
- **React Hot Toast** - Elegant notifications
- **Sonner** - Toast notification library
- **React Spinners** - Loading animation components

### Utilities

- **Date-fns 3.6** - Modern date utility library
- **ECharts 5.6** - Data visualization library
- **next-themes** - Theme management
- **cmdk** - Command menu component
- **clsx & tailwind-merge** - Conditional CSS utilities

### Development Tools

- **ESLint 9.22** - Code quality and consistency
- **TypeScript ESLint** - Type-aware linting
- **Ant Design 5.25** - UI component library

## Project Structure

```
src/
├── pages/              # Page components organized by user role
│   ├── common/        # Shared pages (home, search, auth, etc.)
│   ├── owner/         # Owner-specific pages (dashboard, listings)
│   └── user/          # User-specific pages (profile, details)
├── components/        # Reusable React components
│   ├── common/        # Common components (navbar, footer, etc.)
│   ├── owner/         # Owner-specific components
│   ├── home/          # Home page sections
│   └── ui/            # shadcn/ui component library
├── lib/               # Utility functions and helpers
│   ├── context/       # React context providers
│   ├── utils/         # Utility functions
│   └── types.ts       # TypeScript type definitions
├── assets/            # Static images and media
├── constance/         # Constants (colors, etc.)
└── tanstack-hooks/    # Custom TanStack hooks
```

## Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd thespot-web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

### Development

Start the development server with hot module replacement:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

Build optimized production bundle:

```bash
npm run build
```

This command:

- Runs TypeScript type checking (`tsc -b`)
- Builds with Vite for optimal performance
- Outputs to `dist/` directory

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

### Code Quality

Run ESLint to check code quality:

```bash
npm run lint
```

## Available Routes

### Common Pages

- `/` - Home page with featured spots and events
- `/search` - Advanced search and filtering
- `/view-all` - Browse all spots/events
- `/spot-details/:id` - Detailed spot information
- `/event-details/:id` - Detailed event information
- `/pricing` - Subscription pricing plans
- `/signin` - User login
- `/forgot-password` - Password recovery
- `/reset-password` - Password reset
- `/privacy-policy` - Privacy policy
- `/terms-of-service` - Terms of service
- `/cookie-policy` - Cookie policy

### User Routes

- `/user/signup` - User registration
- `/user/signup/personal-information` - User profile setup
- `/user/profile` - User profile dashboard

### Owner Routes

- `/owner/signup` - Owner registration
- `/owner/signup/personal-information` - Owner profile setup
- `/owner/dashboard` - Owner management dashboard
- `/owner/spot-listing` - Manage venue listings

## Architecture Highlights

### Component Organization

- **Presentational Components**: Reusable UI components in `components/ui/`
- **Feature Components**: Business logic components in `components/common/`, `components/owner/`, `components/home/`
- **Page Components**: Full-page layouts in `pages/`

### State Management

- **Global Context**: `OverAllProvider`, `OwnerProvider`, `UserProvider` for app-wide state
- **Server State**: TanStack Query for API data fetching and caching
- **Custom Hooks**: Specialized hooks in `tanstack-hooks/` for data operations

### Styling Approach

- **Utility-first CSS**: Tailwind CSS for consistent, maintainable styling
- **Component System**: shadcn/ui + Radix UI for accessible, customizable components
- **Theme Support**: Dark/light mode switching with `next-themes`
- **CSS Variables**: Tailwind CSS variables for dynamic theming

## Contributing

Ensure code quality before submitting contributions:

1. Run `npm run lint` to check for linting issues
2. Run `npm run build` to verify the build succeeds
3. Follow existing code style and component patterns

## Performance Optimizations

- **Code Splitting**: Vite automatically splits code for optimal loading
- **Fast Refresh**: React plugin with Babel for instant HMR
- **Query Caching**: TanStack Query manages API request caching
- **Lazy Loading**: Routes and components loaded on-demand
- **Tree Shaking**: Unused code automatically removed in production

## Browser Support

Modern browsers with ES2020+ support:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

[Add license information here]

## Support

[Add support/contact information here]

# TheSpot Web - Architecture Documentation

## Table of Contents

1. [System Overview](#system-overview)
2. [High-Level Architecture](#high-level-architecture)
3. [Directory Structure](#directory-structure)
4. [Component Architecture](#component-architecture)
5. [State Management](#state-management)
6. [Data Flow](#data-flow)
7. [Routing Architecture](#routing-architecture)
8. [Styling Architecture](#styling-architecture)
9. [Performance Considerations](#performance-considerations)
10. [Deployment & Build](#deployment--build)

---

## System Overview

TheSpot Web is a dual-role web application that serves both regular users and venue owners. The application is built as a single React SPA (Single Page Application) with role-based routing and feature separation.

### Core Responsibilities

- **User Discovery**: Browse and search local spots and events
- **Event Management**: View event details and information
- **User Profiles**: Manage personal information and preferences
- **Owner Dashboards**: Manage venues, view analytics, and track bookings
- **Authentication**: Handle user signup, login, and password recovery

---

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    TheSpot Web Application                   │
├─────────────────────────────────────────────────────────────┤
│                     React 19 + TypeScript                    │
│               (Vite Dev Server with HMR)                     │
├─────────────────────────────────────────────────────────────┤
│  Routing Layer (React Router v7)                            │
│  ├── Common Routes (Home, Search, Auth, etc.)              │
│  ├── User Routes (/user/*)                                 │
│  └── Owner Routes (/owner/*)                               │
├─────────────────────────────────────────────────────────────┤
│  State Management Layer                                      │
│  ├── Context Providers (Global, User, Owner)               │
│  └── TanStack Query (Server State)                          │
├─────────────────────────────────────────────────────────────┤
│  Component Layer                                             │
│  ├── UI Components (shadcn/ui, Radix UI)                   │
│  ├── Feature Components (Domain-specific)                   │
│  └── Page Components (Full layouts)                         │
├─────────────────────────────────────────────────────────────┤
│  Styling Layer                                               │
│  ├── Tailwind CSS (Utility-first)                           │
│  └── CSS Variables (Theme switching)                         │
├─────────────────────────────────────────────────────────────┤
│  Utility Layer                                               │
│  ├── Custom Hooks (TanStack hooks)                          │
│  ├── Type Definitions                                       │
│  ├── Constants & Options                                    │
│  └── Helper Functions (regex, dates, etc.)                 │
└─────────────────────────────────────────────────────────────┘
```

---

## Directory Structure

### Root Level

```
thespot-web/
├── public/                 # Static assets
├── src/                    # Source code
├── .git/                   # Git repository
├── package.json            # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite build configuration
├── tailwind.config.ts     # Tailwind CSS configuration
├── components.json        # shadcn/ui configuration
├── eslint.config.js       # ESLint configuration
├── README.md              # Project documentation
├── ARCHITECTURE.md        # This file
└── docs/                  # Additional documentation
```

### Source Code (`src/`)

```
src/
├── main.tsx               # Application entry point
├── App.tsx                # Root Router component
├── index.css              # Global styles
├── vite-env.d.ts          # Vite environment types
├── declarations.d.ts      # TypeScript declarations
│
├── pages/                 # Page-level components
│   ├── index.tsx          # Page exports
│   ├── common/            # Shared pages
│   │   ├── home.tsx
│   │   ├── search.tsx
│   │   ├── Cookie.tsx
│   │   ├── privacy.tsx
│   │   ├── terms.tsx
│   │   ├── subscription.plan.overview.tsx
│   │   └── auth/          # Auth pages
│   │       ├── Login
│   │       ├── Email
│   │       ├── PersonalInfo
│   │       └── ResetPassword
│   ├── user/              # User-specific pages
│   │   ├── profile.tsx
│   │   ├── event.details.tsx
│   │   ├── spot.details.tsx
│   │   └── auth/
│   └── owner/             # Owner-specific pages
│       ├── index.tsx
│       ├── dashboard/
│       ├── spot.listing.tsx
│       └── auth/
│
├── components/            # Reusable components
│   ├── index.tsx          # Component exports
│   ├── common/            # Shared components
│   │   ├── auth.navbar.tsx
│   │   ├── navbar.tsx
│   │   ├── footer.tsx
│   │   ├── btn.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── comboBox.tsx
│   │   ├── pagination.tsx
│   │   ├── search.modal.tsx
│   │   ├── popup.tsx
│   │   ├── toaster.tsx
│   │   ├── otp.verification.tsx
│   │   ├── password.tsx
│   │   ├── viewAllImages.tsx
│   │   ├── tile.skeleton.tsx
│   │   ├── cards/
│   │   ├── home/          # Home page sections
│   │   └── loading.spinner/
│   ├── owner/             # Owner-specific components
│   │   ├── echard.tsx
│   │   ├── dashboard/
│   │   ├── models/
│   │   └── ...
│   └── ui/                # shadcn/ui components
│       ├── accordion.tsx
│       ├── alert-dialog.tsx
│       ├── avatar.tsx
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── checkbox.tsx
│       ├── dialog.tsx
│       ├── dropdown-menu.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── select.tsx
│       ├── tabs.tsx
│       ├── table.tsx
│       └── ... (more UI components)
│
├── lib/                   # Utility functions and helpers
│   ├── types.ts           # Global TypeScript definitions
│   ├── utils.ts           # General utilities
│   ├── county.ts          # Location/county data
│   ├── mock.ts            # Mock data
│   ├── options.tsx        # Options/select data
│   ├── scrollToTop.tsx    # Scroll behavior utility
│   ├── context/           # React Context providers
│   │   ├── owner.tsx      # Owner context
│   │   ├── user.tsx       # User context
│   │   └── useContext.tsx # Custom context hooks
│   └── utils/             # Specialized utilities
│       ├── regex.ts       # Regular expressions
│       └── registrationProgress.ts
│
├── tanstack-hooks/        # TanStack Query custom hooks
│   └── user.auth.tan-h.ts # Authentication hooks
│
├── constance/             # Constants
│   └── colors.ts
│
└── assets/                # Static assets
    ├── avatars/
    ├── spot/
    └── spots/
```

---

## Component Architecture

### Component Hierarchy

```
App (Root)
├── Router
│   ├── ScrollToTop
│   ├── Routes
│   │   ├── Common Routes
│   │   │   ├── Home (with home/* sub-components)
│   │   │   ├── Search
│   │   │   ├── SpotDetails
│   │   │   └── ...
│   │   ├── User Routes
│   │   │   ├── Profile
│   │   │   └── ...
│   │   └── Owner Routes
│   │       ├── Dashboard (with dashboard/* sub-components)
│   │       └── ...
│   └── QueryClientProvider
│       └── OverAllProvider
│           └── OwnerProvider
│               └── UserProvider
│                   ├── Main Routes
│                   └── Toaster
│                       └── ViewAllImages
```

### Component Types

#### 1. **Page Components** (`pages/`)

- Full-page layouts
- Manage page-level state
- Orchestrate feature components
- Handle route-specific logic

#### 2. **Feature Components** (`components/common/`, `components/owner/`, `components/home/`)

- Domain-specific functionality
- Reusable across multiple pages
- Examples: `dashboard.content.tsx`, `event.tsx`, `spots.tsx`
- Connect to context and TanStack Query

#### 3. **UI Components** (`components/ui/`)

- Presentational/dumb components
- No business logic
- Highly reusable and themeable
- Based on shadcn/ui and Radix UI

#### 4. **Layout Components** (`components/common/`)

- Navigation, footer, sidebars
- Applied across multiple pages
- Examples: `navbar.tsx`, `footer.tsx`

---

## State Management

### Architecture Pattern: Hybrid State Management

```
┌─────────────────────────────────────────────────────┐
│           Global State Management                    │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌──────────────────┐  ┌──────────────────────┐   │
│  │ React Context    │  │ TanStack Query       │   │
│  │ (App State)      │  │ (Server State)       │   │
│  │                  │  │                      │   │
│  │ • User data      │  │ • API responses      │   │
│  │ • Owner data     │  │ • Caching            │   │
│  │ • Auth status    │  │ • Sync status        │   │
│  │ • Theme          │  │ • Error handling     │   │
│  └──────────────────┘  └──────────────────────┘   │
│                                                     │
└─────────────────────────────────────────────────────┘
             ↓                    ↓
        Components / Pages
```

### Context Providers

#### 1. **OverAllProvider** (`lib/context/useContext.tsx`)

- Application-wide state
- Theme management
- Global UI state

#### 2. **UserProvider** (`lib/context/user.tsx`)

- User authentication state
- User profile information
- User preferences
- User-specific data

#### 3. **OwnerProvider** (`lib/context/owner.tsx`)

- Owner authentication state
- Owner profile information
- Owner-specific settings
- Venue/spot data

### TanStack Query Integration

**Purpose**: Manage server state and API data

**Key Features**:

- Automatic caching of API responses
- Background data synchronization
- Built-in error handling and retry logic
- Optimistic updates support
- Custom hooks in `tanstack-hooks/`

**Usage Pattern**:

```typescript
// In custom hooks (tanstack-hooks/user.auth.tan-h.ts)
const useUserAuth = () => {
  return useQuery({
    queryKey: ["user", "auth"],
    queryFn: fetchUserAuth,
  });
};

// In components
const { data, isLoading, error } = useUserAuth();
```

---

## Data Flow

### User Authentication Flow

```
┌──────────────────────────────────────────────────┐
│ 1. User enters credentials on Login page         │
└───────────────┬──────────────────────────────────┘
                │
┌───────────────▼──────────────────────────────────┐
│ 2. Submit form data to API (TanStack Query)     │
└───────────────┬──────────────────────────────────┘
                │
┌───────────────▼──────────────────────────────────┐
│ 3. Store response in UserProvider context       │
└───────────────┬──────────────────────────────────┘
                │
┌───────────────▼──────────────────────────────────┐
│ 4. Redirect to authenticated route               │
└───────────────┬──────────────────────────────────┘
                │
┌───────────────▼──────────────────────────────────┐
│ 5. Components consume user state from context   │
└──────────────────────────────────────────────────┘
```

### Spot/Event Discovery Flow

```
User navigates to /search
        ↓
Search component renders
        ↓
Fetch spots/events via TanStack Query
        ↓
Display results in search results
        ↓
User clicks on spot/event
        ↓
Navigate to /spot-details/:id or /event-details/:id
        ↓
Fetch detailed data
        ↓
Render detailed view with SpotDetails/EventDetails component
```

### Owner Dashboard Flow

```
Owner navigates to /owner/dashboard
        ↓
Dashboard component loads
        ↓
Fetch analytics/calendar/booking data via TanStack Query
        ↓
OwnerProvider supplies owner context
        ↓
Dashboard content renders with cards/charts
        ↓
Owner interacts with dashboard
        ↓
Update data (optimistic update or mutation)
        ↓
Invalidate cache to refresh data
```

---

## Routing Architecture

### Route Structure

```
App.tsx
├── / (Home)
├── /signin (Login)
├── /privacy-policy
├── /terms-of-service
├── /cookie-policy
├── /forgot-password
├── /reset-password
├── /view-all
├── /search
├── /spot-details/:id
├── /event-details/:id
├── /pricing
│
├── /user/*
│   ├── /user/signup
│   ├── /user/signup/personal-information
│   └── /user/profile
│
└── /owner/*
    ├── /owner/signup
    ├── /owner/signup/personal-information
    ├── /owner/dashboard
    └── /owner/spot-listing
```

### Route Protection Pattern

**Current Implementation**: Routes are public
**Recommended Enhancement**: Implement route guards using React Router's `<Navigate>` or custom components

```typescript
// Example pattern for protected routes
const ProtectedRoute = ({ element, isAuthenticated }) => {
  return isAuthenticated ? element : <Navigate to="/signin" />;
};
```

---

## Styling Architecture

### Technology Stack

1. **Tailwind CSS 4.1** - Utility-first framework
   - Configuration: `tailwind.config.ts`
   - CSS Variables for dynamic theming
   - Dark mode support

2. **shadcn/ui** - Component library
   - Based on Radix UI
   - Pre-built accessible components
   - Customizable via CSS variables

3. **CSS Variables** - Dynamic theming
   - Defined in Tailwind config
   - Switched via `next-themes`

### Styling Strategy

```
Global Styles (index.css)
        ↓
Tailwind Utility Classes
        ↓
Component-specific Styles (shadcn/ui)
        ↓
CSS Variables for Dynamic Properties
        ↓
Dark Mode via CSS Classes
```

### Theme Implementation

**Dark Mode Provider**: `next-themes`

```typescript
// In main.tsx
<App /> // Wrapped in theme provider

// In components
const { theme, setTheme } = useTheme();
// Switch between 'light', 'dark', 'system'
```

---

## Performance Considerations

### Optimization Strategies

#### 1. **Code Splitting**

- Vite automatic chunk splitting
- Routes load code on-demand
- Component lazy loading support

#### 2. **Caching**

- TanStack Query manages API cache
- Stale-while-revalidate pattern
- Configurable cache time

#### 3. **Image Optimization**

- Static assets in `public/` and `assets/`
- Consider image lazy loading for large lists
- Responsive images via CSS

#### 4. **Bundle Size**

- Tree-shaking removes unused code
- Tailwind CSS purges unused styles
- Dynamic imports for heavy libraries (ECharts)

#### 5. **Rendering Performance**

- React 19 with automatic batching
- Context splitting by domain (User, Owner)
- Memoization for expensive components

### Performance Monitoring

- Use React DevTools Profiler
- Monitor TanStack Query request count
- Check bundle size with `npm run build`

---

## Deployment & Build

### Build Process

```bash
npm run build
```

**Steps**:

1. TypeScript type checking (`tsc -b`)
2. Vite build with Tailwind CSS compilation
3. Code minification and optimization
4. Output to `dist/` directory

### Build Configuration

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

### Environment Variables

**Not currently configured** - Add `.env` support for:

- API base URL
- Authentication keys
- Feature flags
- Analytics tokens

**Recommended Setup**:

```env
VITE_API_BASE_URL=https://api.example.com
VITE_APP_NAME=TheSpot
```

### Deployment Targets

- **Static Hosting**: Netlify, Vercel, GitHub Pages
- **Container**: Docker with Node.js base
- **Cloud Platforms**: AWS S3 + CloudFront, Azure Static Web Apps

---

## Design Patterns Used

### 1. **Provider Pattern**

- Context providers wrap the app
- Consumers access state throughout tree

### 2. **Custom Hooks Pattern**

- `useContext()` for context consumption
- `useQuery()` from TanStack Query for data
- Domain-specific hooks in `tanstack-hooks/`

### 3. **Component Composition**

- Small, focused components
- Reusable UI primitives
- Feature composition for pages

### 4. **Container/Presentational Pattern**

- Container: components with logic and data
- Presentational: UI components (shadcn/ui)

### 5. **Factory/Builder Pattern**

- Options objects for component props
- Configuration objects in `lib/options.tsx`

---

## Future Architecture Recommendations

1. **Add Route Guards**: Implement protected routes for authenticated pages
2. **Implement Error Boundaries**: Catch component errors gracefully
3. **Add E2E Testing**: Cypress or Playwright for integration tests
4. **API Layer Abstraction**: Create dedicated API service layer
5. **Environment Configuration**: Move configuration to environment variables
6. **Global Error Handling**: Implement centralized error handler
7. **Logging**: Add application logging service
8. **Analytics**: Integrate analytics tracking
9. **Offline Support**: Consider offline-first approach with service workers
10. **Accessibility Audit**: Regular a11y testing and improvements

# Routing Guide

## Overview

TheSpot Web uses React Router v7 for client-side routing. The application has a role-based routing structure with separate routes for common pages, users, and owners.

## Routing Architecture

### Route Structure

```
/                           (Public)
├── Home
├── /signin                  (Login)
├── /signup                  (Signup - currently in /user)
├── /forgot-password         (Password recovery)
├── /reset-password          (Password reset)
├── /search                  (Search spots/events)
├── /view-all                (Browse all)
├── /spot-details/:id        (Spot details)
├── /event-details/:id       (Event details)
├── /pricing                 (Subscription plans)
├── /privacy-policy          (Legal)
├── /terms-of-service        (Legal)
├── /cookie-policy           (Legal)
│
├── /user/*                  (User routes)
│   ├── /user/signup
│   ├── /user/signup/personal-information
│   └── /user/profile        (Protected)
│
└── /owner/*                 (Owner routes)
    ├── /owner/signup
    ├── /owner/signup/personal-information
    ├── /owner/dashboard     (Protected)
    └── /owner/spot-listing  (Protected)
```

## Route Implementation

### Main Router Setup

**File**: `App.tsx`

```tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Login, SpotDetails, ... } from "./pages/index";
import ScrollToTop from "./lib/scrollToTop";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Common pages */}
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/search" element={<Search />} />
        <Route path="/spot-details/:id" element={<SpotDetails />} />
        <Route path="/event-details/:id" element={<EventDetails />} />

        {/* User pages */}
        <Route path="/user/signup" element={<Email />} />
        <Route path="/user/signup/personal-information" element={<PersonalInfo />} />
        <Route path="/user/profile" element={<Profile />} />

        {/* Owner pages */}
        <Route path="/owner/signup" element={<OwnerEmail />} />
        <Route path="/owner/signup/personal-information" element={<OwnerPersonalInfo />} />
        <Route path="/owner/dashboard" element={<Dashboard />} />
        <Route path="/owner/spot-listing" element={<SpotListing />} />
      </Routes>
    </Router>
  );
}
```

### ScrollToTop Utility

**File**: `lib/scrollToTop.tsx`

```tsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
```

**Purpose**: Automatically scroll to top when route changes for better UX.

## Route Categories

### 1. Public Routes

Accessible to all users without authentication.

**Routes**:

- `/` - Home page
- `/signin` - Login page
- `/search` - Search interface
- `/view-all` - Browse all items
- `/spot-details/:id` - Spot details
- `/event-details/:id` - Event details
- `/pricing` - Subscription pricing
- Legal pages (privacy, terms, cookie)

**Component Example**:

```tsx
// pages/common/home.tsx
import { FC } from "react";
import { Navbar } from "@/components/common/navbar";
import { Footer } from "@/components/common/footer";
import { TrendingNow } from "@/components/home/trending.now";

export const Home: FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <TrendingNow />
        {/* More sections */}
      </main>
      <Footer />
    </div>
  );
};
```

### 2. User Routes

Routes specific to regular users.

**Authentication Flow**:

```
/user/signup
  ↓
User enters email and password
  ↓
/user/signup/personal-information
  ↓
User enters personal details
  ↓
Account created, redirect to /user/profile
```

**Routes**:

- `/user/signup` - Email signup
- `/user/signup/personal-information` - Complete profile
- `/user/profile` - User dashboard (should be protected)

**Protected Route Pattern**:

```tsx
// pages/user/profile.tsx
import { FC } from "react";
import { Navigate } from "react-router-dom";
import { useUserContext } from "@/lib/context/useContext";

export const Profile: FC = () => {
  const { user, isAuthenticated } = useUserContext();

  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }

  return (
    <div>
      <h1>Welcome, {user?.name}</h1>
      {/* Profile content */}
    </div>
  );
};
```

### 3. Owner Routes

Routes specific to venue owners.

**Authentication Flow**:

```
/owner/signup
  ↓
Owner enters email and password
  ↓
/owner/signup/personal-information
  ↓
Owner enters business details
  ↓
Account created, redirect to /owner/dashboard
```

**Routes**:

- `/owner/signup` - Owner registration
- `/owner/signup/personal-information` - Business info
- `/owner/dashboard` - Owner dashboard (should be protected)
- `/owner/spot-listing` - Manage venues (should be protected)

**Protected Owner Route**:

```tsx
// pages/owner/index.tsx
import { FC } from "react";
import { Navigate } from "react-router-dom";
import { useOwnerContext } from "@/lib/context/useContext";
import { OwnerNavbar } from "@/components/common/navbar";

export const OwnerPage: FC = () => {
  const { owner, isAuthenticated } = useOwnerContext();

  if (!isAuthenticated) {
    return <Navigate to="/owner/signup" />;
  }

  return (
    <div>
      <OwnerNavbar />
      {/* Owner content */}
    </div>
  );
};
```

## Dynamic Routes

### Routes with Parameters

**Spot/Event Details Routes**:

```tsx
<Route path="/spot-details/:id" element={<SpotDetails />} />
<Route path="/event-details/:id" element={<EventDetails />} />
```

**Component Implementation**:

```tsx
import { useParams } from "react-router-dom";
import { useSpotDetails } from "@/tanstack-hooks/user.auth.tan-h";

export const SpotDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: spot, isLoading, error } = useSpotDetails(id!);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorPage />;

  return (
    <div>
      <h1>{spot?.name}</h1>
      <p>{spot?.description}</p>
    </div>
  );
};
```

## Navigation Patterns

### Programmatic Navigation

**Using useNavigate Hook**:

```tsx
import { useNavigate } from "react-router-dom";

export function LoginForm() {
  const navigate = useNavigate();

  const handleLogin = async (credentials) => {
    await login(credentials);
    navigate("/user/profile");
  };

  return <form onSubmit={handleLogin}>{/* Form fields */}</form>;
}
```

### Link Navigation

**Using Link Component**:

```tsx
import { Link } from "react-router-dom";

export function SpotCard({ spot }) {
  return (
    <div>
      <h3>{spot.name}</h3>
      <Link to={`/spot-details/${spot.id}`}>View Details</Link>
    </div>
  );
}
```

### Redirect Pattern

**Using Navigate Component**:

```tsx
import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children, isAuthenticated }) {
  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }
  return children;
}

// Usage in routes
<Route
  path="/user/profile"
  element={
    <ProtectedRoute isAuthenticated={isAuthenticated}>
      <Profile />
    </ProtectedRoute>
  }
/>;
```

## Advanced Routing Patterns

### 1. Role-Based Routing

**Pattern**: Check user role and render appropriate route

```tsx
import { FC } from "react";
import { Navigate } from "react-router-dom";
import { useUserContext } from "@/lib/context/useContext";
import { useOwnerContext } from "@/lib/context/useContext";

export function Dashboard() {
  const { user } = useUserContext();
  const { owner } = useOwnerContext();

  if (user?.role === "admin") {
    return <Navigate to="/user/profile" />;
  } else if (owner?.role === "owner") {
    return <Navigate to="/owner/dashboard" />;
  }

  return <NotAuthorized />;
}
```

### 2. Conditional Navigation on State Change

```tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "@/lib/context/useContext";

export function LoginPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useUserContext();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/user/profile");
    }
  }, [isAuthenticated, navigate]);

  return <form>{/* Login form */}</form>;
}
```

### 3. Nested Routes (Future Implementation)

```tsx
// App.tsx
<Routes>
  <Route path="/owner/*" element={<OwnerLayout />}>
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="spots" element={<SpotListing />} />
    <Route path="analytics" element={<Analytics />} />
  </Route>
</Routes>;

// pages/owner/layout.tsx
import { Outlet } from "react-router-dom";
import { OwnerSidebar } from "@/components/owner/sidebar";

export function OwnerLayout() {
  return (
    <div className="flex">
      <OwnerSidebar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
```

## Route Metadata & Titles

### Dynamic Page Titles

```tsx
import { useEffect } from 'react';

export function SpotDetails() {
  const { id } = useParams();
  const { data: spot } = useSpotDetails(id!);

  useEffect(() => {
    if (spot?.name) {
      document.title = `${spot.name} - TheSpot`;
    }
  }, [spot?.name]);

  return (
    // Component JSX
  );
}
```

### Route Configuration Object (Alternative Pattern)

```tsx
// lib/routes.ts
interface RouteConfig {
  path: string;
  element: React.ReactNode;
  title: string;
  requiresAuth?: boolean;
  roles?: string[];
  icon?: React.ReactNode;
}

export const routes: RouteConfig[] = [
  {
    path: "/",
    element: <Home />,
    title: "Home",
  },
  {
    path: "/user/profile",
    element: <Profile />,
    title: "User Profile",
    requiresAuth: true,
    roles: ["user"],
  },
  {
    path: "/owner/dashboard",
    element: <Dashboard />,
    title: "Owner Dashboard",
    requiresAuth: true,
    roles: ["owner"],
  },
];
```

## Query String Parameters

### Reading Query Parameters

```tsx
import { useSearchParams } from "react-router-dom";

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get("category");
  const city = searchParams.get("city");
  const page = parseInt(searchParams.get("page") || "1");

  const handleFilterChange = (newCategory: string) => {
    setSearchParams({
      category: newCategory,
      page: "1",
    });
  };

  return (
    <div>
      <select
        value={category || ""}
        onChange={(e) => handleFilterChange(e.target.value)}
      >
        <option value="">All Categories</option>
        <option value="restaurant">Restaurants</option>
        <option value="bar">Bars</option>
      </select>
    </div>
  );
}

// URL example: /search?category=restaurant&city=NYC&page=2
```

## Best Practices

### 1. **Consistent Route Patterns**

- Use hierarchical paths: `/user/*`, `/owner/*`
- Use kebab-case for multi-word routes
- Use IDs in routes for resources: `/spot-details/:id`

### 2. **Protected Routes**

```tsx
// Create a reusable component
function ProtectedRoute({ children, isProtected = true }) {
  const { isAuthenticated } = useUserContext();

  return isProtected && !isAuthenticated ? <Navigate to="/signin" /> : children;
}
```

### 3. **Lazy Load Routes** (Future)

```tsx
import { lazy, Suspense } from "react";
import { LoadingSpinner } from "@/components/loading.spinner";

const Dashboard = lazy(() =>
  import("@/pages/owner/dashboard").then((m) => ({ default: m.Dashboard })),
);

export function App() {
  return (
    <Routes>
      <Route
        path="/owner/dashboard"
        element={
          <Suspense fallback={<LoadingSpinner />}>
            <Dashboard />
          </Suspense>
        }
      />
    </Routes>
  );
}
```

### 4. **Handle 404 Routes**

```tsx
<Routes>
  {/* All defined routes */}
  <Route path="*" element={<NotFoundPage />} />
</Routes>;

// pages/common/not-found.tsx
export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="text-center p-8">
      <h1 className="text-4xl font-bold">404</h1>
      <p>Page not found</p>
      <button onClick={() => navigate("/")}>Go Home</button>
    </div>
  );
}
```

### 5. **Route Transition Effects**

```tsx
import { useLocation } from "react-router-dom";

export function App() {
  const location = useLocation();

  return (
    <div className="transition-opacity duration-300">
      <Routes location={location}>{/* Routes */}</Routes>
    </div>
  );
}
```

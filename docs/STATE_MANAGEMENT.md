# State Management Guide

## Overview

TheSpot Web uses a hybrid state management approach combining React Context API for global application state and TanStack Query for server state.

## State Management Architecture

```
┌────────────────────────────────────────────────────┐
│           Global State Management                   │
├────────────────────────────────────────────────────┤
│                                                    │
│  Client State                Server State           │
│  (React Context)             (TanStack Query)      │
│  ┌──────────────┐            ┌──────────────┐     │
│  │ OverAll      │            │ Query Cache  │     │
│  │ Provider     │            │              │     │
│  ├──────────────┤            │ • API data   │     │
│  │ • Theme      │            │ • Loading    │     │
│  │ • UI state   │            │ • Errors     │     │
│  │              │            │ • Stale time │    │
│  │ User         │            │              │     │
│  │ Provider     │            │ Mutations    │     │
│  ├──────────────┤            │              │     │
│  │ • Auth state │            │ • Optimistic │    │
│  │ • Profile    │            │   updates    │     │
│  │ • Prefs      │            │ • Rollback   │     │
│  │              │            └──────────────┘     │
│  │ Owner        │                                  │
│  │ Provider     │                                  │
│  ├──────────────┤                                  │
│  │ • Auth state │                                  │
│  │ • Venues     │                                  │
│  │ • Settings   │                                  │
│  └──────────────┘                                  │
│                                                    │
└────────────────────────────────────────────────────┘
```

## React Context API

### 1. OverAllProvider

**File**: `lib/context/useContext.tsx`

**Purpose**: Application-wide state management

**Key State**:
```typescript
interface OverAllContext {
  // Theme
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  
  // Global UI state
  isLoading?: boolean;
  // Add other global states as needed
}
```

**Usage**:
```tsx
import { useOverallContext } from '@/lib/context/useContext';

export function Component() {
  const { theme, setTheme } = useOverallContext();
  
  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Toggle Theme
    </button>
  );
}
```

**Provider Structure**:
```tsx
// main.tsx
<QueryClientProvider client={queryClient}>
  <OverAllProvider>
    {/* App content */}
  </OverAllProvider>
</QueryClientProvider>
```

### 2. UserProvider

**File**: `lib/context/user.tsx`

**Purpose**: User authentication and profile state

**Key State**:
```typescript
interface UserContext {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Actions
  setUser: (user: User | null) => void;
  login: (credentials: LoginData) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: ProfileData) => Promise<void>;
}

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  preferences?: Record<string, any>;
}
```

**Usage**:
```tsx
import { useUserContext } from '@/lib/context/useContext';

export function UserProfile() {
  const { user, isAuthenticated, logout } = useUserContext();
  
  if (!isAuthenticated) {
    return <p>Not logged in</p>;
  }
  
  return (
    <div>
      <h1>{user?.name}</h1>
      <p>{user?.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

**Authentication Flow**:
```tsx
// Login page
const { login } = useUserContext();

const handleLogin = async (email: string, password: string) => {
  try {
    await login({ email, password });
    // User state updated, redirect to dashboard
  } catch (error) {
    // Handle error
  }
};

// Protected component
const { user, isAuthenticated } = useUserContext();
if (!isAuthenticated) {
  return <Navigate to="/signin" />;
}
```

### 3. OwnerProvider

**File**: `lib/context/owner.tsx`

**Purpose**: Venue owner authentication and dashboard state

**Key State**:
```typescript
interface OwnerContext {
  owner: Owner | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Venue data
  venues: Venue[];
  activeVenue: Venue | null;
  
  // Actions
  setOwner: (owner: Owner | null) => void;
  login: (credentials: LoginData) => Promise<void>;
  logout: () => Promise<void>;
  updateVenue: (venueId: string, data: VenueData) => Promise<void>;
  setActiveVenue: (venue: Venue) => void;
}

interface Owner {
  id: string;
  name: string;
  email: string;
  businessName: string;
  avatar?: string;
}

interface Venue {
  id: string;
  name: string;
  description: string;
  location: Location;
  images: string[];
  status: 'active' | 'inactive' | 'pending';
}
```

**Usage**:
```tsx
import { useOwnerContext } from '@/lib/context/useContext';

export function OwnerDashboard() {
  const { owner, venues, activeVenue, setActiveVenue } = useOwnerContext();
  
  return (
    <div>
      <h1>Welcome, {owner?.businessName}</h1>
      <select 
        value={activeVenue?.id}
        onChange={(e) => {
          const venue = venues.find(v => v.id === e.target.value);
          setActiveVenue(venue!);
        }}
      >
        {venues.map(v => <option key={v.id}>{v.name}</option>)}
      </select>
    </div>
  );
}
```

## TanStack Query (React Query)

### Configuration

**File**: `main.tsx`

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10,   // 10 minutes (formerly cacheTime)
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <OverAllProvider>
      <App />
    </OverAllProvider>
  </QueryClientProvider>
);
```

### Custom Hooks

**File**: `tanstack-hooks/user.auth.tan-h.ts`

```tsx
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Fetch hooks
export function useUserAuth() {
  return useQuery({
    queryKey: ['user', 'auth'],
    queryFn: async () => {
      const response = await fetch('/api/user/auth');
      if (!response.ok) throw new Error('Failed to fetch auth');
      return response.json();
    },
  });
}

export function useSpots(filters?: SpotFilters) {
  return useQuery({
    queryKey: ['spots', filters],
    queryFn: async () => {
      const params = new URLSearchParams(filters || {});
      const response = await fetch(`/api/spots?${params}`);
      if (!response.ok) throw new Error('Failed to fetch spots');
      return response.json();
    },
  });
}

export function useSpotDetails(spotId: string) {
  return useQuery({
    queryKey: ['spot', spotId],
    queryFn: async () => {
      const response = await fetch(`/api/spots/${spotId}`);
      if (!response.ok) throw new Error('Failed to fetch spot');
      return response.json();
    },
    enabled: !!spotId, // Only run when spotId exists
  });
}

// Mutation hooks
export function useCreateSpot() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (spotData: CreateSpotData) => {
      const response = await fetch('/api/spots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spotData),
      });
      if (!response.ok) throw new Error('Failed to create spot');
      return response.json();
    },
    onSuccess: (newSpot) => {
      // Update cache optimistically
      queryClient.setQueryData(['spots'], (oldSpots: any) => {
        return [...(oldSpots || []), newSpot];
      });
      
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['spots'] });
    },
  });
}

export function useUpdateSpot(spotId: string) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (spotData: UpdateSpotData) => {
      const response = await fetch(`/api/spots/${spotId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spotData),
      });
      if (!response.ok) throw new Error('Failed to update spot');
      return response.json();
    },
    onSuccess: (updatedSpot) => {
      // Update specific spot in cache
      queryClient.setQueryData(['spot', spotId], updatedSpot);
      
      // Update spot in list cache
      queryClient.setQueryData(['spots'], (oldSpots: any) => {
        return oldSpots?.map((s: any) => 
          s.id === spotId ? updatedSpot : s
        );
      });
    },
  });
}
```

### Using Query Hooks in Components

**Basic Query**:
```tsx
import { useSpots } from '@/tanstack-hooks/user.auth.tan-h';

export function SpotsList() {
  const { data: spots, isLoading, error } = useSpots();
  
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  
  return (
    <ul>
      {spots?.map(spot => (
        <li key={spot.id}>{spot.name}</li>
      ))}
    </ul>
  );
}
```

**Query with Filters**:
```tsx
import { useSpots } from '@/tanstack-hooks/user.auth.tan-h';
import { useState } from 'react';

export function FilteredSpots() {
  const [filters, setFilters] = useState({ category: 'restaurant' });
  const { data: spots } = useSpots(filters);
  
  return (
    <div>
      <select 
        value={filters.category}
        onChange={(e) => setFilters({ category: e.target.value })}
      >
        <option value="restaurant">Restaurant</option>
        <option value="bar">Bar</option>
      </select>
      {/* Display spots */}
    </div>
  );
}
```

**Mutation with Loading States**:
```tsx
import { useCreateSpot } from '@/tanstack-hooks/user.auth.tan-h';

export function CreateSpotForm() {
  const { mutate, isPending, error } = useCreateSpot();
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    mutate({
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      // ... other fields
    }, {
      onSuccess: (data) => {
        console.log('Spot created:', data);
        // Redirect or show success message
      },
    });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Spot name" />
      <textarea name="description" placeholder="Description" />
      <button disabled={isPending}>
        {isPending ? 'Creating...' : 'Create Spot'}
      </button>
      {error && <p className="text-red-500">{error.message}</p>}
    </form>
  );
}
```

### Query Cache Management

**Invalidate Query**:
```tsx
const queryClient = useQueryClient();

// Invalidate single query
queryClient.invalidateQueries({ queryKey: ['spot', spotId] });

// Invalidate all queries matching pattern
queryClient.invalidateQueries({ queryKey: ['spots'] });

// Invalidate all queries
queryClient.invalidateQueries();
```

**Manual Cache Update**:
```tsx
queryClient.setQueryData(['spot', spotId], (oldData) => ({
  ...oldData,
  name: 'Updated name',
}));
```

**Refetch**:
```tsx
const { refetch } = useSpots();
refetch(); // Manually refetch data
```

## State Flow Examples

### Example 1: User Login Flow

```
User submits login form
  ↓
Form handler calls userContext.login()
  ↓
Login mutation sends credentials to API
  ↓
API returns user data and auth token
  ↓
UserProvider updates state:
  - user: User data
  - isAuthenticated: true
  ↓
Components listening to UserProvider context re-render
  ↓
Redirect to authenticated route
  ↓
New route components fetch data via TanStack Query
```

### Example 2: Update Spot Information

```
Owner edits spot form
  ↓
Form handler calls useUpdateSpot mutation
  ↓
Mutation shows loading state (UI disabled)
  ↓
API receives update request
  ↓
Mutation onSuccess callback:
  - Updates cache for ['spot', spotId]
  - Invalidates ['spots'] query
  ↓
useSpotDetails hook receives updated data
  ↓
Component re-renders with new data
```

### Example 3: Search Spots with Filters

```
User changes filter dropdown
  ↓
Filters state updates
  ↓
useSpots hook re-runs with new filters
  ↓
Query key changes: ['spots', filters]
  ↓
New cache entry or refetch if stale
  ↓
useQuery hook returns new data
  ↓
Component re-renders with filtered spots
```

## Best Practices

### 1. **Separate Concerns**
- Use Context for client state (auth, theme, UI)
- Use TanStack Query for server state (API data)

### 2. **Custom Hooks**
- Create domain-specific hooks in `tanstack-hooks/`
- Encapsulate query/mutation logic
- Reuse across components

### 3. **Cache Keys**
- Use consistent, nested structures
- Example: `['spot', spotId]` not `['s', spotId]`
- Include filter parameters in key

### 4. **Avoid Over-Fetching**
```tsx
// Good: Fetch only when needed
const { data } = useQuery({
  queryKey: ['spot', spotId],
  queryFn: fetchSpot,
  enabled: !!spotId,
});

// Avoid: Always fetch even if spotId is null
const { data } = useQuery({
  queryKey: ['spot', spotId],
  queryFn: fetchSpot,
});
```

### 5. **Handle Loading and Error States**
```tsx
const { data, isLoading, error } = useSpots();

if (isLoading) return <LoadingSpinner />;
if (error) return <ErrorAlert error={error} />;
if (!data || data.length === 0) return <EmptyState />;

return <SpotsList spots={data} />;
```

### 6. **Optimistic Updates**
```tsx
const { mutate } = useMutation({
  mutationFn: updateSpot,
  onMutate: async (newData) => {
    // Cancel ongoing queries
    await queryClient.cancelQueries({ queryKey: ['spot', spotId] });
    
    // Save old data
    const previousData = queryClient.getQueryData(['spot', spotId]);
    
    // Update UI optimistically
    queryClient.setQueryData(['spot', spotId], newData);
    
    return { previousData };
  },
  onError: (error, newData, context) => {
    // Revert on error
    queryClient.setQueryData(['spot', spotId], context?.previousData);
  },
});
```


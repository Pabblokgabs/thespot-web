# Component Guide

## Overview

This guide provides detailed information about the component structure and how to create new components in TheSpot Web.

## Component Categories

### 1. UI Components (`components/ui/`)

Pre-built, unstyled components from shadcn/ui and Radix UI. These are the building blocks for feature components.

**Characteristics**:
- Pure presentational (no business logic)
- Highly reusable
- Accessible (WCAG compliant)
- Themeable via CSS variables
- Based on Radix UI primitives

**Examples**:
- `button.tsx` - Base button component
- `input.tsx` - Text input field
- `card.tsx` - Card container
- `dialog.tsx` - Modal dialog
- `tabs.tsx` - Tabbed interface
- `table.tsx` - Data table
- `select.tsx` - Dropdown select

**Usage**:
```tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function MyComponent() {
  return (
    <Card>
      <CardHeader>Title</CardHeader>
      <CardContent>
        <Button onClick={() => {}}>Click me</Button>
      </CardContent>
    </Card>
  );
}
```

### 2. Common Components (`components/common/`)

Reusable feature components used across multiple pages.

**Characteristics**:
- Contains business logic
- Composed of UI components
- Domain-specific functionality
- Reusable across pages

**Subcategories**:

#### Layout Components
- `navbar.tsx` - Main navigation bar
- `auth.navbar.tsx` - Navigation for authenticated users
- `footer.tsx` - Footer component

#### Form Components
- `input.tsx` - Custom input wrapper
- `password.tsx` - Password input with validation
- `select.tsx` - Custom select wrapper
- `comboBox.tsx` - Searchable combo box

#### Specialized Components
- `search.modal.tsx` - Global search modal
- `popup.tsx` - Generic popup component
- `pagination.tsx` - Pagination controls
- `otp.verification.tsx` - OTP input and verification
- `toaster.tsx` - Toast notification container

#### Sections/Displays
- `cards/` - Card components for displaying items
- `home/` - Home page specific sections
  - `display.tsx` - Display section
  - `event.tsx` - Event component
  - `events.tsx` - Events list
  - `trending.now.tsx` - Trending section
  - `popular.cities.tsx` - Popular cities
  - `popular.spots.tsx` - Popular venues
- `loading.spinner/` - Loading indicators

**Usage**:
```tsx
import { Navbar } from "@/components/common/navbar";
import { SearchModal } from "@/components/common/search.modal";

export function Page() {
  return (
    <>
      <Navbar />
      <SearchModal />
      <main>{/* page content */}</main>
    </>
  );
}
```

### 3. Owner Components (`components/owner/`)

Venue owner-specific feature components.

**Examples**:
- `echard.tsx` - Event chart component
- `dashboard/` - Dashboard specific components
  - `dashboard.content.tsx` - Main dashboard layout
  - `analytic.content.tsx` - Analytics section
  - `calendar.content.tsx` - Calendar section
  - `calendar.tsx` - Calendar component
  - `display.card.tsx` - Info display card
- `models/` - Data models or modal components

**Usage**:
```tsx
import { Dashboard } from "@/components/owner/dashboard/dashboard.content";

export function OwnerDashboard() {
  return <Dashboard />;
}
```

### 4. Home Page Components (`components/home/`)

Modular sections of the home page.

**Components**:
- `display.tsx` - Hero/display section
- `event.tsx` - Single event component
- `events.tsx` - Events listing section
- `upcoming.events.tsx` - Upcoming events section
- `trending.now.tsx` - Trending section
- `popular.cities.tsx` - Popular cities showcase
- `popular.spots.tsx` - Popular spots showcase
- `recommended.spot.tsx` - Recommended venue
- `spots.tsx` - Spots listing
- `testimonial.tsx` - User testimonial
- `getTheApp.tsx` - App download CTA
- `wedo.tsx` - "What we do" section

**Usage**:
```tsx
import { TrendingNow } from "@/components/home/trending.now";
import { PopularCities } from "@/components/home/popular.cities";

export function HomePage() {
  return (
    <main>
      <TrendingNow />
      <PopularCities />
    </main>
  );
}
```

## Creating New Components

### Component Template

**Basic Component** (`components/common/my-component.tsx`):
```tsx
import { FC, ReactNode } from 'react';
import { Button } from '@/components/ui/button';

interface MyComponentProps {
  title: string;
  children: ReactNode;
  onAction?: () => void;
}

export const MyComponent: FC<MyComponentProps> = ({
  title,
  children,
  onAction,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div>{children}</div>
      {onAction && (
        <Button onClick={onAction}>
          Action
        </Button>
      )}
    </div>
  );
};
```

**Component with State & Hooks** (`components/common/interactive-component.tsx`):
```tsx
import { FC, useState } from 'react';
import { useUserContext } from '@/lib/context/useContext';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface InteractiveComponentProps {
  id: string;
  onComplete?: (data: any) => void;
}

export const InteractiveComponent: FC<InteractiveComponentProps> = ({
  id,
  onComplete,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUserContext();
  
  const { data, isLoading: queryLoading } = useQuery({
    queryKey: ['item', id],
    queryFn: async () => {
      const response = await fetch(`/api/items/${id}`);
      return response.json();
    },
  });

  const handleAction = async () => {
    setIsLoading(true);
    try {
      // Perform action
      onComplete?.(data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <div className="p-4">
        <p>User: {user?.name}</p>
        {queryLoading && <p>Loading...</p>}
        {data && (
          <div>
            <p>{data.title}</p>
            <Button 
              onClick={handleAction}
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Submit'}
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};
```

## Component Best Practices

### 1. **Naming Conventions**
- File name: `kebab-case.tsx` (e.g., `my-component.tsx`)
- Component name: `PascalCase` (e.g., `MyComponent`)
- Props interface: `ComponentNameProps` (e.g., `MyComponentProps`)

### 2. **Props Pattern**
```tsx
interface Props {
  // Required props first
  title: string;
  value: number;
  
  // Optional props
  description?: string;
  disabled?: boolean;
  
  // Callbacks last
  onChange?: (value: number) => void;
  onSubmit?: () => void;
}

export const Component: FC<Props> = ({
  title,
  value,
  description,
  disabled = false,
  onChange,
  onSubmit,
}) => {
  // Implementation
};
```

### 3. **Composition Over Inheritance**
```tsx
// Good - Composition
export function Layout({ children }) {
  return (
    <div className="flex gap-4">
      <Sidebar />
      <main>{children}</main>
    </div>
  );
}

// Avoid - Inheritance
export class Layout extends React.Component { }
```

### 4. **Custom Hooks for Logic**
```tsx
// Extract logic to custom hook
function useItemData(id: string) {
  return useQuery({
    queryKey: ['item', id],
    queryFn: async () => {
      const response = await fetch(`/api/items/${id}`);
      return response.json();
    },
  });
}

// Use in component
export function Item({ id }) {
  const { data, isLoading } = useItemData(id);
  return <div>{/* render */}</div>;
}
```

### 5. **Styling Classes**
```tsx
// Use consistent class grouping
<button className="
  px-4 py-2          // Padding
  bg-blue-500        // Background
  text-white         // Text color
  rounded-md         // Border radius
  hover:bg-blue-600  // Hover state
  disabled:opacity-50 // Disabled state
  transition-colors  // Animation
">
  Click me
</button>
```

### 6. **Component Documentation**
```tsx
/**
 * MyComponent
 * 
 * A reusable component that displays information with an action button.
 * 
 * @component
 * @example
 * <MyComponent 
 *   title="Example" 
 *   onAction={() => console.log('clicked')}
 * >
 *   Content here
 * </MyComponent>
 */
export const MyComponent: FC<MyComponentProps> = ({ ... }) => {
  // Implementation
};
```

## Component Organization in Pages

### Page Component Structure

```tsx
// pages/common/my-page.tsx
import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/common/navbar';
import { Footer } from '@/components/common/footer';
import { Section1 } from '@/components/home/section1';
import { Section2 } from '@/components/home/section2';

export const MyPage: FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Page-level setup
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Section1 />
        <Section2 />
      </main>
      <Footer />
    </div>
  );
};
```

## State Management in Components

### Using Context
```tsx
import { useUserContext } from '@/lib/context/useContext';

export const MyComponent = () => {
  const { user, setUser } = useUserContext();
  
  return <div>{user?.name}</div>;
};
```

### Using TanStack Query
```tsx
import { useQuery, useMutation } from '@tanstack/react-query';

export const MyComponent = () => {
  // Fetch data
  const { data, isLoading } = useQuery({
    queryKey: ['items'],
    queryFn: fetchItems,
  });

  // Mutate data
  const { mutate } = useMutation({
    mutationFn: updateItem,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['items'] });
    },
  });

  return <div>{/* render */}</div>;
};
```

## Common Patterns

### Form Component
```tsx
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Submit logic
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Name"
        value={formData.name}
        onChange={(e) => 
          setFormData({ ...formData, name: e.target.value })
        }
      />
      <Input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => 
          setFormData({ ...formData, email: e.target.value })
        }
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}
```

### Modal/Dialog Component
```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export function MyModal({ isOpen, onClose, onConfirm }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Action</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>Are you sure?</p>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={onConfirm}>
              Confirm
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
```

### List Component with Pagination
```tsx
import { useState } from 'react';
import { Pagination } from '@/components/common/pagination';

export function ItemList({ items, itemsPerPage = 10 }) {
  const [currentPage, setCurrentPage] = useState(1);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = items.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="space-y-4">
      <ul>
        {paginatedItems.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <Pagination
        currentPage={currentPage}
        totalItems={items.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
```


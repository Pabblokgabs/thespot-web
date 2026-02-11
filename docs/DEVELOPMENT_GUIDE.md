# Development Guide

## Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn
- Git
- Code editor (VS Code recommended)

### Initial Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/Pabblokgabs/thespot-web.git
   cd thespot-web
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

The app will be available at `http://localhost:5173`

## Development Workflow

### Running the Development Server

```bash
npm run dev
```

**Features**:

- Hot Module Replacement (HMR) - changes reflect instantly
- Fast refresh via Vite
- Accessible at `http://localhost:5173`
- Console errors and warnings displayed in browser

### Building for Production

```bash
npm run build
```

**Process**:

1. TypeScript type checking (`tsc -b`)
2. Vite build compilation
3. Code minification and optimization
4. Output to `dist/` folder

### Preview Production Build

```bash
npm run preview
```

Serves the `dist/` folder locally to test production build.

### Code Quality Checks

```bash
npm run lint
```

Runs ESLint to check code quality and consistency.

**Fix linting issues automatically**:

```bash
npm run lint -- --fix
```

## Project Configuration

### TypeScript Configuration

**Main Config**: `tsconfig.json`

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}
```

**App Config**: `tsconfig.app.json`

- Handles source code compilation
- Generates declaration files for types

**Node Config**: `tsconfig.node.json`

- Handles build tool configuration files
- For Vite and other tools

### Path Aliases

Use `@/` to reference src directory:

```tsx
// Instead of: import { Button } from '../../../components/ui/button';
import { Button } from "@/components/ui/button";
```

### Vite Configuration

**File**: `vite.config.ts`

```typescript
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

### Tailwind CSS Configuration

**File**: `tailwind.config.ts`

```typescript
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // Add custom theme extensions here
    },
  },
  plugins: [],
};
```

### shadcn/ui Configuration

**File**: `components.json`

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/index.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui"
  },
  "iconLibrary": "lucide"
}
```

### ESLint Configuration

**File**: `eslint.config.js`

Configured for:

- TypeScript files
- React code
- React hooks best practices
- React Refresh (HMR)

## Code Style Guide

### File Naming Conventions

- **Components**: `kebab-case.tsx` (e.g., `my-component.tsx`)
- **Utilities**: `kebab-case.ts` (e.g., `format-date.ts`)
- **Folders**: `kebab-case/` (e.g., `common/`, `ui/`)
- **Constants**: `UPPER_SNAKE_CASE` (e.g., `API_BASE_URL`)

### Component Structure

```tsx
// 1. Imports
import { FC, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';

// 2. Types/Interfaces
interface MyComponentProps {
  title: string;
  items: Item[];
  onSelect?: (item: Item) => void;
}

// 3. Component
export const MyComponent: FC<MyComponentProps> = ({
  title,
  items,
  onSelect,
}) => {
  // Hooks
  const [selected, setSelected] = useState<Item | null>(null);
  const { data } = useQuery({ ... });

  // Handlers
  const handleSelect = (item: Item) => {
    setSelected(item);
    onSelect?.(item);
  };

  // Render
  return (
    <div>
      <h2>{title}</h2>
      <ul>
        {items.map(item => (
          <li key={item.id} onClick={() => handleSelect(item)}>
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
```

### TypeScript Best Practices

**Use explicit types**:

```tsx
// Good
const items: string[] = [];
const user: User = { name: "John" };

// Avoid
const items = [];
const user = { name: "John" };
```

**Use interfaces for props**:

```tsx
interface ButtonProps {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}
```

**Export types from file**:

```tsx
// myComponent.tsx
export interface MyComponentProps { ... }
export const MyComponent: FC<MyComponentProps> = { ... }

// elsewhere
import type { MyComponentProps } from '@/components/my-component';
```

### CSS/Tailwind Practices

**Use consistent class organization**:

```tsx
<button
  className="
  px-4 py-2          // Padding
  bg-blue-500        // Background
  text-white         // Text color
  rounded-md         // Border radius
  hover:bg-blue-600  // Hover state
  disabled:opacity-50 // Disabled state
  transition-colors  // Animation
"
>
  Click
</button>
```

**Avoid magic numbers**:

```tsx
// Good - Use Tailwind scales
<div className="p-4 gap-2">

// Avoid
<div style={{ padding: '16px', gap: '8px' }}>
```

**Extract repeated styles**:

```tsx
// Extract to component
const ButtonPrimary: FC<ButtonProps> = (props) => (
  <button
    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
    {...props}
  >
    {props.children}
  </button>
);
```

## Adding New Components

### Adding shadcn/ui Component

shadcn/ui components can be added via CLI (when available) or manually copy the component file from their repository.

**Manual approach**:

1. Find component in `components/ui/` folder
2. Check `components.json` for aliases
3. Import and use in your component

### Creating a Feature Component

1. **Create file**: `components/common/my-feature.tsx`
2. **Define types**: Create props interface
3. **Build component**: Use UI components as building blocks
4. **Export**: Export as named export
5. **Add to index**: Add to `components/index.tsx` if re-exporting

### Creating a Page Component

1. **Create file**: `pages/common/my-page.tsx`
2. **Use layout components**: Add Navbar, Footer
3. **Add sections**: Use feature components
4. **Add route**: Update `App.tsx`
5. **Handle state**: Use context or TanStack Query

## Working with Data

### Fetching Data

**Using TanStack Query**:

```tsx
import { useQuery } from "@tanstack/react-query";

export function MyComponent() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["items"],
    queryFn: async () => {
      const response = await fetch("/api/items");
      if (!response.ok) throw new Error("Failed");
      return response.json();
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data?.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
```

### Mutating Data

```tsx
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function CreateItemForm() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async (item: NewItem) => {
      const response = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });
      return response.json();
    },
    onSuccess: () => {
      // Refetch items
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });

  return (
    <button onClick={() => mutate({ name: "New" })} disabled={isPending}>
      {isPending ? "Creating..." : "Create"}
    </button>
  );
}
```

## Common Development Tasks

### Adding a New Route

1. **Create page component**:

   ```tsx
   // pages/common/my-page.tsx
   export const MyPage: FC = () => <div>My Page</div>;
   ```

2. **Export from pages/index.tsx**:

   ```tsx
   export { MyPage } from "./common/my-page";
   ```

3. **Add route to App.tsx**:
   ```tsx
   <Route path="/my-page" element={<MyPage />} />
   ```

### Adding a New API Call

1. **Create custom hook** (if doesn't exist):

   ```tsx
   // tanstack-hooks/my-data.ts
   export function useMyData() {
     return useQuery({
       queryKey: ["myData"],
       queryFn: async () => {
         const response = await fetch("/api/my-data");
         return response.json();
       },
     });
   }
   ```

2. **Use in component**:

   ```tsx
   import { useMyData } from "@/tanstack-hooks/my-data";

   export function MyComponent() {
     const { data } = useMyData();
     return <div>{data?.title}</div>;
   }
   ```

### Styling a Component

1. **Use Tailwind utilities**:

   ```tsx
   <div className="flex gap-4 p-4 bg-white rounded-lg shadow">
   ```

2. **For complex styles, use component variants**:

   ```tsx
   import { cva } from "class-variance-authority";

   const buttonVariants = cva("px-4 py-2 rounded-md font-semibold", {
     variants: {
       variant: {
         primary: "bg-blue-500 text-white hover:bg-blue-600",
         secondary: "bg-gray-200 text-black hover:bg-gray-300",
       },
     },
   });
   ```

### Creating a Reusable Hook

```tsx
// lib/hooks/useLocalStorage.ts
import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setStoredValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(value) : value;
      setValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  };

  return [value, setStoredValue] as const;
}

// Usage
export function MyComponent() {
  const [theme, setTheme] = useLocalStorage("theme", "light");

  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      Toggle Theme: {theme}
    </button>
  );
}
```

## Debugging

### React DevTools

1. Install [React DevTools extension](https://react-devtools-tutorial.vercel.app/)
2. View component tree, props, and state
3. Use Time Traveling Debugger

### Browser DevTools

- **Console**: Check for errors and logs
- **Network**: Monitor API calls
- **Performance**: Analyze rendering performance

### Debug in VS Code

Add to `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome",
      "url": "http://localhost:5173",
      "webRoot": "${workspaceFolder}/src",
      "sourceMapPathOverride": {
        "webpack:///*": "${webRoot}/*"
      }
    }
  ]
}
```

### Common Issues

**Hot reload not working**:

- Check if dev server is running
- Clear browser cache
- Restart dev server

**Import errors with @/**:

- Verify `tsconfig.json` has correct paths
- Check if file exists at referenced location

**Styling not applying**:

- Clear Tailwind cache: delete `.next/` if exists
- Verify class names are in content config
- Check for CSS specificity conflicts

## Performance Optimization

### Code Splitting

Vite automatically chunks code. To optimize further:

```tsx
import { lazy, Suspense } from "react";

const HeavyComponent = lazy(() =>
  import("@/pages/heavy-page").then((m) => ({ default: m.HeavyPage })),
);

export function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <HeavyComponent />
    </Suspense>
  );
}
```

### Memoization

```tsx
import { memo } from "react";

export const ListItem = memo(({ item, onSelect }: Props) => {
  return <li onClick={() => onSelect(item)}>{item.name}</li>;
});
```

### Query Optimization

Use `enabled` to avoid unnecessary queries:

```tsx
const { data } = useQuery({
  queryKey: ["item", itemId],
  queryFn: fetchItem,
  enabled: !!itemId, // Don't fetch if itemId is null
});
```

## Git Workflow

### Creating a Feature Branch

```bash
git checkout -b feature/my-feature
```

### Committing Changes

```bash
git add .
git commit -m "feat: add new component"
```

**Commit message conventions**:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `perf:` - Performance improvements
- `test:` - Test changes

### Creating a Pull Request

1. Push branch: `git push origin feature/my-feature`
2. Create PR on GitHub
3. Request review
4. Address feedback
5. Merge when approved

## Deployment

### Preparing for Deployment

1. **Run all checks**:

   ```bash
   npm run lint
   npm run build
   npm run preview
   ```

2. **Check bundle size**:

   ```bash
   npm run build
   # Check dist/ folder size
   ```

3. **Test in production mode**:
   ```bash
   npm run preview
   # Visit http://localhost:4173
   ```

### Environment Variables

Create `.env` file in root:

```
VITE_API_BASE_URL=https://api.example.com
VITE_APP_ENV=production
```

Access in code:

```tsx
const apiUrl = import.meta.env.VITE_API_BASE_URL;
```

### Deployment Platforms

**Netlify**:

```bash
npm run build
# Deploy dist/ folder
```

**Vercel**:

```bash
# Connect repository, auto-deploys on push
```

**Docker**:

```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/dist ./dist
CMD ["serve", "-s", "dist"]
```

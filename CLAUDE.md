# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Turbopack enabled
- `npm run build` - Build the production application
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint to check for code issues

## Architecture Overview

This is a **Next.js 15 application** with **Supabase authentication** and **TanStack Query** built on a **clean, feature-based architecture**. The project uses **TypeScript**, **Tailwind CSS**, and **shadcn/ui components**.

### Clean Architecture Structure

```
src/
├── features/              # Feature-based modules
│   ├── auth/             # Authentication feature
│   │   ├── components/   # Auth UI components
│   │   ├── hooks/        # React Query hooks for auth
│   │   ├── services/     # Auth business logic & Supabase calls
│   │   ├── types/        # Auth TypeScript interfaces
│   │   └── index.ts      # Public API exports
│   └── [feature]/        # Future features follow same pattern
├── shared/               # Shared utilities
│   ├── components/       # Reusable UI components (shadcn/ui)
│   ├── services/         # Shared services (Supabase clients)
│   ├── utils/           # Utility functions (cn, etc.)
│   └── types/           # Global TypeScript types
├── providers/           # App-level providers
│   ├── query-provider.tsx
│   └── index.tsx        # Combined providers
└── app/                 # Next.js App Router (outside src/)
```

### Key Architecture Principles

1. **Feature-Based Organization**: Each feature is self-contained with its own components, hooks, services, and types
2. **Clean Separation of Concerns**: 
   - **Components**: Pure UI components that receive data via props
   - **Hooks**: React Query hooks for data fetching and mutations
   - **Services**: Business logic and database/API interactions
   - **Types**: TypeScript interfaces and type definitions

3. **React Query Integration**:
   - All data fetching uses TanStack Query v5
   - Mutations include optimistic updates and error handling
   - Query keys are organized by feature (e.g., `AUTH_QUERY_KEYS`)
   - Proper cache invalidation and synchronization

### Authentication Architecture

- **Service Layer**: `AuthService` class handles all Supabase interactions
- **Hook Layer**: React Query hooks (`useLogin`, `useSignUp`, etc.) for state management
- **Component Layer**: Clean components that use hooks for data
- **Type Safety**: Full TypeScript coverage with proper interfaces

### Data Flow Pattern

```
Component → Hook → Service → Supabase
    ↑                           ↓
    ←── React Query Cache ←──────┘
```

### Environment Setup
Copy `.env.example` to `.env.local` and configure:
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` - Your Supabase anon key

### Adding New Features

1. Create feature directory: `src/features/[feature-name]/`
2. Add subdirectories: `components/`, `hooks/`, `services/`, `types/`
3. Implement service class for business logic
4. Create React Query hooks for data operations  
5. Build UI components using hooks
6. Export public API via feature's `index.ts`
7. Import feature exports in app pages

### Development Guidelines

- **Always** use React Query for server state management
- **Never** put business logic in components - use services
- **Always** export feature APIs through index files
- **Prefer** optimistic updates for better UX
- **Always** handle loading and error states
- **Use** TypeScript interfaces for all data structures
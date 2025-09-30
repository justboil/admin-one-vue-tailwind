# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `npm run dev` (Vite development server)
- **Build for production**: `npm run build` (Vite build)  
- **Preview production build**: `npm run preview --port 4173`
- **Lint code**: `npm run lint` (ESLint with auto-fix)
- **Format code**: `npm run format` (Prettier)

## Project Architecture

This is a Vue 3 admin dashboard application built with:

- **Vue 3** with Composition API and `<script setup>` syntax
- **Vite** as build tool with custom base path `/sinaq/`
- **Tailwind CSS 3** for styling with custom scrollbar utilities
- **Vue Router 4** with hash-based routing and authentication guards
- **Pinia** for state management
- **PrimeVue 4** UI component library with custom theming
- **FormKit** for form handling
- **Vueform** for advanced form components

### Key Dependencies

- **@azure/msal-browser**: Microsoft authentication
- **@supabase/supabase-js**: Database integration
- **axios**: HTTP client
- **chart.js**: Data visualization
- **leaflet + @vue-leaflet/vue-leaflet**: Interactive maps
- **jspdf + jspdf-autotable**: PDF generation
- **xlsx**: Excel file handling

### Application Structure

#### Authentication & Routing
- Authentication handled by `src/stores/login.js` with route guards in `src/router/index.js`
- Protected routes require `meta.requiresAuth: true`
- Unauthenticated users redirected to `/login`

#### Main Application Areas
- **Home/Dashboard**: Excel uploader and analytics (`/`)  
- **Admin Panel**: CRUD operations for operators, zones, infrastructure (`/admin/*`)
- **Data Visualization**: Maps, tables, and analytics views
- **Settings**: Configuration panel (`/settings`)

#### Store Management (Pinia)
- `main.js`: Sample data and general app state
- `login.js`: Authentication state
- `auth.js`: Additional auth utilities  
- `plantas.js`: Plant/facility data
- `darkMode.js`: Theme switching

### Code Style & Standards

- **ESLint**: Vue 3 recommended + standard rules
- **Prettier**: 2 spaces, single quotes, no semicolons, 100 char width
- Components use Composition API with `<script setup>`
- Alias `@/` points to `src/` directory

### Custom Styling

- Tailwind extended with custom scrollbar utilities (`aside-scrollbars`)
- PrimeVue theming disabled in favor of Tailwind classes
- Custom animations for fade-in/fade-out effects
- Dark mode support via CSS classes

### Build Configuration

- Vite target: ES2022 for top-level await support
- Base path: `/sinaq/` for deployment
- Vue production hydration mismatch details disabled
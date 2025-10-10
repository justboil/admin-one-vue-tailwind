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

- **@azure/msal-browser**: Microsoft authentication (MSAL)
- **@supabase/supabase-js**: Database integration
- **axios**: HTTP client
- **chart.js**: Data visualization
- **leaflet + @vue-leaflet/vue-leaflet**: Interactive maps
- **jspdf + jspdf-autotable**: PDF generation
- **xlsx**: Excel file handling
- **date-fns**: Date manipulation

### Application Structure

#### Authentication & Routing
- **Authentication flow**: Microsoft Azure AD via MSAL (`src/services/msalConfig.js`)
- **Session management**: 30-minute timeout with auto-logout in `src/stores/login.js`
- **Route guards** in `src/router/index.js`:
  - Routes with `meta.requiresAuth: true` require authentication
  - Routes with `meta.requiredRole: 'admin'` require admin privileges (role '99', 99, or 'admin')
  - Session expiry checked on each navigation with `checkSessionExpiry()`
  - Session renewed on each authenticated route navigation via `renewSession()`
- **User state persistence**: sessionStorage for user data, avatar, role, and session timestamps
- **Router mode**: Hash-based routing (`createWebHashHistory`)
- **Unauthenticated users** redirected to `/login`
- **Unauthorized users** redirected to `/unauthorized`

#### Main Application Areas
- **Home** (`/`): Excel uploader and analytics (`ExcelUploaderView.vue`)
- **Admin Panel** (`/admin/*`): CRUD operations requiring admin role
  - `/admin/operarios`: Operators management
  - `/admin/unidades_operativas`: Operational units management
  - `/admin/zonas`: Zones management
  - `/admin/infraestructuras`: Infrastructure management
  - `/admin/puntos_muestreo`: Sampling points management
- **Map Visualization** (`/mapa`): Interactive map of sampling points using Leaflet
- **Analytics Table** (`/tablaAnaliticas`): Table view of analytics data
- **Settings** (`/settings`): Configuration panel (admin only)

#### Service Layer Architecture
Services in `src/services/` handle data operations:
- **Authentication**: `msalConfig.js` (Microsoft authentication integration)
- **Database**: `supabase.js` (Supabase client configuration)
- **Domain Services**: Separate files for each entity (operarios, uo, zonas, infraestructuras, puntosMuestreo, analiticas)
- **External APIs**: `factorialConfig.js` (Factorial HR integration)

#### Store Management (Pinia)
- **main.js**: Sample data and general app state
- **login.js**: Authentication state with session timeout management
  - Watchers persist state to sessionStorage
  - Session timeout clears after 30 minutes of inactivity
  - Provides `login()`, `logout()`, `renewSession()`, `checkSessionExpiry()`
- **auth.js**: Additional auth utilities
- **plantas.js**: Plant/facility data
- **darkMode.js**: Theme switching

### Code Style & Standards

- **ESLint**: Vue 3 recommended + eslint:recommended rules
- **Prettier**: 2 spaces, single quotes, no semicolons, 100 char width, no trailing commas
- **Components**: Use Composition API with `<script setup>` syntax
- **Path alias**: `@/` points to `src/` directory
- **ECMAScript**: Target ES2022 (top-level await supported)

### Custom Styling

- **Tailwind extended** with custom scrollbar utilities (`aside-scrollbars` with light/gray variants)
- **PrimeVue theming**: Disabled in favor of Tailwind classes (`theme: 'none'`)
- **Custom animations**: fade-in/fade-out keyframes and transitions
- **Dark mode**: Supported via CSS classes (`darkMode: 'class'` in Tailwind config)
- **Responsive layout**: Mobile-first design with collapsable sidebar

### Build Configuration

- **Vite target**: ES2022 for top-level await support
- **Base path**: `/sinaq/` for deployment
- **Vue options**: Production hydration mismatch details disabled
- **Asset handling**: Static assets served from `/sinaq/` base path
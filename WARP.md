# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is **AQLARA Admin Panel** - a Vue 3.x admin dashboard built on top of Admin One template with Tailwind CSS 3.x. It's a water management system administration interface with authentication, data visualization, and Excel data processing capabilities.

## Development Commands

### Basic Development
```bash
# Install dependencies
npm install

# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Start Node.js server (if applicable)
npm run start
```

### Code Quality
```bash
# Lint and fix code issues
npm run lint

# Format code with Prettier
npm run format
```

## Architecture Overview

### Core Stack
- **Frontend Framework**: Vue 3 with Composition API and `<script setup>` syntax
- **Build Tool**: Vite with ES2022 target
- **State Management**: Pinia (official Vuex 5)
- **Routing**: Vue Router 4 with hash-based routing
- **Styling**: Tailwind CSS 3 with PrimeVue components
- **Forms**: FormKit + Vueform integration
- **Authentication**: Custom login system with route guards

### Project Structure
```
src/
├── assets/          # Static assets (images, icons, CSS)
├── components/      # Reusable Vue components
├── composables/     # Vue composables for shared logic
├── constants/       # Application constants
├── css/            # Custom CSS and Tailwind imports
├── helpers/        # Utility functions
├── layouts/        # Page layout components
├── router/         # Vue Router configuration
├── services/       # API service layer
├── stores/         # Pinia store modules
└── views/          # Page-level components
```

### Key Architecture Patterns

#### Authentication System
- Uses Pinia store (`useLoginStore`) for authentication state
- Router guards in `src/router/index.js` protect authenticated routes
- `LayoutAuthenticated.vue` handles authenticated UI layout
- Routes with `meta.requiresAuth: true` require authentication

#### State Management
- **Main Store** (`stores/main.js`): User data, sample clients/history
- **Login Store** (`stores/login.js`): Authentication state
- **Plantas Store** (`stores/plantas.js`): Plant/facility data management
- **Dark Mode Store** (`stores/darkMode.js`): Theme switching

#### Component Architecture
- Layout system using `LayoutAuthenticated.vue` for authenticated pages
- Reusable components follow a consistent naming pattern (BaseX, CardBoxX, etc.)
- Uses Vue 3's Composition API throughout
- Icons from Material Design Icons (`@mdi/js`)

#### Routing Configuration
- Hash-based routing (`createWebHashHistory`)
- Nested routes under `/admin` for administrative functions
- Lazy loading for most route components using dynamic imports
- Route meta for titles and authentication requirements

### Special Configurations

#### Vite Configuration
- Custom base path: `/sinaq/`
- ES2022 build target for top-level await support
- Alias: `@` points to `src/` directory
- Vue hydration mismatch details disabled for production

#### Tailwind Configuration
- Dark mode: `class` strategy
- Custom scrollbar utilities for aside menus
- Extended theme with custom animations (fade-in/fade-out)
- PrimeVue integration via `tailwindcss-primeui` plugin

#### Form Handling
- FormKit for form validation and theming
- Vueform for advanced form components
- Genesis theme from FormKit

## Key Dependencies

### Production Dependencies
- **UI Libraries**: PrimeVue, FormKit, Vueform
- **Data Processing**: xlsx (Excel), jsPDF (PDF generation)
- **Charts**: Chart.js for data visualization
- **Maps**: Vue Leaflet for geographical data
- **HTTP Client**: Axios for API calls
- **Authentication**: Azure MSAL browser, Supabase
- **Utilities**: date-fns, numeral.js

### Development Dependencies
- **Linting**: ESLint with Vue 3 recommended rules
- **Formatting**: Prettier with Vue config
- **Build**: Vite with Vue plugin
- **Styling**: Tailwind CSS with forms plugin

## Application-Specific Features

### Water Management System
- Excel file upload and processing for water analysis data
- Geographical mapping of sampling points
- Administrative panels for operators, operational units, zones, and infrastructure
- Analysis form handling and data tables
- PDF report generation capabilities

### Authentication Flow
- Custom login view (`LoginAqlaraView.vue`)
- Azure MSAL and Supabase integration
- Unauthorized access handling
- Route-based access control

### UI/UX Features
- Responsive design (mobile, tablet, desktop)
- Dark/light mode toggle
- Collapsible sidebar navigation
- Custom styled scrollbars
- Loading states and error handling

## Development Notes

### File Naming Conventions
- Components: PascalCase (e.g., `BaseButton.vue`)
- Views: PascalCase with "View" suffix (e.g., `HomeView.vue`)
- Stores: camelCase (e.g., `main.js`, `login.js`)
- Utilities: camelCase (e.g., `menuAside.js`)

### Code Style
- Uses `<script setup>` syntax for Vue 3 Composition API
- Pinia stores use composition API pattern
- Consistent imports organization
- Vue 3 recommended linting rules
- Prettier for code formatting

### Environment Considerations
- Base URL configured for `/sinaq/` path
- Supports both development and production builds
- Hash routing for SPA deployment compatibility
- ES2022 target allows modern JavaScript features

### Testing and Quality
- ESLint configuration with Vue 3 rules
- Prettier integration for consistent formatting
- No test framework currently configured (consider adding Vitest)

### Known Customizations
- Custom Tailwind theme extensions for water management branding
- AQLARA-specific styling and components
- Spanish language interface elements
- Custom menu configurations in `menuAside.js` and `menuNavBar.js`

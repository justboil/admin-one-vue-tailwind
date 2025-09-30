# Project Overview

This is a Vue.js 3 admin dashboard project built with Tailwind CSS 3 and Vite. It uses Pinia for state management and Vue Router for routing. The project uses MSAL for Microsoft authentication. It is a customizable and responsive admin template with a dark mode feature.

## Building and Running

### Installation
To install the project dependencies, run:
```bash
npm install
```

### Development
To run the project in development mode with hot-reloading, use:
```bash
npm run dev
```

### Production Build
To build the project for production, run:
```bash
npm run build
```

### Preview
To preview the production build, use:
```bash
npm run preview
```

### Linting
To lint the project files, run:
```bash
npm run lint
```

## Development Conventions

- **Framework:** Vue.js 3 with Composition API and `<script setup>` syntax.
- **State Management:** Pinia is used for state management.
- **Routing:** Vue Router is used for routing.
- **Authentication:** MSAL (Microsoft Authentication Library) is used for Microsoft authentication.
- **Styling:** Tailwind CSS is used for styling.
- **Build Tool:** Vite is used as the build tool.
- **Linting:** ESLint is used for linting.
- **Formatting:** Prettier is used for code formatting.

## Project Structure

The `src` directory contains the main source code of the application.

- **`assets`:** Contains static assets like images and CSS files.
- **`components`:** Contains reusable Vue components.
- **`composables`:** Contains composable functions for reusing logic across components.
- **`constants`:** Contains constant values used throughout the application.
- **`css`:** Contains the main CSS file and Tailwind CSS configuration.
- **`helpers`:** Contains helper functions.
- **`layouts`:** Contains layout components for different pages.
- **`router`:** Contains the Vue Router configuration.
- **`services`:** Contains services for interacting with APIs and MSAL configuration.
- **`stores`:** Contains Pinia stores for state management.
- **`views`:** Contains the application's views or pages.
- **`App.vue`:** The root Vue component.
- **`main.js`:** The entry point of the application.

## Features

- **Authentication:** The application has a login system with Microsoft authentication using MSAL.
- **Dashboard:** A dashboard page to display important information.
- **Tables:** Components for displaying data in tables.
- **Forms:** Components for creating and managing forms.
- **Dark Mode:** The application has a dark mode feature.
- **Responsive Layout:** The application is designed to be responsive and work on different screen sizes.

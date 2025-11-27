# Free Laravel Vue 3.x Tailwind 4.x Dashboard

[![Vue 3.x Tailwind 4.x admin dashboard demo](https://static.justboil.me/templates/one/repo-styles.png)](https://justboil.github.io/admin-one-vue-tailwind/)

This guide will help you integrate your Laravel application with [Admin One - free Vue 3 Tailwind 4 Admin Dashboard with dark mode](https://github.com/justboil/admin-one-vue-tailwind).

**Admin One** is simple, fast and free Vue.js 3.x Tailwind CSS 4.x admin dashboard with Laravel 12.x integration.

- Built with **Vue.js 3**, **Tailwind CSS 4** framework & **Composition API**
- **Laravel Inertia Vue** stack
- **SFC** `<script setup>` [Info](https://v3.vuejs.org/api/sfc-script-setup.html)
- **Dark mode**
- **Styled** scrollbars
- **Production CSS** is only **&thickapprox;38kb**
- Reusable components
- Free under MIT License

## Table of contents

- [Install](#install)
- [Remove default starter kit files](#remove-default-starter-kit-files)
- [Copy styles, components and scripts](#copy-styles-components-and-scripts)
- [Start app](#start-app)
- [Optional steps](#optional-steps)
- [Laravel & Inertia docs](#laravel--inertia-docs)

## Install

### Install Laravel

First, [install Laravel with Vue starter kit](https://laravel.com/docs/starter-kits)

### Install npm dependencies

Install default packages:

```bash
npm install
```

Install additional dashboard packages:

```bash
npm i @mdi/js@^7 chart.js numeral axios pinia @tailwindcss/forms
```

## Remove default starter kit files

- Remove `resources/js/components`
- Remove `resources/js/layouts`
- Remove `resources/js/pages/auth`
- Remove `resources/js/pages/settings`
- Remove `resources/js/pages/Dashboard.vue`
- Remove `resources/js/app.ts`
- Remove `resources/css/app.css`

We'll replace these files with dashboard files in the next step.

## Copy styles, components and scripts

Clone [justboil/admin-one-vue-tailwind](https://github.com/justboil/admin-one-vue-tailwind) project somewhere locally (into any separate folder)

Next, copy these files **from justboil/admin-one-vue-tailwind project** directory **to laravel project** directory:

- Copy `src/components` `src/layouts` `src/stores` `src/colors.js` `src/config.js` to `resources/js/`
- Copy contents of `src/css` to `resources/css`
- Copy contents of `.laravel-guide/resources` to `resources`
- Copy `src/views/HomeView.vue` to `resources/js/pages/Dashboard.vue`
- Copy `.laravel-guide/.prettierrc` to laravel project root directory
- Copy `.laravel-guide/eslint.config.js` to laravel project root directory

## Start app

Run default database migrations, if you didn't run before:

```bash
php artisan migrate
```

Then, start app in dev mode:

```bash
npm run dev
```

## Optional steps

### Default style

It's likely, you'll use only one app style. Follow [this guide](https://justboil.github.io/docs/customization/#default-style) to set one of choice.

## Laravel & Inertia docs

- [Laravel Docs](https://laravel.com/docs)
- [Inertia](https://inertiajs.com/)

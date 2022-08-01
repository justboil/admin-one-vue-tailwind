# Free Nuxt 3.x Vue 3.x Tailwind 3.x Dashboard

This guide will help you integrate your Nuxt.js 3.x application with [Admin One - free Vue 3 Tailwind 3 Admin Dashboard with dark mode](https://github.com/justboil/admin-one-vue-tailwind).

**Please note:** this document is work in progress, so [some things are missing](#work-in-progress).

## Table of contents

* Some item

## Install Nuxt.js 3.x app with Tailwind CSS

Check [Nuxt installation guide](https://v3.nuxtjs.org/getting-started/quick-start) for more information.

* Run `npx nuxi init sample-app`
* then `cd sample-app`
* and `npm install`

Then, let's install TailwindCSS. Check [Tailwind Nuxt installation guide](https://tailwindcss.com/docs/guides/nuxtjs) for more information.

```sh
# Install tailwind
npm install -D @nuxtjs/tailwindcss @tailwindcss/forms 
#npm install -D tailwindcss postcss@latest autoprefixer@latest @nuxt/postcss8 postcss-import @tailwindcss/forms

# Install other required packages
npm i @mdi/js chart.js numeral

# Install Pinia (official Vuex 5). --legacy-peer-deps is required because of the package dependencies issue
npm install --legacy-peer-deps pinia @pinia/nuxt
```

### Copy styles, components and scripts

Clone [justboil/admin-one-vue-tailwind](https://github.com/justboil/admin-one-vue-tailwind) project locally into a separate folder

Next, copy these files **from justboil/admin-one-vue-tailwind project** directory **to nuxt project** directory:

* Copy `tailwind.config.js` to `/`
* Copy `src/components` to `components/`
* Copy `src/stores` to `stores/`
* Copy `src/colors.js` `src/config.js` `src/menu.js` `src/styles.js` to `configs/`
* Copy `src/views` to `pages/`
* Copy `src/css` to `assets/css/`
* Copy `src/App.vue` to `app.vue`
* Copy `public/data-sources` `public/favicon.png` to `public/`
*
* Copy `.laravel/resources/js/app.js` to `resources/js/` (this is an adapted version of src/main.js)
* Copy `src/App.vue` to `resources/layouts/`
* Copy `.laravel/resources/js/Pages/Auth/Login.vue` to `resources/js/Pages/Auth/`
* Copy `src/css` to `resources/css`
* Delete `resources/css/app.css`
* Rename `resources/css/main.css` to `app.css`

### Update

#### In nuxt.config.ts

```javascript
export default defineNuxtConfig({
  // ...
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
  }
})
```

#### In tailwind.config.js

Replace `content`:

```js
module.exports = {
  content: [
    './composables/**/*.{js,vue,ts}',
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    'app.vue'
  ],
  // ...
}
```

#### App.vue
remove import { computed } from 'vue'
replace <router-view/> with <NuxtPage/>
replace @ with . in imports
Wrap in <div>

Rename pages/Home.vue to index.vue

Replace <line-chart> with <charts-line-chart>

Remove/update imports

Wrap pages with a div

Replace <RouterLink> with <NuxtLink>


WIP - work in progress. Full guide is coming soon...

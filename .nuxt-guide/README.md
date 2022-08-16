# Free Nuxt 3.x Vue 3.x Tailwind 3.x Dashboard

This guide will help you integrate your Nuxt.js 3.x application with [Admin One - free Vue 3 Tailwind 3 Admin Dashboard with dark mode](https://github.com/justboil/admin-one-vue-tailwind).

**Please note:** this document is work in progress and Nuxt 3 is in Release Candidate state, so some things can be missing and warnings may occur.

## Table of contents

... TOC is coming soon

## Install Nuxt.js 3.x app with Tailwind CSS

Check [Nuxt installation guide](https://v3.nuxtjs.org/getting-started/quick-start) for more information.

* Run `npx nuxi init sample-app`
* then `cd sample-app`
* and `npm install`

Then, let's install TailwindCSS. Check [Tailwind Nuxt installation guide](https://tailwindcss.com/docs/guides/nuxtjs) for more information.

```sh
# Install tailwind
npm install -D @nuxtjs/tailwindcss @tailwindcss/forms 

# Install other required packages
npm i @mdi/js chart.js numeral

# Install Pinia (official Vuex 5). --legacy-peer-deps is required because of the package dependencies issue
npm install --legacy-peer-deps pinia @pinia/nuxt
```

### Copy styles, components and scripts

Now clone [justboil/admin-one-vue-tailwind](https://github.com/justboil/admin-one-vue-tailwind) project somewhere locally (into any separate folder)

Next, copy these files **from justboil/admin-one-vue-tailwind project** directory **to nuxt project** directory:

* Copy `tailwind.config.js` to `/`
* Copy `src/components` to `components/`
* Copy `src/layouts` to `layouts/`
* Copy `src/stores` to `stores/`
* Copy `src/colors.js` `src/config.js` `src/menuAside.js` `src/menuNavBar.js` `src/styles.js` to `configs/`
* Copy `src/css` to `assets/css/`
* Copy `public/favicon.png` to `public/`

### Prepare items

#### In nuxt.config.ts

```javascript
import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  buildModules: [
    '@pinia/nuxt',
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  css: [
    '@/assets/css/main.css',
  ]
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

#### In App.vue

```vue
<script setup>
import { useStyleStore } from '@/stores/style.js'
import { darkModeKey, styleKey } from '@/config.js'

useHead({
  titleTemplate: (titleChunk) => {
    const titleBase = 'Admin One Vue 3 Tailwind'
    
    return titleChunk ? `${titleChunk} - ${titleBase}` : titleBase
  }
})

const styleStore = useStyleStore()

const currentStyle = typeof localStorage !== 'undefined' && localStorage[styleKey] 
  ? localStorage[styleKey]
  : 'basic'

styleStore.setStyle(currentStyle)

const currentStoredDarkMode = typeof localStorage !== 'undefined' && localStorage[darkModeKey] === '1'

if ((!currentStoredDarkMode && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) || currentStoredDarkMode) {
  styleStore.setDarkMode(true)
}
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>
```

#### In stores/main.js

Remove `axios`, as you'll likely going to use Nuxt's `useFetch`. Then add some sample data for `clients` and `history`.

```javascript
// import axios from 'axios'

export const useMainStore = defineStore('main', {
  state: () => ({
    // ...

    clients: [
      { id: 19, avatar: "https://avatars.dicebear.com/v2/gridy/Howell-Hand.svg", login: "percy64", name: "Howell Hand", company: "Kiehn-Green", city: "Emelyside", progress: 70, created: "Mar 3, 2021" },
      { id: 11, avatar: "https://avatars.dicebear.com/v2/gridy/Hope-Howe.svg", login: "dare.concepcion", name: "Hope Howe", company: "Nolan Inc", city: "Paristown", progress: 68, created: "Dec 1, 2021" }, 
      { id: 32, avatar: "https://avatars.dicebear.com/v2/gridy/Nelson-Jerde.svg", login: "geovanni.kessler", name: "Nelson Jerde", company: "Nitzsche LLC", city: "Jailynbury", progress: 49, created: "May 18, 2021"},
      { id: 22, avatar: "https://avatars.dicebear.com/v2/gridy/Kim-Weimann.svg", login: "macejkovic.dashawn", name: "Kim Weimann", company: "Brown-Lueilwitz", city: "New Emie", progress: 38, created: "May 4, 2021" }
    ],
    history: [
      { amount: 375.53, name: "Home Loan Account", date: "3 days ago", type: "deposit", business: "Turcotte" },
      { amount: 470.26, name: "Savings Account", date: "3 days ago", type: "payment", business: "Murazik - Graham" }, 
      { amount: 971.34, name: "Checking Account", date: "5 days ago", type: "invoice", business: "Fahey - Keebler" }, 
      { amount: 374.63, name: "Auto Loan Account", date: "7 days ago", type: "withdrawal", business: "Collier - Hintz" }
    ]
  }),
  actions: {
    // ...

    fetch (sampleDataKey) {
      // axios
      //   .get(`data-sources/${sampleDataKey}.json`)
      //   .then(r => {
      //     if (r.data && r.data.data) {
      //       this[sampleDataKey] = r.data.data
      //     }
      //   })
      //   .catch(error => {
      //     alert(error.message)
      //   })
    }
  }
})
```

## Rename layouts

* Rename `layouts/LayoutGuest.vue` to `default.vue`
* Rename `layouts/LayoutAuthenticated.vue` to `authenticated.vue`

## Copy pages

Let's copy `views/LoginView.vue` with a guest layout and `views/HomeView.vue` with an authenticated layout.

These pages will then be available under `/` and `/dashboard` url paths.

#### LoginView.vue

Copy `views/LoginView.vue` to `pages/index.vue`

Then, wrap the entire template with `<div>` and replace `<LayoutGuest>` with `<NuxtLayout>` 

**Why we need a div wrapper?** If you use `<NuxtLayout>` within your pages, make sure it is not the root element (or disable layout/page transitions) &mdash; [Info](https://v3.nuxtjs.org/guide/directory-structure/layouts#overriding-a-layout-on-a-per-page-basis)

```vue
<script setup>
// import LayoutGuest from '@/layouts/LayoutGuest.vue'
// ...
</script>

<template>
  <div>
    <NuxtLayout>
      <!-- ... -->
    </NuxtLayout>
  </div>
</template>
```

#### HomeView.vue

Copy `views/HomeView.vue` to `pages/dashboard.vue`

Then, wrap the entire template with `<div>` and replace `<LayoutGuest>` with `<NuxtLayout>` with a `name` prop. 

```vue
<script setup>
// import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
// ...
</script>

<template>
  <div>
    <NuxtLayout name="authenticated">
      <!-- ... -->
    </NuxtLayout>
  </div>
</template>
```

## Replace `<RouterLink>` with `<NuxtLink>`

Details are coming soon...

## Remove/update imports

Nuxt automatically imports any components in your `components/` directory. So, you may safely remove that imports from `<script setup>`. The only exception is for `components/Charts`, so charts import should be left as is.

## Contributions open

WIP - work in progress. Some things are missing. Contributions open.

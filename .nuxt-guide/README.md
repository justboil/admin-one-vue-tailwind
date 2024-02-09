# Free Nuxt 3.x Vue 3.x Tailwind 3.x Dashboard

This guide will help you integrate your Nuxt.js 3.x application with [Admin One - free Vue 3 Tailwind 3 Admin Dashboard with dark mode](https://github.com/justboil/admin-one-vue-tailwind).

> **Important**: For a working version (so you don't need to go though all the steps below) please check [This Forked Repository](https://github.com/leogargioni/admin-one-nuxt-tailwind-template). Please note it may not be up to date with the latest version.

## Table of contents

... TOC is coming soon

## Install Nuxt.js 3.x app with Tailwind CSS

Check [Nuxt installation guide](https://v3.nuxtjs.org/getting-started/quick-start) for more information.

* Run `npx nuxi init sample-app`
* then `cd sample-app`

Then, let's install TailwindCSS. Check [Tailwind Nuxt installation guide](https://tailwindcss.com/docs/guides/nuxtjs) for more information.

```sh
# Install tailwind
npm install -D @nuxtjs/tailwindcss @tailwindcss/forms 

# Install other required packages
npm i @mdi/js chart.js numeral

# Install Pinia (official Vuex 5).
npm install @pinia/nuxt
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
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
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
    './configs/**/*.{js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './stores/**/*.{js,ts}',
    'app.vue'
  ],
  // ...
}
```

#### In app.vue

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
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
// import axios from 'axios'

export const useMainStore = defineStore('main', () => {
// ...
  const clients = ref([
    {
      id: 19,
      avatar: 'https://avatars.dicebear.com/v2/gridy/Howell-Hand.svg',
      login: 'percy64',
      name: 'Howell Hand',
      company: 'Kiehn-Green',
      city: 'Emelyside',
      progress: 70,
      created: 'Mar 3, 2021'
    },
    {
      id: 11,
      avatar: 'https://avatars.dicebear.com/v2/gridy/Hope-Howe.svg',
      login: 'dare.concepcion',
      name: 'Hope Howe',
      company: 'Nolan Inc',
      city: 'Paristown',
      progress: 68,
      created: 'Dec 1, 2021'
    },
    {
      id: 32,
      avatar: 'https://avatars.dicebear.com/v2/gridy/Nelson-Jerde.svg',
      login: 'geovanni.kessler',
      name: 'Nelson Jerde',
      company: 'Nitzsche LLC',
      city: 'Jailynbury',
      progress: 49,
      created: 'May 18, 2021'
    },
    {
      id: 22,
      avatar: 'https://avatars.dicebear.com/v2/gridy/Kim-Weimann.svg',
      login: 'macejkovic.dashawn',
      name: 'Kim Weimann',
      company: 'Brown-Lueilwitz',
      city: 'New Emie',
      progress: 38,
      created: 'May 4, 2021'
    }
  ])
  const history = ref([
    {
      amount: 375.53,
      name: 'Home Loan Account',
      date: '3 days ago',
      type: 'deposit',
      business: 'Turcotte',
      account: "1"
    },
    {
      amount: 470.26,
      name: 'Savings Account',
      date: '3 days ago',
      type: 'payment',
      business: 'Murazik - Graham',
      account: "2"
    },
    {
      amount: 971.34,
      name: 'Checking Account',
      date: '5 days ago',
      type: 'invoice',
      business: 'Fahey - Keebler',
      account: "3"
    },
    {
      amount: 374.63,
      name: 'Auto Loan Account',
      date: '7 days ago',
      type: 'withdrawal',
      business: 'Collier - Hintz',
      account: "4"
    }
  ])

  // ...

  // function fetchSampleClients() {
  //   axios
  //     .get(`data-sources/clients.json?v=3`)
  //     .then((result) => {
  //       clients.value = result?.data?.data
  //     })
  //     .catch((error) => {
  //       alert(error.message)
  //     })
  // }

  // function fetchSampleHistory() {
  //   axios
  //     .get(`data-sources/history.json`)
  //     .then((result) => {
  //       history.value = result?.data?.data
  //     })
  //     .catch((error) => {
  //       alert(error.message)
  //     })
  // }

  return {
    userName,
    userEmail,
    userAvatar,
    isFieldFocusRegistered,
    clients,
    history,
    setUser
  }
})
```

## Rename layouts

* Rename `layouts/LayoutGuest.vue` to `default.vue`
* Rename `layouts/LayoutAuthenticated.vue` to `authenticated.vue`

## Copy pages

Let's copy `src/views/LoginView.vue` with a guest layout and `src/views/HomeView.vue` with an authenticated layout.

These pages will then be available under `/` and `/HomeView` url paths.

#### LoginView.vue

Copy `src/views/LoginView.vue` and rename to `pages/index.vue`

Then, wrap the entire template with `<div>` and replace `<LayoutGuest>` with `<NuxtLayout>` 

**Why we need a div wrapper?** If you use `<NuxtLayout>` within your pages, make sure it is not the root element (or disable layout/page transitions) &mdash; [Info](https://v3.nuxtjs.org/guide/directory-structure/layouts#overriding-a-layout-on-a-per-page-basis)

```vue
<template>
  <div>
    <NuxtLayout>
      <!-- ... -->
    </NuxtLayout>
  </div>
</template>
```

#### HomeView.vue

Copy `src/views/HomeView.vue` to `pages/dashboard.vue`

Then, wrap the entire template with `<div>` and replace `<LayoutAuthenticated>` with `<NuxtLayout>` with a `name` prop. 

```vue
<template>
  <div>
    <NuxtLayout name="authenticated">
      <!-- ... -->
    </NuxtLayout>
  </div>
</template>
```

## Copy other pages

Copy the pages from `src/views/` (except `LoginView.vue` and `HomeView.vue`) to to `pages/` and remove the `View` from the file names

Now for each page wrap the entire template with `<div>` and replace `<LayoutAuthenticated>` with `<NuxtLayout>` with a `name` prop just like you did for `dashboard.vue` before.

Note: For the `Error.vue` and `Style.vue` pages, use the `<NuxtLayout>` without the  `name` prop.

## Update `configs/menuAside.js`

Update `Styles` and `Login` links:
```js
// ...
  {
    // to: "/",
    to: "/style",
    label: "Styles",
    icon: mdiPalette,
  },
  // ...
  {
    to: "/login",
    to: "/",
    label: "Login",
    icon: mdiLock,
  },
// ...
```

## Replace `RouterLink` with `NuxtLink`

Search all files for `RouterLink` and replace import statements and references to `RouterLink` as per below example:

```vue
<script setup>
// import { RouterLink } from 'vue-router'
import { NuxtLink } from '#components'

// ...

const componentClass = computed(() => {
  if (props.item.to) {
    // return RouterLink
    return NuxtLink
  }
})
</script>
```

## Remove/update imports

#### Update Imports

Search and Replace all `from '@/config.js'` by `from '@/configs/config'`

Search and Replace all `from '@/menuAside.js'` by `from '@/configs/menuAside'`

Search and Replace all `from '@/menuNavBar.js'` by `from '@/configs/menuNavBar'`

Search and Replace all `from '@/colors.js'` and `from '@/colors'` by `from '@/configs/colors'`

#### Remove Imports

Nuxt automatically imports any components in your `components/` and `layouts/` directories. So, you may safely remove that imports from `<script setup>`. The only exception is for `components/Charts`, so charts import should be left as is.

Also remove `import { useRouter } from 'vue-router'` from all files

## Update `assets/css/main.css`

*Remove* the following lines from `assets/css/main.css`:

```css
/* @import 'styles/_basic.css';
@import 'styles/_white.css'; */
```

## Update `components/CardBoxModal.vue`

Add `onMounted` to load `window` only on client side when ready

```vue
<script setup>
import { computed, onMounted } from 'vue';
// ...
onMounted(() => {
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && value.value) {
      cancel()
    }
  })
})
</script>
```

## Remove href

Remove `href` from props that already have a `to` prop from `components/AsideMenuItem.vue` and `components/NavBarItem.vue`

Example from`components/AsideMenuItem.vue`:
```vue
<template>
  <li>
    <component
      :is="item.to ? NuxtLink : 'a'"
      v-slot="vSlot"
      :to="item.to ?? null"
      :target="item.target ?? null"
      class="flex cursor-pointer"
      :class="componentClass"
      @click="menuClick"
    >
    <!-- ... -->
```

## Delete `assets/css/styles` Folder

Delete `assets/css/styles` folder to avoid conflicts
# Free Laravel Vue 3.x Tailwind 3.x Dashboard

[![Vue 3.x Tailwind 3.x admin dashboard demo](https://static.justboil.me/templates/one/repo-styles.png)](https://justboil.github.io/admin-one-vue-tailwind/)

This guide will help you integrate your Laravel application with [Admin One - free Vue 3 Tailwind 3 Admin Dashboard with dark mode](https://github.com/justboil/admin-one-vue-tailwind).

**Please note:** this document is work in progress, so [some things are missing](#work-in-progress).

**Admin One** is simple, beautiful and free Vue.js 3.x Tailwind CSS 3.x admin dashboard with Laravel 9.x integration.

* Built with **Vue.js 3**, **Tailwind CSS 3** framework & **Composition API**
* **Laravel Mix** build tools
* **SFC** `<script setup>` [Info](https://v3.vuejs.org/api/sfc-script-setup.html)
* **Pinia** state library (official Vuex 5)
* **Dark mode**
* **Styled** scrollbars
* **Jetstream** with **Inertia + Vue** stack
* **Production CSS** is only **&thickapprox;38kb**
* Reusable components
* Free under MIT License

## Table of contents

* [Install](#install)
* [Copy styles, components and scripts](#copy-styles-components-and-scripts)
* [Add pages](#add-pages)
* [Fix router links](#fix-router-links)
* [Add Inertia-related stuff](#add-inertia-related-stuff)
* [Optional steps](#optional-steps)
* [Delete unused files](#delete-unused-files)
* [Work in progress](#work-in-progress)

## Install

* [Install Laravel](https://laravel.com/docs/installation) application
* [Install Jetstream](https://jetstream.laravel.com/2.x/installation.html) with Inertia + Vue stack
* `cd` to project dir and run `npm i pinia @mdi/js chart.js numeral autoprefixer -D`

Add `require('autoprefixer')` to PostCSS plugin options in `webpack.mix.js`:

```javascript
mix.js('resources/js/app.js', 'public/js')
  .vue()
  .postCss('resources/css/app.css', 'public/css', [
    require('postcss-import'),
    require('tailwindcss'),
    require('autoprefixer'),
  ])
  .webpackConfig(require('./webpack.config'))
```

### Copy styles, components and scripts

Clone [justboil/admin-one-vue-tailwind](https://github.com/justboil/admin-one-vue-tailwind) project locally into a separate folder

Next, copy these files **from justboil/admin-one-vue-tailwind project** directory **to laravel project** directory:

* Copy `.laravel-guide/tailwind.config.js` to `/`
* Copy `src/components` `src/stores` `src/colors.js` `src/config.js` `src/menu.js` `src/styles.js` to `resources/js/`
* Copy `.laravel-guide/resources/js/app.js` to `resources/js/` (this is an adapted version of src/main.js)
* Copy `src/App.vue` to `resources/layouts/`
* Copy `.laravel-guide/resources/js/Pages/Auth/Login.vue` to `resources/js/Pages/Auth/`
* Copy `src/css` to `resources/css`
* Delete `resources/css/app.css`
* Rename `resources/css/main.css` to `app.css`

##### In resources/layouts/App.vue

* Replace `<router-view />` with `<slot />`
* Add `mainStore.fullScreenToggle(false)` after `const mainStore = useMainStore()`

##### In resources/views/app.blade.php

* Remove `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap">`

## Add Pages

Let's just add first page. You can repeat these steps for other pages, if you wish to.

First, copy `src/views/Home.vue` (justboil/admin-one-vue-tailwind project) to `resources/js/Pages/` (your Laravel project).

Then, open `resources/js/Pages/Home.vue` and add these lines to `<script setup>`:

```vue
<script setup>
import { Head } from '@inertiajs/inertia-vue3'
import App from '@/Layouts/App.vue'
// ...
</script>
```
Wrap the content inside `<template>` with `<app>`. Then add `<Head title="Dashboard" />`

Here's an original `<template>`:

```vue
<template>
  <!-- ... -->
</template>
```

Here's the result:

```vue
<template>
  <Head title="Dashboard" />
  <app>
    <!-- ... -->
  </app>
</template>
```

Add route in `routes/web.php`. There's a `/dashboard` route already defined by default, so just replace `Inertia::render('Dashboard')` with `Inertia::render('Home')`:

```php
Route::get('/dashboard', function () {
  return Inertia::render('Home');
})->name('dashboard');
```

## Fix router links

Here we replace router-link with Inertia Link.

##### resources/js/menu.js

Optionally, you can pass menu via Inertia shared props, so it's going to be controlled with PHP. Here we'd just use JS.

`to` should be replaced with `route` which specifies route name defined in `routes/web.php`. For external links `href` should be used instead. Here's an example for `menu.js`:

```javascript
export default [
  'General',
  [
    {
      route: 'dashboard',
      icon: mdiDesktopMac,
      label: 'Dashboard'
    },
    {
      route: 'dashboard2',
      icon: mdiDesktopMac,
      label: 'Dashboard 2'
    },
    {
      href: 'https://example.com/',
      icon: mdiDesktopMac,
      label: 'Example.com'
    }
  ]
]
```

Route names reflect ones defined in `routes/web.php`:

```php
Route::middleware(['auth:sanctum', 'verified'])->get('/dashboard', function () {
    return Inertia::render('Home');
})->name('dashboard');

Route::middleware(['auth:sanctum', 'verified'])->get('/dashboard-2', function () {
    return Inertia::render('Home2');
})->name('dashboard2');
```

Now, let's update vue files, to make them work with route names and Inertia links.

##### resources/js/components/AsideMenuItem.vue

Add `Link` import to `<script setup>`:

```vue
<script setup>
import { Link } from '@inertiajs/inertia-vue3'
// ...
</script>
```

In `<script setup>` section replace following const declarations with the ones below:

```javascript
const componentIs = computed(() => props.item.route ? Link : 'a')
```

```javascript
const itemHref = computed(() => props.item.route ? route(props.item.route) : props.item.href)
```

```javascript
const itemTarget = computed(() => props.item.target ? props.item.target : null)
```

Remove `const itemTo`

Add `const activeInactiveStyle`:

```javascript
const activeInactiveStyle = computed(
  () => props.item.route && route().current(props.item.route)
    ? asideMenuItemActiveStyle.value
    : asideMenuItemInactiveStyle.value
)
```

In `<template>` section:

* In `<component>` remove `v-slot` and `:to` attributes
* Inside `<component>` replace `:class` attribute for `<icon>`, `<span>` and another `<icon>` with `:class="activeInactiveStyle"`

```vue
<template>

  <!-- ... -->

  <component
    :is="componentIs"
    :href="itemHref"
    :target="itemTarget"
    class="flex cursor-pointer dark:hover:bg-gray-700/50"
    :class="[ asideMenuItemStyle, isSubmenuList ? 'p-3 text-sm' : 'py-2' ]"
    @click="menuClick"
  >
    <icon
      v-if="item.icon"
      :path="item.icon"
      class="flex-none"
      :class="activeInactiveStyle"
      w="w-12"
    />
    <span
      class="grow"
      :class="activeInactiveStyle"
    >{{ item.label }}</span>
    <icon
      v-if="hasDropdown"
      :path="dropdownIcon"
      class="flex-none"
      :class="activeInactiveStyle"
      w="w-12"
    />
  </component>

  <!-- ... -->

</template>
```

##### resources/js/components/JbButton.vue

Add `Link` import to `<script setup>`:

```vue
<script setup>
import { Link } from '@inertiajs/inertia-vue3'
// ...
</script>
```

Replace `to` prop declaration with `routeName`:

```javascript
const props = defineProps({
  // ...
  routeName: {
    type: String,
    default: null
  }
  // ...
})
```

Fix `const is` declaration, so it returns the `Link` component when `props.routeName` is set:

```javascript
const is = computed(() => {
  if (props.as) {
    return props.as
  }

  if (props.routeName) {
    return Link
  }

  if (props.href) {
    return 'a'
  }

  return 'button'
})
```

Remove `:to` and replace `:href` in `<component>` with `:href="routeName ? route(routeName) : href"`:

```vue
<template>
  <component
    :is="is"
    :class="componentClass"
    :href="routeName ? route(routeName) : href"
    :type="computedType"
    :target="target"
    :disabled="disabled"
  >
    <!-- ... -->
  </component>
</template>
```

##### resources/js/components/NavBarItem.vue

Add `Link` import to `<script setup>`:

```vue
<script setup>
import { Link } from '@inertiajs/inertia-vue3'
// ...
</script>
```

Replace `to` prop with `routeName` prop:

```javascript
const props = defineProps({
  // ...
  routeName: {
    type: String,
    default: null
  }
  // ...
})
```

Update `const is` to return `Link` when `props.routeName` is set:

```javascript
const is = computed(() => {
  if (props.href) {
    return 'a'
  }

  if (props.routeName) {
    return Link
  }

  return 'div'
})
```

Update `const activeClass` to match current route name:

```javascript
const activeClass = computed(
  () => props.routeName && route().current(props.routeName) ? props.activeColor : null
)
```

Then, update attributes in `<component>`:

```vue
<template>
  <component
    :is="is"
    :class="[componentClass, activeClass]"
    :href="routeName ? route(routeName) : href"
  >
    <slot />
  </component>
</template>
```

## Add Inertia-related stuff

##### resources/js/components/UserAvatar.vue

Fix `avatar` computed property, so it fetches user's profile photo from backend

```vue
<script setup>
import { usePage } from '@inertiajs/inertia-vue3'
// ...
const avatar = computed(() => props.username
  ? `https://avatars.dicebear.com/${props.api}/${props.username.replace(/[^a-z0-9]+/i, '-')}.svg`
  : usePage().props.value.user.profile_photo_url)
// ...
</script>
```

##### resources/js/components/NavBar.vue

Update `userName` and `logout`:

```vue
<script setup>
import { usePage } from '@inertiajs/inertia-vue3'
import { Inertia } from '@inertiajs/inertia'
// ...

const userName = computed(() => usePage().props.value.user.name)

const logout = () => {
  Inertia.post(route('logout'))
}
</script>
```

## Optional steps

### Fix .editorconfig

Add to .editorconfig:

```editorconfig
[*.{js,jsx,ts,tsx,vue,html,css}]
indent_size = 2
```

### Fix Pages/Welcome.vue

In case, you need Pages/Welcome.vue, add `import` and `setup()` to remove unnecessary padding, which is set by default:

```js
import { useMainStore } from '@/stores/main'
// ...

export default defineComponent({
  // ...
  setup () {
    const mainStore = useMainStore()
    mainStore.fullScreenToggle(true)
  }
})
```

## Delete unused files

* Delete resources/js/bootstrap.js
* ...other items are coming soon

## Work in progress

As mentioned, this guide is WIP - work in progress. Contributions open. Here's the list of what's missing right now:

* Pages for resources/Pages/API
* Pages for resources/Pages/Auth (except Login.vue)
* Pages for resources/Pages/Profile
* Unused default Jetstream files list

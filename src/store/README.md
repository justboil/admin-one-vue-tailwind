# Vuex fallback guide

[Admin One](https://github.com/justboil/admin-one-vue-tailwind) now uses [Pinia](https://pinia.vuejs.org/) as a state management library instead of Vuex. This is because the official state management library for Vue has changed to Pinia (official Vuex 5).

However, if you still would like to use Vuex, general steps are described below. Please check [v2.1.0](https://github.com/justboil/admin-one-vue-tailwind/releases/tag/v2.1.0) for reference.

## Install vuex and remove pinia

```shell
npm i vuex
npm remove pinia
```

## Fix files

### src/*

Replace all occurrences of `import { useMainStore } from '@/stores/main'` with `import { useStore } from 'vuex'`

Replace all occurrences of `const mainStore = useMainStore()` with `const store = useStore()`

##### Replace all Get State calls

```javascript
// Pinia state getter (example)
const userName = computed(() => mainStore.userName)

// ...is replaced with Vuex state getter
const userName = computed(() => store.state.userName)
```

##### Replace all Action calls

Check `src/store/index.js` for action reference.

```javascript
// Pinia state action call (example)
mainStore.asideLgToggle(true)

// ...is replaced with Vuex state action call
store.dispatch('asideLgToggle', true)
```

##### Replace all direct setters

Setters should be replaced with an appropriate mutation or with a basic one

```javascript
// Pinia state action call (example)
mainStore.isFieldFocusRegistered = true

// ...is replaced with appropriate mutation or with a basic one
store.commit('basic', {
  key: 'isFieldFocusRegistered',
  value: true
})
```

### src/main.js

Remove `import { createPinia } from 'pinia'`

Replace `import { useMainStore } from '@/stores/main'` with `import store from './store'`

Remove `/* Init Pinia */` and the following line

Remove `/* Init Pinia main store */` and the following line

Replace `createApp(App).use(router).use(pinia).mount('#app')` with `createApp(App).use(store).use(router).mount('#app')`


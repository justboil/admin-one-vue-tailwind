import store from './store'

import {darkModeKey, styleKey} from '@/config.js'

import {createApp, h} from 'vue';
import {createInertiaApp} from '@inertiajs/inertia-vue3';
import {InertiaProgress} from '@inertiajs/progress';

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

/* App style */
store.dispatch('setStyle', localStorage[styleKey] ?? 'basic')

/* Dark mode */
if ((!localStorage[darkModeKey] && window.matchMedia('(prefers-color-scheme: dark)').matches) || localStorage[darkModeKey] === '1') {
  store.dispatch('darkMode', true)
}

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) => require(`./Pages/${name}.vue`),
  setup({el, app, props, plugin}) {
    return createApp({render: () => h(app, props)})
      .use(plugin)
      .use(store)
      .mixin({methods: {route}})
      .mount(el);
  },
});

InertiaProgress.init({color: '#4B5563'});

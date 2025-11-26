import { mdiAccountCircle, mdiGithub, mdiMonitor, mdiReact, mdiViewList } from '@mdi/js';
import { dashboard } from './routes';
import profile from './routes/profile';

export default [
  {
    route: dashboard(),
    icon: mdiMonitor,
    label: 'Dashboard',
  },
  {
    route: profile.edit(),
    icon: mdiAccountCircle,
    label: 'Profile',
  },

  {
    label: 'Dropdown',
    icon: mdiViewList,
    menu: [
      {
        label: 'Item One',
      },
      {
        label: 'Item Two',
      },
    ],
  },
  {
    href: 'https://github.com/justboil/admin-one-vue-tailwind',
    label: 'GitHub',
    icon: mdiGithub,
    target: '_blank',
  },
  {
    href: 'https://github.com/justboil/admin-one-react-tailwind',
    label: 'React version',
    icon: mdiReact,
    target: '_blank',
  },
];

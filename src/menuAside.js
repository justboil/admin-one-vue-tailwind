import {
  mdiAccountCircle,
  mdiMonitor,
  mdiLock,
  mdiAlertCircle,
  mdiSquareEditOutline,
  mdiTable,
  mdiViewList,
  mdiTelevisionGuide,
  mdiResponsive,
  mdiPalette
} from "@mdi/js";

export default [
  {
    to: "/dashboard",
    icon: mdiMonitor,
    label: "메인"
  },
  {
    label: "스터디 관리",
    icon: mdiViewList,
    menu: [
      {
        label: "스터디 리스트",
        to: "/studygroup"
      }
    ]
  },
  {
    to: "/profile",
    label: "프로필",
    icon: mdiAccountCircle
  },
  // {
  //   to: "/tables",
  //   label: "Tables",
  //   icon: mdiTable
  // },
  // {
  //   to: "/forms",
  //   label: "Forms",
  //   icon: mdiSquareEditOutline
  // },
  // {
  //   to: "/ui",
  //   label: "UI",
  //   icon: mdiTelevisionGuide
  // },
  // {
  //   to: "/responsive",
  //   label: "Responsive",
  //   icon: mdiResponsive
  // },
  // {
  //   to: "/",
  //   label: "Styles",
  //   icon: mdiPalette
  // },
  {
    to: "/login",
    label: "로그인",
    icon: mdiLock
  },
  // {
  //   to: "/error",
  //   label: "Error",
  //   icon: mdiAlertCircle
  // }
];

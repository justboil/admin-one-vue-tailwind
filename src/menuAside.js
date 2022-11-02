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
  mdiPalette,
} from "@mdi/js";

export default [
  {
    to: "/dashboard",
    icon: mdiMonitor,
    label: "메인"
  },
  {
    label: "스터디 그룹 관리",
    icon: mdiViewList,
    menu: [
      {
        label: "Item One"
      },
      {
        label: "Item Two"
      }
    ]
  },
  {
    label: "스터디 그룹 생성",
    icon: mdiViewList,
    menu: [
      {
        label: "Item One"
      },
      {
        label: "Item Two"
      }
    ]
  },
  {
    to: "/profile",
    label: "프로필",
    icon: mdiAccountCircle
  },
  {
    to: "/tables",
    label: "Tables",
    icon: mdiTable
  },
  {
    to: "/forms",
    label: "Forms",
    icon: mdiSquareEditOutline
  },
  {
    to: "/ui",
    label: "UI",
    icon: mdiTelevisionGuide
  },
  {
    to: "/responsive",
    label: "Responsive",
    icon: mdiResponsive
  },
  {
    to: "/",
    label: "Styles",
    icon: mdiPalette
  },
  {
    to: "/login",
    label: "Login",
    icon: mdiLock
  },
  {
    to: "/error",
    label: "Error",
    icon: mdiAlertCircle,
  },
];

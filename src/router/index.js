import { createRouter, createWebHashHistory } from "vue-router";
import Style from "/src/views/StyleView.vue";
import Home from "/src/views/HomeView.vue";

const routes = [
  {
    meta: {
      title: "Select style"
    },
    path: "/",
    name: "style",
    component: Style
  },
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: "Dashboard"
    },
    path: "/dashboard",
    name: "dashboard",
    component: Home
  },
  {
    meta: {
      title: "Tables"
    },
    path: "/tables",
    name: "tables",
    component: () => import("/src/views/TablesView.vue")
  },
  {
    meta: {
      title: "Forms"
    },
    path: "/forms",
    name: "forms",
    component: () => import("/src/views/FormsView.vue")
  },
  {
    meta: {
      title: "Profile"
    },
    path: "/profile",
    name: "profile",
    component: () => import("/src/views/ProfileView.vue")
  },
  {
    meta: {
      title: "Ui"
    },
    path: "/ui",
    name: "ui",
    component: () => import("/src/views/UiView.vue")
  },
  {
    meta: {
      title: "Responsive layout"
    },
    path: "/responsive",
    name: "responsive",
    component: () => import("/src/views/ResponsiveView.vue")
  },
  {
    meta: {
      title: "Login"
    },
    path: "/login",
    name: "login",
    component: () => import("/src/views/LoginView.vue")
  },
  {
    meta: {
      title: "Error"
    },
    path: "/error",
    name: "error",
    component: () => import("/src/views/ErrorView.vue")
  },
  {
    meta: {
      title: "SignUp"
    },
    path: "/sign-up",
    name: "signup",
    component: () => import("/src/views/SignUpView.vue")
  },
  {
    meta: {
      title: "스터디 그룹 생성"
    },
    path: "/studygroup/create",
    component: () => import("/src/views/CreateStudyGroupView.vue")
  },
  {
    meta: {
      title: "스터디 그룹 리스트"
    },
    path: "/studygroup",
    component: () => import("/src/views/StudyGroupListView.vue")
  },
  {
    meta: {
      title: "스터디 그룹 상세보기"
    },
    path: "/studygroup/:studyId",
    component: () => import("/src/views/StudyGroupDetailView.vue")
  },
  {
    meta: {
      title: "스터디 그룹 게시판"
    },
    path: "/studygroup/:studyId/notices",
    component: () => import("/src/views/StudyNoticeListView.vue")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 };
  }
});

export default router;

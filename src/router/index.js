import { createRouter, createWebHistory } from "vue-router";
import Style from "@/views/StyleView.vue";
import Home from "@/views/HomeView.vue";

import User from "@/views/User/Users.vue";
import AddUser from "@/views/User/AddUser.vue";

import Project from "@/views/Project/Projects.vue";
import AddProject from "@/views/Project/AddProject.vue";
import ProjectDetails from "@/views/Project/ProjectsDetails.vue";
import AddMemberToProject from "@/views/Project/AddMemberToProject.vue";
import ProjectTaskDetails from "@/views/Project/ProjectsTaskDetails.vue";

import Role from "@/views/Role/Roles.vue";
import AddRole from "@/views/Role/AddRole.vue";
import RoleDetails from "@/views/Role/RoleDetails.vue";

import Permission from "@/views/Permission/Permissions.vue";
import AddPermission from "@/views/Permission/AddPermission.vue";

import Task from "@/views/Task/Tasks.vue";
import AddTask from "@/views/Task/AddTask.vue";
import TaskDetails from "@/views/Task/TaskDetails.vue";

const routes = [
  {
    meta: {
      title: "Select style",
    },
    path: "/",
    name: "style",
    component: Style,
  },
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: "Dashboard",
    },
    path: "/dashboard",
    name: "dashboard",
    component: Home,
    meta: { requiresAuth: true },
  },

  {
    meta: {
      title: "All Users",
    },
    path: "/users",
    name: "users",
    component: User,
    meta: { requiresAuth: true },
  },
  {
    meta: {
      title: "Create User",
    },
    path: "/user/create",
    name: "createUser",
    component: AddUser,
    meta: { requiresAuth: true },
  },

  {
    meta: {
      title: "All Projects",
    },
    path: "/projects",
    name: "projects",
    component: Project,
    meta: { requiresAuth: true },
  },
  {
    meta: {
      title: "Create Project",
    },
    path: "/project/create",
    name: "createProject",
    component: AddProject,
    meta: { requiresAuth: true },
  },
  {
    meta: {
      title: "Project Details",
    },
    path: "/project/:id",
    name: "ProjectDetails",
    component: ProjectDetails,
    meta: { requiresAuth: true },
  },
  {
    meta: {
      title: "Add Member to Project",
    },
    path: "/project/member/add",
    name: "AddMemberToProject",
    component: AddMemberToProject,
    meta: { requiresAuth: true },
  },
  {
    meta: {
      title: "Project Task Details",
    },
    path: "/project/:id/tasks",
    name: "ProjectTasks",
    component: ProjectTaskDetails,
    meta: { requiresAuth: true },
  },


  {
    meta: {
      title: "All Tasks",
    },
    path: "/tasks",
    name: "tasks",
    component: Task,
    meta: { requiresAuth: true },
  },
  {
    meta: {
      title: "Create Task",
    },
    path: "/task/create",
    name: "createTask",
    component: AddTask,
    meta: { requiresAuth: true },
  },
  {
    meta: {
      title: "Task Details",
    },
    path: "/task/:id",
    name: "TaskDetails",
    component: TaskDetails,
    meta: { requiresAuth: true },
  },

  {
    meta: {
      title: "All Roles",
    },
    path: "/roles",
    name: "roles",
    component: Role,
    meta: { requiresAuth: true },
  },
  {
    meta: {
      title: "Create Role",
    },
    path: "/role/create",
    name: "createRole",
    component: AddRole,
    meta: { requiresAuth: true },
  },
  {
    meta: {
      title: "Role Details",
    },
    path: "/role/:id",
    name: "roleDetails",
    component: RoleDetails,
    meta: { requiresAuth: true },
  },

  {
    meta: {
      title: "All Permissions",
    },
    path: "/permissions",
    name: "permissions",
    component: Permission,
    meta: { requiresAuth: true },
  },
  {
    meta: {
      title: "Create Permission",
    },
    path: "/permission/create",
    name: "createPermission",
    component: AddPermission,
    meta: { requiresAuth: true },
  },

  {
    meta: {
      title: "Tables",
    },
    path: "/tables",
    name: "tables",
    component: () => import("@/views/TablesView.vue"),
  },
  {
    meta: {
      title: "Forms",
    },
    path: "/forms",
    name: "forms",
    component: () => import("@/views/FormsView.vue"),
  },
  {
    meta: {
      title: "Profile",
    },
    path: "/profile",
    name: "profile",
    component: () => import("@/views/User/ProfileView.vue"),
    meta: { requiresAuth: true },
  },
  {
    meta: {
      title: "Ui",
    },
    path: "/ui",
    name: "ui",
    component: () => import("@/views/UiView.vue"),
  },
  {
    meta: {
      title: "Responsive layout",
    },
    path: "/responsive",
    name: "responsive",
    component: () => import("@/views/ResponsiveView.vue"),
  },
  {
    meta: {
      title: "Login",
    },
    path: "/login",
    name: "login",
    component: () => import("@/views/LoginView.vue"),
  },
  {
    meta: {
      title: "Error",
    },
    path: "/error",
    name: "error",
    component: () => import("@/views/ErrorView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');
  if (to.meta.requiresAuth && (!isAuthenticated)) {
    next('/login');
  } else {
    next();
  }
});

export default router;

import { createRouter, createWebHistory } from "vue-router";
import initMiddlewares, { test } from "../middlewares";
import store from "@/store";
import Home from "@/pages/Home";
import Profile from "@/pages/Profile";
import Auth from "@/pages/Auth";
import User from "@/pages/User";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      middleware: [test],
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      middleware: [test],
    },
  },
  {
    path: "/user/:id",
    name: "User",
    component: User,
    meta: {
      middleware: [test],
    },
  },
  {
    path: "/auth",
    name: "Auth",
    component: Auth,
    meta: {
      layout: "auth",
      middleware: [test],
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(initMiddlewares(store));

export default router;

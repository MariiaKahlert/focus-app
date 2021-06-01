import { createRouter, createWebHistory } from "vue-router";
import Auth from "../views/Auth.vue";
import TrialTimer from "../views/TrialTimer.vue";
import MainTimer from "../views/MainTimer.vue";
import Statistics from "../views/Statistics.vue";
import { currentUser } from "../main";

const routes = [
  {
    path: "/",
    redirect: () => {
      if (!currentUser) {
        return "/welcome";
      } else {
        return "/main-timer";
      }
    },
  },
  {
    path: "/welcome",
    name: "Auth",
    component: Auth,
    beforeEnter: (to, from, next) => {
      if (currentUser) {
        next("/main-timer");
        return;
      }
      next();
    },
  },
  {
    path: "/trial-timer",
    name: "TrialTimer",
    component: TrialTimer,
    beforeEnter: (to, from, next) => {
      if (!currentUser) {
        next("/main-timer");
        return;
      }
      next();
    },
  },
  {
    path: "/main-timer",
    name: "MainTimer",
    component: MainTimer,
    beforeEnter: (to, from, next) => {
      if (!currentUser) {
        next("/welcome");
        return;
      }
      next();
    },
  },
  {
    path: "/statistics",
    name: "Statistics",
    component: Statistics,
    beforeEnter: (to, from, next) => {
      if (!currentUser) {
        next("/welcome");
        return;
      }
      next();
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

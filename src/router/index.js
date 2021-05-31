import { createRouter, createWebHistory } from "vue-router";
import Auth from "../views/Auth.vue";
import TrialTimer from "../views/TrialTimer.vue";
import MainTimer from "../views/MainTimer.vue";

const routes = [
  {
    path: "/",
    redirect: () => {
      return "/welcome";
    },
  },
  {
    path: "/welcome",
    name: "Auth",
    component: Auth,
  },
  {
    path: "/trial-timer",
    name: "TrialTimer",
    component: TrialTimer,
  },
  {
    path: "/main-timer",
    name: "MainTimer",
    component: MainTimer,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

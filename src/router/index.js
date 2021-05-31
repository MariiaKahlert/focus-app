import { createRouter, createWebHistory } from "vue-router";
import Auth from "../views/Auth.vue";
import Timer from "../components/Timer.vue";

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
    path: "/free-timer",
    name: "Timer",
    component: Timer,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

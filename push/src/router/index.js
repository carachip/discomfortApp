import Vue from "vue";
import VueRouter from "vue-router";
import LoginView from "../views/LoginView.vue";
import Home from "../views/Home.vue";
import Calendar from "../views/Calendar.vue";
import FindPartners from "../views/FindPartners.vue";
import Settings from "../views/Settings.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "LoginView",
    component: LoginView,
  },
  {
    path: "/Home",
    name: "Home",
    component: Home,
  },
  {
    path: "/Calendar",
    name: "Calendar",
    component: Calendar,
  },
  {
    path: "/FindPartners",
    name: "FindPartners",
    component: FindPartners,
  },
  {
    path: "/Settings",
    name: "Settings",
    component: Settings,
  }
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue"),
  // },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

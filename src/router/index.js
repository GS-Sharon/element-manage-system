import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login/login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login"
  },
  // {
  //   path: "/main",
  //   name: "Main",
  //   component: Main,
  //   children: [
  //     {
  //       path: "home",
  //       name: "Home",
  //       component: () => import("../views/Home/Home.vue")
  //     },
  //     {
  //       path: "vedio",
  //       name: "Vedio",
  //       component: () => import("../views/Vedio/Vedio.vue")
  //     },
  //     {
  //       path: "user",
  //       name: "User",
  //       component: () => import("../views/User/User.vue")
  //     },
  //     {
  //       path: "page1",
  //       name: "Page1",
  //       component: () => import("../views/Other/Page1.vue")
  //     },
  //     {
  //       path: "page2",
  //       name: "Page2",
  //       component: () => import("../views/Other/Page2.vue")
  //     }
  //   ]
  // },
  {
    path: "/login",
    name: "Login",
    component: Login
  }
];

const router = new VueRouter({
  routes
});

export default router;

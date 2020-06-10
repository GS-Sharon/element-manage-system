import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 全局文件
import "@/assets/scss/reset.scss";
// 第三方插件
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// axios
import http from "@/api/config";
// 引入mock
import "./mock";
import Main from "@/views/Main";

Vue.config.productionTip = false;
Vue.use(ElementUI);

Vue.prototype.$http = http;

// 路由守卫
router.beforeEach((to, from, next) => {
  // 路由切换时判断是否带有token，如果无则跳转到登陆页面
  if (!window.localStorage.getItem("token")) {
    if (to.fullPath != "/login") {
      next({ name: "Login" });
    } else {
      next();
    }
  } else {
    // 检测已经登陆
    store.commit("SETTOKEN", window.localStorage.getItem("token"));
    store.commit("SETMENU", window.localStorage.getItem("menu"));
    store.commit("SETUSERINFO", window.localStorage.getItem("info"));
    store.commit("GETTABS");
    next();
  }
});

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    let activeRoutes = [
      {
        path: "/main",
        name: "Main",
        component: Main,
        children: (function() {
          let routes = [];
          store.state.user.menu.forEach(item => {
            if (item.children) {
              item.children.forEach(item => {
                if (item.name == "Page1" || item.name == "Page2") {
                  routes.push({
                    path: item.path,
                    name: item.name,
                    component: () => import("@/views/Other/" + item.name)
                  });
                }
              });
            } else {
              if (item.path != "/") {
                routes.push({
                  path: item.path,
                  name: item.name,
                  component: () =>
                    import("@/views/" + item.name + "/" + item.name)
                });
              }
            }
          });
          return routes;
        })()
      }
    ];
    router.addRoutes(activeRoutes);
  }
}).$mount("#app");

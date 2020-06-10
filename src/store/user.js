import Main from "@/views/Main";
import router from "@/router";
export default {
  state: {
    userInfo: null,
    token: "",
    menu: []
  },
  mutations: {
    SETTOKEN(state, token) {
      state.token = token;
      window.localStorage.setItem("token", token);
    },
    CLEARTOKEN(state) {
      state.token = "";
      window.localStorage.removeItem("token");
    },
    SETUSERINFO(state, userInfo) {
      state.userInfo = JSON.parse(userInfo);
      window.localStorage.setItem("info", userInfo);
    },
    CLEARUSERINFO(state) {
      state.userInfo = null;
      window.localStorage.removeItem("info");
    },
    SETMENU(state, menu) {
      state.menu = JSON.parse(menu);
      window.localStorage.setItem("menu", menu);
    },
    CLEARMENU(state) {
      state.menu = [];
      window.localStorage.removeItem("menu");
    },
    ADDROUTE(state) {
      //   根据菜单进行路由添加，因为要防止用户通过url的方式二访问到，这样权限相当于无用
      let activeRoutes = [
        {
          path: "/main",
          name: "Main",
          component: Main,
          children: (function() {
            let routes = [];
            state.menu.forEach(item => {
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
      router.options.routes = [...router.options.routes, ...activeRoutes];
      // Cookie.set("routes", JSON.stringify(activeRoutes));
    }
  },
  actions: {}
};

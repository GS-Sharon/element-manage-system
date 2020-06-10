export default {
  state: {
    tabs: [
      {
        title: "首页",
        name: "Home",
        path: "home",
        icon: "el-icon-location"
      }
    ],
    currentMenu: null,
    isCollpase: false
  },
  mutations: {
    SETCURRENTMENU(state, item) {
      if (item.title !== "首页") {
        state.currentMenu = item;
        window.localStorage.setItem(
          "currentMenu",
          JSON.stringify(state.currentMenu)
        );
      } else {
        state.currentMenu = null;
      }
    },
    GETTABS(state) {
      if (window.localStorage.getItem("currentMenu")) {
        state.currentMenu = JSON.parse(
          window.localStorage.getItem("currentMenu")
        );
      }
      if (window.localStorage.getItem("tabs")) {
        state.tabs = JSON.parse(window.localStorage.getItem("tabs"));
      } else {
        state.tabs = [
          {
            title: "首页",
            name: "Home",
            path: "home",
            icon: "el-icon-location"
          }
        ];
      }
    },
    CLEARCURRENTMENU(state) {
      window.localStorage.removeItem("currentMenu");
      window.localStorage.removeItem("tabs");
      state.currentMenu = null;
    },
    ADDTAB(state, tab) {
      let ifHasTab = state.tabs.find(item => item.title == tab.title);
      if (!ifHasTab) {
        state.tabs.push(tab);
        window.localStorage.setItem("tabs", JSON.stringify(state.tabs));
      }
    },
    CLOSETAB(state, tab) {
      let tabIndex = state.tabs.findIndex(item => item.name == tab.name);
      if (tabIndex !== -1) {
        state.tabs.splice(tabIndex, 1);
      }
    },
    CHANGECOLLPASE(state) {
      state.isCollpase = !state.isCollpase;
    }
  }
};

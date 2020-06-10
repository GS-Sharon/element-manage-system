import Mock from "mockjs";
import store from "@/store";

function login(config) {
  let { name, password } = JSON.parse(config.body);
  if (name == "sharon" && password == "123") {
    return {
      code: 20000,
      msg: "登陆成功",
      token: Mock.mock("@guid"),
      info: JSON.stringify({
        username: name
      }),
      menu: JSON.stringify([
        {
          title: "首页",
          name: "Home",
          path: "home",
          icon: "el-icon-location"
        },
        {
          title: "视频管理",
          name: "Vedio",
          path: "vedio",
          icon: "el-icon-location"
        },
        {
          title: "用户管理",
          name: "User",
          path: "user",
          icon: "el-icon-location"
        },
        {
          title: "其他",
          path: "/",
          icon: "el-icon-location",
          children: [
            {
              title: "选项一",
              name: "Page1",
              path: "page1",
              icon: "el-icon-location"
            },
            {
              title: "选项二",
              name: "Page2",
              path: "page2",
              icon: "el-icon-location"
            }
          ]
        }
      ])
    };
  }
  if (name == "alex" && password == "234") {
    return {
      code: 20000,
      msg: "登陆成功",
      token: Mock.mock("@guid"),
      info: JSON.stringify({
        username: name
      }),
      menu: JSON.stringify([
        {
          title: "首页",
          name: "Home",
          path: "home",
          icon: "el-icon-location"
        },
        {
          title: "视频管理",
          name: "Vedio",
          path: "vedio",
          icon: "el-icon-location"
        },
        {
          title: "用户管理",
          name: "User",
          path: "user",
          icon: "el-icon-location"
        }
      ])
    };
  }
  return {
    code: 20001,
    msg: "登陆失败"
  };
}

function loginOut() {
  store.commit("CLEARTOKEN");
  store.commit("CLEARUSERINFO");
  store.commit("CLEARMENU");
}
export { login, loginOut };

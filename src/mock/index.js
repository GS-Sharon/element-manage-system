import Mock from "mockjs";
import homeData from "./homeData";
import { userData, editData, addData, deleteData } from "./userData";
import { login } from "./user";

// 模拟请求延迟时间
Mock.setup({
  timeout: "200-600"
});

Mock.mock("/home/homeData", "get", homeData);
// 根据页数返回用户列表信息
Mock.mock("/user/userData", "post", userData);
// 编辑用户列表信息
Mock.mock("/user/editUser", "post", editData);
// 新增用户列表信息
Mock.mock("/user/addUser", "post", addData);
// 删除用户列表信息
Mock.mock("/user/deleteUser", "post", deleteData);
// 用户登陆
Mock.mock("api/login", "post", login);

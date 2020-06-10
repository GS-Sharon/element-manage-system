// 配置axios，比如一些拦截类的，header加token等等
import axios from "axios";

// 生成axios实例
const instance = axios.create({
  headers: {
    "content-type": "application/x-www-form-urlencoded"
  }
});

// 请求拦截器
instance.interceptors.request.use(
  config => {
    // 判断缓存中是否有token，如果有则在config.headers中添加参数携带token返回到后台
    return config;
  },
  err => {
    console.log(err);
  }
);

// 响应拦截
instance.interceptors.response.use(response => {
  // 在此处根据响应的status状态码和response.data中后台返回的状态来判断是否需要跳转之类的操作
  let res = {};
  res = response.data;
  return res;
});

export default instance;

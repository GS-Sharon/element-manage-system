import Mock from "mockjs";

let count = 40;
let user_data = Mock.mock({
  ["data|" + count]: [
    {
      name: "@cname",
      "age|10-70": 10,
      "sex|1": true,
      bornDate: "@date",
      address: "@county(true)"
    }
  ]
}).data;
// === 根据页数返回用户列表信息 ===
function userData(config) {
  // Mock中post方式获取参数使用config.body
  //   如果请求传参中有page和limit则取代，无则默认为page=1,limit=20
  let { page = 1, limit = 10 } = JSON.parse(config.body);
  return {
    code: 1,
    result: user_data.filter((item, index) => {
      return index >= (page - 1) * limit && index < page * limit;
    }),
    pages: Math.ceil(count / limit)
  };
}

// === 编辑用户列表信息 ===
function editData(config) {
  let newEdit = JSON.parse(config.body);
  newEdit.sex = newEdit.sex == "男" ? true : false;
  user_data.forEach((item, idx) => {
    // 根据名字查找
    if (item.name == newEdit.name) {
      user_data[idx] = newEdit;
    }
  });
  return {
    code: 20000
  };
}

// === 新增用户列表信息 ===
function addData(config) {
  let newAdd = JSON.parse(config.body);
  user_data.unshift({ id: user_data.length, ...newAdd });
  return {
    code: 20000
  };
}

// === 新增用户列表信息 ===
function deleteData(config) {
  let newAdd = JSON.parse(config.body);
  for (let i = 0; i < user_data.length; i++) {
    if (user_data[i].name == newAdd.name) {
      let deleteUser = user_data.splice(i, 1);
      return {
        code: 20000,
        deleteUser
      };
    }
  }
}

export { userData, editData, addData, deleteData };

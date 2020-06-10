import Mock from "mockjs";
let userData = Mock.mock({
  "result|6": [
    {
      "price|1-1000.1-2": 1000.1,
      "text|+1": [
        "今日支付订单",
        "今日收藏订单",
        "今日未支付订单",
        "本月支付订单",
        "本月收藏订单",
        "本月未支付订单"
      ],
      icon: "success",
      color: "@hex"
    }
  ]
}).result;

let tableData = Mock.mock({
  "result|6": [
    {
      "name|+1": ["ES6", "小程序", "Vue", "springboot", "React", "Redis"],
      "todayBuy|1-1000.1-2": 12.1,
      "monthBuy|1-5000.1-2": 12.1,
      "totalBuy|10000-100000.1-2": 13.2
    }
  ]
}).result;

// 饼图
let videoData = [
  {
    name: "springboot",
    value: Mock.Random.float(1000, 10000, 0, 2)
  },
  {
    name: "vue",
    value: Mock.Random.float(1000, 10000, 0, 2)
  },
  {
    name: "小程序",
    value: Mock.Random.float(1000, 10000, 0, 2)
  },
  {
    name: "ES6",
    value: Mock.Random.float(1000, 10000, 0, 2)
  },
  {
    name: "Redis",
    value: Mock.Random.float(1000, 10000, 0, 2)
  },
  {
    name: "React",
    value: Mock.Random.float(1000, 10000, 0, 2)
  }
];
// 柱状图
let barData = [
  {
    date: "周一",
    new: Mock.Random.integer(1, 100),
    active: Mock.Random.integer(100, 1000)
  },
  {
    date: "周二",
    new: Mock.Random.integer(1, 100),
    active: Mock.Random.integer(100, 1000)
  },
  {
    date: "周三",
    new: Mock.Random.integer(1, 100),
    active: Mock.Random.integer(100, 1000)
  },
  {
    date: "周四",
    new: Mock.Random.integer(1, 100),
    active: Mock.Random.integer(100, 1000)
  },
  {
    date: "周五",
    new: Mock.Random.integer(1, 100),
    active: Mock.Random.integer(100, 1000)
  },
  {
    date: "周六",
    new: Mock.Random.integer(1, 100),
    active: Mock.Random.integer(100, 1000)
  },
  {
    date: "周日",
    new: Mock.Random.integer(1, 100),
    active: Mock.Random.integer(100, 1000)
  }
];
// 折线图
let List = [];
for (let i = 0; i < 7; i++) {
  List.push(
    Mock.mock({
      vue: Mock.Random.float(100, 8000, 0, 2),
      wechat: Mock.Random.float(100, 8000, 0, 2),
      ES6: Mock.Random.float(100, 8000, 0, 2),
      Redis: Mock.Random.float(100, 8000, 0, 2),
      React: Mock.Random.float(100, 8000, 0, 2),
      springboot: Mock.Random.float(100, 8000, 0, 2)
    })
  );
}
let orderData = {
  date: [
    "20191001",
    "20191002",
    "20191003",
    "20191004",
    "20191005",
    "20191006",
    "20191007"
  ],
  data: List
};

let homeData = function() {
  return {
    code: 20000,
    result: {
      userData,
      tableData,
      videoData,
      barData,
      orderData
    }
  };
};

export default homeData;

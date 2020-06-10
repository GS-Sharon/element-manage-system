<template>
  <div id="home">
    <el-row :gutter="20">
      <el-col :span="8" class="left-content">
        <el-card shadow="hover" style="height: 290px">
          <div class="personBox">
            <img :src="img" alt="" />
            <div class="userInfo">
              <p class="name">Nick</p>
              <p class="role">超级管理员</p>
            </div>
          </div>
          <div class="login-info">
            <p>
              上次登陆时间：<span>{{ loadTime }}</span>
            </p>
            <p>
              上次登陆地点：<span>{{ loadAdress }}</span>
            </p>
          </div>
        </el-card>
        <el-card shadow="hover" style="height:522px" class="table">
          <el-table :data="tableData" style="width: 100%" height="100%">
            <el-table-column
              show-overflow-tooltip
              v-for="(label, prop) of tableLabels"
              :key="prop"
              :prop="prop"
              :label="label"
              width="120"
            >
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="16" class="right-content">
        <div class="numsBox">
          <el-card
            shadow="hover"
            v-for="(item, index) in countData"
            :key="index"
          >
            <i
              class="icon"
              :class="`el-icon-${item.icon}`"
              :style="{ backgroundColor: item.color }"
            ></i>
            <div class="detail">
              <div class="price">¥{{ item.price }}</div>
              <div class="text">{{ item.text }}</div>
            </div>
          </el-card>
        </div>
        <div class="gragh-top">
          <el-card shadow="hover" style="height: 280px">
            <div class="line-chart">
              <e-chart
                :chartData="chartData.orderData"
                :isAxisChart="true"
              ></e-chart>
            </div>
          </el-card>
        </div>
        <div class="gragh-bottom">
          <el-card shadow="hover">
            <div class="bar-chart">
              <e-chart
                :chartData="chartData.barData"
                :isAxisChart="true"
              ></e-chart>
            </div>
          </el-card>
          <el-card shadow="hover">
            <div class="pie-chart">
              <e-chart
                :chartData="chartData.videoData"
                :isAxisChart="false"
              ></e-chart>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import EChart from "../../components/Echarts";
export default {
  components: { EChart },
  data() {
    return {
      img: require("@/assets/images/headPhoto.jpeg"),
      loadTime: "2019-08-08",
      loadAdress: "北京",
      countData: [],
      tableData: [],
      tableLabels: {
        name: "课程",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买"
      },
      chartData: {
        videoData: {
          xAxis: [],
          series: []
        },
        barData: {
          xAxis: [],
          series: []
        },
        orderData: {
          xAxis: [],
          series: []
        }
      }
    };
  },
  created() {
    this.$http.get("/home/homeData").then(res => {
      if (res.code == 20000) {
        this.countData = res.result.userData;
        this.tableData = res.result.tableData;
        // 折线图数据
        this.chartData.orderData.xAxis = res.result.orderData.date;
        let orderKinds = Object.keys(res.result.orderData.data[0]);
        orderKinds.map(kind => {
          this.chartData.orderData.series.push({
            name: kind == "wechat" ? "微信小程序" : kind,
            type: "line",
            data: res.result.orderData.data.map(item => item[kind])
          });
        });
        // 柱状图
        this.chartData.barData.xAxis = res.result.barData.map(
          item => item.date
        );
        this.chartData.barData.series = Object.keys(res.result.barData[0])
          .filter(key => key != "date")
          .map(key => {
            return {
              name: key,
              type: "bar",
              data: res.result.barData.map(item => item[key])
            };
          });
        //  饼图
        this.chartData.videoData.series = [
          {
            name: "姓名",
            type: "pie",
            radius: "55%",
            center: ["40%", "50%"],
            data: res.result.videoData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ];
      }
    });
  }
};
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/home.scss";
</style>

<template>
  <div ref="echart"></div>
</template>
<script>
import * as echarts from "echarts";
export default {
  name: "EChart",
  props: {
    chartData: {
      type: Object,
      default() {
        return {
          xAxis: [],
          series: []
        };
      }
    },
    isAxisChart: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      instance: null,
      axisOption: {
        legend: {
          textStyle: {
            color: "#333"
          }
        },
        tooltip: {
          trigger: "axis"
        },
        xAxis: {
          type: "category",
          data: []
        },
        yAxis: {
          type: "value"
        },
        series: []
      },
      normalOption: {
        tooltip: {
          trigger: "item"
        },
        series: []
      }
    };
  },
  computed: {
    options() {
      return this.isAxisChart ? this.axisOption : this.normalOption;
    },
    isCollpase() {
      return this.$store.state.tab.isCollpase;
    }
  },
  watch: {
    chartData: {
      handler: function() {
        this.initChart();
      },
      deep: true
    },
    isCollpase() {
      setTimeout(() => {
        this.resizeChart();
      }, 300);
    }
  },
  methods: {
    initChart() {
      this.initChartData();
      if (!this.instance) {
        this.instance = echarts.init(this.$refs.echart, "", {
          height: "250px"
        });
      }
      this.instance.setOption(this.options);
    },
    initChartData() {
      if (this.isAxisChart) {
        this.options.xAxis.data = this.chartData.xAxis;
        this.options.series = this.chartData.series;
      } else {
        this.options.series = this.chartData.series;
      }
    },
    // 自适应：1.浏览器窗口发生变化； 2.左侧菜单折叠
    resizeChart() {
      if (this.instance) {
        this.instance.resize();
      }
    }
  },
  mounted() {
    //   组件挂载后进行监听窗口变化事件
    window.addEventListener("resize", this.resizeChart);
  },
  destroyed() {
    window.removeEventListener("resize", this.resizeChart);
  }
};
</script>
<style lang="scss" scoped></style>

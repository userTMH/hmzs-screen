<template>
  <VScaleScreen width="1920" height="1080">
    <div class="conent-left">
      <div class="section-one">
        <img
          class="img-header"
          src="https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/smartPark/%E5%A4%A7%E5%B1%8F%E5%88%87%E5%9B%BE/%E5%9B%AD%E5%8C%BA%E6%A6%82%E5%86%B5%402x.png"
          alt=""
        />
        <div class="icons-container">
          <div class="item">
            <div class="icons-item building-icon">
              <span class="number">
                {{ parkInfo.buildingTotal }}
              </span>
            </div>
            <span class="title">楼宇总数</span>
            <span class="unity">（栋）</span>
          </div>
          <div class="item">
            <div class="icons-item enterprise-icon">
              <span class="number">
                {{ parkInfo.enterpriseTotal }}
              </span>
            </div>
            <span class="title">入驻企业总数</span>
            <span class="unity">（家）</span>
          </div>
          <div class="item">
            <div class="icons-item car-icon">
              <span class="number">
                {{ parkInfo.parkingTotal }}
              </span>
            </div>
            <span class="title">车位总数</span>
            <span class="unity">（个）</span>
          </div>
          <div class="item">
            <div class="icons-item rod-icon">
              <span class="number">
                {{ parkInfo.chargePoleTotal }}
              </span>
            </div>
            <span class="title">一体杆总数</span>
            <span class="unity">（个）</span>
          </div>
        </div>
      </div>
      <div class="section-two">
        <img
          class="img-header"
          src="https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/smartPark/%E5%A4%A7%E5%B1%8F%E5%88%87%E5%9B%BE/%E5%9B%AD%E5%8C%BA%E5%B9%B4%E5%BA%A6%E6%94%B6%E5%85%A5%E5%88%86%E6%9E%90%402x.png"
          alt=""
        />
        <div class="bar-chart-titile">
          <span>单位：元</span>
          <div>
            <span class="bar-icon blue-bar-icon"></span>
            <span class="bar-icon red-bar-icon"></span>
            收入情况
          </div>
        </div>
        <div v-if="parkIncomeList" class="bar-chart" id="barChart"></div>
      </div>
      <div class="section-three">
        <img
          alt="logo"
          class="img-header"
          src="https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/smartPark/%E5%A4%A7%E5%B1%8F%E5%88%87%E5%9B%BE/%E5%9B%AD%E5%8C%BA%E4%BA%A7%E4%B8%9A%E5%88%86%E5%B8%83%402x.png"
        />
        <div class="pie-chart" id="pieChart"></div>
      </div>
    </div>
  </VScaleScreen>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { infoApi } from "../api/big-screen.js";
import * as echarts from "echarts";
import VScaleScreen from "v-scale-screen";

//园区概况数据
const parkInfo = ref({});
//柱状图数据
const parkIncomeList = ref({});
//饼状图数据
const pieChartData = ref([]);

const getInfo = async () => {
  const res = await infoApi();
  console.log(res);
  parkInfo.value = res.data.data.base;
  parkIncomeList.value = res.data.data.parkIncome;
  pieChartData.value = res.data.data.parkIndustry;
};
getInfo();

const initBarChart = () => {
  const { xMonth, yIncome } = parkIncomeList.value;

  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    grid: {
      left: "0px",
      right: "0px",
      bottom: "0px",
      top: "10px",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        data: xMonth,
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        // name: "Direct",
        type: "bar",
        barWidth: "10px",
        data: yIncome.map((item, index) => {
          const color =
            index % 2 === 0
              ? new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0.23, color: "#74c0f8" },
                  { offset: 1, color: "rgba(116,192,248,0.00)" },
                ])
              : new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0.23, color: "#ff7152" },
                  { offset: 1, color: "rgba(255,113,82,0.00)" },
                ]);
          return { value: item, itemStyle: { color } };
        }),
      },
    ],
    textStyle: {
      color: "#B4C0CC",
    },
  };
  var chartDom = document.getElementById("barChart");
  var myChart = echarts.init(chartDom);
  option && myChart.setOption(option);
};

const initPieChart = () => {
  var chartDom = document.getElementById("pieChart");
  var myChart = echarts.init(chartDom);
  var option;

  option = {
    color: ["#00B2FF", "#2CF2FF", "#892CFF", "#FF624D", "#FFCF54", "#86ECA2"],
    tooltip: {
      trigger: "item",
    },
    legend: {
      bottom: "0px",
      left: "center",
      textStyle: {
        color: "#B4C0CC",
      },
      icon: "rect",
      itemWidth: 10,
      itemHeight: 10,
    },
    series: [
      {
        name: "园区产业分析",
        type: "pie",
        radius: ["65%", "70%"],
        avoidLabelOverlap: false,
        center: ["50%", "40%"],
        label: {
          show: false,
          position: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        emphasis: {
          label: {
            show: false,
            fontSize: 40,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: pieChartData.value,
      },
    ],
  };

  option && myChart.setOption(option);
};

onMounted(async () => {
  await getInfo();
  initBarChart();
  initPieChart();
});
</script>
<style lang="scss" scoped>
.conent-left {
  position: absolute;
  top: 0;
  left: 0;
  width: 500px;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: linear-gradient(
    to left,
    rgba(0, 6, 15, 0) 0%,
    rgba(0, 6, 15, 0) 20%,
    rgba(0, 0, 0, 0.4) 30%,
    rgba(0, 0, 0, 0.6) 40%,
    rgba(1, 4, 11, 1) 70%,
    #04070d 100%
  );

  .img-header {
    width: 100%;
    height: 30px;
  }
}
.section-one {
  flex-basis: 25%;
  .icons-container {
    display: flex;
    justify-content: space-between;
    padding: 20px 0;

    .item {
      text-align: center;
      display: flex;
      flex-direction: column;
      flex: 1;

      .icons-item {
        height: 80px;
        position: relative;

        .number {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          font-size: 18px;
          font-family: FontquanXinYiGuanHeiTi, FontquanXinYiGuanHeiTi-Regular;
          color: #ffffff;
        }
      }

      .building-icon {
        background: url("@/assets/building-icon.png") no-repeat 50% 0 / contain;
      }

      .enterprise-icon {
        background: url("@/assets/enterprise-icon.png") no-repeat 50% 0 /
          contain;
      }

      .rod-icon {
        background: url("@/assets/rod-icon.png") no-repeat 50% 0 / contain;
      }

      .car-icon {
        background: url("@/assets/car-icon.png") no-repeat 50% 0 / contain;
      }

      .title,
      .unity {
        font-size: 14px;
        color: #cdd7e1;
      }

      .title {
        margin-top: 8px;
      }
    }
  }
}
.section-two {
  flex-basis: 35%;
  // margin-top: 50px;
  color: #fff;
  .bar-chart-titile {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .blue-bar-icon {
      width: 20px;
      height: 10px;
      background-image: linear-gradient(to right, #3ea9ff, rgb(31, 30, 30));
      display: inline-block;
    }
    .red-bar-icon {
      width: 20px;
      height: 10px;
      background-image: linear-gradient(to right, red, rgb(31, 30, 30));
      display: inline-block;
      margin-left: 10px;
    }
  }
  .bar-chart {
    width: 100%;
    height: calc(100% - 30px);
  }
}
.section-three {
  flex-basis: 35%;
  color: #fff;
  .pie-chart {
    width: 80%;
    height: calc(100% - 30px);
    margin: auto;
  }
}
</style>

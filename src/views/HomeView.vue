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
    <div class="model-container">
      <LoadingComponent :loading="showLoading"></LoadingComponent>
      <canvas class="canvas-3d" ref="ref3d"></canvas>
      <div
        id="t"
        :class="{ animate__zoomIn: modelStatus }"
        :style="{ left: x + 'px', top: y + 'px' }"
        class="tip animate__animated"
      >
        <span class="close" @mousedown.stop="close"></span>
        <div class="header">{{ buildingInfo?.name }}</div>
      </div>
    </div>
  </VScaleScreen>
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import VScaleScreen from "v-scale-screen";
import { userInfo, userBarChart, userPieChart, user3dModel } from "./component";
import { Application } from "@splinetool/runtime";
import LoadingComponent from "../../src/components/LoadingComponent.vue";
import { getAreaInfoApi, getBuildingInfoApi } from "@/api/big-screen";

//获取收据
const { parkInfo, parkIncomeList, pieChartData, getInfo } = userInfo();
//柱状图
const { initBarChart } = userBarChart(parkIncomeList);
//饼图
const { initPieChart } = userPieChart(pieChartData);
//3D模型
// const { init3dModel } = user3dModel();
//loading加载状态
const showLoading = ref(false);
const showModel = ref(false);

let x = ref();
let y = ref();
const buildingInfo = ref({});
const areaInfo = ref({});

//#region
// 初始化3d模型
const publisPath = "https://fe-hmzs.itheima.net";
const ref3d = ref(null);
const init3dModel = () => {
  showLoading.value = true;
  let spline = new Application(ref3d.value);
  spline.load(`${publisPath}/scene.splinecode`).then(() => {
    showLoading.value = false;

    spline.addEventListener("mouseDown", (e) => {
      x.value = "";
      y.value = "";
      // console.log("e", e);
      const params = e.target;
      // console.log("obj", params);

      buildingInfo.value = {};
      areaInfo.value = {};

      if (params.name.indexOf("办公楼") !== -1) {
        // console.log("楼宇");
        // console.log("--->", params.id);
        getBuildingInfo(params.id);
        window.addEventListener("mousedown", (e) => {
          x.value = e.offsetX;
          y.value = e.offsetY;
        });
      } else if (params.name.indexOf("停车场") !== -1) {
        // console.log("停车场");
        getAreaInfo(params.id);
        window.addEventListener("mousedown", (e) => {
          x.value = e.offsetX;
          y.value = e.offsetY;
        });
      }

      showModel.value = true;
    });
  });
};
//楼宇
const getBuildingInfo = async (id) => {
  try {
    const res = await getBuildingInfoApi(id);
    console.log("res", res);
    buildingInfo.value = res.data;
  } catch (e) {
    console.log(e);
  }
};
//停车场
const getAreaInfo = async (id) => {
  try {
    const res = await getAreaInfoApi(id);
    console.log("area", res);
    areaInfo.value = res.data;
  } catch (e) {
    console.log(e);
  }
};
//#endregion
const modelStatus = computed(() => {
  if (x.value && y.value) {
    return true;
  } else {
    return false;
  }
});

const close = () => {
  x.value = "";
  y.value = "";

  console.log(x.value, y.value);
};

onMounted(async () => {
  await getInfo();
  initBarChart();
  initPieChart();
  init3dModel();
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
.model-container {
  width: 100%;
  height: 100%;
  background: black;
  .tip {
    width: 281px;
    height: 140px;
    background: url("@/assets/modal-bg.png") no-repeat;
    background-size: cover;
    color: #fff;
    position: absolute;

    .close {
      position: absolute;
      right: 10px;
      top: 10px;
      width: 20px;
      height: 20px;
      background: url("@/assets/modal-close.png") no-repeat;
      background-size: cover;
      cursor: pointer;
    }
  }
}
</style>

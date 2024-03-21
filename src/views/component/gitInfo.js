import { ref } from "vue";
import { infoApi } from "../../api/big-screen.js";

export const userInfo = () => {
  //园区概况数据
  const parkInfo = ref({});
  //柱状图数据
  const parkIncomeList = ref({});
  //饼状图数据
  const pieChartData = ref([]);

  const getInfo = async () => {
    const res = await infoApi();
    // console.log(res);
    parkInfo.value = res.data.data.base;
    parkIncomeList.value = res.data.data.parkIncome;
    pieChartData.value = res.data.data.parkIndustry;
  };
  return {
    parkInfo,
    parkIncomeList,
    pieChartData,
    getInfo,
  };
};

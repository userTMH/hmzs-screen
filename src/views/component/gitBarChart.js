import * as echarts from "echarts";

export const userBarChart = (parkIncomeList) => {
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
          splitLine: {
            show: false,
          },
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
  return { initBarChart };
};

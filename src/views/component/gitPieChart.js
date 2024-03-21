import * as echarts from "echarts";

export const userPieChart = (pieChartData) => {
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
  return { initPieChart };
};

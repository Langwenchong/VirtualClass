<template>
  <div id="chart">
    <div id="chart-wrapper"></div>
  </div>
</template>


<script>
export default {
  mounted() {
    var chartDom = document.getElementById("chart-wrapper");
    var myChart = echarts.init(chartDom);
    var option;

    option = {
      title: {
        text: "学分成绩划分比例图",
        subtext: "根据进度动态调整",
        left: "center",
        color: "#8b949e"
      },
      tooltip: {
        trigger: "item"
      },
      legend: {
        orient: "vertical",
        left: "left",
        bottom: "bottom"
      },
      series: [
        {
          name: "学分比例",
          type: "pie",
          radius: "50%",
          data: [
            { value: 1048, name: "讨论活跃" },
            { value: 735, name: "文件使用" },
            { value: 580, name: "文献阅读" },
            { value: 484, name: "分享资源" },
            { value: 300, name: "答题精度" }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        }
      ]
    };

    option && myChart.setOption(option);
  },
  name: "chart"
};
</script>

<style scoped>
#chart {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
#chart-wrapper {
  width: 95%;
  height: 90%;
}
</style>
<template>
  <div id="radar">
    <div id="radar-wrapper"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    var chartDom = document.getElementById("radar-wrapper");
    var myChart = echarts.init(chartDom);
    var option;

    option = {
      radar: {
        shape: "circle",
        indicator: [
          { name: "话题热度", max: 6500 },
          { name: "资源价值", max: 16000 },
          { name: "贡献人数", max: 30000 },
          { name: "知识范围", max: 38000 },
          { name: "访客流量", max: 52000 }
        ]
      },
      series: [
        {
            color: "#55efc4",
          type: "radar",
          areaStyle: {},
          data: [
            {
              value: [5000, 14000, 28000, 26000, 42000, 21000]
            }
          ]
        }
      ]
    };

    option && myChart.setOption(option);
  },
  name: "radar"
};
</script>


<style scoped>
#radar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
#radar-wrapper {
  width: 95%;
  height: 90%;
}
</style>
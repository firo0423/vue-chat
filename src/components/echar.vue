<template>
  <div
    id="mywordcloud"
    :style="{ width: '100%', height: '300px' }"
    :data="worddata"
    ref="echar"
  ></div>
</template>

<script>
import * as echarts from "echarts";
import "echarts-wordcloud/dist/echarts-wordcloud";
import "echarts-wordcloud/dist/echarts-wordcloud.min";
export default {
  name: "echar",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      worddata: [
        {
          name: "美少女万华镜",
          value: 15000,
        },
        {
          name: "Mirro",
          value: 7500,
        },
        {
          name: "沙滩排球",
          value: 9386,
        },
        {
          name: "爱上火车",
          value: 7500,
        },
        {
          name: "碧蓝航线",
          value: 7500,
        },
        {
          name: "巧克力与香兰子",
          value: 6500,
        },
        {
          name: "千恋万花",
          value: 6500,
        },
        {
          name: "柚子社",
          value: 6000,
        },
        {
          name: "NEKOPARA",
          value: 4500,
        },
        {
          name: "马头社去死",
          value: 3800,
        },
        {
          name: "玛丽罗斯",
          value: 3000,
        },
        {
          name: "哔咔",
          value: 2500,
        },
        {
          name: "多娜多娜一起做坏事吧",
          value: 1800,
        },
        {
          name: "原神臭弟弟",
          value: 1700,
        },
        {
          name: "ASOUL",
          value: 1600,
        },
        {
          name: "嘉然小姐我是你的狗啊",
          value: 1500,
        },
        {
          name: "夹心糖",
          value: 1200,
        },
        {
          name: "死或生-沙滩排球",
          value: 1000,
        },
      ],
    };
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$refs.echar);
      console.log("lll");
      const option = {
        title: {
          text: "",
          x: "center",
        },
        backgroundColor: "#eeeeee",
        // tooltip: {
        //   pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
        // },
        series: [
          {
            type: "wordCloud",
            //用来调整词之间的距离
            gridSize: 10,
            //用来调整字的大小范围
            // Text size range which the value in data will be mapped to.
            // Default to have minimum 12px and maximum 60px size.
            sizeRange: [14, 60],
            // Text rotation range and step in degree. Text will be rotated randomly in range [-90,                                                                             90] by rotationStep 45
            //用来调整词的旋转方向，，[0,0]--代表着没有角度，也就是词为水平方向，需要设置角度参考注释内容
            // rotationRange: [-45, 0, 45, 90],
            // rotationRange: [ 0,90],
            rotationRange: [0, 0],
            //随机生成字体颜色
            // maskImage: maskImage,
            textStyle: {
              normal: {
                color: function () {
                  return (
                    "rgb(" +
                    Math.round(Math.random() * 255) +
                    ", " +
                    Math.round(Math.random() * 255) +
                    ", " +
                    Math.round(Math.random() * 255) +
                    ")"
                  );
                },
              },
            },
            //位置相关设置
            // Folllowing left/top/width/height/right/bottom are used for positioning the word cloud
            // Default to be put in the center and has 75% x 80% size.
            left: "center",
            top: "center",
            right: null,
            bottom: null,
            width: "200%",
            height: "200%",
            //数据
            data: this.worddata,
          },
        ],
      };
      this.chart.setOption(option);
    },
  },
};
</script>

<style>
</style>
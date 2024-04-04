<script lang="ts" setup>
import * as echarts from 'echarts'

defineOptions({ name: 'EchartsView' })

const echartsRef = ref(null)
function initEcharts() {
  var myChart = echarts.init(echartsRef.value)

  var option = {
    title: {
      text: 'ECharts 入门示例'
    },
    grid: {},
    dataZoom: [
      // { type: 'slider', startValue: 0, endValue: 2, show: false }
    ],
    tooltip: {},
    legend: {
      data: ['销量']
    },
    xAxis: {
      data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    },
    yAxis: {},
    series: [
      {
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }
    ]
  }

  myChart.setOption(option)
}
onMounted(() => {
  initEcharts()
})
</script>

<template>
  <div ref="echartsRef" class="w-400px h-400px bg-blue-200"></div>
</template>

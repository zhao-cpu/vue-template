<script lang="ts" setup>
import * as echarts from 'echarts'

defineOptions({ name: 'DataZoom' })

const myChart = shallowRef()
const echartsRef = ref(null)
function initEcharts() {
  myChart.value = echarts.init(echartsRef.value)

  var option = {
    title: {
      text: 'dataZoom'
    },
    grid: {},
    dataZoom: [{ type: 'inside', startValue: 0, endValue: 2 }],
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

  myChart.value.setOption(option)

  setInterval(() => {
    if (option.dataZoom[0].endValue == 6) {
      option.dataZoom[0].endValue = 2
      option.dataZoom[0].startValue = 0
    } else {
      option.dataZoom[0].endValue = option.dataZoom[0].endValue + 1
      option.dataZoom[0].startValue = option.dataZoom[0].startValue + 1
    }
    myChart.value.setOption(option)
  }, 3000)
}
onMounted(() => {
  initEcharts()
})
</script>

<template>
  <div ref="echartsRef" class="w-20vw h-400px bg-blue-200"></div>
</template>

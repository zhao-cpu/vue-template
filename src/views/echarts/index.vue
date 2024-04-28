<script lang="ts" setup>
import * as echarts from 'echarts'

defineOptions({ name: 'EchartsView' })

const myChart = shallowRef()
const echartsRef = ref(null)
function initEcharts() {
  myChart.value = echarts.init(echartsRef.value)

  var option = {
    title: {
      text: '饼图程序调用高亮示例',
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: [
          { value: 335, name: '直接访问' },
          { value: 310, name: '邮件营销' },
          { value: 234, name: '联盟广告' },
          { value: 135, name: '视频广告' },
          { value: 1548, name: '搜索引擎' }
        ],
        emphasis: {
          scale: false
        }
      }
    ]
  }

  myChart.value.setOption(option)

  let currentIndex = -1

  // setInterval(function () {
  //   var dataLen = option.series[0].data.length
  //   // 取消之前高亮的图形
  //   myChart.value.dispatchAction({
  //     type: 'downplay',
  //     seriesIndex: 0,
  //     dataIndex: currentIndex
  //   })
  //   currentIndex = (currentIndex + 1) % dataLen
  //   // 高亮当前图形
  //   myChart.value.dispatchAction({
  //     type: 'highlight',
  //     dataIndex: currentIndex
  //   })
  //   // 显示 tooltip
  //   myChart.value.dispatchAction({
  //     type: 'showTip',
  //     seriesIndex: 0,
  //     dataIndex: currentIndex
  //   })
  // }, 1000)
}
onMounted(() => {
  initEcharts()
})
</script>

<template>
  <div ref="echartsRef" class="w-40vw h-400px bg-blue-200"></div>
</template>

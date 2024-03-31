<script lang="ts" setup>
import * as Cesium from 'cesium'
import 'cesium/Build/Cesium/Widgets/widgets.css'
// import h337 from 'heatmap.js'

defineOptions({ name: 'CesiumView' })

Cesium.Ion.defaultAccessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlYWYzNzgwZi1lY2YwLTRhMjEtOTllZS03NGIyN2I1ODBiZjUiLCJpZCI6MjAyNDgwLCJpYXQiOjE3MTA2ODgyODZ9.3iGh58C4jmK6fXdt4PX6UkxVYp8l9qLbllYsttuOYrU'

const viewer = ref<Cesium.Viewer | null>(null)

onMounted(() => {
  // 创建 viewer
  viewer.value = new Cesium.Viewer('cesiumContainer', {})

  let latMin = 31.992258868622746
  let latMax = 31.993356298249353
  let lonMin = 116.97645058483244
  let lonMax = 116.97896087922374

  const rectangle = createRectangle(
    viewer.value,
    [lonMin, latMin, lonMax, latMax],
    createHeatMap(getData(1000).max, getData(1000).data)
  )
  viewer.value.zoomTo(rectangle)
})

// 生成len个随机数据
function getData(len) {
  //构建一些随机数据点
  var points = []
  var max = 0
  var width = 1000
  var height = 1000
  while (len--) {
    var val = Math.floor(Math.random() * 1000)
    max = Math.max(max, val)
    var point = {
      x: Math.floor(Math.random() * width),
      y: Math.floor(Math.random() * height),
      value: val
    }
    points.push(point)
  }
  return { max: max, data: points }
}

// 创建正方形 绑定热力图
function createRectangle(viewer, coordinate, heatMap) {
  const rectangle = viewer.entities.add({
    name: 'Rotating rectangle with rotating texture coordinate',
    show: true,
    rectangle: {
      coordinates: Cesium.Rectangle.fromDegrees(
        coordinate[0],
        coordinate[1],
        coordinate[2],
        coordinate[3]
      ),
      material: heatMap._renderer.canvas // 核心语句，填充热力图
    }
  })
  return rectangle
}

// 创建热力图
function createHeatMap(max, data) {
  // 创建元素
  var heatDoc = document.createElement('div')
  heatDoc.setAttribute('style', 'width:1000px;height:1000px;margin: 0px;display: none;')
  document.body.appendChild(heatDoc)
  // 创建热力图对象
  var heatmap = h337.create({
    container: heatDoc,
    radius: 20,
    maxOpacity: 0.5,
    minOpacity: 0,
    blur: 0.75,
    gradient: {
      '0.9': 'red',
      '0.8': 'orange',
      '0.7': 'yellow',
      '0.5': 'blue',
      '0.3': 'green'
    }
  })
  // 添加数据
  heatmap.setData({
    max: max,
    data: data
  })
  return heatmap
}
</script>

<template>
  <div id="cesiumContainer"></div>
</template>

<style lang="scss" scoped></style>

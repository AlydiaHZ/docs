<script setup lang="ts">
import { ref, computed } from 'vue'
import { data } from './data'

const width = 600
const height = 400

// 生成数据（你也可以换成外部传入）
const k = 4
const colors = ['red', 'green', 'blue', 'orange']

const labels = ref<number[][]>([])
const history = ref<number[][][]>([])
const currentStepIndex = ref(0)

// 缩放
const gap = .5
const xMin = Math.min(...data.map(p => p[0])) - gap
const xMax = Math.max(...data.map(p => p[0])) + gap
const yMin = Math.min(...data.map(p => p[1])) - gap
const yMax = Math.max(...data.map(p => p[1])) + gap
const scaleX = (x: number) => ((x - xMin) / (xMax - xMin)) * width
const scaleY = (y: number) => height - ((y - yMin) / (yMax - yMin)) * height

// 颜色获取
const getColor = (idx: number): string => colors[idx] ?? '#999'

// 判断当前是选点还是分配阶段
const stepIsCenter = computed(() => currentStepIndex.value % 2 === 0)

// KMeans 初始化
function kmeans() {
  history.value = []
  labels.value = []

  let centers: number[][] = []

  const indices: number[] = []
  while (centers.length < k) {
    const idx: number = Math.floor(Math.random() * data.length)
    if (!indices.includes(idx)) {
      centers.push(data[idx])
      indices.push(idx)
    }
  }
  history.value.push(deepClone(centers))

  for (let step = 0; step < 7; step++) {
    const label = data.map(point => {
      const dists = centers.map(c => distance(point, c))
      return dists.indexOf(Math.min(...dists))
    })
    labels.value.push(label)

    const newCenters: number[][] = []
    for (let i = 0; i < k; i++) {
      const clusterPoints = data.filter((_, idx) => label[idx] === i)
      const mean = clusterPoints.length
        ? [
          clusterPoints.reduce((sum, p) => sum + p[0], 0) / clusterPoints.length,
          clusterPoints.reduce((sum, p) => sum + p[1], 0) / clusterPoints.length,
        ]
        : centers[i]
      newCenters.push(mean)
    }

    history.value.push(deepClone(newCenters))
    centers = newCenters
  }
}

// 深拷贝
function deepClone<T>(arr: T): T {
  return structuredClone(arr)
}

// 欧氏距离
function distance(a: number[], b: number[]): number {
  return Math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2)
}

// 控制按钮
function nextStep() {
  if (currentStepIndex.value < history.value.length - 1) currentStepIndex.value++
}
function prevStep() {
  if (currentStepIndex.value > 0) currentStepIndex.value--
}
function reset() {
  currentStepIndex.value = 0
  kmeans()
}

// 初始化一次
kmeans()
</script>

<template>
  <div>
    <!-- 左侧说明 -->
    <div>
      <p :style="{ fontWeight: stepIsCenter ? 'bold' : 'normal' }">1. 选取中心点</p>
      <p :style="{ fontWeight: !stepIsCenter ? 'bold' : 'normal' }">2. 分配每个点</p>
    </div>

    <!-- 右侧绘图 -->
    <div>
      <svg :width="width" :height="height" style="border: 1px solid #ccc;">
        <!-- 点 -->
        <circle v-for="(point, index) in data" :key="'point-' + index" :cx="scaleX(point[0])" :cy="scaleY(point[1])"
          r="4" :fill="getColor(labels[currentStepIndex - 1]?.[index])" />

        <!-- 移动轨迹 -->
        <line v-for="(c, idx) in k" v-if="currentStepIndex > 0" :key="'line-' + idx + '-' + currentStepIndex"
          :x1="scaleX(history[currentStepIndex - 1][idx][0])" :y1="scaleY(history[currentStepIndex - 1][idx][1])"
          :x2="scaleX(history[currentStepIndex][idx][0])" :y2="scaleY(history[currentStepIndex][idx][1])"
          :stroke="colors[idx]" stroke-dasharray="4" />

        <!-- 中心点 -->
        <circle v-for="(center, idx) in history[currentStepIndex]" :key="'center-' + idx" :cx="scaleX(center[0])"
          :cy="scaleY(center[1])" r="8" :fill="colors[idx]" stroke="black" />
      </svg>

      <!-- 控制按钮 -->
      <div style="margin-top: 10px;">
        <button @click="prevStep" :disabled="currentStepIndex === 0">上一步</button>
        <button @click="nextStep" :disabled="currentStepIndex === history.length - 1">下一步</button>
        <button @click="reset">重置</button>
      </div>
    </div>
  </div>
</template>
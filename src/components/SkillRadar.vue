<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as echarts from 'echarts'

interface RadarDataPoint {
  name: string
  value: number
}

const props = withDefaults(
  defineProps<{
    data: RadarDataPoint[]
  }>(),
  { data: () => [] }
)

const chartRef = ref<HTMLDivElement | null>(null)
let chartInstance: echarts.ECharts | null = null

const initChart = () => {
  if (!chartRef.value || !props.data.length) return

  chartInstance = echarts.init(chartRef.value)

  const option: echarts.EChartsOption = {
    backgroundColor: 'transparent',
    radar: {
      indicator: props.data.map((d) => ({
        name: d.name,
        max: 100,
      })),
      shape: 'circle',
      splitArea: {
        areaStyle: {
          color: [
            'rgba(255, 255, 255, 0.02)',
            'rgba(255, 255, 255, 0.04)',
            'rgba(255, 255, 255, 0.06)',
            'rgba(255, 255, 255, 0.08)',
          ],
        },
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.06)',
        },
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.06)',
        },
      },
      axisName: {
        color: '#8892b0',
        fontFamily: 'JetBrains Mono, Fira Code, monospace',
      },
    },
    series: [
      {
        type: 'radar',
        data: [
          {
            value: props.data.map((d) => d.value),
            areaStyle: {
              color: 'rgba(0, 240, 255, 0.3)',
            },
            lineStyle: {
              color: '#00f0ff',
            },
            itemStyle: {
              color: '#00f0ff',
            },
          },
        ],
        symbol: 'circle',
        symbolSize: 6,
        animation: true,
        animationDuration: 1000,
        animationEasing: 'cubicOut',
      },
    ],
  }

  chartInstance.setOption(option)
}

const handleResize = () => {
  chartInstance?.resize()
}

watch(
  () => props.data,
  () => {
    if (chartInstance && props.data.length) {
      initChart()
    }
  },
  { deep: true }
)

onMounted(() => {
  initChart()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  chartInstance?.dispose()
  chartInstance = null
})
</script>

<template>
  <div ref="chartRef" class="skill-radar" />
</template>

<style lang="scss" scoped>
.skill-radar {
  width: 100%;
  height: 400px;

  @media (max-width: $bp-md) {
    height: 300px;
  }
}
</style>

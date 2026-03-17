<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProjectCard from '@/components/ProjectCard.vue'
import { projects } from '@/data/projects'

gsap.registerPlugin(ScrollTrigger)

const wrapperRef = ref<HTMLElement | null>(null)
const containerRef = ref<HTMLElement | null>(null)
const currentIndex = ref(0)

const CARD_WIDTH_VW = 85
const CARD_MAX_WIDTH = 1000
const CARD_GAP = 32 // $space-xl

const totalScrollWidth = computed(() => {
  const count = projects.length
  if (count <= 1) return 0
  const vw = typeof window !== 'undefined' ? window.innerWidth : 1024
  const cardWidth = Math.min(vw * (CARD_WIDTH_VW / 100), CARD_MAX_WIDTH)
  return (count - 1) * (cardWidth + CARD_GAP)
})

const counterText = computed(() => {
  const n = String(projects.length).padStart(2, '0')
  const i = String(currentIndex.value + 1).padStart(2, '0')
  return `${i} / ${n}`
})

let ctx: gsap.Context | null = null

onMounted(() => {
  const wrapper = wrapperRef.value
  const container = containerRef.value
  if (!wrapper || !container) return

  const scrollWidth = totalScrollWidth.value

  ctx = gsap.context(() => {
    gsap.set(container, { x: 0 })

    gsap.to(container, {
      x: -scrollWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: wrapper,
        pin: true,
        scrub: 1,
        end: () => `+=${scrollWidth}`,
        onUpdate: (self) => {
          const progress = self.progress
          const index = Math.min(
            Math.floor(progress * projects.length),
            projects.length - 1
          )
          currentIndex.value = Math.max(0, index)
        },
      },
    })
  }, wrapper)
})

onUnmounted(() => {
  ctx?.revert()
  ScrollTrigger.getAll().forEach((t) => t.kill())
})
</script>

<template>
  <section id="projects">
    <div ref="wrapperRef" class="projects-pin">
      <div class="projects-header">
        <p class="section-label">// 03. PROJECTS</p>
        <h2 class="section-title">项目作品集</h2>
        <p class="projects-subtitle">滑动探索我参与的核心项目</p>
      </div>

      <div ref="containerRef" class="projects-container">
        <ProjectCard
          v-for="project in projects"
          :key="project.id"
          :project="project"
          class="projects-card"
        />
      </div>

      <div class="projects-counter">{{ counterText }}</div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
#projects {
  position: relative;
}

.projects-pin {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: $space-xl;
}

.projects-header {
  position: absolute;
  top: $space-2xl;
  left: $space-xl;
  right: $space-xl;
  z-index: $z-content;
  pointer-events: none;
}

.projects-subtitle {
  font-size: $font-size-sm;
  color: $color-text-secondary;
  margin-top: $space-sm;
}

.projects-container {
  display: flex;
  gap: $space-xl;
  padding: 0 $space-xl;
  width: max-content;
  will-change: transform;
}

.projects-card {
  flex-shrink: 0;
}

.projects-counter {
  position: absolute;
  bottom: $space-2xl;
  right: $space-xl;
  font-family: $font-mono;
  font-size: $font-size-sm;
  color: $color-text-muted;
  z-index: $z-content;
}
</style>

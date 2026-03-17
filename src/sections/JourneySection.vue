<script setup lang="ts">
import { reactive, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = reactive({
  years: { value: 0 },
  projects: { value: 0 },
  codeLines: { value: 0 },
  coffees: { value: 0 },
})

const milestones = [
  { year: '2019', title: '初入前端', desc: '开始前端开发之旅' },
  { year: '2020', title: 'Vue专项深耕', desc: '深入 Vue 生态与工程化' },
  { year: '2022', title: '技术Lead', desc: '带领团队攻坚核心项目' },
  { year: '2024', title: '架构方向', desc: '负责前端架构与性能优化' },
  { year: '2026', title: '独立开发', desc: '探索产品与独立开发' },
]

let scrollTriggers: ScrollTrigger[] = []

onMounted(() => {
  // Intro paragraph fade-in
  const introTween = gsap.from('.journey-intro', {
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.journey-intro',
      start: 'top 85%',
      end: 'top 60%',
      toggleActions: 'play none none none',
    },
  })
  if (introTween.scrollTrigger) scrollTriggers.push(introTween.scrollTrigger)

  // Stats counter animation
  const statsTween = gsap.from('.journey-stats', {
    opacity: 0,
    y: 40,
    duration: 0.6,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.journey-stats',
      start: 'top 88%',
      toggleActions: 'play none none none',
    },
  })
  if (statsTween.scrollTrigger) scrollTriggers.push(statsTween.scrollTrigger)

  // Count-up animations when stats are visible
  const countTrigger = ScrollTrigger.create({
    trigger: '.journey-stats',
    start: 'top 80%',
    onEnter: () => {
      gsap.to(stats.years, { value: 6, duration: 2, ease: 'power2.out', snap: { value: 1 } })
      gsap.to(stats.projects, { value: 20, duration: 2, ease: 'power2.out', snap: { value: 1 }, delay: 0.1 })
      gsap.to(stats.codeLines, { value: 100000, duration: 2.2, ease: 'power2.out', snap: { value: 1000 }, delay: 0.2 })
      gsap.to(stats.coffees, { value: 5000, duration: 2, ease: 'power2.out', snap: { value: 1 }, delay: 0.3 })
    },
  })
  scrollTriggers.push(countTrigger)

  // Timeline entries stagger from left
  const timelineTween = gsap.from('.journey-timeline-item', {
    opacity: 0,
    x: -60,
    duration: 0.7,
    stagger: 0.15,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.journey-timeline',
      start: 'top 82%',
      toggleActions: 'play none none none',
    },
  })
  if (timelineTween.scrollTrigger) scrollTriggers.push(timelineTween.scrollTrigger)
})

onUnmounted(() => {
  scrollTriggers.forEach((st) => st.kill())
  scrollTriggers = []
})

function formatCodeLines(val: number): string {
  if (val >= 100000) return '100K+'
  if (val >= 1000) return `${Math.floor(val / 1000)}K+`
  return `${Math.floor(val)}+`
}
</script>

<template>
  <section id="journey" class="section journey-section">
    <div class="section-inner">
      <span class="section-label">// 01. JOURNEY</span>
      <h2 class="section-title">我的旅程</h2>

      <p class="journey-intro">
        从初入前端到独立开发，一路积累技术与产品思维。用代码解决问题，用产品创造价值。
      </p>

      <div class="journey-stats">
        <div class="journey-stat-card">
          <span class="journey-stat-value">{{ Math.floor(stats.years.value) }}+</span>
          <span class="journey-stat-label">年经验</span>
        </div>
        <div class="journey-stat-card">
          <span class="journey-stat-value">{{ Math.floor(stats.projects.value) }}+</span>
          <span class="journey-stat-label">项目</span>
        </div>
        <div class="journey-stat-card">
          <span class="journey-stat-value">{{ formatCodeLines(stats.codeLines.value) }}</span>
          <span class="journey-stat-label">代码行</span>
        </div>
        <div class="journey-stat-card">
          <span class="journey-stat-value">{{ Math.floor(stats.coffees.value) }}+</span>
          <span class="journey-stat-label">杯咖啡</span>
        </div>
      </div>

      <div class="journey-timeline">
        <div class="journey-timeline-line" />
        <div
          v-for="item in milestones"
          :key="item.year"
          class="journey-timeline-item"
        >
          <div class="journey-timeline-node" />
          <div class="journey-timeline-content">
            <span class="journey-timeline-year">{{ item.year }}</span>
            <h3 class="journey-timeline-title">{{ item.title }}</h3>
            <p class="journey-timeline-desc">{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.journey-section {
  background: $color-bg-secondary;
}

.journey-intro {
  font-size: $font-size-base;
  color: $color-text-secondary;
  line-height: 1.8;
  max-width: 600px;
  margin-bottom: $space-3xl;
}

.journey-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: $space-lg;
  margin-bottom: $space-4xl;

  @media (max-width: $bp-lg) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: $bp-sm) {
    grid-template-columns: 1fr;
  }
}

.journey-stat-card {
  background: $color-bg-card;
  border: 1px solid $color-border;
  border-radius: 12px;
  padding: $space-xl;
  text-align: center;
  position: relative;
  overflow: hidden;
  transition: border-color $transition-fast;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, $color-accent-cyan, transparent);
    opacity: 0;
    transition: opacity $transition-fast;
  }

  &:hover {
    border-color: rgba($color-accent-cyan, 0.2);

    &::before {
      opacity: 0.6;
    }
  }
}

.journey-stat-value {
  display: block;
  font-family: $font-display;
  font-size: $font-size-2xl;
  font-weight: 700;
  color: $color-accent-cyan;
  margin-bottom: $space-xs;

  @media (max-width: $bp-md) {
    font-size: $font-size-xl;
  }
}

.journey-stat-label {
  font-size: $font-size-sm;
  color: $color-text-muted;
}

.journey-timeline {
  position: relative;
  padding-left: $space-2xl;

  @media (max-width: $bp-sm) {
    padding-left: $space-xl;
  }
}

.journey-timeline-line {
  position: absolute;
  left: 6px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(
    180deg,
    $color-accent-cyan,
    rgba($color-accent-cyan, 0.3),
    transparent
  );
  border-radius: 1px;
}

.journey-timeline-item {
  position: relative;
  padding-bottom: $space-2xl;

  &:last-child {
    padding-bottom: 0;
  }
}

.journey-timeline-node {
  position: absolute;
  left: calc(6px - #{$space-2xl});
  top: 6px;
  width: 14px;
  height: 14px;
  border: 2px solid $color-accent-cyan;
  border-radius: 50%;
  background: $color-bg-secondary;
  transform: translateX(-50%);
  box-shadow: 0 0 12px rgba($color-accent-cyan, 0.3);

  @media (max-width: $bp-sm) {
    left: calc(6px - #{$space-xl});
  }
}

.journey-timeline-content {
  padding-left: $space-md;
}

.journey-timeline-year {
  font-family: $font-mono;
  font-size: $font-size-xs;
  color: $color-accent-cyan;
  letter-spacing: 0.1em;
  margin-right: $space-sm;
}

.journey-timeline-title {
  font-family: $font-display;
  font-size: $font-size-lg;
  font-weight: 600;
  color: $color-text-primary;
  margin: $space-xs 0 $space-sm;
  display: inline-block;
}

.journey-timeline-desc {
  font-size: $font-size-sm;
  color: $color-text-secondary;
  line-height: 1.6;
}
</style>

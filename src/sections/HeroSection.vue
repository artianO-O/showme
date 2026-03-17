<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import ParticleBackground from '@/components/ParticleBackground.vue'

const typewriterText = ref('')
const showCursor = ref(true)
const TYPEWRITER_FULL = '6年+ 前端工程师 | 用代码讲故事'
const TYPEWRITER_DELAY = 80
const CURSOR_BLINK_INTERVAL = 530

let typewriterInterval: ReturnType<typeof setInterval>
let cursorInterval: ReturnType<typeof setInterval>

function startTypewriter(): void {
  let index = 0
  typewriterText.value = ''

  typewriterInterval = setInterval(() => {
    if (index < TYPEWRITER_FULL.length) {
      typewriterText.value += TYPEWRITER_FULL[index]
      index++
    } else {
      clearInterval(typewriterInterval)
    }
  }, TYPEWRITER_DELAY)
}

function startCursorBlink(): void {
  cursorInterval = setInterval(() => {
    showCursor.value = !showCursor.value
  }, CURSOR_BLINK_INTERVAL)
}

onMounted(() => {
  startTypewriter()
  startCursorBlink()

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

  tl.from('.hero-greeting', {
    opacity: 0,
    y: 24,
    duration: 0.6,
  })
    .from(
      '.hero-name',
      {
        opacity: 0,
        y: 32,
        duration: 0.7,
      },
      '-=0.3',
    )
    .from(
      '.hero-subtitle',
      {
        opacity: 0,
        y: 20,
        duration: 0.5,
      },
      '-=0.2',
    )
    .from(
      '.hero-stats',
      {
        opacity: 0,
        y: 24,
        duration: 0.6,
        stagger: 0.1,
      },
      '-=0.1',
    )
    .from(
      '.hero-scroll',
      {
        opacity: 0,
        y: 12,
        duration: 0.5,
      },
      '-=0.2',
    )
})

onUnmounted(() => {
  clearInterval(typewriterInterval)
  clearInterval(cursorInterval)
})
</script>

<template>
  <section id="hero" class="section hero-section">
    <ParticleBackground />
    <div class="hero-inner">
      <span class="hero-greeting">// Hello World, I am</span>
      <h1 class="hero-name">阿田</h1>
      <p class="hero-subtitle">
        <span>{{ typewriterText }}</span>
        <span class="typewriter-cursor" :class="{ visible: showCursor }">|</span>
      </p>
      <div class="hero-stats">
        <span class="hero-stat-badge">6+ 年经验</span>
        <span class="hero-stat-badge">20+ 项目</span>
        <span class="hero-stat-badge">100K+ 代码行</span>
      </div>
    </div>
    <div class="hero-scroll" aria-hidden="true">
      <div class="scroll-mouse">
        <div class="scroll-wheel" />
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.hero-section {
  position: relative;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.hero-inner {
  position: relative;
  z-index: $z-content;
  max-width: 800px;
}

.hero-greeting {
  display: block;
  font-family: $font-mono;
  font-size: $font-size-sm;
  color: $color-accent-cyan;
  margin-bottom: $space-sm;
  letter-spacing: 0.05em;
}

.hero-name {
  font-family: $font-display;
  font-size: $font-size-5xl;
  font-weight: 900;
  color: $color-text-primary;
  line-height: 1.1;
  margin-bottom: $space-lg;
  letter-spacing: -0.02em;

  @media (max-width: $bp-md) {
    font-size: $font-size-4xl;
  }

  @media (max-width: $bp-sm) {
    font-size: $font-size-3xl;
  }
}

.hero-subtitle {
  font-family: $font-body;
  font-size: $font-size-lg;
  color: $color-text-secondary;
  margin-bottom: $space-2xl;
  min-height: 1.75em;

  @media (max-width: $bp-md) {
    font-size: $font-size-base;
  }
}

.typewriter-cursor {
  opacity: 0;
  transition: opacity $transition-fast;
  color: $color-accent-cyan;
  margin-left: 2px;

  &.visible {
    opacity: 1;
  }
}

.hero-stats {
  display: flex;
  flex-wrap: wrap;
  gap: $space-md;
  justify-content: center;
}

.hero-stat-badge {
  font-family: $font-mono;
  font-size: $font-size-xs;
  color: $color-text-secondary;
  padding: $space-sm $space-md;
  border: 1px solid $color-border;
  border-radius: 9999px;
  background: rgba($color-bg-card, 0.5);
  transition: border-color $transition-fast, color $transition-fast;

  &:hover {
    border-color: rgba($color-accent-cyan, 0.4);
    color: $color-text-primary;
  }
}

.hero-scroll {
  position: absolute;
  bottom: $space-2xl;
  left: 50%;
  transform: translateX(-50%);
  z-index: $z-content;
}

.scroll-mouse {
  width: 24px;
  height: 38px;
  border: 2px solid $color-border;
  border-radius: 12px;
  position: relative;
  display: flex;
  justify-content: center;
  padding-top: 8px;
}

.scroll-wheel {
  width: 4px;
  height: 8px;
  background: $color-accent-cyan;
  border-radius: 2px;
  animation: scrollBounce 2s $ease-out-expo infinite;
}

@keyframes scrollBounce {
  0%,
  100% {
    opacity: 1;
    transform: translateY(0);
  }
  50% {
    opacity: 0.4;
    transform: translateY(6px);
  }
}
</style>

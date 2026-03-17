<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

const emit = defineEmits<{
  navigate: [sectionId: string]
}>()

const sections = [
  { id: 'hero', label: '首页' },
  { id: 'journey', label: '旅程' },
  { id: 'skills', label: '技能' },
  { id: 'projects', label: '作品' },
  { id: 'contact', label: '联系' },
] as const

const activeSectionId = ref<string>('hero')
const isVisible = ref(true)
let observer: IntersectionObserver | null = null

const checkViewport = () => {
  isVisible.value = window.innerWidth >= 768
}

const handleNavigate = (sectionId: string) => {
  emit('navigate', sectionId)
}

onMounted(async () => {
  checkViewport()
  window.addEventListener('resize', checkViewport)

  await nextTick()

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue

        const id = entry.target.id
        if (id) {
          activeSectionId.value = id
        }
      }
    },
    {
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0,
    }
  )

  sections.forEach((s) => {
    const el = document.getElementById(s.id)
    if (el) observer?.observe(el)
  })
})

onUnmounted(() => {
  window.removeEventListener('resize', checkViewport)
  observer?.disconnect()
  observer = null
})
</script>

<template>
  <aside v-show="isVisible" class="indicator">
    <nav class="indicator__nav">
      <button
        v-for="section in sections"
        :key="section.id"
        type="button"
        class="indicator__dot"
        :class="{ 'indicator__dot--active': activeSectionId === section.id }"
        :aria-label="section.label"
        @click="handleNavigate(section.id)"
      >
        <span class="indicator__dot-inner" />
        <span class="indicator__label">{{ section.label }}</span>
      </button>
    </nav>
  </aside>
</template>

<style lang="scss" scoped>
.indicator {
  position: fixed;
  top: 50%;
  right: $space-xl;
  transform: translateY(-50%);
  z-index: $z-nav;

  @media (max-width: 767px) {
    display: none;
  }

  &__nav {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $space-lg;
  }

  &__dot {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    padding: 0;
    background: none;
    border: none;
    cursor: pointer;
    transition: transform $transition-fast;

    &:hover {
      .indicator__dot-inner {
        transform: scale(1.25);
        background: $color-accent-cyan;
        box-shadow: 0 0 12px rgba($color-accent-cyan, 0.5);
      }
      .indicator__label {
        opacity: 1;
        transform: translateX(0);
      }
    }

    &--active {
      .indicator__dot-inner {
        width: 10px;
        height: 10px;
        background: $color-accent-cyan;
        box-shadow: 0 0 12px rgba($color-accent-cyan, 0.6);
      }
    }
  }

  &__dot-inner {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: $color-text-secondary;
    opacity: 0.6;
    transition: all $transition-base;
  }

  &__dot--active &__dot-inner {
    opacity: 1;
  }

  &__label {
    position: absolute;
    right: calc(100% + $space-md);
    white-space: nowrap;
    font-family: $font-body;
    font-size: $font-size-xs;
    color: $color-text-secondary;
    opacity: 0;
    transform: translateX(8px);
    transition: all $transition-fast;
    pointer-events: none;
  }

  &__dot:hover &__label,
  &__dot--active &__label {
    opacity: 1;
    transform: translateX(0);
    color: $color-accent-cyan;
  }
}
</style>

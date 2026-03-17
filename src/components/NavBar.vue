<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const emit = defineEmits<{
  navigate: [sectionId: string]
}>()

const navItems = [
  { id: 'journey', label: '旅程' },
  { id: 'skills', label: '技能' },
  { id: 'projects', label: '作品' },
  { id: 'contact', label: '联系' },
] as const

const scrollY = ref(0)
const lastScrollY = ref(0)
const scrollDirection = ref<'up' | 'down'>('up')
const isVisible = ref(true)
const isMenuOpen = ref(false)
const isMobile = ref(false)

const scrollProgress = computed(() => {
  if (typeof document === 'undefined' || typeof window === 'undefined') return 0
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  if (docHeight <= 0) return 0
  return Math.min(100, (scrollY.value / docHeight) * 100)
})

const hasScrolled = computed(() => scrollY.value > 100)

const BP_MD = 768

const checkMobile = () => {
  isMobile.value = window.innerWidth < BP_MD
}

let scrollThrottle: ReturnType<typeof setTimeout> | null = null
const SCROLL_THRESHOLD = 10

const handleScroll = () => {
  if (scrollThrottle) return
  scrollThrottle = setTimeout(() => {
    const currentY = window.scrollY ?? document.documentElement.scrollTop
    scrollY.value = currentY

    if (Math.abs(currentY - lastScrollY.value) > SCROLL_THRESHOLD) {
      scrollDirection.value = currentY > lastScrollY.value ? 'down' : 'up'
      lastScrollY.value = currentY
    }

    isVisible.value = scrollDirection.value === 'up' || currentY < 100
    scrollThrottle = null
  }, 16)
}

const handleResize = () => {
  checkMobile()
  if (!isMobile.value) {
    isMenuOpen.value = false
  }
}

const handleNavigate = (sectionId: string) => {
  emit('navigate', sectionId)
  isMenuOpen.value = false
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

onMounted(() => {
  checkMobile()
  scrollY.value = window.scrollY ?? document.documentElement.scrollTop
  lastScrollY.value = scrollY.value
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleResize)
  if (scrollThrottle) clearTimeout(scrollThrottle)
})
</script>

<template>
  <header
    class="navbar"
    :class="{
      'navbar--scrolled': hasScrolled,
      'navbar--hidden': !isVisible,
    }"
  >
    <div class="navbar__progress" :style="{ width: `${scrollProgress}%` }" />

    <div class="navbar__inner">
      <a href="#" class="navbar__logo" @click.prevent="handleNavigate('hero')">
        ShowMe
      </a>

      <button
        v-if="isMobile"
        type="button"
        class="navbar__hamburger"
        :class="{ 'navbar__hamburger--open': isMenuOpen }"
        aria-label="Toggle menu"
        @click="toggleMenu"
      >
        <span class="navbar__hamburger-line" />
        <span class="navbar__hamburger-line" />
        <span class="navbar__hamburger-line" />
      </button>

      <nav v-else class="navbar__nav">
        <button
          v-for="item in navItems"
          :key="item.id"
          type="button"
          class="navbar__link"
          @click="handleNavigate(item.id)"
        >
          {{ item.label }}
        </button>
      </nav>
    </div>

    <Transition name="dropdown">
      <div v-if="isMobile && isMenuOpen" class="navbar__dropdown">
        <button
          v-for="item in navItems"
          :key="item.id"
          type="button"
          class="navbar__dropdown-link"
          @click="handleNavigate(item.id)"
        >
          {{ item.label }}
        </button>
      </div>
    </Transition>
  </header>
</template>

<style lang="scss" scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: $z-nav;
  display: flex;
  flex-direction: column;
  transition:
    transform $transition-base,
    background-color $transition-base,
    backdrop-filter $transition-base;

  &--hidden {
    transform: translateY(-100%);
  }

  &--scrolled {
    background-color: rgba($color-bg-primary, 0.85);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }

  &__progress {
    position: absolute;
    top: 0;
    left: 0;
    height: 2px;
    background: $color-accent-cyan;
    transition: width 0.05s linear;
    pointer-events: none;
  }

  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: $space-md $space-xl;
    min-height: 64px;
  }

  &__logo {
    font-family: $font-mono;
    font-size: $font-size-xl;
    font-weight: 600;
    color: $color-accent-cyan;
    text-decoration: none;
    letter-spacing: 0.02em;
    transition: opacity $transition-fast;

    &:hover {
      opacity: 0.85;
    }
  }

  &__nav {
    display: flex;
    align-items: center;
    gap: $space-xl;
  }

  &__link {
    font-family: $font-body;
    font-size: $font-size-sm;
    color: $color-text-secondary;
    background: none;
    border: none;
    cursor: pointer;
    padding: $space-sm $space-md;
    transition: color $transition-fast;

    &:hover {
      color: $color-accent-cyan;
    }
  }

  &__hamburger {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 6px;
    width: 32px;
    height: 32px;
    padding: 0;
    background: none;
    border: none;
    cursor: pointer;
    transition: transform $transition-fast;

    &--open {
      .navbar__hamburger-line:nth-child(1) {
        transform: translateY(9px) rotate(45deg);
      }
      .navbar__hamburger-line:nth-child(2) {
        opacity: 0;
      }
      .navbar__hamburger-line:nth-child(3) {
        transform: translateY(-9px) rotate(-45deg);
      }
    }
  }

  &__hamburger-line {
    display: block;
    width: 100%;
    height: 2px;
    background: $color-text-primary;
    border-radius: 1px;
    transition: all $transition-fast;
  }

  &__dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    padding: $space-md $space-xl $space-lg;
    background: rgba($color-bg-secondary, 0.98);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-top: 1px solid $color-border;
    display: flex;
    flex-direction: column;
    gap: $space-sm;
  }

  &__dropdown-link {
    font-family: $font-body;
    font-size: $font-size-base;
    color: $color-text-primary;
    background: none;
    border: none;
    cursor: pointer;
    padding: $space-md;
    text-align: left;
    border-radius: $space-sm;
    transition: all $transition-fast;

    &:hover {
      color: $color-accent-cyan;
      background: rgba($color-accent-cyan, 0.08);
    }
  }
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all $transition-base;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>

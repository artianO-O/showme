<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const socialLinks = [
  { label: 'GitHub', url: 'https://github.com' },
  { label: '掘金', url: 'https://juejin.cn' },
  { label: 'Twitter / X', url: 'https://x.com' },
  { label: 'LinkedIn', url: 'https://linkedin.com' },
]

let ctx: gsap.Context | null = null

onMounted(() => {
  const section = document.getElementById('contact')
  if (!section) return

  ctx = gsap.context(() => {
    gsap.from('.contact-label', {
      opacity: 0,
      y: 20,
      duration: 0.5,
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })

    gsap.from('.contact-heading', {
      opacity: 0,
      y: 30,
      duration: 0.6,
      scrollTrigger: {
        trigger: section,
        start: 'top 78%',
        toggleActions: 'play none none none',
      },
    })

    gsap.from('.contact-subtitle', {
      opacity: 0,
      y: 20,
      duration: 0.5,
      delay: 0.1,
      scrollTrigger: {
        trigger: section,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    })

    gsap.from('.contact-cta', {
      opacity: 0,
      y: 20,
      duration: 0.5,
      delay: 0.2,
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
        toggleActions: 'play none none none',
      },
    })

    gsap.from('.contact-social a', {
      opacity: 0,
      y: 16,
      stagger: 0.08,
      duration: 0.4,
      delay: 0.3,
      scrollTrigger: {
        trigger: section,
        start: 'top 68%',
        toggleActions: 'play none none none',
      },
    })
  }, section)
})

onUnmounted(() => {
  ctx?.revert()
})
</script>

<template>
  <section id="contact" class="section contact-section">
    <div class="section-inner contact-inner">
      <span class="section-label contact-label">// 04. CONTACT</span>
      <h2 class="contact-heading">一起做点什么？</h2>
      <p class="contact-subtitle">无论是项目合作还是技术交流，都欢迎联系我</p>

      <a href="mailto:hello@example.com" class="contact-cta">
        hello@example.com
      </a>

      <nav class="contact-social">
        <a
          v-for="link in socialLinks"
          :key="link.label"
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ link.label }}
        </a>
      </nav>
    </div>

    <footer class="contact-footer">
      <p>Built with Vue 3 + GSAP + ❤️</p>
      <p>© 2026 ShowMe</p>
    </footer>
  </section>
</template>

<style lang="scss" scoped>
.contact-section {
  text-align: center;
  justify-content: center;
  position: relative;
}

.contact-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.contact-heading {
  font-family: $font-display;
  font-size: $font-size-4xl;
  font-weight: 700;
  color: $color-text-primary;
  margin-bottom: $space-lg;
  line-height: 1.2;
  background: linear-gradient(135deg, $color-text-primary 0%, $color-accent-cyan 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: $bp-md) {
    font-size: $font-size-3xl;
  }
}

.contact-subtitle {
  font-size: $font-size-base;
  color: $color-text-secondary;
  margin-bottom: $space-3xl;
  max-width: 400px;
}

.contact-cta {
  display: inline-block;
  font-family: $font-mono;
  font-size: $font-size-lg;
  color: $color-accent-cyan;
  border: 1px solid $color-accent-cyan;
  border-radius: 9999px;
  padding: $space-lg $space-3xl;
  text-decoration: none;
  background: transparent;
  transition: all $transition-base;
  margin-bottom: $space-3xl;

  &:hover {
    background: rgba($color-accent-cyan, 0.1);
    box-shadow: 0 0 30px rgba($color-accent-cyan, 0.15);
    color: $color-accent-cyan;
  }

  @media (max-width: $bp-md) {
    font-size: $font-size-base;
    padding: $space-md $space-2xl;
  }
}

.contact-social {
  display: flex;
  gap: $space-xl;
  flex-wrap: wrap;
  justify-content: center;

  a {
    font-family: $font-mono;
    font-size: $font-size-sm;
    color: $color-text-secondary;
    text-decoration: none;
    padding: $space-sm $space-md;
    border-radius: 8px;
    transition: all $transition-fast;

    &:hover {
      color: $color-accent-cyan;
      background: rgba($color-accent-cyan, 0.08);
    }
  }
}

.contact-footer {
  position: absolute;
  bottom: $space-xl;
  left: 0;
  right: 0;
  text-align: center;

  p {
    font-size: $font-size-xs;
    color: $color-text-muted;
    line-height: 1.8;
  }
}
</style>

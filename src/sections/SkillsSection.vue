<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SkillRadar from '@/components/SkillRadar.vue'
import { radarData, skillCategories } from '@/data/skills'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref<HTMLElement | null>(null)
const labelRef = ref<HTMLElement | null>(null)
const titleRef = ref<HTMLElement | null>(null)
const radarRef = ref<HTMLElement | null>(null)
const cardsContainerRef = ref<HTMLElement | null>(null)

let ctx: gsap.Context | null = null

onMounted(() => {
  const section = sectionRef.value
  if (!section) return

  ctx = gsap.context(() => {
    const cards = cardsContainerRef.value
      ? Array.from(cardsContainerRef.value.querySelectorAll('.skill-card'))
      : []

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none none',
      },
    })

    tl.fromTo(
      labelRef.value,
      { opacity: 0, y: 20 },
      { opacity: 0.8, y: 0, duration: 0.5 }
    )
      .fromTo(
        titleRef.value,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 },
        '-=0.3'
      )
      .fromTo(
        radarRef.value,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.6 },
        '-=0.2'
      )
      .fromTo(
        cards,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
        '-=0.4'
      )
  }, section)
})

onUnmounted(() => {
  ctx?.revert()
})
</script>

<template>
  <section id="skills" ref="sectionRef" class="section">
    <div class="section-inner skills-section">
      <p ref="labelRef" class="section-label">// 02. SKILLS</p>
      <h2 ref="titleRef" class="section-title">技能体系</h2>

      <div class="skills-section__layout">
        <div ref="radarRef" class="skills-section__radar">
          <SkillRadar :data="radarData" />
        </div>

        <div ref="cardsContainerRef" class="skills-section__cards">
          <article
            v-for="category in skillCategories"
            :key="category.name"
            class="skill-card"
          >
            <div class="skill-card__header">
              <span class="skill-card__icon">{{ category.icon }}</span>
              <h3 class="skill-card__name">{{ category.name }}</h3>
            </div>
            <ul class="skill-card__list">
              <li
                v-for="skill in category.skills"
                :key="skill.name"
                class="skill-card__item"
              >
                <div class="skill-card__item-header">
                  <span class="skill-card__skill-name">{{ skill.name }}</span>
                  <span class="skill-card__skill-level">{{ skill.level }}%</span>
                </div>
                <div class="skill-card__progress">
                  <div
                    class="skill-card__progress-fill"
                    :style="{ width: `${skill.level}%` }"
                  />
                </div>
              </li>
            </ul>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.skills-section {
  &__layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: $space-2xl;
    align-items: start;

    @media (max-width: $bp-lg) {
      grid-template-columns: 1fr;
      gap: $space-xl;
    }
  }

  &__radar {
    position: sticky;
    top: $space-2xl;
  }

  &__cards {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: $space-lg;

    @media (max-width: $bp-md) {
      grid-template-columns: 1fr;
    }
  }
}

.skill-card {
  background: $color-bg-card;
  border: 1px solid $color-border;
  border-radius: 12px;
  padding: $space-lg;
  transition: border-color $transition-base, transform $transition-base;

  &:hover {
    border-color: $color-border-hover;
    transform: scale(1.02);
  }

  &__header {
    display: flex;
    align-items: center;
    gap: $space-sm;
    margin-bottom: $space-md;
  }

  &__icon {
    font-size: $font-size-xl;
    line-height: 1;
  }

  &__name {
    font-family: $font-display;
    font-size: $font-size-base;
    font-weight: 600;
    color: $color-text-primary;
  }

  &__list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: $space-sm;
  }

  &__item {
    display: flex;
    flex-direction: column;
    gap: $space-xs;
  }

  &__item-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__skill-name {
    font-family: $font-mono;
    font-size: $font-size-xs;
    color: $color-text-secondary;
  }

  &__skill-level {
    font-family: $font-mono;
    font-size: $font-size-xs;
    color: $color-text-muted;
  }

  &__progress {
    height: 4px;
    background: $color-bg-card-hover;
    border-radius: 2px;
    overflow: hidden;
  }

  &__progress-fill {
    height: 100%;
    background: linear-gradient(
      90deg,
      $color-accent-cyan 0%,
      $color-accent-purple 100%
    );
    border-radius: 2px;
    transition: width $transition-base;
  }
}
</style>

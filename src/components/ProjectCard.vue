<script setup lang="ts">
import type { Project } from '@/data/projects'

defineProps<{
  project: Project
}>()
</script>

<template>
  <article class="project-card" :style="{ '--project-color': project.color }">
    <div class="project-card__image">
      <img :src="project.image" :alt="project.title" loading="lazy" />
      <div class="project-card__image-overlay" />
    </div>

    <div class="project-card__content">
      <span class="project-card__subtitle">{{ project.subtitle }}</span>
      <h3 class="project-card__title">{{ project.title }}</h3>
      <p class="project-card__desc">{{ project.description }}</p>

      <div class="project-card__tags">
        <span v-for="tag in project.tags" :key="tag" class="project-card__tag">
          {{ tag }}
        </span>
      </div>

      <div class="project-card__metrics">
        <div v-for="m in project.metrics" :key="m.label" class="project-card__metric">
          <span class="project-card__metric-value">{{ m.value }}</span>
          <span class="project-card__metric-label">{{ m.label }}</span>
        </div>
      </div>

      <a
        v-if="project.link"
        :href="project.link"
        target="_blank"
        rel="noopener noreferrer"
        class="project-card__link"
      >
        查看项目 →
      </a>
    </div>
  </article>
</template>

<style lang="scss" scoped>
.project-card {
  --project-color: #{$color-accent-cyan};

  display: flex;
  width: 85vw;
  max-width: 1000px;
  background: $color-bg-card;
  border: 1px solid $color-border;
  border-radius: 16px;
  overflow: hidden;
  transition: border-color $transition-base;

  &:hover {
    border-color: color-mix(in srgb, var(--project-color) 30%, transparent);

    .project-card__image img {
      transform: scale(1.05);
    }
  }

  @media (max-width: $bp-md) {
    flex-direction: column;
    width: 90vw;
  }

  &__image {
    position: relative;
    flex: 0 0 45%;
    overflow: hidden;

    @media (max-width: $bp-md) {
      flex: none;
      height: 220px;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.6s $ease-out-expo;
    }
  }

  &__image-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to right, transparent 40%, $color-bg-card 100%);
    pointer-events: none;

    @media (max-width: $bp-md) {
      background: linear-gradient(to bottom, transparent 40%, $color-bg-card 100%);
    }
  }

  &__content {
    flex: 1;
    padding: $space-2xl;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media (max-width: $bp-md) {
      padding: $space-lg;
    }
  }

  &__subtitle {
    font-family: $font-mono;
    font-size: $font-size-xs;
    color: var(--project-color);
    text-transform: uppercase;
    letter-spacing: 0.15em;
    margin-bottom: $space-sm;
  }

  &__title {
    font-family: $font-display;
    font-size: $font-size-2xl;
    font-weight: 700;
    color: $color-text-primary;
    margin-bottom: $space-md;
    line-height: 1.2;

    @media (max-width: $bp-md) {
      font-size: $font-size-xl;
    }
  }

  &__desc {
    font-size: $font-size-sm;
    color: $color-text-secondary;
    line-height: 1.7;
    margin-bottom: $space-lg;
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: $space-sm;
    margin-bottom: $space-xl;
  }

  &__tag {
    font-family: $font-mono;
    font-size: $font-size-xs;
    color: var(--project-color);
    background: color-mix(in srgb, var(--project-color) 12%, transparent);
    padding: $space-xs $space-sm;
    border-radius: 6px;
    line-height: 1.4;
  }

  &__metrics {
    display: flex;
    gap: $space-xl;
    margin-bottom: $space-lg;

    @media (max-width: $bp-sm) {
      gap: $space-lg;
    }
  }

  &__metric {
    display: flex;
    flex-direction: column;
    gap: $space-xs;
  }

  &__metric-value {
    font-family: $font-display;
    font-size: $font-size-xl;
    font-weight: 700;
    color: var(--project-color);
    line-height: 1;

    @media (max-width: $bp-md) {
      font-size: $font-size-lg;
    }
  }

  &__metric-label {
    font-size: $font-size-xs;
    color: $color-text-muted;
  }

  &__link {
    font-family: $font-mono;
    font-size: $font-size-sm;
    color: var(--project-color);
    text-decoration: none;
    transition: opacity $transition-fast;
    align-self: flex-start;

    &:hover {
      opacity: 0.8;
    }
  }
}
</style>

<script setup lang="ts">
import { useSmoothScroll } from '@/composables/useSmoothScroll'
import NavBar from '@/components/NavBar.vue'
import SectionIndicator from '@/components/SectionIndicator.vue'
import HeroSection from '@/sections/HeroSection.vue'
import JourneySection from '@/sections/JourneySection.vue'
import SkillsSection from '@/sections/SkillsSection.vue'
import ProjectsSection from '@/sections/ProjectsSection.vue'
import ContactSection from '@/sections/ContactSection.vue'

const { scrollTo } = useSmoothScroll()

function handleNavigate(sectionId: string) {
  scrollTo(`#${sectionId}`, { offset: -40 })
}
</script>

<template>
  <NavBar @navigate="handleNavigate" />
  <SectionIndicator @navigate="handleNavigate" />
  <main>
    <HeroSection />
    <JourneySection />
    <SkillsSection />
    <ProjectsSection />
    <ContactSection />
  </main>
</template>

import { onMounted, onUnmounted, shallowRef } from 'vue'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let lenisInstance: Lenis | null = null

export function useSmoothScroll() {
  const lenis = shallowRef<Lenis | null>(null)

  onMounted(() => {
    if (lenisInstance) {
      lenis.value = lenisInstance
      return
    }

    lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    lenisInstance.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time: number) => {
      lenisInstance?.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    lenis.value = lenisInstance
  })

  onUnmounted(() => {
    // Don't destroy singleton - other components may use it
  })

  function scrollTo(target: string | number | HTMLElement, options?: { offset?: number; duration?: number }) {
    lenisInstance?.scrollTo(target, {
      offset: options?.offset ?? 0,
      duration: options?.duration ?? 1.2,
    })
  }

  return { lenis, scrollTo }
}

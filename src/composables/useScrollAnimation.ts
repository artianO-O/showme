import { onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export interface ScrollAnimationOptions {
  trigger: string | HTMLElement
  animation: gsap.TweenVars
  start?: string
  end?: string
  scrub?: boolean | number
  pin?: boolean
  markers?: boolean
  toggleActions?: string
  onEnter?: () => void
}

export function useScrollAnimation() {
  const triggers: ScrollTrigger[] = []

  function createScrollAnimation(options: ScrollAnimationOptions) {
    const {
      trigger,
      animation,
      start = 'top 80%',
      end = 'bottom 20%',
      scrub = false,
      pin = false,
      markers = false,
      toggleActions = 'play none none none',
      onEnter,
    } = options

    const el = typeof trigger === 'string' ? document.querySelector(trigger) : trigger
    if (!el) return null

    const tween = gsap.fromTo(el, animation, {
      ...animation,
      scrollTrigger: {
        trigger: el,
        start,
        end,
        scrub,
        pin,
        markers,
        toggleActions,
        onEnter,
      },
    })

    if (tween.scrollTrigger) {
      triggers.push(tween.scrollTrigger)
    }

    return tween
  }

  function batchAnimate(
    selector: string,
    from: gsap.TweenVars,
    to: gsap.TweenVars,
    stagger: number = 0.1,
    triggerSelector?: string,
  ) {
    const elements = gsap.utils.toArray<HTMLElement>(selector)
    if (!elements.length) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerSelector || selector,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none none',
      },
    })

    tl.fromTo(elements, from, { ...to, stagger })

    if (tl.scrollTrigger) {
      triggers.push(tl.scrollTrigger)
    }

    return tl
  }

  onUnmounted(() => {
    triggers.forEach((t) => t.kill())
    triggers.length = 0
  })

  return { createScrollAnimation, batchAnimate, ScrollTrigger }
}

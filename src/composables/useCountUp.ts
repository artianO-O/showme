import { onUnmounted } from 'vue'
import gsap from 'gsap'

export function useCountUp() {
  const tweens: gsap.core.Tween[] = []

  function countUp(
    target: { value: number },
    endValue: number,
    duration: number = 2,
    options?: { delay?: number; suffix?: string },
  ) {
    const tween = gsap.to(target, {
      value: endValue,
      duration,
      delay: options?.delay ?? 0,
      ease: 'power2.out',
      snap: { value: 1 },
    })
    tweens.push(tween)
    return tween
  }

  onUnmounted(() => {
    tweens.forEach((t) => t.kill())
    tweens.length = 0
  })

  return { countUp }
}

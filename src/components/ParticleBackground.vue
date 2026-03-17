<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  baseX: number
  baseY: number
}

const CONNECTION_DISTANCE = 120
const PARTICLE_COUNT_DESKTOP = 80
const PARTICLE_COUNT_MOBILE = 40
const PARTICLE_RADIUS = 2
const MOUSE_INFLUENCE = 0.02
const MOUSE_RADIUS = 150

let particles: Particle[] = []
let animationId: number
let mouseX = -1000
let mouseY = -1000

function getParticleCount(): number {
  return window.innerWidth >= 768 ? PARTICLE_COUNT_DESKTOP : PARTICLE_COUNT_MOBILE
}

function initParticles(): void {
  const canvas = canvasRef.value
  if (!canvas) return

  const count = getParticleCount()
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    radius: PARTICLE_RADIUS,
    baseX: 0,
    baseY: 0,
  }))
  particles.forEach((p) => {
    p.baseX = p.x
    p.baseY = p.y
  })
}

function resizeCanvas(): void {
  const canvas = canvasRef.value
  if (!canvas) return

  const dpr = Math.min(window.devicePixelRatio, 2)
  const rect = canvas.getBoundingClientRect()

  canvas.width = rect.width * dpr
  canvas.height = rect.height * dpr
  canvas.style.width = `${rect.width}px`
  canvas.style.height = `${rect.height}px`

  const ctx = canvas.getContext('2d')
  if (ctx) ctx.scale(dpr, dpr)

  initParticles()
}

function animate(): void {
  const canvas = canvasRef.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const width = canvas.getBoundingClientRect().width
  const height = canvas.getBoundingClientRect().height

  ctx.clearRect(0, 0, width, height)

  // Update and draw particles
  particles.forEach((p) => {
    const dx = mouseX - p.x
    const dy = mouseY - p.y
    const dist = Math.sqrt(dx * dx + dy * dy)

    if (dist < MOUSE_RADIUS && dist > 0) {
      const force = (1 - dist / MOUSE_RADIUS) * MOUSE_INFLUENCE
      p.x -= (dx / dist) * force * 50
      p.y -= (dy / dist) * force * 50
    } else {
      p.baseX += p.vx
      p.baseY += p.vy
      p.x = p.baseX
      p.y = p.baseY
    }

    // Wrap around edges
    if (p.x < 0 || p.x > width) p.baseX = p.x = ((p.x % width) + width) % width
    if (p.y < 0 || p.y > height) p.baseY = p.y = ((p.y % height) + height) % height

    ctx.beginPath()
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(0, 240, 255, 0.4)'
    ctx.fill()
  })

  // Draw connections
  ctx.strokeStyle = 'rgba(0, 240, 255, 0.1)'
  ctx.lineWidth = 0.5

  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const a = particles[i]
      const b = particles[j]
      const dx = b.x - a.x
      const dy = b.y - a.y
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < CONNECTION_DISTANCE) {
        const opacity = 0.08 + (1 - dist / CONNECTION_DISTANCE) * 0.07
        ctx.strokeStyle = `rgba(0, 240, 255, ${opacity})`
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.stroke()
      }
    }
  }

  animationId = requestAnimationFrame(animate)
}

function handleMouseMove(e: MouseEvent): void {
  mouseX = e.clientX
  mouseY = e.clientY
}

function handleMouseLeave(): void {
  mouseX = -1000
  mouseY = -1000
}

function handleResize(): void {
  resizeCanvas()
}

onMounted(() => {
  resizeCanvas()
  window.addEventListener('resize', handleResize)
  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('mouseleave', handleMouseLeave)
  animate()
})

onUnmounted(() => {
  cancelAnimationFrame(animationId)
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('mouseleave', handleMouseLeave)
})
</script>

<template>
  <canvas
    ref="canvasRef"
    class="particle-canvas"
    aria-hidden="true"
  />
</template>

<style lang="scss" scoped>
.particle-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: $z-background;
  pointer-events: none;
}
</style>

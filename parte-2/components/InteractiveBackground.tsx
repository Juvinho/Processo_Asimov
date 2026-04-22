'use client'

import { useEffect, useRef } from 'react'
import { useState } from 'react'

type Particle = {
  x: number
  y: number
  originX: number
  originY: number
  vx: number
  vy: number
  radius: number
  opacity: number
  color: [number, number, number]
}

const COLORS: Array<[number, number, number]> = [
  [91, 106, 247],
  [123, 138, 255],
  [155, 89, 245],
  [62, 207, 142],
  [240, 240, 242],
]

const IDLE_TIMEOUT = 2000
const MAX_SPEED = 2
const MOBILE_BREAKPOINT = 768

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
  }, [])

  useEffect(() => {
    if (isMobile) {
      return
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) {
      return
    }

    const canvas = canvasRef.current
    if (!canvas) {
      return
    }

    const ctx = canvas.getContext('2d')
    if (!ctx) {
      return
    }

    let width = window.innerWidth
    let height = window.innerHeight
    const PARTICLE_COUNT = width < MOBILE_BREAKPOINT ? 70 : 220
    const cols = Math.ceil(Math.sqrt(PARTICLE_COUNT * (width / height)))
    const rows = Math.ceil(PARTICLE_COUNT / cols)

    const particles: Particle[] = []
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const col = i % cols
      const row = Math.floor(i / cols)
      const ox = (col / cols) * width + (Math.random() - 0.5) * (width / cols) * 0.6
      const oy = (row / rows) * height + (Math.random() - 0.5) * (height / rows) * 0.6
      particles.push({
        x: ox,
        y: oy,
        originX: ox,
        originY: oy,
        vx: 0,
        vy: 0,
        radius: Math.random() * 2 + 1.2,
        opacity: Math.random() * 0.35 + 0.12,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      })
    }

    const MOUSE_RADIUS = 100
    let raf = 0
    let lastMove = Date.now()

    const mouse = { x: width * 0.5, y: height * 0.5 }

    const resizeCanvas = () => {
      width = window.innerWidth
      height = window.innerHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const onPointerMove = (event: PointerEvent) => {
      mouse.x = event.clientX
      mouse.y = event.clientY
      lastMove = Date.now()
    }

    const update = () => {
      const idle = Date.now() - lastMove > IDLE_TIMEOUT

      for (const p of particles) {
        const mouseX = idle ? p.originX : mouse.x
        const mouseY = idle ? p.originY : mouse.y
        const dx = p.x - mouseX
        const dy = p.y - mouseY
        const dist = Math.hypot(dx, dy)

        if (dist < MOUSE_RADIUS && dist > 0 && !idle) {
          const force = 1 - dist / MOUSE_RADIUS
          const pushX = (dx / dist) * force * 4.5
          const pushY = (dy / dist) * force * 4.5
          p.vx += pushX
          p.vy += pushY
        }

        p.vx += (p.originX - p.x) * 0.08
        p.vy += (p.originY - p.y) * 0.08

        p.vx *= 0.82
        p.vy *= 0.82

        p.x += p.vx
        p.y += p.vy
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      for (let i = 0; i < particles.length; i += 1) {
        const a = particles[i]

        for (let j = i + 1; j < particles.length; j += 1) {
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.hypot(dx, dy)

          if (dist < 85) {
            const alpha = (1 - dist / 85) * 0.08
            ctx.beginPath()
            ctx.strokeStyle = `rgba(91, 106, 247, ${alpha})`
            ctx.lineWidth = 0.5
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      for (const p of particles) {
        ctx.beginPath()
        ctx.shadowBlur = 8
        ctx.shadowColor = `rgba(${p.color[0]}, ${p.color[1]}, ${p.color[2]}, ${p.opacity})`
        ctx.fillStyle = `rgba(${p.color[0]}, ${p.color[1]}, ${p.color[2]}, ${p.opacity})`
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.shadowBlur = 0
    }

    const loop = () => {
      update()
      draw()
      raf = window.requestAnimationFrame(loop)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    loop()

    return () => {
      window.cancelAnimationFrame(raf)
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('pointermove', onPointerMove)
    }
  }, [isMobile])

  if (isMobile) {
    return <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_20%_10%,rgba(91,106,247,0.18),transparent_45%),radial-gradient(circle_at_80%_90%,rgba(62,207,142,0.1),transparent_40%)]" aria-hidden="true" />
  }

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-0" aria-hidden="true" />
}

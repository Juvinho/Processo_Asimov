'use client'

import { motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import { BrandLogo } from '@/components/BrandLogo'

interface Particle {
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

interface LoadingScreenProps {
  onComplete: () => void
}

const COLORS: Array<[number, number, number]> = [
  [91, 106, 247],
  [123, 138, 255],
  [155, 89, 245],
  [62, 207, 142],
  [255, 255, 255],
]

const MOBILE_BREAKPOINT = 768
const LOADING_MS = 3000

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const exitingRef = useRef(false)
  const [progress, setProgress] = useState(0)
  const [exiting, setExiting] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const reduced = useMemo(() => {
    if (typeof window === 'undefined') {
      return false
    }
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  useEffect(() => {
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
  }, [])

  useEffect(() => {
    let timer = window.setTimeout(() => {
      setExiting(true)
    }, LOADING_MS)

    let raf = 0
    const started = performance.now()

    const tick = (now: number) => {
      const value = Math.min(100, Math.round(((now - started) / 2800) * 100))
      setProgress(value)
      if (value < 100) {
        raf = window.requestAnimationFrame(tick)
      }
    }
    raf = window.requestAnimationFrame(tick)

    return () => {
      window.clearTimeout(timer)
      window.cancelAnimationFrame(raf)
    }
  }, [])

  useEffect(() => {
    exitingRef.current = exiting
  }, [exiting])

  useEffect(() => {
    if (isMobile || reduced) {
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
    let raf = 0
    let idleSince = Date.now()
    let exploded = false

    const mouse = { x: width * 0.5, y: height * 0.5 }

    const PARTICLE_COUNT = width < MOBILE_BREAKPOINT ? 120 : 350
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

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const handleMove = (event: MouseEvent) => {
      mouse.x = event.clientX
      mouse.y = event.clientY
      idleSince = Date.now()
    }

    const MOUSE_RADIUS = 100
    const update = () => {
      const idle = Date.now() - idleSince > 2000

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

        if (exitingRef.current) {
          if (!exploded) {
            p.vx += (Math.random() - 0.5) * 15
            p.vy += (Math.random() - 0.5) * 15
          }
        } else {
          p.vx += (p.originX - p.x) * 0.08
          p.vy += (p.originY - p.y) * 0.08
        }

        p.vx *= 0.82
        p.vy *= 0.82

        p.x += p.vx
        p.y += p.vy
      }

      if (exitingRef.current) {
        exploded = true
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

          if (dist < 80) {
            const alpha = (1 - dist / 80) * 0.2
            ctx.beginPath()
            ctx.strokeStyle = `rgba(91, 106, 247, ${alpha})`
            ctx.lineWidth = 0.8
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      for (const p of particles) {
        ctx.beginPath()
        ctx.shadowBlur = 12
        ctx.shadowColor = `rgba(${p.color[0]}, ${p.color[1]}, ${p.color[2]}, 0.9)`
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

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', handleMove, { passive: true })
    loop()

    return () => {
      window.cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMove)
    }
  }, [isMobile, reduced])

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#0a0a0b]"
      initial={{ opacity: 1, scale: 1 }}
      animate={exiting ? { scale: 0.96, opacity: 0, filter: 'blur(12px)' } : { scale: 1, opacity: 1 }}
      transition={reduced ? { duration: 0 } : { duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      onAnimationComplete={() => {
        if (exiting) {
          onComplete()
        }
      }}
    >
      {isMobile || reduced ? (
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(91,106,247,0.22),transparent_45%),radial-gradient(circle_at_80%_85%,rgba(155,89,245,0.18),transparent_45%)]"
          aria-hidden="true"
        />
      ) : (
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
      )}

      <div className="relative z-10 flex w-full max-w-sm flex-col items-center gap-6 px-6">
        <BrandLogo className="h-10 w-auto" priority />
        <span className="font-mono text-xs tracking-[0.2em] text-accent">Inicializando...</span>
        <div className="h-[2px] w-48 overflow-hidden rounded-full bg-white/5">
          <motion.div
            className="h-full rounded-full bg-accent shadow-[0_0_8px_rgba(91,106,247,0.8)]"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={reduced ? { duration: 0 } : { duration: 2.8, ease: 'linear' }}
          />
        </div>
        <span className="font-mono text-sm text-text-faint">{progress}%</span>
      </div>
    </motion.div>
  )
}

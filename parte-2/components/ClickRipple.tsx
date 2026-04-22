'use client'

import { useEffect, useRef, useCallback } from 'react'

type Ripple = {
  x: number
  y: number
  radius: number
  maxRadius: number
  opacity: number
  born: number
}

export default function ClickRipple() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const ripplesRef = useRef<Ripple[]>([])
  const rafRef = useRef(0)
  const activeRef = useRef(false)

  const spawn = useCallback((e: MouseEvent) => {
    // Spawn 3 concentric rings with staggered timing
    const x = e.clientX
    const y = e.clientY + window.scrollY

    for (let i = 0; i < 3; i++) {
      ripplesRef.current.push({
        x,
        y,
        radius: 0,
        maxRadius: 120 + i * 80,
        opacity: 0.5 - i * 0.12,
        born: performance.now() + i * 90,
      })
    }

    if (!activeRef.current) {
      activeRef.current = true
      loop()
    }
  }, [])

  const loop = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const now = performance.now()
    const scrollY = window.scrollY

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    ripplesRef.current = ripplesRef.current.filter((r) => {
      const elapsed = now - r.born
      if (elapsed < 0) return true // hasn't started yet

      const progress = Math.min(elapsed / 900, 1) // 900ms total lifespan
      const eased = 1 - Math.pow(1 - progress, 3) // easeOutCubic

      r.radius = eased * r.maxRadius
      const currentOpacity = r.opacity * (1 - progress)

      if (currentOpacity <= 0.005) return false

      // Translate y for scroll
      const drawY = (r.y - scrollY) * dpr
      const drawX = r.x * dpr

      ctx.beginPath()
      ctx.arc(drawX, drawY, r.radius * dpr, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(91, 106, 247, ${currentOpacity})`
      ctx.lineWidth = 2 * dpr
      ctx.stroke()

      // Inner subtle glow
      ctx.beginPath()
      ctx.arc(drawX, drawY, r.radius * dpr, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(155, 89, 245, ${currentOpacity * 0.4})`
      ctx.lineWidth = 1 * dpr
      ctx.stroke()

      return true
    })

    if (ripplesRef.current.length > 0) {
      rafRef.current = requestAnimationFrame(loop)
    } else {
      activeRef.current = false
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(window.innerWidth * dpr)
      canvas.height = Math.floor(window.innerHeight * dpr)
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('click', spawn)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('click', spawn)
      cancelAnimationFrame(rafRef.current)
    }
  }, [spawn])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[1]"
      aria-hidden="true"
    />
  )
}

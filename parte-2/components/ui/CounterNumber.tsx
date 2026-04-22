'use client'

import { useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

type Props = {
  target: number
  duration?: number
  format?: 'plain' | 'thousands'
  prefix?: string
  suffix?: string
}

const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4)

export function CounterNumber({
  target,
  duration = 1800,
  format = 'plain',
  prefix = '',
  suffix = '',
}: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setValue(target)
      return
    }
    const start = performance.now()
    let raf = 0
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      setValue(target * easeOutQuart(t))
      if (t < 1) raf = requestAnimationFrame(step)
      else setValue(target)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [inView, target, duration])

  const rendered =
    format === 'thousands'
      ? Math.round(value).toLocaleString('pt-BR')
      : Math.round(value).toString()

  return (
    <span ref={ref}>
      {prefix}
      {rendered}
      {suffix}
    </span>
  )
}

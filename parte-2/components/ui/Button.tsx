'use client'

import { motion } from 'framer-motion'
import { useState, type ReactNode, type MouseEvent } from 'react'

type Variant = 'primary' | 'ghost'
type Size = 'md' | 'lg' | 'xl'

const base =
  'inline-flex items-center justify-center gap-2 font-medium whitespace-nowrap rounded-full transition-colors focus-visible:outline-none'

const variants: Record<Variant, string> = {
  primary:
    'bg-accent text-white hover:bg-accent-hover shadow-[0_2px_8px_rgba(91,106,247,0.3),inset_0_1px_0_rgba(255,255,255,0.15)]',
  ghost: 'text-text-muted hover:text-text-primary',
}

const sizes: Record<Size, string> = {
  md: 'h-10 px-5 text-[0.9375rem]',
  lg: 'h-12 px-7 text-[1rem]',
  xl: 'h-14 px-8 text-[1.0625rem]',
}

type Props = {
  children: ReactNode
  variant?: Variant
  size?: Size
  href?: string
  className?: string
  magnetic?: boolean
  onClick?: () => void
  ariaLabel?: string
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  className = '',
  magnetic = false,
  onClick,
  ariaLabel,
}: Props) {
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  const handleMove = (e: MouseEvent<HTMLElement>) => {
    if (!magnetic) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    setOffset({ x: x * 0.18, y: y * 0.28 })
  }
  const reset = () => setOffset({ x: 0, y: 0 })

  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className} ${
    variant === 'primary'
      ? 'hover:shadow-[0_0_0_4px_rgba(91,106,247,0.18),0_6px_28px_rgba(91,106,247,0.35),inset_0_1px_0_rgba(255,255,255,0.15)]'
      : ''
  }`

  const motionProps = {
    animate: { x: offset.x, y: offset.y },
    transition: { type: 'spring' as const, stiffness: 220, damping: 18, mass: 0.6 },
    whileHover: { scale: magnetic ? 1 : 1.02 },
    whileTap: { scale: 0.97 },
    onMouseMove: handleMove,
    onMouseLeave: reset,
    className: classes,
    'aria-label': ariaLabel,
  }

  if (href) {
    return (
      <motion.a href={href} {...motionProps}>
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button type="button" onClick={onClick} {...motionProps}>
      {children}
    </motion.button>
  )
}

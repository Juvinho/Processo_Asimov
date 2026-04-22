'use client'

import { motion, useInView, type Variants } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 28, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

export function RevealWrapper({
  children,
  delay = 0,
  className,
  as = 'div',
}: {
  children: ReactNode
  delay?: number
  className?: string
  as?: 'div' | 'section' | 'header' | 'article'
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const MotionTag = motion[as] as typeof motion.div

  return (
    <MotionTag
      ref={ref}
      variants={defaultVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{ duration: 0.65, ease, delay }}
      className={className}
    >
      {children}
    </MotionTag>
  )
}

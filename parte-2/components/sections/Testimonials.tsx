'use client'

import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { memo } from 'react'
import { RevealWrapper } from '@/components/ui/RevealWrapper'

type Testimonial = {
  quote: string
  name: string
  role: string
  initials: string
  gradient: string
}

const ITEMS: Testimonial[] = [
  {
    quote:
      'Comecei do zero e em 6 meses já estava trabalhando como dev. O foco em projetos reais desde o início muda completamente o ritmo.',
    name: 'Lucas M.',
    role: 'Analista de Dados · SP',
    initials: 'LM',
    gradient: 'linear-gradient(135deg, #5b6af7, #9b59f5)',
  },
  {
    quote:
      'Os projetos com IA me diferenciaram no mercado logo no primeiro mês. Cheguei em entrevista já com coisa publicada no GitHub.',
    name: 'Fernanda R.',
    role: 'Dev Jr. · RJ',
    initials: 'FR',
    gradient: 'linear-gradient(135deg, #3ecf8e, #2bb67a)',
  },
  {
    quote:
      'A comunidade e o suporte são incríveis. Nunca me senti sozinho — e isso é raro em curso online, ainda mais para quem muda de área.',
    name: 'Carlos E.',
    role: 'Engenheiro de Software · MG',
    initials: 'CE',
    gradient: 'linear-gradient(135deg, #f5a623, #e07d20)',
  },
]

function TiltCard({ t }: { t: Testimonial }) {
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 }
  const springX = useSpring(mouseX, springConfig)
  const springY = useSpring(mouseY, springConfig)

  const rotateX = useTransform(springY, [0, 1], [8, -8])
  const rotateY = useTransform(springX, [0, 1], [-8, 8])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width)
    mouseY.set((e.clientY - rect.top) / rect.height)
  }

  const handleMouseLeave = () => {
    mouseX.set(0.5)
    mouseY.set(0.5)
  }

  return (
    <div style={{ perspective: 1000 }} className="h-full">
      <motion.article
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY }}
        whileHover={{ scale: 1.02, borderColor: 'rgba(255,255,255,0.14)' }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="flex h-full flex-col gap-6 rounded-2xl border border-border bg-bg-card p-7 transition-colors hover:bg-bg-hover relative overflow-hidden"
      >
        <span
          aria-hidden
          className="font-display text-7xl leading-[0.5] text-accent/30 drop-shadow-lg"
        >
          &ldquo;
        </span>
        <blockquote className="flex-1 text-[1.0625rem] leading-snug tracking-[-0.01em] text-text-primary z-10">
          {t.quote}
        </blockquote>
        <div className="flex items-center gap-3 border-t border-border-subtle pt-5 z-10">
          <span
            aria-hidden
            className="grid h-10 w-10 place-items-center rounded-full text-[0.8125rem] font-semibold text-white shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
            style={{ background: t.gradient }}
          >
            {t.initials}
          </span>
          <div>
            <div className="text-[0.9375rem] font-medium">{t.name}</div>
            <div className="text-[0.8125rem] text-text-muted">{t.role}</div>
          </div>
        </div>
      </motion.article>
    </div>
  )
}

export const Testimonials = memo(function Testimonials() {
  return (
    <section id="alunos" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6">
        <RevealWrapper>
          <div className="mb-12 max-w-[680px]">
            <span className="mb-3 inline-block font-mono text-[0.7rem] uppercase tracking-[0.1em] text-accent">
              ALUNOS
            </span>
            <h2 className="text-[clamp(2rem,1.2rem+2.5vw,3.5rem)] font-medium leading-[1.08] tracking-[-0.03em]">
              O que nossos{' '}
              <em className="inline-block font-display font-normal animate-shimmer bg-[linear-gradient(110deg,#cfd3ff,45%,#ffffff,55%,#a69bff)] bg-[length:250%_100%] bg-clip-text text-transparent">alunos dizem</em>
            </h2>
          </div>
        </RevealWrapper>

        <div
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-4 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0 md:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {ITEMS.map((t, i) => (
            <RevealWrapper
              key={t.name}
              delay={i * 0.1}
              className="min-w-[85vw] snap-start md:min-w-0"
            >
              <TiltCard t={t} />
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  )
})

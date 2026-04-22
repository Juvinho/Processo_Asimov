'use client'

import { motion } from 'framer-motion'

import { ArrowRight, Check } from 'lucide-react'
import { memo } from 'react'
import { Button } from '@/components/ui/Button'
import { RevealWrapper } from '@/components/ui/RevealWrapper'

const BADGES = ['Sem compromisso', 'Acesso imediato', 'Suporte incluso']

export const FinalCTA = memo(function FinalCTA() {
  return (
    <section id="comecar" className="relative overflow-hidden py-32 md:py-40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="h-[400px] w-[600px] rounded-full bg-accent/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-[760px] px-6 text-center">
        <RevealWrapper>
          <h2 className="text-[clamp(2rem,1.2rem+2.5vw,3.5rem)] font-medium leading-[1.1] tracking-[-0.03em]">
            Pronto para começar sua{' '}
            <em className="inline-block font-display font-normal animate-shimmer bg-[linear-gradient(110deg,#cfd3ff,45%,#ffffff,55%,#a69bff)] bg-[length:250%_100%] bg-clip-text text-transparent">jornada</em>?
          </h2>
        </RevealWrapper>
        <RevealWrapper delay={0.1}>
          <p className="mx-auto mt-5 max-w-[520px] text-[clamp(1rem,0.95rem+0.25vw,1.125rem)] text-text-muted">
            Junte-se a mais de 20.000 alunos que já transformaram suas carreiras com Python.
          </p>
        </RevealWrapper>
        <RevealWrapper delay={0.2}>
          <div className="mt-9 flex justify-center">
            <div className="relative">
              <motion.div
                className="absolute -inset-2 rounded-full bg-accent/20 blur-xl"
                animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0.25, 0.5] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                aria-hidden
              />
              <Button href="#comecar" variant="primary" size="xl" magnetic>
                Quero começar agora
                <ArrowRight className="h-[18px] w-[18px]" />
              </Button>
            </div>
          </div>
        </RevealWrapper>
        <RevealWrapper delay={0.3}>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-[0.8125rem] text-text-faint">
            {BADGES.map((b, i) => (
              <span key={b} className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-success" />
                {b}
                {i < BADGES.length - 1 && <span className="ml-4 text-text-faint">·</span>}
              </span>
            ))}
          </div>
        </RevealWrapper>
      </div>
    </section>
  )
})

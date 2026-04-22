'use client'

import { memo } from 'react'
import { RevealWrapper } from '@/components/ui/RevealWrapper'
import { CounterNumber } from '@/components/ui/CounterNumber'

type Stat = {
  value: React.ReactNode
  label: string
}

const STATS: Stat[] = [
  {
    value: (
      <>
        <span className="text-accent">+</span>
        <CounterNumber target={40} />h
      </>
    ),
    label: 'de conteúdo direto ao ponto',
  },
  {
    value: (
      <>
        <span className="text-accent">+</span>
        <CounterNumber target={20000} format="thousands" />
      </>
    ),
    label: 'alunos ativos na comunidade',
  },
  {
    value: (
      <>
        <CounterNumber target={100} />%
      </>
    ),
    label: 'prático e aplicado',
  },
  {
    value: (
      <>
        <span className="text-accent">#</span>
        <CounterNumber target={1} />
      </>
    ),
    label: 'escola de Python do Brasil',
  },
]

export const Stats = memo(function Stats() {
  return (
    <section className="relative border-y border-border bg-bg-surface/70 py-12 backdrop-blur-sm">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(91,106,247,0.05), transparent 70%)',
        }}
      />
      <div className="relative mx-auto max-w-[1200px] px-6">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-3">
          {STATS.map((s, i) => (
            <RevealWrapper key={i} delay={i * 0.08}>
              <div
                className={`px-4 py-2 md:border-l md:border-border ${
                  i === 0 ? 'md:border-l-0' : ''
                }`}
              >
                <div className="text-[clamp(2rem,1.2rem+2.5vw,3.5rem)] font-semibold leading-none tracking-[-0.035em] bg-gradient-to-br from-white to-[#b7beff] bg-clip-text text-transparent">
                  {s.value}
                </div>
                <div className="mt-2 text-[clamp(0.875rem,0.8rem+0.35vw,1rem)] text-text-muted">
                  {s.label}
                </div>
              </div>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  )
})

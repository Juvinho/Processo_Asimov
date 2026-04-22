'use client'

import { motion, useMotionValue, useMotionTemplate } from 'framer-motion'
import { Lock } from 'lucide-react'
import { memo } from 'react'
import { RevealWrapper } from '@/components/ui/RevealWrapper'

type Module = {
  num: string
  title: string
  description: string
  tags: string[]
  badge: { label: string; variant: 'success' | 'accent' | 'muted' }
  locked?: boolean
  wide?: boolean
}

const MODULES: Module[] = [
  {
    num: '01',
    title: 'Fundamentos de Python',
    description:
      'Sintaxe, variáveis, funções e o mindset de resolver problemas em código. Base sólida sem pular etapas.',
    tags: ['8h', '12 projetos'],
    badge: { label: 'Iniciante', variant: 'success' },
  },
  {
    num: '02',
    title: 'Estruturas de Dados e Algoritmos',
    description:
      'Listas, dicionários, recursão e complexidade. O tipo de base que separa quem sabe Python de quem só copia código.',
    tags: ['10h', 'exercícios guiados'],
    badge: { label: 'Iniciante+', variant: 'success' },
  },
  {
    num: '03',
    title: 'Python para IA e Machine Learning',
    description:
      'NumPy, Pandas, Scikit-learn e os primeiros modelos de ML. Aqui Python vira ferramenta de verdade para dados e IA.',
    tags: ['12h', 'dados reais'],
    badge: { label: 'Intermediário', variant: 'accent' },
  },
  {
    num: '04',
    title: 'Projetos Reais com LLMs e APIs',
    description:
      'Construa assistentes, chatbots e automações com OpenAI, LangChain e APIs de terceiros. Do protótipo ao produto.',
    tags: ['7h', '3 projetos completos'],
    badge: { label: 'Avançado', variant: 'accent' },
    locked: true,
  },
  {
    num: '05',
    title: 'Deploy e Portfólio Profissional',
    description:
      'Leve seus projetos para a nuvem, publique no GitHub com README decente e monte um portfólio que realmente conversa com recrutadores.',
    tags: ['5h', 'portfólio guiado', 'mentoria de carreira'],
    badge: { label: 'Avançado', variant: 'accent' },
    locked: true,
    wide: true,
  },
]

function Badge({ label, variant }: { label: string; variant: 'success' | 'accent' | 'muted' }) {
  const styles = {
    success: 'text-success border-success/20 bg-success/5',
    accent: 'text-accent border-accent/25 bg-accent/5',
    muted: 'text-text-muted border-border bg-white/[0.02]',
  }[variant]
  return (
    <span
      className={`inline-block rounded-full border px-2.5 py-1 font-mono text-[0.7rem] ${styles}`}
    >
      {label}
    </span>
  )
}

function ModuleCard({ m }: { m: Module }) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <motion.article
      onMouseMove={handleMouseMove}
      whileHover={{ y: -3, borderColor: 'rgba(255,255,255,0.14)' }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative overflow-hidden rounded-2xl border border-border bg-bg-card p-7 transition-colors hover:bg-bg-hover ${
        m.locked ? 'opacity-70' : ''
      } h-full`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px z-0 rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(255,255,255,0.06),
              transparent 80%
            )
          `,
        }}
      />
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-4 flex items-start justify-between">
          <motion.span
            className="font-mono text-[0.72rem] tracking-[0.08em] text-text-faint"
            whileHover={{ scale: 1.1, color: '#5b6af7' }}
            transition={{ duration: 0.25 }}
          >
            MÓDULO {m.num}
          </motion.span>
          {m.locked && (
            <span
              className="text-text-faint"
              title="Disponível após matrícula"
              aria-label="Módulo bloqueado — disponível após matrícula"
            >
              <Lock className="h-4 w-4" />
            </span>
          )}
        </div>
        <h3 className="text-[1.1875rem] font-medium tracking-[-0.02em]">{m.title}</h3>
        <p className="mt-2 text-[0.9375rem] leading-snug text-text-muted flex-grow">
          {m.description}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Badge label={m.badge.label} variant={m.badge.variant} />
          {m.tags.map((t) => (
            <Badge key={t} label={t} variant="muted" />
          ))}
        </div>
      </div>
    </motion.article>
  )
}

export const Curriculum = memo(function Curriculum() {
  return (
    <section id="curriculo" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6">
        <RevealWrapper>
          <div className="mb-12 max-w-[680px]">
            <span className="mb-3 inline-block font-mono text-[0.7rem] uppercase tracking-[0.1em] text-accent">
              CURRÍCULO
            </span>
            <h2 className="text-[clamp(2rem,1.2rem+2.5vw,3.5rem)] font-medium leading-[1.08] tracking-[-0.03em]">
              O que você{' '}
              <em className="inline-block font-display font-normal animate-shimmer bg-[linear-gradient(110deg,#cfd3ff,45%,#ffffff,55%,#a69bff)] bg-[length:250%_100%] bg-clip-text text-transparent">vai aprender</em>
            </h2>
            <p className="mt-4 max-w-[560px] text-[clamp(1rem,0.95rem+0.25vw,1.125rem)] text-text-muted">
              Cinco módulos em ordem de progressão: do primeiro{' '}
              <code className="font-mono text-[0.9em] text-accent">print()</code> até um portfólio
              pronto para aplicar em vagas.
            </p>
          </div>
        </RevealWrapper>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {MODULES.map((m, i) => (
            <RevealWrapper
              key={m.num}
              delay={i * 0.08}
              className={m.wide ? 'md:col-span-2' : ''}
            >
              <ModuleCard m={m} />
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  )
})

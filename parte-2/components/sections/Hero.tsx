'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Star } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { CodeEditor } from '@/components/ui/CodeEditor'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 32, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
}

const AVATARS = [
  { initials: 'LM', from: '#5b6af7', to: '#9b59f5' },
  { initials: 'FR', from: '#3ecf8e', to: '#2bb67a' },
  { initials: 'CE', from: '#f5a623', to: '#e07d20' },
  { initials: 'AM', from: '#ff6b9d', to: '#c44569' },
  { initials: 'RB', from: '#4ecdc4', to: '#2a9d8f' },
]

export function Hero() {
  return (
    <section className="relative pt-[calc(4rem+5rem)] pb-24 md:pb-32">
      <div className="mx-auto max-w-[1200px] px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid items-center gap-16 md:grid-cols-[1.05fr_1fr]"
        >
          <div>
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-3 py-1 font-mono text-xs text-text-primary shadow-[0_0_0_4px_rgba(91,106,247,0.04),inset_0_1px_0_rgba(255,255,255,0.05)]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_12px_#5b6af7]" />
              <span>[ Python + Inteligência Artificial ]</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="mt-6 text-[clamp(2.8rem,0.5rem+6vw,5.5rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-text-primary"
            >
              Aprenda Python do zero e
              <br />construa{' '}
              <em className="inline-block font-display font-normal animate-shimmer bg-[linear-gradient(110deg,#cfd3ff,45%,#ffffff,55%,#a69bff)] bg-[length:250%_100%] bg-clip-text text-transparent">
                projetos reais
              </em>{' '}
              com IA
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-5 max-w-[560px] text-[clamp(1.125rem,1rem+0.75vw,1.5rem)] leading-snug text-text-muted"
            >
              O curso mais prático do Brasil para quem quer entrar em tecnologia sem enrolação
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="mt-4 max-w-[680px] text-sm text-text-muted"
            >
              +40 horas de conteúdo direto ao ponto · Projetos com Python + IA desde o módulo 1 ·
              Suporte da comunidade com +20.000 alunos · Certificado reconhecido pelo mercado
            </motion.p>

            <motion.div variants={itemVariants} className="mt-9 flex flex-wrap items-center gap-4">
              <Button href="#comecar" variant="primary" size="lg" magnetic>
                Quero começar agora
                <ArrowRight className="h-4 w-4" />
              </Button>
              <a
                href="#curriculo"
                className="group inline-flex items-center gap-2 px-1 text-[0.9375rem] font-medium text-text-primary transition-colors"
              >
                Ver o que vou aprender
                <ArrowRight className="h-[18px] w-[18px] text-text-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:text-text-primary" />
              </a>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-wrap items-center gap-5 border-t border-border-subtle pt-6"
            >
              <div className="flex" aria-hidden="true">
                {AVATARS.map((a, i) => (
                  <span
                    key={i}
                    className="-ml-2.5 grid h-[34px] w-[34px] place-items-center rounded-full border-2 border-bg-deep text-xs font-semibold text-white first:ml-0"
                    style={{
                      background: `linear-gradient(135deg, ${a.from}, ${a.to})`,
                    }}
                  >
                    {a.initials}
                  </span>
                ))}
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-medium text-text-primary">
                  +20.000 alunos já transformaram suas carreiras
                </span>
                <span className="flex items-center gap-1.5 text-[0.8125rem] text-text-muted">
                  <Star className="h-3.5 w-3.5 fill-[#f5a623] text-[#f5a623]" />
                  4.9 · avaliação média
                </span>
              </div>
            </motion.div>
          </div>

          <div className="md:pl-4">
            <CodeEditor />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

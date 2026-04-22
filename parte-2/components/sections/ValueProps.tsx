'use client'

import { motion, useMotionValue, useMotionTemplate } from 'framer-motion'
import { memo } from 'react'
import { RevealWrapper } from '@/components/ui/RevealWrapper'

function IconClock() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  )
}
function IconSpark() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden
    >
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}
function IconUsers() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}
function IconCertificate() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden
    >
      <circle cx="12" cy="8" r="7" />
      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
    </svg>
  )
}
function IconRefresh() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden
    >
      <polyline points="23 4 23 10 17 10" />
      <polyline points="1 20 1 14 7 14" />
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
    </svg>
  )
}

function Icon({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid h-11 w-11 place-items-center rounded-[12px] border border-border-bright bg-white/[0.03] text-accent">
      {children}
    </div>
  )
}

function Card({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
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
      whileHover={{ y: -4, borderColor: 'rgba(255,255,255,0.14)' }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative rounded-2xl border border-border bg-bg-card p-6 transition-colors hover:bg-bg-hover overflow-hidden ${className}`}
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
      <div className="relative z-10 h-full flex flex-col justify-[inherit]">
        {children}
      </div>
    </motion.article>
  )
}

export const ValueProps = memo(function ValueProps() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1200px] px-6">
        <RevealWrapper>
          <div className="mb-12 max-w-[680px]">
            <span className="mb-3 inline-block font-mono text-[0.7rem] uppercase tracking-[0.1em] text-accent">
              POR QUE ASIMOV
            </span>
            <h2 className="text-[clamp(2rem,1.2rem+2.5vw,3.5rem)] font-medium leading-[1.08] tracking-[-0.03em]">
              Por que a Asimov é{' '}
              <em className="inline-block font-display font-normal animate-shimmer bg-[linear-gradient(110deg,#cfd3ff,45%,#ffffff,55%,#a69bff)] bg-[length:250%_100%] bg-clip-text text-transparent">diferente</em>?
            </h2>
            <p className="mt-4 max-w-[560px] text-[clamp(1rem,0.95rem+0.25vw,1.125rem)] text-text-muted">
              Cada decisão do curso é pensada para te colocar em projetos reais o mais rápido
              possível — sem vídeos eternos, sem teoria solta.
            </p>
          </div>
        </RevealWrapper>

        {/* Bento grid:
            col 1: BIG card spanning 2 rows
            col 2: card 2
            col 3: card 3
            row 2: card 4 (under card 2), card 5 wide (col 1 + col 2)
        */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:grid-rows-2">
          <RevealWrapper delay={0.05} className="md:col-span-1 md:row-span-2">
            <Card className="relative flex h-full flex-col justify-between overflow-hidden !p-8">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-12 -top-16 h-64 w-64 rounded-full bg-accent/15 blur-3xl"
              />
              <div className="relative">
                <Icon>
                  <IconClock />
                </Icon>
                <h3 className="mt-6 max-w-[360px] text-[clamp(1.5rem,1rem+2vw,2rem)] font-medium leading-[1.1] tracking-[-0.02em]">
                  +40 horas de conteúdo{' '}
                  <em className="font-display font-normal text-[#cfd3ff]">direto ao ponto</em>
                </h3>
                <p className="mt-4 max-w-[420px] text-text-muted">
                  Sem rodeios. Cada aula foi construída para levar você ao próximo nível o mais
                  rápido possível.
                </p>
              </div>
              <div className="relative mt-8 flex flex-wrap items-center gap-2 font-mono text-[0.72rem] text-text-muted">
                {['APIs', 'LLMs', 'Data', 'Automação'].map((p) => (
                  <span
                    key={p}
                    className="rounded-full border border-border bg-white/[0.02] px-2.5 py-1"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </Card>
          </RevealWrapper>

          <RevealWrapper delay={0.1}>
            <Card className="h-full">
              <Icon>
                <IconSpark />
              </Icon>
              <h3 className="mt-5 text-[1.0625rem] font-medium tracking-[-0.015em]">
                Projetos com Python + IA desde o módulo 1
              </h3>
              <p className="mt-2 text-[0.9375rem] leading-snug text-text-muted">
                Você não espera meses para ver algo funcionar. No módulo 1 já está construindo.
              </p>
            </Card>
          </RevealWrapper>

          <RevealWrapper delay={0.15}>
            <Card className="h-full">
              <Icon>
                <IconUsers />
              </Icon>
              <h3 className="mt-5 text-[1.0625rem] font-medium tracking-[-0.015em]">
                Suporte da comunidade com +20.000 alunos
              </h3>
              <p className="mt-2 text-[0.9375rem] leading-snug text-text-muted">
                Uma comunidade ativa que responde dúvidas, compartilha projetos e abre portas.
              </p>
            </Card>
          </RevealWrapper>

          <RevealWrapper delay={0.2}>
            <Card className="h-full">
              <Icon>
                <IconCertificate />
              </Icon>
              <h3 className="mt-5 text-[1.0625rem] font-medium tracking-[-0.015em]">
                Certificado reconhecido pelo mercado
              </h3>
              <p className="mt-2 text-[0.9375rem] leading-snug text-text-muted">
                Assinatura de uma escola referência em Python no Brasil, aceita por empresas que
                contratam dev de verdade.
              </p>
            </Card>
          </RevealWrapper>

          <RevealWrapper delay={0.25}>
            <Card className="h-full">
              <Icon>
                <IconRefresh />
              </Icon>
              <h3 className="mt-5 text-[1.0625rem] font-medium tracking-[-0.015em]">
                Conteúdo atualizado constantemente
              </h3>
              <p className="mt-2 text-[0.9375rem] leading-snug text-text-muted">
                Python e IA evoluem rápido. Nosso currículo também.
              </p>
            </Card>
          </RevealWrapper>
        </div>
      </div>
    </section>
  )
})

'use client'

import { motion } from 'framer-motion'
import { memo, useState } from 'react'

type LogoProps = {
  idSuffix: string
}

function OpenAI() {
  return (
    <svg viewBox="0 0 80 24" fill="none" className="h-6 w-auto">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12 6 C16 6 18 9 18 12 C18 15 16 18 12 18 C8 18 6 15 6 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <text x="26" y="16" fontFamily="Inter" fontSize="11" fontWeight="500" fill="currentColor">
        OpenAI
      </text>
    </svg>
  )
}

function Gemini({ idSuffix }: LogoProps) {
  return (
    <svg viewBox="0 0 88 24" fill="none" className="h-6 w-auto">
      <path
        d="M12 3 C12 7.5 15.5 11 20 11 C15.5 11 12 14.5 12 19 C12 14.5 8.5 11 4 11 C8.5 11 12 7.5 12 3Z"
        fill={`url(#gemGrad-${idSuffix})`}
      />
      <defs>
        <linearGradient id={`gemGrad-${idSuffix}`} x1="4" y1="3" x2="20" y2="19">
          <stop offset="0%" stopColor="#4285f4" />
          <stop offset="100%" stopColor="#9b59f5" />
        </linearGradient>
      </defs>
      <text x="28" y="16" fontFamily="Inter" fontSize="11" fontWeight="500" fill="currentColor">
        Gemini
      </text>
    </svg>
  )
}

function Claude() {
  return (
    <svg viewBox="0 0 88 24" fill="none" className="h-6 w-auto">
      <path d="M6 19 L12 5 L18 19" stroke="#d97757" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.5 14 H15.5" stroke="#d97757" strokeWidth="2" strokeLinecap="round" />
      <text x="26" y="16" fontFamily="Inter" fontSize="11" fontWeight="500" fill="currentColor">
        Claude
      </text>
    </svg>
  )
}

function Llama({ idSuffix }: LogoProps) {
  return (
    <svg viewBox="0 0 80 24" fill="none" className="h-6 w-auto">
      <path
        d="M4 12 C4 9 6 7 9 7 C12 7 14 10 16 12 C18 14 20 17 23 17 C26 17 28 15 28 12 C28 9 26 7 23 7 C20 7 18 10 16 12 C14 14 12 17 9 17 C6 17 4 15 4 12Z"
        stroke={`url(#metaGrad-${idSuffix})`}
        strokeWidth="2"
        fill="none"
      />
      <defs>
        <linearGradient id={`metaGrad-${idSuffix}`} x1="4" y1="7" x2="28" y2="17">
          <stop offset="0%" stopColor="#0081fb" />
          <stop offset="100%" stopColor="#0064e0" />
        </linearGradient>
      </defs>
      <text x="36" y="16" fontFamily="Inter" fontSize="11" fontWeight="500" fill="currentColor">
        LLaMA
      </text>
    </svg>
  )
}

function HuggingFace() {
  return (
    <svg viewBox="0 0 104 24" fill="none" className="h-6 w-auto">
      <circle cx="12" cy="12" r="9" fill="#FFD21E" opacity="0.9" />
      <circle cx="9" cy="11" r="1.2" fill="#1a1a1a" />
      <circle cx="15" cy="11" r="1.2" fill="#1a1a1a" />
      <path d="M9 15 Q12 17.5 15 15" stroke="#1a1a1a" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      <text x="26" y="16" fontFamily="Inter" fontSize="11" fontWeight="500" fill="currentColor">
        Hugging Face
      </text>
    </svg>
  )
}

function Mistral() {
  return (
    <svg viewBox="0 0 72 24" fill="none" className="h-6 w-auto">
      <rect x="3" y="7" width="5" height="10" rx="1" fill="#ff7000" />
      <rect x="10" y="7" width="5" height="10" rx="1" fill="#ff7000" opacity="0.75" />
      <rect x="17" y="7" width="5" height="10" rx="1" fill="#ff7000" opacity="0.5" />
      <text x="26" y="16" fontFamily="Inter" fontSize="11" fontWeight="500" fill="currentColor">
        Mistral
      </text>
    </svg>
  )
}

const LOGOS = [
  (key: string) => <OpenAI key={key} />,
  (key: string) => <Gemini key={key} idSuffix={key} />,
  (key: string) => <Claude key={key} />,
  (key: string) => <Llama key={key} idSuffix={key} />,
  (key: string) => <HuggingFace key={key} />,
  (key: string) => <Mistral key={key} />,
]

export const AIShowcase = memo(function AIShowcase() {
  const [paused, setPaused] = useState(false)

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8 max-w-3xl">
          <h2 className="text-3xl font-medium tracking-tight md:text-5xl">
            Construa com as IAs mais poderosas do mundo
          </h2>
          <p className="mt-4 text-lg text-text-muted">
            Python é a linguagem que conecta você a todas elas.
          </p>
        </div>

        <div
          className="group relative overflow-hidden rounded-2xl border border-border bg-bg-surface/50 py-7 backdrop-blur-md"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            aria-hidden
            className="absolute left-1/2 top-1/2 -z-10 h-[120%] w-[30%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/30 blur-[60px] animate-pulse-dot opacity-80 transition-opacity duration-500 group-hover:opacity-100"
          />

          <motion.div
            className="relative z-10 flex w-max items-center gap-16 px-6 text-text-faint transition-colors duration-300 hover:text-text-primary"
            animate={paused ? { x: '-25%' } : { x: ['0%', '-50%'] }}
            transition={paused ? { duration: 0.2 } : { duration: 25, ease: 'linear', repeat: Infinity }}
          >
            {[...LOGOS, ...LOGOS].map((Logo, index) => (
              <div key={index} className="flex-shrink-0">
                {Logo(`logo-${index}`)}
              </div>
            ))}
          </motion.div>
        </div>

        <p className="mt-5 text-sm text-text-faint">
          E muito mais — LangChain, Stable Diffusion, TensorFlow, PyTorch...
        </p>
      </div>
    </section>
  )
})

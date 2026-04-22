'use client'

import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'framer-motion'
import { useRef, useState } from 'react'
import React from 'react'

const stages = [
  {
    lines: [
      `print("Olá, mundo!")`,
    ],
    explanation: {
      title: "Uma linha. Já funciona.",
      body: "Com Python, você não precisa configurar nada. Escreve, roda, vê o resultado. É assim que começa.",
    },
  },
  {
    lines: [
      `print("Olá, mundo!")`,
      `nome = input("Seu nome: ")`,
      `print(f"Bem-vindo, {nome}!")`,
    ],
    explanation: {
      title: "Variáveis guardam qualquer coisa.",
      body: "Textos, números, listas — tudo cabe numa variável. E f-strings deixam você misturar tudo numa linha só.",
    },
  },
  {
    lines: [
      `print("Olá, mundo!")`,
      `nome = input("Seu nome: ")`,
      `print(f"Bem-vindo, {nome}!")`,
      ``,
      `for i in range(1, 6):`,
      `    print(f"  Aula {i} concluída ✓")`,
    ],
    explanation: {
      title: "Loops repetem qualquer tarefa.",
      body: "Em 2 linhas, Python executa algo 5 vezes — ou 5 milhões. A lógica é a mesma.",
    },
  },
  {
    lines: [
      `print("Olá, mundo!")`,
      `nome = input("Seu nome: ")`,
      `print(f"Bem-vindo, {nome}!")`,
      ``,
      `for i in range(1, 6):`,
      `    print(f"  Aula {i} concluída ✓")`,
      ``,
      `import openai`,
      ``,
      `client = openai.OpenAI()`,
      `resposta = client.chat.completions.create(`,
      `    model="gpt-4o",`,
      `    messages=[{"role": "user", "content": "Explique ML"}]`,
      `)`,
      `print(resposta.choices[0].message.content)`,
    ],
    explanation: {
      title: "Python fala com qualquer IA.",
      body: "Com a biblioteca oficial da OpenAI, você conecta seu código ao GPT-4 em menos de 10 linhas. Isso é o que o mercado quer.",
    },
  },
  {
    lines: [
      `print("Olá, mundo!")`,
      `nome = input("Seu nome: ")`,
      `print(f"Bem-vindo, {nome}!")`,
      ``,
      `for i in range(1, 6):`,
      `    print(f"  Aula {i} concluída ✓")`,
      ``,
      `import openai`,
      ``,
      `client = openai.OpenAI()`,
      `resposta = client.chat.completions.create(`,
      `    model="gpt-4o",`,
      `    messages=[{"role": "user", "content": "Explique ML"}]`,
      `)`,
      `print(resposta.choices[0].message.content)`,
      ``,
      `# É isso. Python + IA. Do zero ao mercado.`,
    ],
    explanation: {
      title: "É isso. Do zero ao mercado.",
      body: "Você acabou de ver o essencial de Python: output, variáveis, loops e integração com IA — tudo que você vai dominar no curso.",
    },
  },
]

function highlightPython(line: string): React.ReactNode {
  if (line === '') return <br />

  const patterns: [RegExp, string][] = [
    [/^(#.*)/, 'text-[#6272a4]'],
    [/^("""[\s\S]*?"""|'''[\s\S]*?'''|"[^"]*"|'[^']*')/, 'text-[#f1fa8c]'],
    [/^(\b(?:import|from|for|in|if|else|elif|while|def|class|return|with|as|pass|break|continue|and|or|not|True|False|None)\b)/, 'text-[#ff79c6] font-medium'],
    [/^(\b(?:print|input|range|len|str|int|float|list|dict|type|open|super|isinstance)\b)/, 'text-[#50fa7b]'],
    [/^(\b[a-zA-Z_][a-zA-Z0-9_]*(?=\s*\())/, 'text-[#50fa7b]'],
    [/^(\b\d+\.?\d*\b)/, 'text-[#bd93f9]'],
    [/^([=+\-*/<>!%&|^~:,.]+)/, 'text-[#ffb86c]'],
    [/^([a-zA-Z_][a-zA-Z0-9_]*)/, 'text-[#8be9fd]'],
    [/^(\s+)/, ''],
    [/^([^\s\w])/, 'text-[#f8f8f2]'],
  ]

  const nodes: React.ReactNode[] = []
  let remaining = line
  let key = 0

  while (remaining.length > 0) {
    let matched = false
    for (const [pattern, cls] of patterns) {
      const match = remaining.match(pattern)
      if (match) {
        const text = match[1]
        nodes.push(
          cls
            ? <span key={key++} className={cls}>{text}</span>
            : <span key={key++}>{text}</span>
        )
        remaining = remaining.slice(text.length)
        matched = true
        break
      }
    }
    if (!matched) {
      nodes.push(<span key={key++} className="text-[#f8f8f2]">{remaining}</span>)
      remaining = remaining.slice(1)
    }
  }

  return <>{nodes}</>
}

export function ScrollStory() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] })
  const [currentStage, setCurrentStage] = useState(0)

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    const next = Math.max(0, Math.min(4, Math.floor(value * 5)))
    setCurrentStage(next)
  })

  const tint = useTransform(scrollYProgress, [0, 1], ['rgba(91,106,247,0.08)', 'rgba(62,207,142,0.1)'])
  const sectionStyle = useMotionTemplate`radial-gradient(circle at 30% 10%, ${tint}, transparent 55%)`

  const stage = stages[currentStage]
  const glowIntensity = (currentStage / 4) * 0.25 + 0.1

  let lastNonEmptyIndex = -1;
  for (let i = stage.lines.length - 1; i >= 0; i--) {
    if (stage.lines[i] !== '') {
      lastNonEmptyIndex = i;
      break;
    }
  }

  return (
    <section ref={containerRef} className="relative h-[400vh]" id="story">
      <motion.div
        className="sticky top-0 flex h-screen items-center"
        style={{ backgroundImage: sectionStyle }}
      >
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 md:grid-cols-[1.2fr_0.8fr]">
          <motion.div 
            className="rounded-2xl border border-border bg-[#111113]/85 p-5 transition-shadow duration-500 backdrop-blur-xl md:p-7"
            style={{ boxShadow: `0 0 80px rgba(91,106,247,${glowIntensity})` }}
          >
            <div className="mb-4 flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
              <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
              <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
            </div>
            <div className="space-y-1 rounded-xl border border-white/5 bg-[#0f111a] p-5 relative overflow-hidden hidden-scrollbar">
              {stage.lines.map((line, i) => {
                const isActiveLine = i === lastNonEmptyIndex;

                return (
                  <motion.div
                    key={`line-${i}-${currentStage}`}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1], delay: i * 0.04 }}
                    className={`flex items-start gap-4 font-mono text-sm leading-relaxed transition-colors duration-300 ${
                      isActiveLine ? 'bg-white/[0.03] rounded -mx-2 px-2' : 'px-0'
                    }`}
                  >
                    <span className="select-none text-[#44444d] w-4 text-right flex-shrink-0 mt-px">
                      {line === '' ? '' : i + 1}
                    </span>
                    <pre className="m-0 p-0 bg-transparent text-left flex-1 whitespace-pre flex-wrap relative">
                      {highlightPython(line)}
                      {isActiveLine && (
                        <span className="inline-block w-[2px] h-[1.1em] bg-accent ml-0.5 align-middle animate-[blink_1s_step-end_infinite]" />
                      )}
                    </pre>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          <div className="flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={stage.explanation.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-2xl border border-border bg-bg-card/80 p-6 backdrop-blur w-full"
              >
                <div className="space-y-4">
                  <div className="flex gap-1.5">
                    {stages.map((_, i) => (
                      <div
                        key={i}
                        className={`h-1 rounded-full transition-all duration-500 ${
                          i === currentStage
                            ? 'w-6 bg-accent'
                            : i < currentStage
                            ? 'w-2 bg-accent/40'
                            : 'w-2 bg-white/10'
                        }`}
                      />
                    ))}
                  </div>

                  <p className="font-mono text-xs text-accent/60 tracking-widest uppercase">
                    Conceito {currentStage + 1} de {stages.length}
                  </p>

                  <h3 className="font-display italic text-3xl text-text-primary leading-tight">
                    {stage.explanation.title}
                  </h3>

                  <p className="text-text-muted text-base leading-relaxed max-w-sm">
                    {stage.explanation.body}
                  </p>

                  {currentStage > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {['print()', 'variáveis', 'loops', 'openai', 'IA'].slice(0, currentStage + 1).map(tag => (
                        <span
                          key={tag}
                          className="font-mono text-xs px-2 py-1 rounded-full bg-accent/10 text-accent border border-accent/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

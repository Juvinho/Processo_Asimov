'use client'

import { motion } from 'framer-motion'

type Token = { t: string; c?: string }

const LINES: Token[][] = [
  [{ t: 'import', c: 'kw' }, { t: ' openai' }],
  [{ t: 'from', c: 'kw' }, { t: ' asimov ' }, { t: 'import', c: 'kw' }, { t: ' DataPipeline' }],
  [{ t: '' }],
  [{ t: '# Treina um modelo com seus dados', c: 'com' }],
  [
    { t: 'pipeline ' },
    { t: '=', c: 'kw' },
    { t: ' ' },
    { t: 'DataPipeline', c: 'fn' },
    { t: '(' },
    { t: 'source', c: 'var' },
    { t: '=' , c: 'kw' },
    { t: '"csv"', c: 'str' },
    { t: ')' },
  ],
  [
    { t: 'pipeline.' },
    { t: 'preprocess', c: 'fn' },
    { t: '(' },
    { t: 'normalize', c: 'var' },
    { t: '=', c: 'kw' },
    { t: 'True', c: 'num' },
    { t: ')' },
  ],
  [{ t: '' }],
  [
    { t: 'model ' },
    { t: '=', c: 'kw' },
    { t: ' openai.ChatCompletion.' },
    { t: 'create', c: 'fn' },
    { t: '(' },
  ],
  [
    { t: '    ' },
    { t: 'model', c: 'var' },
    { t: '=', c: 'kw' },
    { t: '"gpt-4o"', c: 'str' },
    { t: ',' },
  ],
  [
    { t: '    ' },
    { t: 'messages', c: 'var' },
    { t: '=', c: 'kw' },
    { t: '[{' },
    { t: '"role"', c: 'str' },
    { t: ': ' },
    { t: '"user"', c: 'str' },
    { t: ',' },
  ],
  [
    { t: '               ' },
    { t: '"content"', c: 'str' },
    { t: ': pipeline.data}]' },
  ],
  [{ t: ')' }],
  [{ t: '' }],
  [
    { t: 'print', c: 'fn' },
    { t: '(model.choices.message)' },
  ],
  [{ t: "# Output: {'content': 'Análise concluída ✓'}", c: 'com' }],
]

const colorMap: Record<string, string> = {
  kw: 'text-[#c678dd]',
  fn: 'text-[#61afef]',
  str: 'text-[#98c379]',
  num: 'text-[#d19a66]',
  com: 'text-[#5c6370] italic',
  var: 'text-[#e06c75]',
}

export function CodeEditor() {
  return (
    <div className="relative will-change-transform">
      {/* Floating badge */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -top-6 right-6 z-10 flex items-center gap-2 rounded-full border border-border-bright bg-bg-card/90 px-3.5 py-1.5 text-xs font-medium backdrop-blur"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
        </span>
        <span className="text-text-primary">IA rodando em tempo real</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 40, rotateY: -6 }}
        animate={{ opacity: 1, x: 0, rotateY: 0 }}
        transition={{ delay: 0.7, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ rotateY: 0, rotateX: 0, scale: 1.005 }}
        style={{ transformPerspective: 1200 }}
        className="overflow-hidden rounded-2xl border border-border bg-[#0e0e10] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7),0_0_80px_rgba(91,106,247,0.15)]"
      >
        <div className="flex items-center gap-3 border-b border-border bg-gradient-to-b from-[#151518] to-[#0e0e10] px-4 py-3">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="ml-2 flex items-center gap-2 font-mono text-[11px] text-text-muted">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <path d="M14 2v6h6" />
            </svg>
            main.py
          </div>
        </div>

        <div className="grid grid-cols-[44px_1fr] font-mono text-[13px] leading-[1.75] py-4">
          <div className="select-none border-r border-border-subtle pr-4 text-right text-text-faint">
            {LINES.map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>
          <div className="px-5">
            {LINES.map((tokens, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 1.0 + i * 0.08,
                  duration: 0.4,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="whitespace-pre"
              >
                {tokens.length === 1 && tokens[0].t === '' ? ' ' : null}
                {tokens.map((tok, j) => (
                  <span key={j} className={tok.c ? colorMap[tok.c] : 'text-[#d4d4d8]'}>
                    {tok.t}
                  </span>
                ))}
                {i === LINES.length - 1 && (
                  <span className="ml-0.5 inline-block h-[1.1em] w-[8px] translate-y-[2px] animate-cursor-blink bg-accent align-middle" />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-border bg-[#0b0b0d] px-4 py-2 font-mono text-[11px] text-text-muted">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-success shadow-[0_0_8px_#3ecf8e]" />
            Python 3.12 · rodando
          </span>
          <span>UTF-8 · main</span>
        </div>
      </motion.div>
    </div>
  )
}

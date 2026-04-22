'use client'

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { BrandLogo } from '@/components/BrandLogo'
import { Button } from '@/components/ui/Button'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (value) => {
    setScrolled(value > 40)
  })

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? 'border-b border-border bg-bg-deep/75 backdrop-blur-xl' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <a href="#" className="flex items-center" aria-label="Asimov Academy">
            <BrandLogo className="h-10 w-auto" priority />
          </a>

          <nav className="hidden items-center gap-2 md:flex" aria-label="Navegação principal">
            <a
              href="#curriculo"
              className="group relative rounded-lg px-3 py-2 text-sm text-text-muted transition-colors hover:text-text-primary"
            >
              Currículo
              <span className="absolute inset-x-3 bottom-0.5 h-px origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </a>
            <a
              href="#alunos"
              className="group relative rounded-lg px-3 py-2 text-sm text-text-muted transition-colors hover:text-text-primary"
            >
              Alunos
              <span className="absolute inset-x-3 bottom-0.5 h-px origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </a>
            <Button href="#curriculo" variant="ghost" size="md">
              Ver o que vou aprender
            </Button>
            <Button href="#comecar" variant="primary" size="md" magnetic>
              Quero começar agora
            </Button>
          </nav>

          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-lg border border-border bg-bg-card md:hidden"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-16 z-40 border-b border-border bg-bg-deep/95 p-6 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-3">
              <a href="#curriculo" className="rounded-lg px-3 py-3 text-sm" onClick={() => setOpen(false)}>
                Currículo
              </a>
              <a href="#alunos" className="rounded-lg px-3 py-3 text-sm" onClick={() => setOpen(false)}>
                Alunos
              </a>
              <Button href="#comecar" variant="primary" size="lg" className="w-full" onClick={() => setOpen(false)}>
                Quero começar agora
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

import { memo } from 'react'
import { BrandLogo } from '@/components/BrandLogo'

export const Footer = memo(function Footer() {
  return (
    <footer className="relative border-t border-border-subtle py-10">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <a href="#" className="flex items-center gap-2.5 font-medium">
            <BrandLogo className="h-8 w-auto" />
          </a>
          <nav aria-label="Rodapé" className="flex flex-wrap gap-7 text-sm text-text-muted">
            <a href="#curriculo" className="hover:text-text-primary">
              Cursos
            </a>
            <a href="#alunos" className="hover:text-text-primary">
              Comunidade
            </a>
            <a href="#" className="hover:text-text-primary">
              Blog
            </a>
            <a href="#" className="hover:text-text-primary">
              Sobre
            </a>
          </nav>
        </div>
        <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-border-subtle pt-7 text-[0.8125rem] text-text-faint">
          <span>© 2026 Asimov Academy. Todos os direitos reservados.</span>
          <div className="flex flex-wrap gap-5">
            <a href="#" className="hover:text-text-muted">
              Termos
            </a>
            <a href="#" className="hover:text-text-muted">
              Privacidade
            </a>
            <a href="#" className="hover:text-text-muted">
              Contato
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
})

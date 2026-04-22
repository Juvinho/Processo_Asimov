import type { Metadata } from 'next'
import { Inter, Instrument_Serif, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
})

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Asimov Academy — Aprenda Python do Zero com IA',
  description:
    'O curso mais prático do Brasil para quem quer entrar em tecnologia sem enrolação. Python + IA com projetos reais desde o módulo 1.',
  openGraph: {
    title: 'Asimov Academy — Aprenda Python do Zero com IA',
    description:
      'O curso mais prático do Brasil para quem quer entrar em tecnologia sem enrolação.',
    type: 'website',
    locale: 'pt_BR',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${instrumentSerif.variable} ${jetBrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="font-body">{children}</body>
    </html>
  )
}

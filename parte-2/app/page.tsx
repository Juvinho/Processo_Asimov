'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import dynamic from 'next/dynamic'

const LoadingScreen = dynamic(() => import('@/components/LoadingScreen'), { ssr: false })
const InteractiveBg = dynamic(() => import('@/components/InteractiveBackground'), { ssr: false })
const ClickRipple = dynamic(() => import('@/components/ClickRipple'), { ssr: false })

import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/sections/Hero'
import { ScrollStory } from '@/components/sections/ScrollStory'
import { AIShowcase } from '@/components/sections/AIShowcase'
import { Stats } from '@/components/sections/Stats'
import { ValueProps } from '@/components/sections/ValueProps'
import { Curriculum } from '@/components/sections/Curriculum'
import { Testimonials } from '@/components/sections/Testimonials'
import { FinalCTA } from '@/components/sections/FinalCTA'
import { Footer } from '@/components/Footer'

export default function Home() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!loaded) {
      document.body.classList.add('loading')
      return
    }
    document.body.classList.remove('loading')
  }, [loaded])

  return (
    <>
      <AnimatePresence>{!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}</AnimatePresence>

      <AnimatePresence>
        {loaded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <InteractiveBg />
            <ClickRipple />
            <div className="relative z-10">
              <Navbar />
              <main>
                <Hero />
                <ScrollStory />
                <AIShowcase />
                <Stats />
                <ValueProps />
                <Curriculum />
                <Testimonials />
                <FinalCTA />
              </main>
              <Footer />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

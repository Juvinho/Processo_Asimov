'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'
import { logoFilename } from '@/components/logoManifest'

type BrandLogoProps = {
  className?: string
  priority?: boolean
}

function FallbackLogo() {
  return (
    <svg
      viewBox="0 0 120 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Asimov Academy"
      className="h-full w-full"
    >
      <path
        d="M8 28L16 6L24 28"
        stroke="#5b6af7"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M11 20H21" stroke="#5b6af7" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="16" cy="6" r="2" fill="#5b6af7" />
      <circle cx="8" cy="28" r="1.5" fill="#9b59f5" />
      <circle cx="24" cy="28" r="1.5" fill="#9b59f5" />
      <text
        x="32"
        y="22"
        fontFamily="Inter, sans-serif"
        fontSize="14"
        fontWeight="600"
        fill="#f0f0f2"
        letterSpacing="-0.3"
      >
        Asimov Academy
      </text>
    </svg>
  )
}

export function BrandLogo({ className = '', priority = false }: BrandLogoProps) {
  const [failed, setFailed] = useState(false)
  const src = useMemo(() => {
    if (!logoFilename) {
      return null
    }
    return `/images/${logoFilename}`
  }, [])

  if (failed || !src) {
    return (
      <span className={`block ${className}`}>
        <FallbackLogo />
      </span>
    )
  }

  return (
    <Image
      src={src}
      alt="Asimov Academy"
      width={180}
      height={48}
      priority={priority}
      className={className}
      onError={() => setFailed(true)}
    />
  )
}

import type React from "react"
import { cn } from "@/lib/utils"

interface FlagIconProps {
  country: string
  className?: string
}

export function FlagIcon({ country, className }: FlagIconProps) {
  const flags: Record<string, React.ReactNode> = {
    en: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 60 30"
        className={cn("h-5 w-5 rounded-full object-cover", className)}
      >
        <clipPath id="a">
          <path d="M0 0v30h60V0z" />
        </clipPath>
        <clipPath id="b">
          <path d="M30 15h30v15zv15H0zH0V0zV0h30z" />
        </clipPath>
        <g clipPath="url(#a)">
          <path d="M0 0v30h60V0z" fill="#012169" />
          <path d="M0 0l60 30m0-30L0 30" stroke="#fff" strokeWidth="6" />
          <path d="M0 0l60 30m0-30L0 30" clipPath="url(#b)" stroke="#C8102E" strokeWidth="4" />
          <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10" />
          <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6" />
        </g>
      </svg>
    ),
    fr: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 900 600"
        className={cn("h-5 w-5 rounded-full object-cover", className)}
      >
        <path fill="#ED2939" d="M0 0h900v600H0z" />
        <path fill="#fff" d="M0 0h600v600H0z" />
        <path fill="#002395" d="M0 0h300v600H0z" />
      </svg>
    ),
  }

  return <>{flags[country] || null}</>
}

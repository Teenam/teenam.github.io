import React from 'react'

// Utility functions

export const getCurrentYear = (): number => {
  return new Date().getFullYear()
}

export const createHoverHandlers = (
  baseBg: string,
  hoverBg: string,
  baseTransform?: string,
  hoverTransform?: string
) => {
  return {
    onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
      const target = e.currentTarget as HTMLElement
      target.style.background = hoverBg
      if (hoverTransform) {
        target.style.transform = hoverTransform
      }
    },
    onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
      const target = e.currentTarget as HTMLElement
      target.style.background = baseBg
      if (baseTransform) {
        target.style.transform = baseTransform
      }
    },
  }
}


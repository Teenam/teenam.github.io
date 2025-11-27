import React from 'react'

// Common style constants
export const GRADIENT_BG = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'

export const FULL_VIEWPORT_STYLES: React.CSSProperties = {
  width: '100vw',
  height: '100vh',
  minHeight: '100vh',
}

export const CENTERED_FLEX: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

export const ABSOLUTE_CENTERED: React.CSSProperties = {
  position: 'absolute',
  left: '50%',
  transform: 'translateX(-50%)',
  textAlign: 'center',
}

export const GLASSMORPHISM: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
}

export const HOVER_TRANSITION = 'all 0.3s ease'


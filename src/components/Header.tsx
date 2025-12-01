import { ABSOLUTE_CENTERED, GLASSMORPHISM } from '../constants/styles'

interface HeaderProps {
  title: string
  subtitle: string
}

function Header({ title, subtitle }: HeaderProps) {
  return (
    <header
      style={{
        ...ABSOLUTE_CENTERED,
        top: '2rem',
        color: 'white',
        pointerEvents: 'none', // Allow clicks to pass through to scene
        zIndex: 20,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          ...GLASSMORPHISM,
          padding: '2rem 3rem',
          borderRadius: '24px',
          textAlign: 'center',
          maxWidth: '90%',
          pointerEvents: 'auto', // Re-enable pointer events for the banner itself
        }}
      >
        <h1
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 700,
            marginBottom: '0.5rem',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
            animation: 'fadeInDown 0.8s ease-out',
            lineHeight: 1.2,
          }}
        >
          {title}
        </h1>
        <p
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            fontWeight: 300,
            opacity: 0.95,
            margin: 0,
          }}
        >
          {subtitle}
        </p>
      </div>
    </header>
  )
}

export default Header


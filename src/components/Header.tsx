import { ABSOLUTE_CENTERED } from '../constants/styles'

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
        pointerEvents: 'auto',
        zIndex: 20,
      }}
    >
      <h1
        style={{
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 700,
          marginBottom: '1rem',
          textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
          animation: 'fadeInDown 0.8s ease-out',
        }}
      >
        {title}
      </h1>
      <p
        style={{
          fontSize: 'clamp(1rem, 2vw, 1.25rem)',
          fontWeight: 300,
          opacity: 0.95,
          marginBottom: '2rem',
        }}
      >
        {subtitle}
      </p>
    </header>
  )
}

export default Header


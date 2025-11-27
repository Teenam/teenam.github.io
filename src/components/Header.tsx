interface HeaderProps {
  title: string
  subtitle: string
  onToggleProjects: () => void
  showProjects: boolean
}

function Header({ title, subtitle, onToggleProjects, showProjects }: HeaderProps) {
  return (
    <header
      style={{
        position: 'absolute',
        top: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        textAlign: 'center',
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
      <button
        onClick={onToggleProjects}
        style={{
          padding: '0.75rem 2rem',
          fontSize: '1rem',
          fontWeight: 500,
          color: 'white',
          background: 'rgba(255, 255, 255, 0.2)',
          border: '2px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '8px',
          cursor: 'pointer',
          backdropFilter: 'blur(10px)',
          transition: 'all 0.3s ease',
          pointerEvents: 'auto',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)'
          e.currentTarget.style.transform = 'translateY(-2px)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'
          e.currentTarget.style.transform = 'translateY(0)'
        }}
      >
        {showProjects ? 'Hide Projects' : 'Show Projects'}
      </button>
    </header>
  )
}

export default Header


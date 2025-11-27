import type { Config } from '../types/config'

interface FooterProps {
  footer: Config['footer']
}

function Footer({ footer }: FooterProps) {
  const currentYear = new Date().getFullYear()

  const getSocialIcon = (iconName: string): string => {
    const icons: Record<string, string> = {
      github: '🔗',
      linkedin: '💼',
      twitter: '🐦',
      email: '✉️',
      instagram: '📷',
      youtube: '▶️',
    }
    return icons[iconName.toLowerCase()] || '🔗'
  }

  return (
    <footer
      style={{
        position: 'absolute',
        bottom: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        textAlign: 'center',
        color: 'white',
        pointerEvents: 'auto',
        zIndex: 20,
      }}
    >
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          padding: '2rem 3rem',
          minWidth: '300px',
        }}
      >
        <p
          style={{
            fontSize: '1.125rem',
            marginBottom: '1.5rem',
            fontWeight: 500,
          }}
        >
          {footer.text}
        </p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1.5rem',
            flexWrap: 'wrap',
            marginBottom: '1.5rem',
          }}
        >
          {footer.socials.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '48px',
                height: '48px',
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '50%',
                color: 'white',
                textDecoration: 'none',
                fontSize: '1.5rem',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)'
                e.currentTarget.style.transform = 'translateY(-4px) scale(1.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'
                e.currentTarget.style.transform = 'translateY(0) scale(1)'
              }}
              title={social.name}
              aria-label={social.name}
            >
              {getSocialIcon(social.icon)}
            </a>
          ))}
        </div>
        <p
          style={{
            fontSize: '0.875rem',
            opacity: 0.8,
            marginTop: '1rem',
          }}
        >
          &copy; {currentYear} {footer.name}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer


import type { Config } from '../types/config'
import { ABSOLUTE_CENTERED, GLASSMORPHISM, HOVER_TRANSITION } from '../constants/styles'
import { getCurrentYear, createHoverHandlers } from '../utils/helpers'

interface FooterProps {
  footer: Config['footer']
}

function Footer({ footer }: FooterProps) {
  const currentYear = getCurrentYear()
  const socialHoverHandlers = createHoverHandlers(
    'rgba(255, 255, 255, 0.2)',
    'rgba(255, 255, 255, 0.3)',
    'translateY(0) scale(1)',
    'translateY(-4px) scale(1.1)'
  )

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
        ...ABSOLUTE_CENTERED,
        bottom: '2rem',
        color: 'white',
        pointerEvents: 'auto',
        zIndex: 20,
      }}
    >
      <div
        style={{
          ...GLASSMORPHISM,
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
                transition: HOVER_TRANSITION,
                cursor: 'pointer',
              }}
              {...socialHoverHandlers}
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
        <p
          style={{
            fontSize: '0.75rem',
            opacity: 0.6,
            marginTop: '0.5rem',
          }}
        >
          v{__APP_VERSION__}
        </p>
      </div>
    </footer>
  )
}

export default Footer


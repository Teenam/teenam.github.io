import { useState } from 'react'
import { Github, Linkedin, Twitter, Mail, Instagram, Youtube, Link as LinkIcon, ChevronUp, ChevronDown } from 'lucide-react'
import type { Config } from '../types/config'
import { ABSOLUTE_CENTERED, GLASSMORPHISM, HOVER_TRANSITION } from '../constants/styles'
import { getCurrentYear, createHoverHandlers } from '../utils/helpers'

interface FooterProps {
  footer: Config['footer']
}

function Footer({ footer }: FooterProps) {
  const [isOpen, setIsOpen] = useState(false)
  const currentYear = getCurrentYear()

  const socialHoverHandlers = createHoverHandlers(
    'rgba(255, 255, 255, 0.2)',
    'rgba(255, 255, 255, 0.3)',
    'translateY(0) scale(1)',
    'translateY(-4px) scale(1.1)'
  )

  const getSocialIcon = (iconName: string) => {
    const props = { size: 24 }
    const icons: Record<string, JSX.Element> = {
      github: <Github {...props} />,
      linkedin: <Linkedin {...props} />,
      twitter: <Twitter {...props} />,
      email: <Mail {...props} />,
      instagram: <Instagram {...props} />,
      youtube: <Youtube {...props} />,
    }
    return icons[iconName.toLowerCase()] || <LinkIcon {...props} />
  }

  return (
    <footer
      style={{
        ...ABSOLUTE_CENTERED,
        bottom: 0,
        top: 'auto',
        color: 'white',
        pointerEvents: 'auto',
        zIndex: 20,
        transform: isOpen ? 'translate(-50%, 0)' : 'translate(-50%, calc(100% - 40px))',
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Tab/Slit */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'absolute',
          top: '-40px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '120px',
          height: '40px',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderTopLeftRadius: '12px',
          borderTopRightRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderBottom: 'none',
        }}
      >
        {isOpen ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
      </div>

      <div
        style={{
          ...GLASSMORPHISM,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          borderTopLeftRadius: '24px',
          borderTopRightRadius: '24px',
          padding: '2rem 3rem',
          minWidth: '300px',
          width: '100vw',
          maxWidth: '600px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
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
            marginTop: '0.5rem',
          }}
        >
          &copy; {currentYear} {footer.name}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer


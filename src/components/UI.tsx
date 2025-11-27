import { useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import type { Config } from '../types/config'

interface UIProps {
  config: Config
}

function UI({ config }: UIProps) {
  const [showProjects, setShowProjects] = useState(false)

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 10,
      }}
    >
      <Header
        title={config.page.mainTitle}
        subtitle={config.page.subtitle}
        onToggleProjects={() => setShowProjects(!showProjects)}
        showProjects={showProjects}
      />
      <Footer footer={config.footer} />
    </div>
  )
}

export default UI


import Header from './Header'
import Footer from './Footer'
import type { Config } from '../types/config'

interface UIProps {
  config: Config
  version?: string
}

function UI({ config, version = 'v1.0.0' }: UIProps) {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        zIndex: 10,
      }}
    >
      <Header title={config.page.title} subtitle={config.page.subtitle} />
      <Footer footer={config.footer} version={version} />
    </div>
  )
}

export default UI

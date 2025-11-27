export interface Config {
  page: {
    title: string
    mainTitle: string
    subtitle: string
  }
  projects: Project[]
  github?: GitHubSettings
  footer: {
    text: string
    name: string
    socials: Social[]
  }
}

export interface Project {
  title: string
  description: string
  link: string
  type: 'website' | 'project'
}

export interface Social {
  name: string
  url: string
  icon: string
}

export interface GitHubSettings {
  username: string
  maxProjects?: number
  includeForks?: boolean
}


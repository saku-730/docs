import type { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: <span>学習アウトプットサイト</span>,
  project: {
    link: 'https://example.com/project'
  },
  docsRepositoryBase: 'https://example.com/repo/blob/main',
  i18n: [
    { locale: 'ja', text: '日本語' },
    { locale: 'en', text: 'English' }
  ],
  search: {
    placeholder: '検索'
  },
  sidebar: {
    defaultMenuCollapseLevel: 1
  },
  footer: {
    text: 'Learning Output Site Demo'
  }
}

export default config

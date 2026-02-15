import type { DocsThemeConfig } from 'nextra-theme-docs'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

function LocaleLogo() {
  const { asPath } = useRouter()
  const locale = asPath.startsWith('/en') ? 'en' : 'ja'

  return <Link href={`/${locale}`}>学習アウトプットサイト</Link>
}

function HeaderLocaleSwitch() {
  const router = useRouter()
  const { asPath } = router
  const current = asPath.startsWith('/en') ? 'en' : 'ja'

  const nextJaPath = useMemo(() => {
    const replaced = asPath.replace(/^\/(ja|en)(?=\/|$)/, '/ja')
    if (replaced !== asPath) return replaced
    return asPath === '/' ? '/ja' : `/ja${asPath}`
  }, [asPath])

  const nextEnPath = useMemo(() => {
    const replaced = asPath.replace(/^\/(ja|en)(?=\/|$)/, '/en')
    if (replaced !== asPath) return replaced
    return asPath === '/' ? '/en' : `/en${asPath}`
  }, [asPath])

  return (
    <div className="header-locale-switch nx-hidden md:nx-inline-flex nx-items-center">
      <label htmlFor="header-locale-switch" className="nx-sr-only">
        Language
      </label>
      <select
        id="header-locale-switch"
        aria-label="Language"
        value={current}
        onChange={(event) => {
          const locale = event.target.value
          router.push(locale === 'ja' ? nextJaPath : nextEnPath)
        }}
        className="nx-h-8 nx-rounded-md nx-border nx-border-gray-300 nx-bg-transparent nx-px-2 nx-text-sm dark:nx-border-neutral-700"
      >
        <option value="ja">日本語</option>
        <option value="en">English</option>
      </select>
    </div>
  )
}

const config: DocsThemeConfig = {
  logo: <LocaleLogo />,
  logoLink: false,
  project: {
    link: 'https://example.com/project'
  },
  docsRepositoryBase: 'https://example.com/repo/blob/main',
  i18n: [],
  navbar: {
    extraContent: <HeaderLocaleSwitch />
  },
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

import type { ReactNode } from 'react'
import { Head } from 'nextra/components'
import { Layout } from 'nextra-theme-docs'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'

export default async function RootLayout({
  children
}: {
  children: ReactNode
}) {
  return (
    <html lang="ja">
      <Head />
      <body>
        <Layout pageMap={await getPageMap()}>{children}</Layout>
      </body>
    </html>
  )
}

import type { ReactNode } from 'react'
import 'nextra-theme-docs/style.css'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}

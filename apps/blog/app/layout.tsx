import type { Metadata } from 'next'
import './globals.css'
import 'highlight.js/styles/github-dark-dimmed.css'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'A blog built with Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}


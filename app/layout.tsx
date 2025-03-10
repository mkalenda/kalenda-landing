import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Kalenda.ai | AI řešení pro české firmy',
  description: 'Expertní poradenství a implementace umělé inteligence pro české společnosti. Získejte zdarma e-book o AI pro české firmy.',
  keywords: 'umělá inteligence, AI, digitální transformace, české firmy, poradenství, implementace AI',
  authors: [{ name: 'Kalenda.ai' }],
  openGraph: {
    title: 'Kalenda.ai | AI řešení pro české firmy',
    description: 'Expertní poradenství a implementace umělé inteligence pro české společnosti.',
    url: 'https://kalenda.ai',
    siteName: 'Kalenda.ai',
    locale: 'cs_CZ',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="cs">
      <body className={inter.className}>{children}</body>
    </html>
  )
}


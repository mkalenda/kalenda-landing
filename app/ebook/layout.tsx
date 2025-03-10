import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bezplatný e-book: AI pro české firmy | Kalenda.ai',
  description: 'Stáhněte si zdarma e-book s praktickými návody pro implementaci umělé inteligence v českých firmách. Obsahuje případové studie z českého trhu, návody a tipy pro implementaci.',
  keywords: 'e-book, kniha, umělá inteligence, AI, implementace AI, české firmy, digitální transformace, případové studie',
  openGraph: {
    title: 'Bezplatný e-book: AI pro české firmy | Kalenda.ai',
    description: 'Stáhněte si zdarma e-book s praktickými návody pro implementaci umělé inteligence v českých firmách. Obsahuje případové studie z českého trhu, návody a tipy pro implementaci.',
    url: 'https://kalenda.ai/ebook',
    siteName: 'Kalenda.ai',
    locale: 'cs_CZ',
    type: 'article',
  },
}

export default function EbookLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 
"use client"

import { useState, FormEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'

export default function EbookPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    position: '',
    company_size: '',
    phone: '',
    industry: '',
    interest_level: '',
    how_found: '',
    newsletter: true,
    terms: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/submit-ebook-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess(true)
        // Reset form
        setFormData({
          name: '',
          email: '',
          company: '',
          position: '',
          company_size: '',
          phone: '',
          industry: '',
          interest_level: '',
          how_found: '',
          newsletter: true,
          terms: false
        })
        // Optionálně přesměrovat na děkovnou stránku
        // router.push('/ebook/thank-you')
      } else {
        setError(data.message || 'Nastala chyba. Prosím zkuste to znovu.')
      }
    } catch (err) {
      setError('Nastala chyba při zpracování. Prosím zkuste to znovu.')
      console.error('Error:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative flex flex-col items-center justify-center px-4 py-32 md:py-40 lg:py-48">
          <div className="container max-w-5xl">
            <div className="space-y-6 text-center">
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                Umělá inteligence v podnikání: Praktický průvodce pro české firmy
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
                Získejte základní průvodce implementací AI řešení ve vaší firmě, založený na případových studiích z českého prostředí.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
                <Button size="lg" className="rounded-full px-8" onClick={() => document.getElementById("form-section")?.scrollIntoView({ behavior: "smooth" })}>
                  Získat e-book zdarma
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="bg-muted/50 py-20">
          <div className="container max-w-5xl">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Co se v e-booku dozvíte?</h2>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <BenefitCard 
                title="Praktické návody pro implementaci AI"
                description="Základní průvodce, jak začít s AI ve vaší firmě bez ohledu na velikost či rozpočet, včetně doporučení pro různé typy podniků."
              />
              <BenefitCard 
                title="Případové studie z ČR"
                description="Příklady implementace AI v českých firmách jako Rohlík.cz, Komerční banka nebo Škoda Auto, včetně dosažených výsledků."
              />
              <BenefitCard 
                title="Statistiky adopce AI v ČR"
                description="Základní přehled využití AI v českých firmách, nejčastěji implementované technologie a aktuální trendy."
              />
              <BenefitCard 
                title="Právní a etické aspekty AI"
                description="Přehled regulačního rámce EU (AI Act) a základní kroky pro zajištění souladu s regulacemi při implementaci AI."
              />
              <BenefitCard 
                title="Praktické nástroje a technologie"
                description="Přehled dostupných nástrojů a technologií pro implementaci AI v českých firmách, včetně odhadovaných nákladů a návratnosti."
              />
              <BenefitCard 
                title="Tipy pro výběr AI řešení"
                description="Základní kritéria pro výběr správného přístupu k implementaci AI a evaluaci potenciálních technologických partnerů."
              />
            </div>
          </div>
        </section>

        {/* Preview Section */}
        <section className="py-20">
          <div className="container max-w-5xl">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Nahlédněte do obsahu</h2>
            </div>
            <div className="grid gap-12 md:grid-cols-2 md:items-center">
              <div>
                <div className="relative aspect-[3/4] w-full max-w-md mx-auto shadow-xl rounded-lg overflow-hidden">
                  <Image 
                    src="/images/ebook-preview.svg" 
                    alt="Náhled e-booku" 
                    className="object-cover"
                    fill
                    priority
                  />
                </div>
              </div>
              <div className="space-y-6">
                <h3 className="text-xl font-bold">Obsah e-booku:</h3>
                <ul className="space-y-2">
                  {[
                    'Úvod a současné trendy v AI',
                    'Stav AI v České republice a EU',
                    'Jak AI skutečně mění podnikání',
                    'Případové studie z českého trhu',
                    'Praktické nástroje a technologie AI',
                    'Praktický návod pro implementaci AI',
                    'Právní a etické aspekty využití AI',
                    'Zdroje a doporučená literatura'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-primary font-bold mr-2">✓</span> {item}
                    </li>
                  ))}
                </ul>
                <p className="text-muted-foreground">
                  E-book obsahuje 17 stran praktických informací, případových studií a konkrétních doporučení pro české firmy.
                </p>
                <Button
                  className="rounded-full px-8"
                  onClick={() => document.getElementById("form-section")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Stáhnout zdarma
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section id="form-section" className="py-20">
          <div className="container max-w-5xl">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Stáhněte si e-book zdarma</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Vyplňte formulář níže a získejte okamžitý přístup k našemu komplexnímu průvodci implementací AI v českých firmách.
              </p>
            </div>
            <div className="mx-auto max-w-2xl bg-card p-8 rounded-lg shadow-lg">
              {success ? (
                <div className="bg-green-500 text-white p-6 rounded-lg text-center">
                  <h3 className="text-xl font-bold mb-2">Děkujeme!</h3>
                  <p className="mb-4">E-book byl odeslán na váš e-mail.</p>
                  <p>Zkontrolujte svou e-mailovou schránku včetně složky spam/hromadné.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="bg-destructive text-destructive-foreground p-4 rounded-lg">
                      {error}
                    </div>
                  )}
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="block font-semibold mb-2">Jméno a příjmení *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block font-semibold mb-2">E-mail *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label htmlFor="phone" className="block font-semibold mb-2">Telefon</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="block font-semibold mb-2">Společnost</label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label htmlFor="position" className="block font-semibold mb-2">Pozice</label>
                      <input
                        type="text"
                        id="position"
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label htmlFor="company_size" className="block font-semibold mb-2">Velikost společnosti</label>
                      <select
                        id="company_size"
                        name="company_size"
                        value={formData.company_size}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Vyberte...</option>
                        <option value="1-9">1-9 zaměstnanců</option>
                        <option value="10-49">10-49 zaměstnanců</option>
                        <option value="50-249">50-249 zaměstnanců</option>
                        <option value="250+">250+ zaměstnanců</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label htmlFor="industry" className="block font-semibold mb-2">Odvětví</label>
                      <select
                        id="industry"
                        name="industry"
                        value={formData.industry}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Vyberte...</option>
                        <option value="IT">IT a technologie</option>
                        <option value="finance">Finance a bankovnictví</option>
                        <option value="manufacturing">Výroba a průmysl</option>
                        <option value="retail">Maloobchod a e-commerce</option>
                        <option value="services">Služby</option>
                        <option value="healthcare">Zdravotnictví</option>
                        <option value="education">Vzdělávání</option>
                        <option value="other">Jiné</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="interest_level" className="block font-semibold mb-2">Zájem o implementaci AI</label>
                      <select
                        id="interest_level"
                        name="interest_level"
                        value={formData.interest_level}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Vyberte...</option>
                        <option value="researching">Zatím jen zjišťuji možnosti</option>
                        <option value="planning">Plánujeme implementaci v příštích 6 měsících</option>
                        <option value="implementing">Aktuálně implementujeme AI řešení</option>
                        <option value="using">Již používáme AI a hledáme další možnosti</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="how_found" className="block font-semibold mb-2">Jak jste se o nás dozvěděli?</label>
                    <select
                      id="how_found"
                      name="how_found"
                      value={formData.how_found}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Vyberte...</option>
                      <option value="search">Vyhledávač (Google, Seznam)</option>
                      <option value="social">Sociální sítě</option>
                      <option value="recommendation">Doporučení</option>
                      <option value="event">Konference nebo událost</option>
                      <option value="other">Jiné</option>
                    </select>
                  </div>
                  <div className="space-y-3 pt-2">
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id="newsletter"
                        name="newsletter"
                        checked={formData.newsletter}
                        onChange={handleChange}
                        className="mt-1"
                      />
                      <label htmlFor="newsletter" className="text-sm">
                        Chci dostávat novinky a aktualizace o AI a digitální transformaci
                      </label>
                    </div>
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id="terms"
                        name="terms"
                        checked={formData.terms}
                        onChange={handleChange}
                        required
                        className="mt-1"
                      />
                      <label htmlFor="terms" className="text-sm">
                        Souhlasím se <Link href="/privacy" className="text-primary hover:underline">zpracováním osobních údajů</Link> *
                      </label>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full rounded-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Odesílám...' : 'Získat e-book zdarma'}
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    * Povinné pole
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

// Pomocné komponenty
function BenefitCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
} 
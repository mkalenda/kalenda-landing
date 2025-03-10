"use client"

import { useState, FormEvent, useEffect } from 'react'
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
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [formProgress, setFormProgress] = useState(0)

  // Calculate form completion progress
  useEffect(() => {
    const requiredFields = ['name', 'email', 'terms'];
    const optionalFields = ['company', 'position', 'company_size', 'phone', 'industry', 'interest_level', 'how_found'];
    
    const requiredFilled = requiredFields.filter(field => {
      if (field === 'terms') return formData[field];
      return formData[field as keyof typeof formData]?.toString().trim() !== '';
    }).length;
    
    const optionalFilled = optionalFields.filter(field => 
      formData[field as keyof typeof formData]?.toString().trim() !== ''
    ).length;
    
    // Weight required fields more heavily
    const progress = (requiredFilled / requiredFields.length) * 0.7 + 
                     (optionalFilled / optionalFields.length) * 0.3;
    
    setFormProgress(Math.round(progress * 100));
  }, [formData]);

  const validateField = (name: string, value: string | boolean) => {
    if (name === 'name' && typeof value === 'string' && !value.trim()) {
      return 'Jméno je povinné';
    }
    if (name === 'email' && typeof value === 'string') {
      if (!value.trim()) return 'E-mail je povinný';
      if (!/^\S+@\S+\.\S+$/.test(value)) return 'Zadejte platný e-mail';
    }
    if (name === 'phone' && typeof value === 'string' && value.trim() && !/^(\+\d{1,3}\s?)?\d{9,10}$/.test(value)) {
      return 'Zadejte platné telefonní číslo';
    }
    if (name === 'terms' && !value) {
      return 'Pro pokračování je nutný souhlas s podmínkami';
    }
    return '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined
    const newValue = type === 'checkbox' ? checked : value
    
    setFormData({
      ...formData,
      [name]: newValue
    })
    
    // Validate field on change
    const error = validateField(name, type === 'checkbox' ? !!checked : value);
    setFieldErrors(prev => ({
      ...prev,
      [name]: error
    }));
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    let isValid = true;
    
    // Validate required fields
    Object.entries(formData).forEach(([name, value]) => {
      const error = validateField(name, value);
      if (error) {
        newErrors[name] = error;
        isValid = false;
      }
    });
    
    setFieldErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')
    
    // Validate the form
    if (!validateForm()) {
      setIsSubmitting(false);
      
      // Scroll to the first error field
      const firstErrorField = Object.keys(fieldErrors).find(field => fieldErrors[field]);
      if (firstErrorField) {
        document.getElementById(firstErrorField)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      
      return;
    }

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
        <section className="py-20 pt-32 md:pt-40 md:pb-16 lg:pb-20">
          <div className="container max-w-5xl">
            <div className="text-center mb-8">
              <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Exkluzivní obsah
              </span>
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                E-book: AI v českých firmách
              </h1>
              <p className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto">
                Kompletní průvodce implementací umělé inteligence pro české společnosti. Získejte praktické informace, případové studie a konkrétní návody.
              </p>
              <div className="mt-8 flex justify-center flex-wrap gap-4">
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
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                    priority
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 10'%3E%3C/svg%3E"
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
                  Stáhnout e-book zdarma
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section id="form-section" className="py-20 bg-gradient-to-br from-background to-muted/30">
          <div className="container max-w-5xl">
            <div className="mb-12 text-center">
              <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Získejte zdarma
              </span>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Stáhněte si e-book zdarma</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Vyplňte formulář níže a získejte okamžitý přístup k našemu komplexnímu průvodci implementací AI v českých firmách.
              </p>
            </div>
            <div className="grid md:grid-cols-5 gap-8">
              <div className="md:col-span-2 hidden md:block">
                <div className="sticky top-24 space-y-6 border border-muted rounded-lg p-6 bg-card">
                  <h3 className="text-lg font-semibold">Co získáte:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <span className="text-primary text-xs">✓</span>
                      </span>
                      <span>Detailní postup implementace AI do firemních procesů</span>
                    </li>
                    <li className="flex items-start">
                      <span className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <span className="text-primary text-xs">✓</span>
                      </span>
                      <span>Reálné příklady z českého prostředí</span>
                    </li>
                    <li className="flex items-start">
                      <span className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <span className="text-primary text-xs">✓</span>
                      </span>
                      <span>Kompletní průvodce AI Act a jeho dopady</span>
                    </li>
                  </ul>
                  
                  <div className="border border-muted rounded-lg p-4 bg-muted/50">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                        <span className="text-primary">🔒</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        <strong>100% bezpečné</strong>. Vaše údaje jsou v bezpečí a nikdy je nebudeme sdílet s třetími stranami.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:col-span-3 bg-card p-8 rounded-lg shadow-lg">
                {success ? (
                  <div className="bg-green-500 text-white p-6 rounded-lg text-center">
                    <h3 className="text-xl font-bold mb-2">Děkujeme!</h3>
                    <p className="mb-4">E-book byl odeslán na vaši e-mailovou adresu.</p>
                    <p>Zkontrolujte svou e-mailovou schránku včetně složky spam/hromadné.</p>
                    <Button 
                      className="mt-6 rounded-full" 
                      variant="outline"
                      onClick={() => router.push('/')}
                    >
                      Zpět na hlavní stránku
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                      <div className="bg-destructive text-destructive-foreground p-4 rounded-lg">
                        {error}
                      </div>
                    )}
                    
                    {/* Form progress indicator */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Dokončeno {formProgress}%</span>
                        <span>{formProgress < 100 ? 'Vyplňte prosím povinné údaje' : 'Formulář je připraven k odeslání'}</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${formProgress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="block font-semibold mb-2">
                          Jméno a příjmení *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                            fieldErrors.name ? 'border-destructive' : 'border-input'
                          }`}
                        />
                        {fieldErrors.name && (
                          <p className="mt-1 text-sm text-destructive">{fieldErrors.name}</p>
                        )}
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
                          className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                            fieldErrors.email ? 'border-destructive' : 'border-input'
                          }`}
                        />
                        {fieldErrors.email && (
                          <p className="mt-1 text-sm text-destructive">{fieldErrors.email}</p>
                        )}
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
                          className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                            fieldErrors.phone ? 'border-destructive' : 'border-input'
                          }`}
                        />
                        {fieldErrors.phone && (
                          <p className="mt-1 text-sm text-destructive">{fieldErrors.phone}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="company" className="block font-semibold mb-2">Společnost</label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                            fieldErrors.company ? 'border-destructive' : 'border-input'
                          }`}
                        />
                        {fieldErrors.company && (
                          <p className="mt-1 text-sm text-destructive">{fieldErrors.company}</p>
                        )}
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
                          className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                            fieldErrors.position ? 'border-destructive' : 'border-input'
                          }`}
                        />
                        {fieldErrors.position && (
                          <p className="mt-1 text-sm text-destructive">{fieldErrors.position}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="company_size" className="block font-semibold mb-2">Velikost společnosti</label>
                        <select
                          id="company_size"
                          name="company_size"
                          value={formData.company_size}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                            fieldErrors.company_size ? 'border-destructive' : 'border-input'
                          }`}
                        >
                          <option value="">Vyberte...</option>
                          <option value="1-9">1-9 zaměstnanců</option>
                          <option value="10-49">10-49 zaměstnanců</option>
                          <option value="50-249">50-249 zaměstnanců</option>
                          <option value="250+">250+ zaměstnanců</option>
                        </select>
                        {fieldErrors.company_size && (
                          <p className="mt-1 text-sm text-destructive">{fieldErrors.company_size}</p>
                        )}
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
                          className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                            fieldErrors.industry ? 'border-destructive' : 'border-input'
                          }`}
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
                        {fieldErrors.industry && (
                          <p className="mt-1 text-sm text-destructive">{fieldErrors.industry}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="interest_level" className="block font-semibold mb-2">Zájem o implementaci AI</label>
                        <select
                          id="interest_level"
                          name="interest_level"
                          value={formData.interest_level}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                            fieldErrors.interest_level ? 'border-destructive' : 'border-input'
                          }`}
                        >
                          <option value="">Vyberte...</option>
                          <option value="researching">Zatím jen zjišťuji možnosti</option>
                          <option value="planning">Plánujeme implementaci v příštích 6 měsících</option>
                          <option value="implementing">Aktuálně implementujeme AI řešení</option>
                          <option value="using">Již používáme AI a hledáme další možnosti</option>
                        </select>
                        {fieldErrors.interest_level && (
                          <p className="mt-1 text-sm text-destructive">{fieldErrors.interest_level}</p>
                        )}
                      </div>
                    </div>
                    <div>
                      <label htmlFor="how_found" className="block font-semibold mb-2">Jak jste se o nás dozvěděli?</label>
                      <select
                        id="how_found"
                        name="how_found"
                        value={formData.how_found}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                          fieldErrors.how_found ? 'border-destructive' : 'border-input'
                        }`}
                      >
                        <option value="">Vyberte...</option>
                        <option value="search">Vyhledávač (Google, Seznam)</option>
                        <option value="social">Sociální sítě</option>
                        <option value="recommendation">Doporučení</option>
                        <option value="event">Konference nebo událost</option>
                        <option value="other">Jiné</option>
                      </select>
                      {fieldErrors.how_found && (
                        <p className="mt-1 text-sm text-destructive">{fieldErrors.how_found}</p>
                      )}
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
                          className={`mt-1 ${fieldErrors.terms ? 'border-destructive' : ''}`}
                        />
                        <label htmlFor="terms" className="text-sm">
                          Souhlasím se <Link href="/privacy" className="text-primary hover:underline">zpracováním osobních údajů</Link> *
                        </label>
                      </div>
                      {fieldErrors.terms && (
                        <p className="mt-1 text-sm text-destructive">{fieldErrors.terms}</p>
                      )}
                    </div>
                    <div className="pt-4 border-t border-muted mt-6">
                      <Button
                        type="submit"
                        className="w-full rounded-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <span className="inline-block animate-spin mr-2">⟳</span>
                            Odesílám...
                          </>
                        ) : (
                          'Získat e-book zdarma'
                        )}
                      </Button>
                      <div className="flex items-center justify-center mt-4 text-xs text-muted-foreground">
                        <span>🔒 Vaše údaje jsou v bezpečí</span>
                      </div>
                      <p className="text-xs text-muted-foreground text-center mt-2">
                        * Povinné pole
                      </p>
                    </div>
                  </form>
                )}
              </div>
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

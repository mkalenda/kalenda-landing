"use client"

import type React from "react"
import type { LucideIcon } from "lucide-react"

import { useCallback } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import Image from "next/image"
import ServiceCard from "@/components/service-card"
import ContactForm from "@/components/contact-form"
import Footer from "@/components/footer"
import Header from "@/components/header"

interface HomePageProps {
  content: {
    hero: {
      title: string
      subtitle: string
      cta: string
    }
    services: {
      title: string
      subtitle: string
      items: Array<{
        id: number
        title: string
        description: string
        icon: LucideIcon
      }>
    }
    about: {
      title: string
      paragraphs: string[]
      cta: string
    }
    ebook: {
      title: string
      subtitle: string
      features: string[]
      cta: string
    }
    contact: {
      title: string
      subtitle: string
    }
  }
}

export default function HomePage({ content }: HomePageProps) {
  const scrollToElement = useCallback((id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <HeroSection content={content.hero} onGetStarted={() => scrollToElement("contact")} />
        <ServicesSection content={content.services} />
        <AboutSection content={content.about} onGetStarted={() => scrollToElement("contact")} />
        <EbookSection content={content.ebook} />
        <ContactSection content={content.contact} />
      </main>
      <Footer />
    </>
  )
}

function HeroSection({
  content,
  onGetStarted,
}: { content: HomePageProps["content"]["hero"]; onGetStarted: () => void }) {
  return (
    <section className="relative flex flex-col items-center justify-center px-4 py-32 md:py-40 lg:py-48">
      <div className="container max-w-5xl">
        <div className="space-y-6 text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">{content.title}</h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">{content.subtitle}</p>
          <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
            <Button size="lg" className="rounded-full px-8" onClick={onGetStarted}>
              {content.cta}
            </Button>
          </div>
        </div>
      </div>
      <div
        className="absolute inset-x-0 bottom-8 flex justify-center animate-bounce cursor-pointer"
        onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
      >
        <ChevronDown className="h-8 w-8 text-primary" />
      </div>
    </section>
  )
}

function ServicesSection({ content }: { content: HomePageProps["content"]["services"] }) {
  return (
    <section id="services" className="bg-muted/50 py-20">
      <div className="container max-w-5xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{content.title}</h2>
          <p className="mt-4 text-muted-foreground">{content.subtitle}</p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {content.items.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  )
}

function AboutSection({
  content,
  onGetStarted,
}: { content: HomePageProps["content"]["about"]; onGetStarted: () => void }) {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-background to-muted/20">
      <div className="container max-w-5xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{content.title}</h2>
        </div>
        <div className="grid gap-12 md:grid-cols-1 md:items-center">
          <div className="order-2 md:order-1">
            <div className="space-y-4">
              {content.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-muted-foreground">{paragraph}</p>
              ))}
              <div className="flex flex-wrap gap-4 pt-6 justify-center">
                <Button
                  className="rounded-full px-8"
                  onClick={onGetStarted}
                >
                  {content.cta}
                </Button>
                <Button
                  variant="outline"
                  className="rounded-full px-8"
                  onClick={() => window.location.href = '/ebook'}
                >
                  Zjistit více
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function EbookSection({ content }: { content: HomePageProps["content"]["ebook"] }) {
  return (
    <section id="ebook" className="py-20 bg-gradient-to-br from-muted/30 to-muted/80">
      <div className="container max-w-5xl">
        <div className="text-center mb-8">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Nový e-book
          </span>
        </div>
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{content.title}</h2>
            <p className="text-muted-foreground">{content.subtitle}</p>
            <ul className="space-y-3">
              {content.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-primary text-xs">✓</span>
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <div className="pt-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  className="rounded-full px-8 bg-primary text-white hover:bg-primary/90"
                  onClick={() => window.location.href = '/ebook'}
                  size="lg"
                >
                  {content.cta}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Žádné platby, žádné závazky. Stáhněte si e-book zcela zdarma.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="relative aspect-[3/4] w-full max-w-md mx-auto shadow-xl rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
              <Image 
                src="/images/ebook-preview.svg" 
                alt="E-book: Umělá inteligence v podnikání" 
                className="object-cover"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                loading="lazy"
                placeholder="blur"
                blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 10'%3E%3C/svg%3E"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
            <div className="absolute -top-4 -right-4 bg-primary text-white px-4 py-2 rounded-full font-bold transform rotate-12 shadow-lg">
              Zdarma
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ContactSection({ content }: { content: HomePageProps["content"]["contact"] }) {
  return (
    <section id="contact" className="bg-muted/50 py-20">
      <div className="container max-w-5xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{content.title}</h2>
          <p className="mt-4 text-muted-foreground">{content.subtitle}</p>
        </div>
        <div className="mx-auto max-w-2xl">
          <ContactForm />
        </div>
      </div>
    </section>
  )
}

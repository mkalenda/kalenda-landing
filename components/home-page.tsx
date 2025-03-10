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
    <section id="about" className="py-20">
      <div className="container max-w-5xl">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <Image
              src="/placeholder.svg?height=600&width=600"
              alt="O mně"
              width={600}
              height={600}
              className="rounded-lg object-cover"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{content.title}</h2>
            {content.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-muted-foreground">
                {paragraph}
              </p>
            ))}
            <Button
              variant="outline"
              className="rounded-full px-8 border-primary text-primary hover:bg-primary hover:text-white"
              onClick={onGetStarted}
            >
              {content.cta}
            </Button>
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

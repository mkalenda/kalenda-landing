"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown } from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

const navLinks = [
  { href: "#services", label: "Služby" },
  { href: "#about", label: "O mně" },
  { href: "#ebook", label: "E-book" },
  { href: "#contact", label: "Kontakt" },
]

export default function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
      
      // Update active section based on scroll position
      if (pathname === "/" || pathname === "") {
        const sections = navLinks.map(link => link.href.startsWith('#') ? link.href.slice(1) : null).filter(Boolean)
        
        for (const section of sections) {
          const element = document.getElementById(section as string)
          if (element) {
            const rect = element.getBoundingClientRect()
            if (rect.top <= 100 && rect.bottom >= 100) {
              setActiveSection(section)
              break
            }
          }
        }
      }
    }
    
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [pathname])

  // Zjištění, zda jsme na hlavní stránce
  const isHomePage = pathname === "/" || pathname === ""

  const handleNavClick = (href: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault()
    
    if (href.startsWith("#")) {
      // Interní odkaz na sekci stránky
      if (isHomePage) {
        // Jsme na hlavní stránce, stačí scrollovat
        document.getElementById(href.slice(1))?.scrollIntoView({ behavior: "smooth" })
        setActiveSection(href.slice(1))
      } else {
        // Nejsme na hlavní stránce, nejprve navigujeme na hlavní stránku a pak přidáme hash
        router.push(`/${href}`)
      }
    } else {
      // Externí odkaz na jinou stránku
      router.push(href)
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-background/95 py-3 shadow-sm backdrop-blur-md" : "bg-transparent py-5"
      }`}
    >
      <div className="container flex items-center justify-between">
        <Link href="/" className="text-xl font-bold group">
          kalenda<span className="text-primary group-hover:text-primary/80 transition-colors">.</span>ai
        </Link>

        <nav className="hidden md:flex items-center">
          <ul className="flex items-center space-x-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                {link.href.startsWith("#") ? (
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(link.href, e)}
                    className={`relative text-sm font-medium transition-colors hover:text-foreground py-2 ${
                      activeSection === link.href.slice(1) 
                        ? "text-primary" 
                        : "text-foreground/70"
                    }`}
                  >
                    {link.label}
                    {activeSection === link.href.slice(1) && (
                      <span className="absolute bottom-0 left-0 h-0.5 w-full bg-primary"></span>
                    )}
                  </a>
                ) : (
                  <Link
                    href={link.href}
                    className={`text-sm font-medium transition-colors hover:text-foreground py-2 ${
                      pathname === link.href ? "text-primary" : "text-foreground/70"
                    }`}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
            <li>
              <Button 
                size="sm" 
                className="rounded-full px-6 bg-primary text-white hover:bg-primary/90"
                onClick={() => window.location.href = '/ebook'}
              >
                Získat e-book
              </Button>
            </li>
          </ul>
        </nav>

        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {isMobileMenuOpen && <MobileMenu onNavClick={handleNavClick} isHomePage={isHomePage} />}
    </header>
  )
}

function MobileMenu({ onNavClick, isHomePage }: { onNavClick: (href: string, e?: React.MouseEvent) => void, isHomePage: boolean }) {
  return (
    <div className="absolute top-full left-0 right-0 mt-1 p-5 bg-background/95 backdrop-blur-md shadow-lg rounded-b-lg border-t z-50 animate-in slide-in-from-top-5 duration-200">
      <nav className="flex flex-col">
        <ul className="space-y-4 mb-6">
          {navLinks.map((link) => (
            <li key={link.href} className="border-b border-muted pb-2">
              {link.href.startsWith("#") ? (
                <a
                  href={link.href}
                  onClick={(e) => onNavClick(link.href, e)}
                  className="block text-base font-medium px-2 py-1 hover:bg-muted rounded transition-colors"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  href={link.href}
                  className="block text-base font-medium px-2 py-1 hover:bg-muted rounded transition-colors"
                >
                  {link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
        <Button size="lg" className="rounded-full w-full" onClick={() => window.location.href = '/ebook'}>
          Získat e-book zdarma
        </Button>
        <div className="mt-4 text-center text-sm text-muted-foreground">
          <p>Máte zájem o AI řešení?</p>
          <Link href="/ebook" className="text-primary hover:underline font-medium">
            Získejte e-book zdarma →
          </Link>
        </div>
      </nav>
    </div>
  )
}


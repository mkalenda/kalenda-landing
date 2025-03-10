"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

const navLinks = [
  { href: "#services", label: "Mé služby" },
  { href: "#about", label: "O mě" },
  { href: "/ebook", label: "E-book" },
]

export default function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Zjištění, zda jsme na hlavní stránce
  const isHomePage = pathname === "/" || pathname === ""

  const handleNavClick = (href: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault()
    
    if (href.startsWith("#")) {
      // Interní odkaz na sekci stránky
      if (isHomePage) {
        // Jsme na hlavní stránce, stačí scrollovat
        document.getElementById(href.slice(1))?.scrollIntoView({ behavior: "smooth" })
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
        isScrolled ? "bg-background/80 py-3 shadow-sm backdrop-blur-md" : "bg-transparent py-5"
      }`}
    >
      <div className="container flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          kalenda<span className="text-primary">.</span>ai
        </Link>

        <nav className="hidden md:flex items-center">
          <ul className="flex items-center space-x-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                {link.href.startsWith("#") ? (
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(link.href, e)}
                    className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
            <li>
              <Button size="sm" className="rounded-full" onClick={() => handleNavClick("#contact")}>
                Kontakt
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
    <nav className="absolute left-0 top-full w-full bg-background/95 py-4 shadow-md backdrop-blur-md md:hidden">
      <ul className="container flex flex-col space-y-4">
        {navLinks.map((link) => (
          <li key={link.href}>
            {link.href.startsWith("#") ? (
              <a
                href={link.href}
                onClick={(e) => onNavClick(link.href, e)}
                className="block py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ) : (
              <Link
                href={link.href}
                className="block py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            )}
          </li>
        ))}
        <li className="pt-2">
          <Button className="w-full rounded-full" size="sm" onClick={() => onNavClick("#contact")}>
            Spojit se
          </Button>
        </li>
      </ul>
    </nav>
  )
}


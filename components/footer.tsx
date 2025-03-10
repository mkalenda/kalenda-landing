"use client"

import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted py-8 border-t">
      <div className="container max-w-5xl mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 mb-8">
          <div>
            <div className="text-xl font-bold mb-4">
              kalenda<span className="text-primary">.</span>ai
            </div>
            <p className="text-muted-foreground text-sm">
              Expertní poradenství a implementace umělé inteligence pro české společnosti.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Navigace</h3>
            <nav aria-label="Footer navigace">
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                    Úvod
                  </Link>
                </li>
                <li>
                  <Link href="/#services" className="text-muted-foreground hover:text-foreground transition-colors">
                    Mé služby
                  </Link>
                </li>
                <li>
                  <Link href="/#about" className="text-muted-foreground hover:text-foreground transition-colors">
                    O mně
                  </Link>
                </li>
                <li>
                  <Link href="/ebook" className="text-muted-foreground hover:text-foreground transition-colors">
                    E-book
                  </Link>
                </li>
                <li>
                  <Link href="/#contact" className="text-muted-foreground hover:text-foreground transition-colors">
                    Kontakt
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Kontaktní informace</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground">
                Email: <a href="mailto:info@kalenda.ai" className="text-primary hover:underline">info@kalenda.ai</a>
              </li>
              <li className="text-muted-foreground">
                Telefon: <a href="tel:+420123456789" className="text-primary hover:underline">+420 123 456 789</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t pt-6 flex flex-col md:flex-row justify-between text-center md:text-left">
          <p className="text-xs text-muted-foreground">
            &copy; {currentYear} kalenda.ai | Všechna práva vyhrazena
          </p>
          <div className="mt-2 md:mt-0">
            <ul className="flex space-x-4 justify-center md:justify-end">
              <li>
                <Link href="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                  Ochrana osobních údajů
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                  Podmínky použití
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}


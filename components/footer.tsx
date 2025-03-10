"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
      setEmail("");
    }, 1000);
  };

  return (
    <footer className="bg-muted py-16 border-t">
      <div className="container max-w-5xl mx-auto">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 mb-12">
          <div className="md:col-span-4">
            <div className="text-xl font-bold mb-4">
              kalenda<span className="text-primary">.</span>ai
            </div>
            <p className="text-muted-foreground text-sm mb-6">
              Expertní poradenství a implementace umělé inteligence pro české společnosti.
            </p>
          </div>
          
          <div className="md:col-span-3">
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
                    Služby
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
          
          <div className="md:col-span-5">
            <h3 className="font-semibold mb-4">Odebírejte novinky</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Přihlaste se k odběru novinek o AI a digitální transformaci. Žádný spam, pouze užitečné informace.
            </p>
            
            {isSubscribed ? (
              <div className="bg-primary/10 p-4 rounded-lg">
                <p className="text-sm font-medium">
                  Děkujeme za přihlášení! Brzy se vám ozveme.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Váš e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="rounded-full"
                  />
                  <Button 
                    type="submit" 
                    className="rounded-full px-6"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Odesílám..." : "Odebírat"}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Odesláním souhlasíte se <Link href="/privacy" className="underline hover:text-primary">zpracováním osobních údajů</Link>
                </p>
              </form>
            )}
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
              <li>
                <Link href="/cookies" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}


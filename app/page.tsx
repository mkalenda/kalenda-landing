import HomePage from "@/components/home-page"
import { services } from "@/lib/data"

export default function Home() {
  const content = {
    hero: {
      title: "Inovativní AI řešení pro moderní podnikání",
      subtitle: "Využijte sílu umělé inteligence a automatizace pro transformaci vašich obchodních procesů a získejte konkurenční výhodu na trhu.",
      cta: "Zjistit více",
    },
    services: {
      title: "Mé služby",
      subtitle:
        "Od automatizace procesů po AI řešení poskytuji komplexní služby pro digitální transformaci vašeho podnikání.",
      items: services,
    },
    about: {
      title: "O mně",
      paragraphs: [
        "Jako expert na AI a systémové inženýrství se věnuji vytváření inovativních řešení pro moderní podniky. Můj přístup kombinuje nejnovější technologie s hlubokou znalostí obchodních procesů.",
        "S rozsáhlými zkušenostmi v oboru rozumím tomu, jak efektivně implementovat automatizaci a AI pro maximalizaci efektivity a konkurenceschopnosti vašeho podnikání.",
      ],
      cta: "Kontaktovat mě",
    },
    ebook: {
      title: "Stáhněte si zdarma e-book o AI v podnikání",
      subtitle: "Průvodce implementací umělé inteligence pro české firmy. Získejte praktické informace, případové studie a konkrétní návody.",
      features: [
        "Praktické návody pro implementaci AI bez ohledu na velikost firmy",
        "Reálné případové studie z českého trhu (Rohlík.cz, Komerční banka, Škoda Auto)",
        "Aktuální statistiky a trendy využití AI v českých firmách",
        "Právní a etické aspekty AI včetně nového AI Act",
        "Přehled praktických nástrojů a technologií pro české firmy",
        "17 stran praktických informací a konkrétních doporučení"
      ],
      cta: "Získat e-book zdarma",
    },
    contact: {
      title: "Kontakt",
      subtitle:
        "Jste připraveni transformovat své podnikání? Ozvěte se mi a společně vytvoříme řešení šité na míru vašim potřebám.",
    },
  }

  return <HomePage content={content} />
}


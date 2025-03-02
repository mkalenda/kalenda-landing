"use client"

import { Code, Cpu, Database, Network, Cog, Shield } from "lucide-react"

export const services = [
  {
    id: 1,
    title: "Systémové inženýrství",
    description: "Návrh a implementace komplexních systémů pro efektivní řízení vašich podnikových operací.",
    icon: Network,
  },
  {
    id: 2,
    title: "Automatizace procesů",
    description: "Automatizace rutinních úkolů a workflow pro zvýšení produktivity a snížení chybovosti.",
    icon: Cog,
  },
  {
    id: 3,
    title: "Vývoj softwaru na míru",
    description: "Tvorba specializovaného softwaru přesně podle potřeb vašeho podnikání a průmyslu.",
    icon: Code,
  },
  {
    id: 4,
    title: "AI řešení",
    description: "Implementace pokročilých AI technologií pro optimalizaci vašich obchodních procesů a rozhodování.",
    icon: Cpu,
  },
  {
    id: 5,
    title: "Kybernetická bezpečnost",
    description:
      "Implementace robustních bezpečnostních opatření pro ochranu vašich dat a systémů před kybernetickými hrozbami.",
    icon: Shield,
  },
  {
    id: 6,
    title: "Datová analýza a BI",
    description: "Pokročilá analýza dat a business intelligence pro informované rozhodování a strategické plánování.",
    icon: Database,
  },
]

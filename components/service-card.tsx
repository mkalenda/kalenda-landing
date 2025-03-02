"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface ServiceCardProps {
  service: {
    id: number
    title: string
    description: string
    icon: LucideIcon
  }
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const Icon = service.icon

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="mb-2 rounded-full bg-primary/10 p-2 w-12 h-12 flex items-center justify-center text-primary">
          <Icon className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
        </div>
        <CardTitle className="text-xl">{service.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{service.description}</CardDescription>
      </CardContent>
    </Card>
  )
}

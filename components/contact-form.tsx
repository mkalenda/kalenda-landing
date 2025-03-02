"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { CheckCircle2, Loader2 } from "lucide-react"

const formFields = [
  { name: "name", label: "Jméno", placeholder: "Vaše jméno", type: "text" },
  { name: "email", label: "Email", placeholder: "Váš email", type: "email" },
  { name: "message", label: "Zpráva", placeholder: "Řekněte nám o vašem projektu", type: "textarea" },
]

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormData({ name: "", email: "", message: "" })
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  if (isSubmitted) {
    return <SuccessMessage />
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {formFields.map((field) => (
        <FormField
          key={field.name}
          {...field}
          value={formData[field.name as keyof typeof formData]}
          onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
        />
      ))}
      <Button type="submit" className="w-full rounded-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Odesílání...
          </>
        ) : (
          "Odeslat zprávu"
        )}
      </Button>
    </form>
  )
}

function FormField({
  name,
  label,
  placeholder,
  type,
  value,
  onChange,
}: {
  name: string
  label: string
  placeholder: string
  type: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}) {
  const InputComponent = type === "textarea" ? Textarea : Input
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <InputComponent
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className="rounded-md"
      />
    </div>
  )
}

function SuccessMessage() {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg bg-primary/10 p-8 text-center">
      <CheckCircle2 className="mb-2 h-12 w-12 text-primary" />
      <h3 className="text-xl font-semibold">Děkujeme!</h3>
      <p className="text-muted-foreground">Vaše zpráva byla úspěšně odeslána. Brzy se vám ozveme.</p>
    </div>
  )
}


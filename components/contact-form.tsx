"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react"

const formFields = [
  { name: "name", label: "Jméno", placeholder: "Vaše jméno", type: "text" },
  { name: "email", label: "Email", placeholder: "Váš email", type: "email" },
  { name: "message", label: "Zpráva", placeholder: "Řekněte nám o vašem projektu", type: "textarea" },
]

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [serverError, setServerError] = useState("")

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name.trim()) {
      newErrors.name = "Jméno je povinné"
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email je povinný"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Prosím zadejte platný email"
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Zpráva je povinná"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setServerError("")
    
    // Validate form before submission
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message')
      }
      
      // Success - clear form and show success message
      setIsSubmitted(true)
      setFormData({ name: "", email: "", message: "" })
      setTimeout(() => setIsSubmitted(false), 5000)
    } catch (err) {
      console.error('Error submitting form:', err)
      setServerError(err instanceof Error ? err.message : 'Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" })
    }
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
          onChange={handleChange}
          error={errors[field.name]}
        />
      ))}
      
      {serverError && (
        <div className="flex items-center text-red-500 text-sm mt-2">
          <AlertCircle className="h-4 w-4 mr-2" />
          {serverError}
        </div>
      )}
      
      <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting}
      >
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
  error,
}: {
  name: string
  label: string
  placeholder: string
  type: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  error?: string
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      {type === "textarea" ? (
        <Textarea
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={error ? "border-red-500" : ""}
        />
      ) : (
        <Input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={error ? "border-red-500" : ""}
        />
      )}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}

function SuccessMessage() {
  return (
    <div className="rounded-lg bg-green-50 p-6 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
        <CheckCircle2 className="h-6 w-6 text-green-600" />
      </div>
      <h3 className="mt-4 text-lg font-medium text-green-800">
        Děkujeme za vaši zprávu!
      </h3>
      <p className="mt-2 text-green-700">
        Vaše zpráva byla úspěšně odeslána. Odpovíme vám co nejdříve.
      </p>
    </div>
  )
}

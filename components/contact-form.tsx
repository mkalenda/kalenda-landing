"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { CheckCircle2, Loader2, AlertCircle, Lock } from "lucide-react"

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
  const [activeField, setActiveField] = useState<string | null>(null)

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
    } else if (formData.message.length < 10) {
      newErrors.message = "Zpráva musí obsahovat alespoň 10 znaků"
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

  const handleFocus = (fieldName: string) => {
    setActiveField(fieldName)
  }

  const handleBlur = () => {
    setActiveField(null)
    // Validate current form state
    validateForm()
  }

  if (isSubmitted) {
    return <SuccessMessage />
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h3 className="text-lg font-medium">Jak vám mohu pomoci?</h3>
        <p className="text-sm text-muted-foreground">
          Vyplňte formulář níže a odpovím vám do 24 hodin
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {formFields.map((field) => (
          <FormField
            key={field.name}
            {...field}
            value={formData[field.name as keyof typeof formData]}
            onChange={handleChange}
            error={errors[field.name]}
            onFocus={() => handleFocus(field.name)}
            onBlur={handleBlur}
            isActive={activeField === field.name}
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
        
        <div className="flex items-center justify-center text-xs text-muted-foreground">
          <Lock className="h-3 w-3 mr-1" />
          Vaše údaje jsou v bezpečí
        </div>
      </form>
    </div>
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
  onFocus,
  onBlur,
  isActive,
}: {
  name: string
  label: string
  placeholder: string
  type: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  error?: string
  onFocus?: () => void
  onBlur?: () => void
  isActive?: boolean
}) {
  const id = `field-${name}`
  const errorId = error ? `${id}-error` : undefined
  
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className={`font-medium transition-colors ${isActive ? 'text-primary' : ''}`}>
        {label}
        <span className="text-destructive ml-1">*</span>
      </Label>
      {type === "textarea" ? (
        <Textarea
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          rows={4}
          className={`transition-all ${error ? "border-destructive" : isActive ? "border-primary ring-1 ring-primary" : ""}`}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={errorId}
          required
        />
      ) : (
        <Input
          id={id}
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          className={`transition-all ${error ? "border-destructive" : isActive ? "border-primary ring-1 ring-primary" : ""}`}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={errorId}
          required
        />
      )}
      {error ? (
        <p id={errorId} className="text-sm text-destructive flex items-center">
          <AlertCircle className="h-3 w-3 mr-1" /> {error}
        </p>
      ) : (
        <p className="text-xs text-muted-foreground">
          {name === 'email' && 'Nikdy nebudeme sdílet váš email s třetími stranami.'}
          {name === 'message' && 'Popište stručně váš projekt nebo dotaz.'}
        </p>
      )}
    </div>
  )
}

function SuccessMessage() {
  return (
    <div className="rounded-lg bg-green-50 p-6 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
        <CheckCircle2 className="h-6 w-6 text-green-600" />
      </div>
      <h3 className="mt-4 text-lg font-medium text-green-800">Zpráva úspěšně odeslána</h3>
      <p className="mt-2 text-sm text-green-600">
        Děkujeme za váš zájem. Odpovíme vám co nejdříve, obvykle do 24 hodin.
      </p>
      <div className="mt-6">
        <Button variant="outline" size="sm" onClick={() => window.location.href = '/ebook'}>
          Stáhnout e-book zdarma
        </Button>
      </div>
    </div>
  )
}

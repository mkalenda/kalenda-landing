"use client"

export default function Footer() {
  return (
    <footer className="border-t bg-muted/30 py-8">
      <div className="container flex flex-col items-center justify-center">
        <h3 className="text-xl font-bold">
          kalenda<span className="text-primary">.</span>ai
        </h3>
        <p className="mt-2 text-sm text-muted-foreground text-center">
          Inovujeme podnikání pomocí AI a systémového inženýrství.
        </p>
        <div className="mt-4 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} kalenda. Všechna práva vyhrazena.</p>
        </div>
      </div>
    </footer>
  )
}


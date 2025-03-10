# Integrace ebooku do Next.js projektu

Tento dokument obsahuje instrukce k integraci landing page pro ebook a mechanismu pro jeho distribuci do vašeho Next.js projektu.

## Přehled souborů

1. **`app/ebook/page.tsx`** - Landing page s formulářem pro stažení ebooku
2. **`app/api/submit-ebook-form/route.ts`** - API endpoint pro zpracování formuláře
3. **`scripts/generate-ebook.js`** - Skript pro generování PDF ebooku z Markdown souboru
4. **`content/umela-inteligence-v-podnikani-ebook.md`** - Zdrojový soubor s obsahem ebooku
5. **`public/ebooks/AI-Prakticky-Pruvodce-Pro-Ceske-Firmy.pdf`** - Vygenerovaný PDF ebook

## Nastavení a použití

### 1. Příprava prostředí

Nejprve nainstalujte potřebné závislosti:

```bash
npm install nodemailer
npm install --save-dev @types/nodemailer
```

Ujistěte se, že máte nainstalované tyto externí nástroje pro generování PDF:

- [Pandoc](https://pandoc.org/installing.html) - univerzální konverzní nástroj
- XeLaTeX - součást LaTeX distribuce:
  - MacOS: [MacTeX](https://www.tug.org/mactex/)
  - Windows: [MiKTeX](https://miktex.org/)
  - Linux: `sudo apt-get install texlive-xetex`

### 2. Konfigurace e-mailů

Pro odesílání emailů s ebookem nastavte v souboru `.env.local` tyto proměnné:

```
EMAIL_SERVICE=gmail  # Nebo jiný email provider (outlook, sendgrid, atd.)
EMAIL_USER=vas@email.cz
EMAIL_PASS=vase_heslo_nebo_app_password
```

Pro Gmail je nutné použít [App Password](https://myaccount.google.com/apppasswords) namísto běžného hesla.

### 3. Příprava obsahu ebooku

1. Umístěte Markdown soubor s obsahem ebooku do složky `content/umela-inteligence-v-podnikani-ebook.md`
2. Pokud máte obrázky pro ebook, umístěte je do složky `public/images/ebook/`

### 4. Generování PDF

Pro vytvoření PDF ebooku spusťte:

```bash
npm run generate-ebook
```

Skript zkontroluje, zda máte nainstalované potřebné nástroje, a poté vygeneruje PDF ebook do složky `public/ebooks/`.

### 5. Přizpůsobení landing page

Podle potřeby upravte soubor `app/ebook/page.tsx`:

- Aktualizujte texty a popisy obsahu ebooku
- Upravte formulář pro sběr dat (přidání/odebrání polí)
- Přizpůsobte vzhled stránky podle vašeho designu
- Upravte cesty k obrázkům a další vizuální prvky

## Jak to funguje

1. **Landing page** (`app/ebook/page.tsx`) zobrazuje informace o ebooku a formulář pro jeho získání
2. Uživatel vyplní a odešle formulář
3. Data z formuláře jsou odeslána na **API endpoint** (`app/api/submit-ebook-form/route.ts`)
4. API endpoint:
   - Validuje data
   - Uloží kontaktní informace do CSV souboru
   - Odešle email s PDF ebookem jako přílohou
   - Volitelně přidá uživatele do mailing listu
5. Uživatel obdrží email s ebookem

## Rozšiřování funkcionality

### Integrace s CRM nebo ESP

Pro lepší správu kontaktů můžete upravit funkci `addToMailingList()` v souboru `app/api/submit-ebook-form/route.ts` pro integraci s:

- Mailchimp
- SendGrid
- HubSpot
- A dalšími

Příklad integrace s Mailchimp API:

```typescript
async function addToMailingList(data: FormData) {
  const API_KEY = process.env.MAILCHIMP_API_KEY
  const LIST_ID = process.env.MAILCHIMP_LIST_ID
  const DC = API_KEY.split('-')[1]
  
  const url = `https://${DC}.api.mailchimp.com/3.0/lists/${LIST_ID}/members`
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `apikey ${API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email_address: data.email,
      status: 'subscribed',
      merge_fields: {
        FNAME: data.name.split(' ')[0],
        LNAME: data.name.split(' ').slice(1).join(' '),
        COMPANY: data.company,
        POSITION: data.position
      }
    })
  })
  
  return response.ok
}
```

### Přidání děkovné stránky

Pro lepší UX můžete vytvořit samostatnou děkovnou stránku:

1. Vytvořte soubor `app/ebook/thank-you/page.tsx`
2. Upravte handleSubmit v `app/ebook/page.tsx`, aby přesměroval po úspěšném odeslání:

```typescript
if (response.ok) {
  router.push('/ebook/thank-you')
}
```

## Testování

Při testování formuláře můžete použít:

- [Mailtrap](https://mailtrap.io/) - pro testování odesílání emailů bez skutečného doručení
- [Ethereal Email](https://ethereal.email/) - pro jednorázové testovací účty

## Údržba a aktualizace

- Pro aktualizaci obsahu ebooku stačí upravit zdrojový markdown soubor a znovu spustit `npm run generate-ebook`
- Sledujte data o stahování ebooku v `data/ebook-requests.csv`
- Pravidelně kontrolujte, zda se emaily správně odesílají

## Problémy a řešení

- **Problém s generováním PDF**: Ujistěte se, že máte správně nainstalovaný Pandoc a XeLaTeX
- **Neodesílají se emaily**: Zkontrolujte přihlašovací údaje a nastavení SMTP serveru
- **Problémy s cestami k souborům**: Ujistěte se, že struktura adresářů odpovídá popisu v tomto dokumentu

---

V případě dalších dotazů nebo problémů kontaktujte vývojářský tým nebo vytvořte Issue v repozitáři projektu. 
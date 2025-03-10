import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import fs from 'fs'
import path from 'path'

// Typy pro formulářová data
type FormData = {
  name: string
  email: string
  company: string
  position: string
  company_size: string
  phone: string
  industry: string
  interest_level: string
  how_found: string
  newsletter: boolean
  terms: boolean
}

export async function POST(request: NextRequest) {
  try {
    // Zpracování dat z formuláře
    const formData: FormData = await request.json()

    // Validace dat
    if (!formData.name || !formData.email || !formData.terms) {
      return NextResponse.json(
        { success: false, message: 'Chybí povinné údaje' },
        { status: 400 }
      )
    }

    // Ukládání dat do databáze nebo CSV souboru
    await saveDataToFile(formData)

    // Odeslání e-mailu s ebookem
    await sendEmailWithEbook(formData)
    
    // Odeslání notifikace o novém zájemci
    await sendLeadNotification(formData)

    // Úspěšná odpověď
    return NextResponse.json(
      { success: true, message: 'E-book byl úspěšně odeslán' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Chyba při zpracování formuláře:', error)
    return NextResponse.json(
      { success: false, message: 'Nastala chyba při zpracování požadavku' },
      { status: 500 }
    )
  }
}

/**
 * Uloží data zájemce do CSV souboru
 */
async function saveDataToFile(data: FormData) {
  const csvLine = `${new Date().toISOString()},${data.name},${data.email},${data.company},${data.position},${data.company_size},${data.phone},${data.industry},${data.interest_level},${data.how_found},${data.newsletter}\n`
  const filePath = path.join(process.cwd(), 'data', 'ebook-requests.csv')
  
  // Vytvoření adresáře, pokud neexistuje
  const dir = path.dirname(filePath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  
  // Vytvoření souboru s hlavičkou, pokud neexistuje
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(
      filePath,
      'timestamp,name,email,company,position,company_size,phone,industry,interest_level,how_found,newsletter\n'
    )
  }
  
  // Přidání nového řádku
  fs.appendFileSync(filePath, csvLine)
}

/**
 * Odešle e-mail s ebookem jako přílohou
 */
async function sendEmailWithEbook(data: FormData) {
  // Konfigurace transportu pro odesílání e-mailů
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

  // Cesta k PDF souboru
  const ebookPath = path.join(process.cwd(), 'public', 'ebooks', 'AI-Prakticky-Pruvodce-Pro-Ceske-Firmy.pdf')

  // Personalizovaný obsah na základě zájmu a odvětví
  let personalizedContent = '';
  
  if (data.interest_level) {
    switch (data.interest_level) {
      case 'researching':
        personalizedContent += '<p>Váš zájem o zjišťování možností AI je prvním krokem k úspěšné digitální transformaci. V našem e-booku najdete přehled základních konceptů a možností, které vám pomohou lépe se orientovat v této oblasti.</p>';
        break;
      case 'planning':
        personalizedContent += '<p>Jsme rádi, že plánujete implementaci AI v blízké budoucnosti. Náš e-book vám poskytne praktický návod, jak postupovat při plánování a implementaci AI řešení, včetně tipů pro vytvoření business case.</p>';
        break;
      case 'implementing':
        personalizedContent += '<p>Gratulujeme k aktivní implementaci AI řešení! V našem e-booku najdete tipy pro optimalizaci implementačního procesu a případové studie, které vám mohou pomoci vyhnout se běžným úskalím.</p>';
        break;
      case 'using':
        personalizedContent += '<p>Je skvělé, že již využíváte AI a hledáte další možnosti. V našem e-booku najdete pokročilé strategie a případové studie, které vám mohou pomoci posunout vaše AI iniciativy na další úroveň.</p>';
        break;
    }
  }
  
  if (data.industry) {
    switch (data.industry) {
      case 'IT':
        personalizedContent += '<p>Pro IT a technologické společnosti je v e-booku zvláště relevantní kapitola o implementaci AI do stávajících systémů a integraci s legacy řešeními.</p>';
        break;
      case 'finance':
        personalizedContent += '<p>Pro finanční sektor je v e-booku zvláště relevantní případová studie Komerční banky a sekce o detekci podvodů a personalizaci bankovnictví.</p>';
        break;
      case 'manufacturing':
        personalizedContent += '<p>Pro výrobní podniky je v e-booku zvláště relevantní případová studie Škoda Auto a sekce o prediktivní údržbě a optimalizaci výrobních procesů.</p>';
        break;
      case 'retail':
        personalizedContent += '<p>Pro maloobchod a e-commerce je v e-booku zvláště relevantní případová studie Rohlík.cz a sekce o personalizaci zákaznické zkušenosti a optimalizaci logistiky.</p>';
        break;
      case 'services':
        personalizedContent += '<p>Pro sektor služeb je v e-booku zvláště relevantní sekce o automatizaci zákaznické podpory a personalizaci služeb pomocí AI.</p>';
        break;
      case 'healthcare':
        personalizedContent += '<p>Pro zdravotnictví je v e-booku zvláště relevantní sekce o právních a etických aspektech využití AI v citlivých oblastech a optimalizaci procesů.</p>';
        break;
      case 'education':
        personalizedContent += '<p>Pro vzdělávací instituce je v e-booku zvláště relevantní sekce o personalizaci vzdělávání a automatizaci administrativních procesů.</p>';
        break;
    }
  }

  // Příprava e-mailu
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: data.email,
    subject: 'Váš e-book: Umělá inteligence v podnikání',
    text: `Vážený/á ${data.name},

děkujeme za Váš zájem o náš e-book "Umělá inteligence v podnikání: Praktický průvodce pro české firmy".

V příloze e-mailu najdete PDF soubor s kompletním průvodcem.

${data.newsletter ? 'Budeme Vás informovat o novinkách z oblasti AI a digitální transformace.' : ''}

S pozdravem,
Tým Kalenda.ai
www.kalenda.ai
    `,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0066cc;">Váš e-book je připraven ke stažení</h2>
        <p>Vážený/á <strong>${data.name}</strong>,</p>
        <p>děkujeme za Váš zájem o náš e-book <strong>"Umělá inteligence v podnikání: Praktický průvodce pro české firmy"</strong>.</p>
        <p>V příloze e-mailu najdete PDF soubor s kompletním průvodcem.</p>
        
        ${personalizedContent}
        
        ${data.newsletter ? '<p>Budeme Vás informovat o novinkách z oblasti AI a digitální transformace.</p>' : ''}
        
        <p>Pokud byste měli jakékoliv dotazy k obsahu e-booku nebo k implementaci AI ve vaší společnosti, neváhejte nás kontaktovat.</p>
        
        <p>Přejeme příjemné čtení!</p>
        <p>S pozdravem,<br><strong>Tým Kalenda.ai</strong></p>
        <div style="margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px; font-size: 12px; color: #666;">
          <p>www.kalenda.ai</p>
          <p>Pokud jste si tento e-book nevyžádali, můžete tento e-mail ignorovat.</p>
        </div>
      </div>
    `,
    attachments: [
      {
        filename: 'AI-Prakticky-Pruvodce-Pro-Ceske-Firmy.pdf',
        path: ebookPath,
      },
    ],
  }

  // Odeslání e-mailu
  await transporter.sendMail(mailOptions)

  // Pokud je zaškrtnuto "chci dostávat novinky", můžeme přidat e-mail do mailing listu
  if (data.newsletter) {
    await addToMailingList(data)
  }
}

/**
 * Přidá e-mail do seznamu odběratelů novinek
 */
async function addToMailingList(data: FormData) {
  // Zde můžete implementovat napojení na váš e-mailový marketing (Mailchimp, SendGrid, apod.)
  // Pro jednoduchost pouze zapíšeme do CSV
  const csvLine = `${new Date().toISOString()},${data.name},${data.email},${data.company},${data.position},${data.company_size},${data.phone},${data.industry},${data.interest_level},${data.how_found}\n`
  const filePath = path.join(process.cwd(), 'data', 'newsletter-subscribers.csv')
  
  // Vytvoření adresáře, pokud neexistuje
  const dir = path.dirname(filePath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  
  // Vytvoření souboru s hlavičkou, pokud neexistuje
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(
      filePath,
      'timestamp,name,email,company,position,company_size,phone,industry,interest_level,how_found\n'
    )
  }
  
  // Přidání nového řádku
  fs.appendFileSync(filePath, csvLine)
}

/**
 * Odešle notifikační e-mail o novém zájemci
 */
async function sendLeadNotification(data: FormData) {
  // Konfigurace transportu pro odesílání e-mailů
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

  // Příprava e-mailu
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // Použijeme stejný e-mail jako odesílatel
    subject: 'Nový zájemce o e-book: AI Praktický průvodce',
    text: `
Nový zájemce o e-book:

Jméno: ${data.name}
E-mail: ${data.email}
Telefon: ${data.phone || 'Neuvedeno'}
Společnost: ${data.company || 'Neuvedeno'}
Pozice: ${data.position || 'Neuvedeno'}
Velikost společnosti: ${data.company_size || 'Neuvedeno'}
Odvětví: ${data.industry || 'Neuvedeno'}
Zájem o implementaci AI: ${data.interest_level || 'Neuvedeno'}
Jak se o nás dozvěděl: ${data.how_found || 'Neuvedeno'}
Souhlas s newsletterem: ${data.newsletter ? 'Ano' : 'Ne'}
Datum a čas: ${new Date().toLocaleString('cs-CZ')}
    `,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0066cc;">Nový zájemce o e-book</h2>
        <p>Byl zaznamenán nový zájemce o e-book "Umělá inteligence v podnikání: Praktický průvodce pro české firmy".</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Jméno:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">E-mail:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${data.email}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Telefon:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${data.phone || 'Neuvedeno'}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Společnost:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${data.company || 'Neuvedeno'}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Pozice:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${data.position || 'Neuvedeno'}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Velikost společnosti:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${data.company_size || 'Neuvedeno'}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Odvětví:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${data.industry || 'Neuvedeno'}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Zájem o implementaci AI:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${data.interest_level || 'Neuvedeno'}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Jak se o nás dozvěděl:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${data.how_found || 'Neuvedeno'}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Souhlas s newsletterem:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${data.newsletter ? 'Ano' : 'Ne'}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Datum a čas:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${new Date().toLocaleString('cs-CZ')}</td>
          </tr>
        </table>
        
        <div style="margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px; font-size: 12px; color: #666;">
          <p>Toto je automaticky generovaný e-mail. Prosím, neodpovídejte na něj.</p>
        </div>
      </div>
    `,
  }

  // Odeslání e-mailu
  await transporter.sendMail(mailOptions)
} 
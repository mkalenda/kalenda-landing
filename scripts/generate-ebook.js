#!/usr/bin/env node

/**
 * Skript pro generování PDF ebooku z Markdown souboru
 * Používá Pandoc a XeLaTeX pro vytvoření profesionálně vypadajícího PDF
 */

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

// Cesty k souborům
const CONTENT_DIR = path.join(__dirname, '..', 'content')
const PUBLIC_DIR = path.join(__dirname, '..', 'public')
const EBOOKS_DIR = path.join(PUBLIC_DIR, 'ebooks')
const SOURCE_FILE = path.join(CONTENT_DIR, 'umela-inteligence-v-podnikani-ebook.md')
const OUTPUT_FILE = path.join(EBOOKS_DIR, 'AI-Prakticky-Pruvodce-Pro-Ceske-Firmy.pdf')
const YAML_FILE = path.join(__dirname, 'ebook-style.yaml')

// Zajistit existenci adresáře pro ebook
if (!fs.existsSync(CONTENT_DIR)) {
  fs.mkdirSync(CONTENT_DIR, { recursive: true })
}

if (!fs.existsSync(EBOOKS_DIR)) {
  fs.mkdirSync(EBOOKS_DIR, { recursive: true })
}

// Kontrola existence zdrojového souboru
if (!fs.existsSync(SOURCE_FILE)) {
  console.error(`\x1b[31mChyba: Zdrojový soubor '${SOURCE_FILE}' nebyl nalezen.\x1b[0m`)
  console.log('Ujistěte se, že jste umístili soubor "umela-inteligence-v-podnikani-ebook.md" do složky content/')
  process.exit(1)
}

// Kontrola, zda je nainstalován Pandoc
try {
  execSync('pandoc --version', { stdio: 'ignore' })
} catch (error) {
  console.error('\x1b[31mChyba: Pandoc není nainstalován.\x1b[0m')
  console.log('Prosím nainstalujte Pandoc: https://pandoc.org/installing.html')
  process.exit(1)
}

// Kontrola, zda je nainstalován XeLaTeX
try {
  execSync('xelatex --version', { stdio: 'ignore' })
} catch (error) {
  console.error('\x1b[31mChyba: XeLaTeX není nainstalován.\x1b[0m')
  console.log('Nainstalujte LaTeX distribuci:')
  console.log('  - MacOS: MacTeX (https://www.tug.org/mactex/)')
  console.log('  - Windows: MiKTeX (https://miktex.org/)')
  console.log('  - Linux: texlive-xetex (např. sudo apt-get install texlive-xetex)')
  process.exit(1)
}

// Vytvoření YAML souboru s metadaty a stylem
console.log('\x1b[36mVytvářím soubor s metadaty a styly...\x1b[0m')
const yamlContent = `---
title: "Umělá inteligence v podnikání: Praktický průvodce pro české firmy"
author: "Kalenda.ai"
date: "${new Date().getFullYear()}"
lang: cs
colorlinks: true
linkcolor: blue
urlcolor: blue
toccolor: blue
toc: false
geometry: margin=2.5cm
header-includes:
  - \\usepackage{fontspec}
  - \\usepackage{fancyhdr}
  - \\usepackage{xcolor}
  - \\usepackage{booktabs}
  - \\usepackage{longtable}
  - \\usepackage{array}
  - \\usepackage{multirow}
  - \\usepackage{wrapfig}
  - \\usepackage{float}
  - \\usepackage{colortbl}
  - \\usepackage{pdflscape}
  - \\usepackage{tabu}
  - \\usepackage{threeparttable}
  - \\usepackage{threeparttablex}
  - \\usepackage[normalem]{ulem}
  - \\usepackage{makecell}
  - \\usepackage{listings}
  - \\usepackage{setspace}
  - \\usepackage{enumitem}
  - \\usepackage{hyperref}
  - \\usepackage{url}
  - \\pagestyle{fancy}
  - \\renewcommand{\\headrulewidth}{0.4pt}
  - \\renewcommand{\\footrulewidth}{0.4pt}
  - \\fancyhf{}
  - \\fancyhead[RO,LE]{\\textbf{AI v podnikání}}
  - \\fancyfoot[C]{\\thepage}
  - \\fancyfoot[RO,LE]{www.kalenda.ai}
  - \\definecolor{primary}{RGB}{0, 102, 204}
  - \\definecolor{secondary}{RGB}{102, 153, 204}
  - \\definecolor{accent}{RGB}{255, 153, 0}
  - \\setmainfont{DejaVu Serif}
  - \\setsansfont{DejaVu Sans}
  - \\setmonofont{DejaVu Sans Mono}
  - \\onehalfspacing
  - \\hypersetup{breaklinks=true, colorlinks=true, linkcolor=blue, urlcolor=blue, pdfborder={0 0 0}}
  - \\urlstyle{same}
  - \\Urlmuskip=0mu plus 1mu
---`

fs.writeFileSync(YAML_FILE, yamlContent)

// Konverze ebooku
console.log('\x1b[36mKonvertuji ebook do PDF...\x1b[0m')
try {
  execSync(
    `pandoc "${SOURCE_FILE}" -o "${OUTPUT_FILE}" \
    --pdf-engine=xelatex \
    --metadata-file="${YAML_FILE}" \
    --highlight-style=tango \
    --variable=linkcolor:blue \
    --variable=urlcolor:blue \
    --variable=toccolor:blue \
    --variable=geometry:margin=2.5cm \
    --variable=block-headings \
    --variable=breaklinks:true \
    --standalone`,
    { stdio: 'inherit' }
  )
  
  // Kontrola, zda se konverze podařila
  if (fs.existsSync(OUTPUT_FILE)) {
    const stats = fs.statSync(OUTPUT_FILE)
    const fileSizeInMB = (stats.size / (1024 * 1024)).toFixed(2)
    console.log(`\x1b[32mKonverze byla úspěšná! Ebook byl uložen jako: ${OUTPUT_FILE}\x1b[0m`)
    console.log(`Velikost souboru: ${fileSizeInMB} MB`)
  }
} catch (error) {
  console.error('\x1b[31mChyba při konverzi:\x1b[0m', error.message)
  process.exit(1)
}

// Úklid dočasných souborů
if (fs.existsSync(YAML_FILE)) {
  fs.unlinkSync(YAML_FILE)
}
console.log('\x1b[32mHotovo!\x1b[0m') 
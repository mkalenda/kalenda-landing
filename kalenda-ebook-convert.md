# Instrukce pro převod ebooku do PDF

Pro vytvoření profesionálně vypadajícího PDF ebooku z Markdown souboru můžete použít několik nástrojů. Zde jsou doporučené postupy:

## Možnost 1: Použití Pandoc (doporučeno)

[Pandoc](https://pandoc.org/) je univerzální nástroj pro konverzi dokumentů, který umožňuje převádět mezi různými formáty včetně Markdown na PDF.

### Instalace Pandoc

1. Stáhněte a nainstalujte Pandoc z [oficiálních stránek](https://pandoc.org/installing.html)
2. Pro generování PDF budete také potřebovat LaTeX distribuci:
   - Pro macOS: [MacTeX](https://www.tug.org/mactex/)
   - Pro Windows: [MiKTeX](https://miktex.org/)
   - Pro Linux: TexLive (`sudo apt-get install texlive-full`)

### Příkaz pro konverzi

```bash
pandoc kalenda-ebook-cz.md -o Kalenda-AI-Digitalni-Transformace.pdf --pdf-engine=xelatex --variable mainfont="DejaVu Sans" --variable monofont="DejaVu Sans Mono" --toc --toc-depth=2 --highlight-style=tango --variable geometry:margin=1in
```

### Přizpůsobení

Pro lepší vzhled můžete vytvořit soubor stylu `ebook-style.yaml` s následujícím obsahem:

```yaml
---
title: "Revoluce v Podnikání: Digitální Transformace pro Moderní Firmy"
author: "Kalenda.ai"
date: "2023"
lang: cs
colorlinks: true
linkcolor: blue
urlcolor: blue
toccolor: blue
toc: true
toc-depth: 3
geometry: margin=1in
header-includes:
  - \usepackage{fancyhdr}
  - \pagestyle{fancy}
  - \fancyhead[CO,CE]{Kalenda.ai}
  - \fancyfoot[CO,CE]{www.kalenda.ai}
  - \fancyfoot[LE,RO]{\thepage}
---
```

A poté použít:

```bash
pandoc kalenda-ebook-cz.md -o Kalenda-AI-Digitalni-Transformace.pdf --pdf-engine=xelatex --template=eisvogel --metadata-file=ebook-style.yaml
```

## Možnost 2: Online nástroje

Pokud nechcete instalovat dodatečný software, můžete použít online nástroje:

1. [Markdown to PDF](https://www.markdowntopdf.com/)
2. [Dillinger.io](https://dillinger.io/) (Markdown editor s exportem do PDF)

## Možnost 3: Použití Visual Studio Code s rozšířeními

Pokud používáte VS Code, můžete nainstalovat tyto rozšíření:
- [Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one)
- [Markdown PDF](https://marketplace.visualstudio.com/items?itemName=yzane.markdown-pdf)

## Úpravy a grafické prvky

Pro profesionálnější vzhled:

1. Přidejte logo Kalenda.ai na úvodní stránku
2. Přidejte grafické prvky pro případové studie (grafy výsledků)
3. Vložte ikony nebo obrázky pro jednotlivé služby
4. Použijte konzistentní barevné schéma pro nadpisy, odrážky a zvýrazněné texty
5. Přidejte kontaktní informace na každou stránku v zápatí

## Distribuce ebooku

Po vytvoření PDF ebooku jej můžete:

1. Nabízet ke stažení na webových stránkách výměnou za e-mail (lead generation)
2. Sdílet na sociálních sítích
3. Zasílat potenciálním klientům jako součást obchodní komunikace
4. Použít ve svém e-mailovém marketingu jako bonus

Pro maximální efektivitu můžete vytvořit landing page speciálně pro tento ebook, kde vysvětlíte jeho přínosy a přidáte formulář pro stažení. 
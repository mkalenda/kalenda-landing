# Kalenda.ai - Propagační Ebook

Tento repozitář obsahuje zdrojové soubory pro propagační ebook v češtině o službách Kalenda.ai v oblasti AI, automatizace a systémového inženýrství.

## Obsah repozitáře

- `kalenda-ebook-cz.md` - Zdrojový Markdown soubor s kompletním obsahem ebooku
- `kalenda-ebook-convert.md` - Instrukce pro převod Markdown do PDF ebooku
- `README-EBOOK.md` - Tento soubor s popisem obsahu a instrukcemi

## O ebooku

Ebook "Revoluce v Podnikání: Digitální Transformace pro Moderní Firmy" poskytuje komplexní přehled služeb Kalenda.ai:

1. Systémové inženýrství
2. Automatizace procesů
3. Vývoj softwaru na míru
4. AI řešení
5. Kybernetická bezpečnost
6. Datová analýza a BI

V ebooku jsou také obsaženy případové studie, implementační strategie a další informace, které pomohou potenciálním klientům pochopit hodnotu nabízených služeb.

## Jak převést Markdown do PDF

Ebook je připraven ve formátu Markdown, který je třeba převést do PDF pro finální distribuci. Detailní instrukce pro tento převod najdete v souboru `kalenda-ebook-convert.md`.

### Rychlý postup

1. Nainstalujte [Pandoc](https://pandoc.org/installing.html) a LaTeX distribuci
2. Spusťte následující příkaz:

```bash
pandoc kalenda-ebook-cz.md -o Kalenda-AI-Digitalni-Transformace.pdf --pdf-engine=xelatex --variable mainfont="DejaVu Sans" --variable monofont="DejaVu Sans Mono" --toc --toc-depth=2 --highlight-style=tango --variable geometry:margin=1in
```

## Doporučení pro použití ebooku

1. **Lead Generation**: Nabízejte ebook na svých webových stránkách výměnou za kontaktní údaje
2. **Obchodní nástroj**: Používejte jako součást obchodních prezentací a následné komunikace
3. **Obsahový marketing**: Sdílejte části obsahu na sociálních sítích a v newsletterech
4. **Vzdělávání klientů**: Pomůže potenciálním klientům lépe pochopit přínosy digitální transformace

## Úpravy obsahu

Obsah je možné upravit podle aktuálních potřeb:

1. Aktualizujte případové studie podle nejnovějších realizovaných projektů
2. Přidejte nebo upravte nabízené služby
3. Aktualizujte kontaktní informace
4. Přizpůsobte obsah specifické cílové skupině

## Grafické zpracování

Pro profesionální vzhled doporučujeme:

1. Přidat logo Kalenda.ai
2. Použít konzistentní barevné schéma
3. Doplnit relevantní obrázky a ikony
4. Přidat grafy ilustrující výsledky případových studií

---

© Kalenda.ai, 2023 
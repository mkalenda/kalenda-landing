# Instrukce pro přípravu obrázků pro ebook

Pro správné fungování landing page ebooku je potřeba připravit následující obrázky:

## 1. Logo

**Soubor**: `public/images/logo.png`
**Popis**: Logo Kalenda.ai pro záhlaví stránky
**Doporučený rozměr**: 180 × 60 px
**Formát**: PNG s průhledným pozadím

## 2. Náhled ebooku

**Soubor**: `public/images/ebook-preview.png`
**Popis**: Vizualizace titulní strany nebo několika stran ebooku
**Doporučený rozměr**: 600 × 800 px (poměr stran 3:4)
**Formát**: PNG nebo JPG

## 3. Náhled pro sociální sítě (volitelné)

**Soubor**: `public/images/ebook-social-preview.jpg`
**Popis**: Obrázek pro sdílení na sociálních sítích
**Doporučený rozměr**: 1200 × 630 px
**Formát**: JPG

## 4. Ikony pro sekce ebooku (volitelné)

**Adresář**: `public/images/icons/`
**Soubory**:
- `automation.svg` - Ikona pro automatizaci procesů
- `analytics.svg` - Ikona pro prediktivní analýzy
- `personalization.svg` - Ikona pro personalizaci
- `optimization.svg` - Ikona pro optimalizaci procesů
- `security.svg` - Ikona pro kybernetickou bezpečnost
- `implementation.svg` - Ikona pro implementaci

**Doporučený rozměr**: 64 × 64 px
**Formát**: SVG (ideálně) nebo PNG s průhledným pozadím

## 5. Pozadí (volitelné)

**Soubor**: `public/images/ai-background.jpg`
**Popis**: Abstraktní pozadí související s AI tématem
**Doporučený rozměr**: 1920 × 1080 px
**Formát**: JPG

## Návrh obrázků

### Náhled ebooku

Pro `ebook-preview.png` doporučujeme vytvořit mockup PDF dokumentu s titulní stranou ebooku. Můžete použít některé z následujících přístupů:

1. **Vlastní design** - Vytvořte titulní stranu v grafickém editoru (Photoshop, Illustrator, Canva) a následně ji umístěte do mockupu.

2. **Online mockup generátor** - Použijte služby jako:
   - [Smartmockups](https://smartmockups.com/)
   - [Placeit](https://placeit.net/)
   - [Mockup World](https://www.mockupworld.co/)

3. **3D mockup** - Pro profesionálnější vzhled lze vytvořit 3D mockup knihy nebo dokumentu s několika viditelnými stránkami.

### Design titulní strany

Titulní strana ebooku by měla obsahovat:

- Hlavní název: "Umělá inteligence v podnikání"
- Podtitul: "Praktický průvodce pro české firmy"
- Vizuální prvky související s AI (neuronové sítě, datové vizualizace, abstraktní technologické grafiky)
- Logo Kalenda.ai
- Rok vydání

## Umístění obrázků

1. Vytvořte složku `public/images/`, pokud ještě neexistuje
2. Umístěte připravené obrázky do příslušných souborů podle výše uvedených instrukcí
3. Ujistěte se, že cesty v komponentách odpovídají skutečnému umístění souborů

## Optimalizace obrázků

Před nahráním obrázků na web je doporučeno je optimalizovat pro rychlejší načítání:

1. Používejte vhodný formát (SVG pro vektorovou grafiku, WebP/PNG pro obrázky s průhledností, JPG pro fotografie)
2. Komprimujte obrázky pomocí nástrojů jako [TinyPNG](https://tinypng.com/) nebo [Squoosh](https://squoosh.app/)
3. Poskytujte responzivní varianty pomocí Next.js Image komponenty

---

Tyto obrázky jsou nezbytné pro profesionální vzhled landing page pro ebook. Jejich kvalitní zpracování výrazně zvýší konverzní poměr a zájem o stažení ebooku. 
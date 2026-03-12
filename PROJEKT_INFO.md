# PROJEKT_INFO – Thai Massage Website

## Auftraggeber & Kontext

Kundenwebsite für einen Thai-Massage-Salon. Erstellt durch WEBSYLON (Freelancer).
Ziel: Professionelle, elegante Präsenz mit Buchungsmöglichkeit, zweisprachig DE/EN.

---

## Tech Stack

- **Reines HTML5 + CSS3 + Vanilla JS** – kein Framework, kein Tailwind, kein Next.js
- **Mobile-First**, Responsive Design
- **Zweisprachig** DE/EN via `data-de` / `data-en` Attribute + localStorage
- Lokaler Dev-Server: `npx serve` in VS Code

---

## Projektstruktur

```
thai-massage/
├── css/
│   ├── variables.css       ✅ Design Tokens (Farben, Fonts, Spacing, etc.)
│   ├── base.css            ✅ Reset, Grundstile
│   ├── navbar.css          ✅ Navigation (Desktop + Mobile)
│   ├── hero.css            ✅ Hero-Section
│   ├── sections.css        ✅ About, Atmosphäre, Galerie, Testimonials, Booking, Footer
│   ├── services.css        ✅ Leistungs-Cards
│   ├── contact.css         ✅ Kontaktformular-Styles (vorbereitet)
│   └── responsive.css      ✅ Alle Breakpoints
├── js/
│   └── main.js             ✅ Alle Interaktionen
├── images/
│   ├── image1.jpg – image9.jpg
│   ├── logo.png
│   └── logo-transparent.png   ← wird in index.html verwendet
├── index.html              ✅ FERTIG
├── leistungen.html         ⏳ FEHLT NOCH
└── kontakt.html            ⏳ FEHLT NOCH
```

---

## Design System

### Farbpalette (aus Logo abgeleitet)

```css
--color-cream:       #FDF0EC   /* Basis/Hintergrund */
--color-deep:        #0D0D0D   /* fast Schwarz */
--color-lavender:    #C084D4   /* Primär-Akzent (hell) */
--color-violet:      #7B5EA7   /* Sekundär-Akzent (tief) */
--color-violet-dark: #5A3E8A   /* hover/pressed */
--color-stone:       #3D3535   /* Fließtext */
--color-muted:       #8A7F7F   /* Subtexte */
--color-border:      #E8D9D4   /* Linien */
--color-surface:     #FAF4F1   /* Karten-Hintergrund */
```

### Fonts (Google Fonts)

- `Pinyon Script` → Display/Hero-Headlines (`--font-display`)
- `Cormorant Garamond` → Sektions-Überschriften (`--font-serif`)
- `Jost` → Body, Navigation, Labels, Buttons (`--font-sans`)

### Navbar-Höhe

- `--navbar-height: 80px` (in variables.css)
- Logo-Höhe: **100px** (bewusst größer als Navbar → leichter Overflow-Effekt)

---

## Breakpoints (responsive.css)

| Name         | Bereich           | Verhalten                     |
| ------------ | ----------------- | ----------------------------- |
| XS/SM Mobile | max-width: 767px  | Burger, kein Desktop-Nav      |
| MD Tablet    | 768px – 1179px    | Burger, Lang-Toggle zentriert |
| LG+ Desktop  | min-width: 1180px | Volle Desktop-Navigation      |

### Tablet Navbar-Layout (768px – 1179px)

Navbar nutzt `display: grid` mit 3 Spalten:

- Logo → links (grid-column: 1)
- Lang-Toggle → Mitte (grid-column: 2)
- Burger → rechts (grid-column: 3)

---

## index.html – Sektionen (alle fertig ✅)

1. **Navbar** – fixed, dunkel `rgba(13,13,13,0.95)`, immer dunkel (kein transparenter Hero-Modus)
2. **Mobile Menu** – Fullscreen Overlay, slide-in von oben
3. **Hero** – Vollbild `image1.jpg`, Ken-Burns Zoom, gestaffelte Animationen
4. **Über uns** (`#about`) – Zweispaltig, `image4.jpg` + `image7.jpg` Akzent
5. **Atmosphäre** – Dunkle Zitat-Section, `image7.jpg`
6. **Leistungen Preview** – 5 Service-Cards + 1 Featured Card
7. **Galerie** – Masonry-Grid, 7 Bilder, Lightbox mit Tastatursteuerung
8. **Testimonials** – 3 Karten
9. **Booking CTA** – dunkel, Telefonnummer
10. **Footer** – 3-spaltig, dunkel

---

## Bildzuweisungen

| Datei      | Verwendung                                         |
| ---------- | -------------------------------------------------- |
| image1.jpg | Hero-Background                                    |
| image2.jpg | Service-Card: Fußreflexzonen                       |
| image3.jpg | Service-Card: Tiefengewebe                         |
| image4.jpg | Über uns + Featured Service-Card (Klassische Thai) |
| image5.jpg | Service-Card: Bambus-Massage                       |
| image6.jpg | Service-Card: Öl-Massage                           |
| image7.jpg | Atmosphäre-Section + Über uns Akzent               |
| image8.jpg | verfügbar für leistungen.html                      |
| image9.jpg | verfügbar für Galerie/Testimonials                 |

---

## main.js – Funktionen (alle implementiert ✅)

1. **Navbar Scroll-State** – `.scrolled` Klasse ab 50px
2. **Burger Menu** – ESC-Taste + Link-Klick schließt, ARIA-Attribute
3. **Language Toggle** – `data-de`/`data-en`, localStorage-Persistenz
4. **Scroll Reveal** – IntersectionObserver, `.reveal` Klasse
5. **Aktiver Nav-Link** – URL-basiert, `.active` Klasse
6. **Galerie Lightbox** – Prev/Next, Tastatur, Backdrop-Klick
7. **Preisliste Tab-Filter** – `data-category` Attribut
8. **Kontaktformular Handler** – vorbereitet für Formspree-Backend
9. **Smooth Scroll** – Anker-Links mit Navbar-Offset

---

## Wichtige Regeln & Entscheidungen

- **Navbar immer dunkel** – kein transparenter Hero-Modus
- **Logo-Höhe = 100px** (fest, nicht ändern)
- **Tablet-Breakpoint = 1180px**
- **Burger-Button bleibt INNERHALB des `<header>`** – nicht außerhalb!
- **Prettier für HTML deaktivieren** – verhindert Einrückungs-Probleme
- Neue Portfolio-Slides müssen in `.slider-container` div
- Separate CSS-Dateien im `css/` Ordner – keine Inline-Styles

---

## Noch zu erledigen ⏳

### Seiten

- [ ] `leistungen.html` – Vollständige Leistungsseite mit Preistabelle und Tab-Filter
- [ ] `kontakt.html` – Kontaktformular + Google Maps Einbettung

### Inhalte (vom Kunden ausstehend)

- [ ] Echte Preise eintragen
- [ ] Echte Öffnungszeiten
- [ ] Echte Adresse + Telefonnummer
- [ ] Echte Kundenbewertungen
- [ ] Eventuell echte Fotos ersetzen

### Technik

- [ ] Kontaktformular Backend (Formspree empfohlen – kostenlos, einfach)
- [ ] Favicon erstellen
- [ ] SEO Meta-Tags (Description, OG-Tags für Social Media)
- [ ] Domain registrieren
- [ ] Deployment (Netlify empfohlen – kostenlos, einfach per Drag & Drop)
- [ ] Finaler Responsive-Check auf allen 3 Seiten

---

## Nächster Schritt

Mit `leistungen.html` beginnen – Struktur analog zu `index.html`,
mit vollständiger Preistabelle und Tab-Filter (Kategorien: Alle, Thai, Öl, Spezial).

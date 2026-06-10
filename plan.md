# Plan promena — Portfolio

Ovde snimamo sve promene na sajtu: šta je urađeno, kada i zašto.

---

## 10. jun 2026.

### Brend i logo
- [x] Logo zamenjen sa `GD logo.png`
- [x] Uklonjen video sa pticama pored loga

### Header
- [x] Font navigacije povećan za +2px
- [x] SR | EN pomereno skroz desno
- [x] Font jezika povećan za +4px

### Pozadina i sekcije
- [x] Uklonjene linije/gradijenti između sekcija
- [x] Jedna crna nijansa pozadine (`#111111`) za celu stranicu
- [x] Sekcije podešene na punu visinu ekrana (scroll-snap)
- [x] Scroll do kraja stranice popravljen (`proximity` umesto `mandatory`)

### Početna (Hero)
- [x] Novi naslov: „Gradim digitalna rešenja koja rade / dok ti živiš život.”
- [x] Uklonjen zarez iz prve linije naslova
- [x] Novi podnaslov: „Web sajtovi i AI rešenja za ljude kojima je vreme dragoceno.”
- [x] Dugme „Pogledaj radove” spušteno za 2 reda
- [x] Naslov podignut za 3 reda (ostale sekcije za 2)
- [x] Naslov povećan za +2px (Playfair Display)

### O meni
- [x] Sekcija podignuta za dodatna 2 reda
- [x] Sva slova u sekciji povećana za +3px
- [x] Ažurirani tekstovi (about.p1–p4)

### Moji radovi
- [x] Sekcija podignuta za 3 reda
- [x] Fontovi usklađeni sa sekcijom O meni
- [x] Naslov „Moji radovi” podignut za dodatna 3 reda (ostatak ostao)
- [x] WEB DIZAJN pomeren udesno za 3 tab-a
- [x] Razmak pola reda ispod AI KODIRANJE / WEB DIZAJN
- [x] Uklonjene slike dizajn portfolija
- [x] „Dizajn” preimenovan u „WEB DIZAJN”
- [x] Novi opis: „Web stranica po vašoj meri.”
- [x] AI opis: „...i lične i poslovne.”
- [x] EN verzija: „WEB DESIGN” u jednom redu (kao SR „WEB DIZAJN”)

### Kako radim
- [x] Sekcija podignuta za 2 reda (ukupno)
- [x] Korak 1: fokus na problem koji treba rešiti
- [x] Korak 2: crtica zamenjena dvotačkom
- [x] Korak 3: „Kreiram alat...”
- [x] Korak 4: „...spreman za svakodnevnu upotrebu.”

### Kontakt
- [x] Uklonjen okvir forme i pozadinski glow
- [x] Polja bez kutija — samo donja linija
- [x] Fontovi usklađeni sa prethodnim sekcijama
- [x] Labele (IME, E-MAIL, PORUKA) boldovane
- [x] Uklonjen placeholder ispod PORUKA
- [x] Novi podnaslov: „Imaš ideju za aplikaciju ili sajt?...”

### Footer
- [x] Tekst: „© 2026 Gorana Dokmanović · AI Developer & Web Designer”

### Dokumentacija
- [x] Kreiran `plan.md` — dnevnik svih promena na sajtu

### Git
- [x] Commit: `d33c7e4` — Azuriraj portfolio na AI Developer brend, novi layout i tekstove
- [x] Commit: `cc72c26` — plan.md, ispravka EN WEB DESIGN naslova

---

## 10. jun 2026. (večer) — Redizajn sekcije Projekti

### Sekcija „Projekti” (bivši „Moji radovi”)
- [x] Spojene kolone „AI KODIRANJE” i „WEB DIZAJN” u jednu sekciju **Projekti** (EN: **Projects**)
- [x] Navigacija ažurirana: „Radovi” → „Projekti”
- [x] Novi podnaslov: „AI proizvodi i web dizajn — jedan pristup, pažnja prema detaljima.”
- [x] Stari layout (veliki category headingi + sitne thumbnail kartice) zamenjen **velikim project card** gridom

### Project cards — dizajn
- [x] Grid: 2 kolone (≥900px), 1 kolona na mobilnom; treća kartica centrirana ispod (2+1)
- [x] Svaka kartica: screenshot 16:9, category tag (mono pill), naziv, opis, tech stack, CTA
- [x] Hover: lift, jača gold border, glow, strelica CTA klizi desno
- [x] Placeholder za nedostajuće slike (inicijal u gold) + `console.info` u `script.js`
- [x] `styles.css?v=31`

### Projekti — sadržaj
- [x] **SSMM** — tag AI PROIZVOD, link `https://ssmm.live`, slika `images/projects/ssmm.png`
- [x] **Optika Kosović — 3D Landing** — tag WEB DIZAJN · 3D, Vercel demo URL u `TODO_OPTIKA_URL` (`script.js`), slika `images/projects/optika.png`
- [x] **Portfolio — ovaj sajt** — tag WEB DIZAJN, bez linka; label „Upravo ste tu. ✦” (EN: „You are here. ✦”) umesto CTA; samo GD logo u media zoni (bez pretrpanog hero screenshot-a); slika `images/projects/portfolio.png`

### i18n
- [x] Novi ključevi: `portfolio.p1.*`, `portfolio.p2.*`, `portfolio.p3.*`, `portfolio.cta`, `portfolio.p3.here`
- [x] Uklonjeni stari ključevi za split layout (`portfolio.ai_title`, `portfolio.design_title`, itd.)

### Slike
- [x] Folder `images/projects/` — ssmm.png, optika.png, portfolio.png
- [x] Dodatne izvorne slike: `images/app ssmm.png`, `images/web optika kosovic.png`, `images/app projekat 3.png`

### Git
- [x] Commit: `de5a86c` — Redizajn sekcije Projekti (velike kartice, SSMM, Optika, Portfolio)
- [x] Commit: `d3bfb47` — Ažuriran plan.md sa hash-om commita

---

## 10. jun 2026. (kasno veče) — Hero centriranje i kontakt forma

### Početna (Hero) — naslov i dugme
- [x] Prva linija naslova („Gradim digitalna rešenja koja rade”) centrirana u odnosu na dugme **Pogledaj radove** (ista vertikalna osa)
- [x] `.hero-content` — flex kolona sa `align-items: center` (naslov i dugme dele centar)
- [x] `.hero-heading-line1` — prirodna širina teksta (`max-width: none`), bez stezanja u 1040px kontejner (tekst je širi ~1161px pa je prelazio udesno)
- [x] Kompenzacija `letter-spacing`-a: `padding-right` + `margin-right` (desktop 0.04em, mobilni 0.02em)
- [x] Font-size naslova: `clamp(2.15rem, 4.8vw, 3.55rem)` (desktop), `clamp(1.5rem, 5.6vw, 2.15rem)` (mobilni) — zamenjen stari `calc(clamp(... - 13px) + 2px)` koji je blokirao vidljive promene
- [x] `styles.css?v=40`

### Kontakt forma
- [x] Label **PORUKA** spušten za jedan red — `.form-row + .form-group { margin-top: ... }`

### Git
- [x] Commit: `9aa41f4` — Hero centriranje naslova u odnosu na dugme, PORUKA spacing, CSS v40

---

## Predstojeće promene

<!-- Dodaj nove stavke ovde -->

- [ ] Ažurirati `TODO_OPTIKA_URL` kad Vercel demo bude javan
- [ ] Prave screenshot-e za kartice (SSMM dashboard, Optika 3D hero) umesto logo/thumbnail verzija

---

## Napomene

- Posle većih CSS izmena: hard refresh (`Ctrl+F5`)
- Lokalni server: `npx serve .`
- Prevodi: `i18n.js` + `data-i18n` u `index.html`

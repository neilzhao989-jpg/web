# Auric Aura Fengshui

Bilingual marketing site for **Auric Aura Fengshui** — traditional Chinese Feng Shui consultations
for modern homes, workplaces and real-estate decisions.

*Classical Wisdom. Balanced Spaces. Better Life. · 古法智慧 · 空间平衡 · 美好生活*

## What's here

A dependency-free static site. No build step, no framework — open `index.html` and it runs.

```
index.html            Home — hero, service tiles, booking call to action
services.html         The five services, with #anchors for the nav dropdown
process.html          What You Receive + How It Works (#receive)
sample-report.html    The fifteen chapters of a residential report
about.html            About + the five classical methods
faq.html              Frequently asked questions
contact.html          Booking and what to send us

assets/css/style.css  Design tokens, layout, and the Chinese type treatment
assets/js/i18n.js     Simplified Chinese strings (generated — see below)
assets/js/main.js     Language toggle, sticky header, mobile drawer, dropdown, reveal
assets/img/           Hero, service tiles, luopan accent, brand seal
```

## Languages

The site ships English in the HTML and swaps in Simplified Chinese at runtime. Every translatable
node carries a `data-i18n` key; `assets/js/i18n.js` holds the Chinese for each key. The **中文 / EN**
button in the header switches the whole site in one click — no page reload, no third-party
translation widget. The choice is remembered in `localStorage` and applies across pages.

The translation is written, not machine-generated, so the classical terms are correct:
峦头 · 玄空飞星 · 八宅 · 八字 · 择日.

**To edit a Chinese string**, change its value in `assets/js/i18n.js`. **To edit English**, change
the text in the HTML — but keep the `data-i18n` attribute, or that node stops translating.

**To add a new translatable element**, give it `data-i18n="some.key"` and add `"some.key"` to
`i18n.js`. Elements without a matching key simply stay English. `data-i18n-aria` does the same for
`aria-label`, and `title.<page>` sets the Chinese `<title>`.

## Design

| Token | Value | Use |
| --- | --- | --- |
| `--ink` | `#0E0C09` | page ground |
| `--gold` | `#C9A24A` | accents, primary buttons |
| `--gold-soft` | `#E0C489` | headings on gold, hover |
| `--cream` | `#F4EEE4` | body text |

Display type is Cormorant Garamond over Lato; Chinese switches to Noto Serif SC over Noto Sans SC,
with tighter tracking and no synthesised italics. Both load from Google Fonts with system fallbacks.

Responsive at 1300px, 1080px, 900px (nav collapses to a drawer) and 640px. Honours
`prefers-reduced-motion`.

## Running locally

```bash
python3 -m http.server 4173
```

Then open <http://localhost:4173>.

## Deploying

Any static host works. For GitHub Pages: **Settings → Pages → Deploy from a branch → `main` / root**.

## Content

Copy is taken from the Auric Aura Fengshui brief. Prices are in CAD. Enquiries go to
<Robotechai2024@gmail.com>.

# Auric Aura Fengshui

Marketing site for **Auric Aura Fengshui** — traditional Chinese Feng Shui consultations for
modern homes, workplaces and real-estate decisions.

*Classical Wisdom. Balanced Spaces. Better Life.*

## What's here

A dependency-free static site. No build step, no framework — open `index.html` and it runs.

```
index.html              single page, anchor-linked sections
assets/css/style.css    design tokens + all styling
assets/js/main.js       sticky header, mobile drawer, dropdown, scroll reveal, scrollspy
assets/img/             hero, service tiles, luopan accent, brand seal
```

## Sections

Hero · Service tiles · Our Approach (Luan Tou, Xuan Kong Flying Stars, Ba Zhai, BaZi, Date
Selection) · Services (Residential, Home Buying, Business, BaZi, Real Estate) · What You Receive ·
How It Works · Sample Report · About · FAQ · Booking CTA.

## Design

| Token | Value | Use |
| --- | --- | --- |
| `--ink` | `#0E0C09` | page ground |
| `--gold` | `#C9A24A` | accents, primary buttons |
| `--gold-soft` | `#E0C489` | headings on gold, hover |
| `--cream` | `#F4EEE4` | body text |

Display type is Cormorant Garamond; body copy is Lato. Both load from Google Fonts with system
fallbacks.

The layout is responsive at 1080px, 900px (nav collapses to a drawer) and 640px, and it honours
`prefers-reduced-motion`.

## Running locally

```bash
python3 -m http.server 4173
```

Then open <http://localhost:4173>.

## Deploying

Any static host works. For GitHub Pages: **Settings → Pages → Deploy from a branch → `main` / root**.

## Content note

Copy is taken from the Auric Aura Fengshui brief. Prices are in CAD. Enquiries go to
<Robotechai2024@gmail.com>.

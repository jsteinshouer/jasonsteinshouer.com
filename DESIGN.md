---
name: jasonsteinshouer.com
description: A paper-and-ink reading surface for a nine-year archive of working-developer notes.
colors:
  paper: "#fbfbfa"
  paper-sunk: "#f2f2ef"
  paper-raised: "#ffffff"
  ink: "#1a1c1b"
  ink-soft: "#5c6360"
  ink-faint: "#6a706b"
  rule: "#e3e3de"
  rule-strong: "#cfcfc8"
  accent: "#0e6b54"
  accent-deep: "#0a5140"
  accent-wash: "#e7f1ed"
  select: "#cfe6dd"
  code-cue: "#767c78"
  paper-dark: "#1c2124"
  paper-sunk-dark: "#242a2d"
  paper-raised-dark: "#232a2e"
  ink-dark: "#ece5d8"
  ink-soft-dark: "#a7a89e"
  ink-faint-dark: "#93958c"
  rule-dark: "#414444"
  rule-strong-dark: "#5f605e"
  accent-dark: "#59d6ae"
  accent-deep-dark: "#8ee7c9"
  accent-wash-dark: "#22322c"
  select-dark: "#1e4438"
  code-cue-dark: "#767e78"
typography:
  display:
    fontFamily: "Source Serif 4, Charter, Bitstream Charter, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(2.125rem, 1.62rem + 2.3vw, 3.375rem)"
    fontWeight: 600
    lineHeight: 1.06
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Source Serif 4, Charter, Bitstream Charter, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(1.875rem, 1.6rem + 1.2vw, 2.5rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.022em"
  title:
    fontFamily: "Source Serif 4, Charter, Bitstream Charter, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(1.5rem, 1.32rem + 0.75vw, 1.875rem)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  lede:
    fontFamily: "Source Serif 4, Charter, Bitstream Charter, Iowan Old Style, Georgia, serif"
    fontSize: "1.3125rem"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  body:
    fontFamily: "Source Serif 4, Charter, Bitstream Charter, Iowan Old Style, Georgia, serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.72
    letterSpacing: "normal"
  body-small:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  wordmark:
    fontFamily: "Source Serif 4, Charter, Bitstream Charter, Iowan Old Style, Georgia, serif"
    fontSize: "1.1875rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "-0.015em"
  control:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "normal"
  label:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0.02em"
  label-chip:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.02em"
  label-micro:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.08em"
  code:
    fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, monospace"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  keycap:
    fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, monospace"
    fontSize: "0.6875rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "normal"
rounded:
  micro: "2px"
  image: "3px"
  sm: "4px"
  md: "6px"
  panel-inset: "9px"
  lg: "10px"
  pill: "99px"
  circle: "50%"
spacing:
  3xs: "0.35rem"
  2xs: "0.5rem"
  xs: "0.75rem"
  sm: "1rem"
  md: "1.5rem"
  lg: "2rem"
  xl: "3rem"
  gutter: "clamp(1.25rem, 5vw, 3rem)"
  band: "clamp(1.75rem, 4vw, 2.5rem)"
components:
  tag:
    backgroundColor: "transparent"
    textColor: "{colors.ink-soft}"
    typography: "{typography.label-chip}"
    rounded: "{rounded.sm}"
    padding: "0.34rem 0.55rem"
  tag-hover:
    backgroundColor: "{colors.accent-wash}"
    textColor: "{colors.accent}"
    rounded: "{rounded.sm}"
  button:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "0.6rem 1rem"
  button-hover:
    backgroundColor: "{colors.accent-wash}"
    textColor: "{colors.accent}"
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "0.6rem 1rem"
  button-primary-hover:
    backgroundColor: "{colors.accent-deep}"
    textColor: "{colors.paper}"
  icon-button:
    backgroundColor: "transparent"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.md}"
    height: "2.25rem"
    width: "2.25rem"
  icon-button-hover:
    backgroundColor: "{colors.paper-sunk}"
    textColor: "{colors.ink}"
  codeblock:
    backgroundColor: "{colors.paper-sunk}"
    textColor: "{colors.ink}"
    typography: "{typography.code}"
    rounded: "{rounded.md}"
    padding: "1rem 1.15rem 1.15rem"
  code-inline:
    backgroundColor: "{colors.paper-sunk}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "0.1em 0.34em"
  tag-weight-1:
    typography: "{typography.body}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "0.6rem 0.95rem"
  tag-weight-2:
    typography: "{typography.control}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "0.55rem 0.85rem"
  tag-weight-3:
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "0.45rem 0.7rem"
    size: "0.875rem"
  tag-weight-4:
    typography: "{typography.label}"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.sm}"
    padding: "0.45rem 0.7rem"
  keycap:
    backgroundColor: "transparent"
    textColor: "{colors.ink-faint}"
    typography: "{typography.keycap}"
    rounded: "{rounded.sm}"
    padding: "0.05rem 0.3rem"
  search-panel:
    backgroundColor: "{colors.paper-raised}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    width: "min(42rem, calc(100% - 2rem))"
  search-input:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.control}"
    padding: "0.9rem 1rem"
---

# Design System: jasonsteinshouer.com

## Overview

**Creative North Star: "The Working Notebook"**

This is a reading surface, not a personal-brand site. Nine years of technical posts are treated as one continuous body of work, and every decision serves the reader who landed deep on a single post with a problem to solve. The page is paper; the text is ink; a single spruce green marks the things you can act on. Structure is carried entirely by typography, hairline rules, and a hanging date margin — there are no cards, no cover images, no shadows, and no decorative chrome anywhere in the built system.

The density is generous rather than airy. A 68ch reading measure sets the width of the whole world, and the two wider containers exist only to give the measure room to breathe, never to fill a screen. Code is not an inclusion in the prose — it is the content — so code blocks get a bordered panel, a language label, a copy control, and permission to overhang the measure by 2rem once the viewport can spare it. Everything else recedes: the masthead is a hairline that only draws its border once you scroll, the footer is one row of quiet links, and the table of contents is a rail in the outer margin that disappears entirely below 78em.

Both themes are first-class, resolved before first paint from storage or the OS preference. The dark theme is not an inversion: it is a second paper stock — a blue slate ground carrying warm cream ink, not a near-black carrying neutral white — with its own numerically checked contrast. The one thing it does not change is the accent: the same spruce green runs through both stocks, so the site does not swap identity when the lights go out. Confirmed rejections: the inherited Ghost/Kasper identity, the cover-image hero, the portrait masthead, any funnel or marketing register, and any third-party request at all — no CDN, no font service, no analytics, no framework.

**Key Characteristics:**
- Paper-and-ink neutrals with one spruce-green accent — the same hue in both stocks
- Serif reading column (Source Serif 4), system sans for metadata, JetBrains Mono for code
- Depth by hairline and tonal ground only — zero box-shadows in the entire stylesheet
- Three container widths, all derived from the 68ch measure
- Code treated as primary content: panel, language label, copy button, scroll cue
- One authored motion moment (the search overlay); everything else is a 150–250ms state transition

## Colors

Warm off-white paper against near-black ink, with one green that earns its place by marking only what is interactive or structural.

### Primary
- **Spruce Green** (`{colors.accent}` light / `{colors.accent-dark}` dark): The only hue in the system. It carries links, tag hover, list markers, focus rings, the caret, the `#` heading anchor, the active TOC entry, the blockquote rule, the wordmark on hover, and syntax strings. Nothing decorative ever uses it. Its hue is identical in both themes; only its lightness moves.
- **Deep Spruce** (`{colors.accent-deep}`): The link hover and primary-button hover state only. In dark theme it moves lighter rather than darker, because a hover must brighten against dark paper.
- **Spruce Wash** (`{colors.accent-wash}`): A near-invisible tint behind a hovered tag or button. It is the only accent fill in the system besides the primary button.

### Neutral
- **Warm Paper / Slate Paper** (`{colors.paper}` light / `{colors.paper-dark}` dark): The page ground and the masthead ground. Off-white, never pure white, in light theme; a blue slate, never black, in dark.
- **Sunk Paper** (`{colors.paper-sunk}`): The recessed ground — code panels, inline code, the inline TOC, hovered icon buttons, hovered search results. Recession, not elevation, is how this system separates a surface from the page.
- **Raised Paper** (`{colors.paper-raised}`): Used for exactly one surface, the search panel, which is the only thing in the system that floats above the page.
- **Ink / Cream Ink** (`{colors.ink}` light / `{colors.ink-dark}` dark): All body text, headings, and titles. The dark stock reads warm cream rather than neutral white, which is what makes it a stock rather than an inversion (12.97:1 on its own ground).
- **Soft Ink** (`{colors.ink-soft}`): Secondary prose — excerpts, ledes, subtitles, blockquotes, nav at rest, TOC links.
- **Faint Ink** (`{colors.ink-faint}`): All metadata — dates, counts, captions, micro-labels, placeholders, footer text.
- **Hairline** (`{colors.rule}`): The default 1px divider and the default border on tags, panels, and controls.
- **Strong Hairline** (`{colors.rule-strong}`): The emphatic divider — archive year headings, table header rows, the search panel's own edge, and the scrollbar thumb. It is a border value; text never uses it.
- **Selection Tint** (`{colors.select}`): The themed `::selection` ground.
- **Code Cue** (`{colors.code-cue}`): A single mid-gray, one per theme, used only for the code panel's two scroll rules. It is not text and is not a border; it is the one place in the system where a token exists to draw an affordance.

### Named Rules
**The One Green Rule.** Spruce is the system's only hue. If a new element is not a link, a tag, a focus ring, a list marker, a structural rule, or a syntax string, it is ink or paper. Never introduce a second accent hue for status, category, or emphasis.

**The One Identity Rule.** The accent hue does not change between themes. A palette imported from a sibling variation may bring its grounds and its inks; it does not bring its accent. Spruce carries light and dark alike, because a design whose accent flips hue when the theme flips has two identities instead of one.

**The Retune-Don't-Transplant Rule.** An imported palette is retuned against the ground it lands on, never pasted. Translucent rules are flattened to opaque values on the new stock; `accent-wash` is re-picked so it still sits *above* its ground in luminance rather than below it (0.0280 against a 0.0146 paper and a 0.0222 sunk paper); and every syntax token is re-measured against the new panel. A value that was correct on the source's ground is a claim, not a fact, until it is measured on this one.

**The 4.5 Rule.** `ink-faint` is the floor for every piece of metadata text and it clears 4.5:1 against paper, sunk paper, and raised paper in both themes. Any new muted text uses `ink-faint`; do not invent a lighter gray for "quieter" text. The audit test is a computed one, not a static one: walk every text-bearing element, resolve its real background up the ancestor chain, and apply the large-text threshold. The current build returns zero failures across 1,811 elements in both themes.

**The Sunk-Ground Rule.** Syntax tokens are content and are measured against `paper-sunk`, the code panel's ground — never against `paper`. Measuring a syntax color against the page ground overstates it by roughly 0.4:1 and will pass a color that fails in the panel. Any new language's token colors clear 4.5:1 on `paper-sunk` in both themes before they ship. Reconfirmed against the current dark panel (`{colors.paper-sunk-dark}`): all eight tokens land between 5.43:1 and 11.49:1, with prose ink at 11.61:1 on the same ground.

**The Border-Values-Aren't-Text Rule.** `rule` and `rule-strong` are border and divider values. Text — including a display-scale ornamental numeral — takes an ink token, so that even the largest mark on the page is legible rather than decorative.

**The Second Stock Rule.** Dark theme is a separate paper stock, not an inversion. Every color decision is made twice, in the `:root` and `:root[data-theme="dark"]` token blocks — never by filtering, inverting, or by opacity over a dark ground.

## Typography

**Display / Reading Font:** Source Serif 4 (variable 200–900, self-hosted, with Charter / Iowan Old Style / Georgia fallbacks)
**Label / UI Font:** the system sans stack (`ui-sans-serif, system-ui, …`) — no webfont is loaded for interface text
**Code Font:** JetBrains Mono (variable 100–800, self-hosted, with `ui-monospace` fallbacks)

**Character:** A workmanlike editorial serif does all the reading and all the headline work; the sans is a strictly subordinate voice reserved for metadata and controls, so the interface never competes with the prose. Only latin and latin-ext subsets ship, preloaded for the two normal-weight faces.

### Hierarchy
- **Display** (600, `clamp(2.125rem → 3.375rem)`, 1.06, -0.03em): Post titles and the home lede's name block. One per page, always balanced (`text-wrap: balance`).
- **Headline** (600, `clamp(1.875rem → 2.5rem)`, 1.1, -0.022em): Page heads on tags, archive, about, 404.
- **Title** (600, `clamp(1.5rem → 1.875rem)`, 1.2, -0.02em): Post-list entry titles, archive year numbers, and prose `h2`.
- **Lede** (400, 1.3125rem, 1.55): The home intro sentence and post subtitles (italic). Capped at 46ch.
- **Body** (400, 1.125rem, 1.72): All prose, in the 68ch measure. Long unbreakable strings wrap rather than widening the page.
- **Body Small** (sans, 400, 0.9375rem, 1.6): Page-head notes, tables, footnotes, related-post titles, archive titles.
- **Wordmark** (serif, 600, 1.1875rem, -0.015em): The masthead identity only, set in one ink across the whole name and turning accent only on hover. It is a type role, not a logo, and appears on every page.
- **Control** (sans, 400, 1rem): Form-control text — the search input — and the second tier of the weighted tag index. The one interface size above the label register.
- **Label** (sans, 400, 0.8125rem, 0.02em): The interface workhorse (19 consumers). Nav, dates, meta rows, TOC, pagination, footer, byline links, buttons, and the base tier of the tag index.
- **Chip Label** (sans, 400, 0.75rem, 0.02em, line-height 1): The inline tag chip, one step below the label register so tags sit quietly under a title. Overridden back up to Label size inside the tag index.
- **Micro Label** (sans, 600, 0.6875rem, 0.08em, uppercase): The second-largest register in the build (11 consumers). Section labels — "Related posts", "On this page", "Older post" — the code panel's language chip, the search result meta line, and counts.
- **Code** (JetBrains Mono, 0.8125rem, 1.65, tab-size 4): Code panels. Inline code is 0.855em of its context so it sits on the prose baseline.
- **Keycap** (JetBrains Mono, 0.6875rem, 4px radius, 1px hairline): Keyboard hints — the masthead's `/` and the search overlay's arrow/enter/esc strip.

The interface register is therefore four steps and stops: 1rem control, 0.8125rem label, 0.75rem chip, 0.6875rem micro-label. There is no fifth step below the micro-label.

### Named Rules
**The Serif-Reads, Sans-Labels Rule.** If a reader reads it as content, it is Source Serif 4. If it tells them about the content — a date, a count, a control, a caption — it is the system sans. There is no third register.

**The Label-Never-Kicks Rule.** The uppercase micro-label exists to head a section or name a control. It never appears above a headline as a kicker or eyebrow, and it is never used to categorize a post.

**The One-Ink Wordmark Rule.** The wordmark is the name in a single ink. It does not split into two colors, two weights, or two faces to mark the surname. Accent is a state it enters on hover, not a decoration it wears at rest.

**The Tabular Rule.** Every number a reader might compare — dates, tag counts, page counts, table cells, archive years — sets in tabular figures.

**The Four-Step Interface Rule.** Interface text uses exactly four sizes — 1rem, 0.8125rem, 0.75rem, 0.6875rem — and no others. A new control picks one; it does not invent a size between them or below them.

### Documented exceptions

Three shipped values sit outside the ramps on purpose, and a fourth is a deviation rather than a step:

- **The 404 numeral** (`clamp(3rem, 12vw, 5rem)`, mono 200 weight, `ink-faint`): a single figure on a single page, larger than Display by design. Its *size* is the exception; its color is not — it takes the metadata ink token and clears 4.5:1 in both themes, per **The Border-Values-Aren't-Text Rule**. It is not a type step and nothing else may use it.
- **The print block** (`#fff` ground, `#000` text, `#555` link annotations, 11pt): print targets ink on paper, so it uses absolutes rather than screen tokens. Palette rules do not apply inside `@media print`.
- **Inline relative sizes** (`0.855em` inline code, `0.8em` footnote refs): sized against their surrounding prose rather than the ramp, which is what keeps them on the baseline.

## Layout

The system is a single centered column with three widths, all derived from one measure. `--measure` is 68ch and sets the prose column on posts, pages, and 404. `--column--index` is `measure + 9rem`, used on the home and tag post lists so the hanging date margin sits *outside* the measure rather than eating into it; the running head on those pages is padded 9rem to align with the entry bodies. `--column--wide` is 54rem, for the tag index and the archive — surfaces that are lists, not prose. Every one of them sits inside `.shell`, capped at `--page` (78rem) with a fluid `--gutter` of `clamp(1.25rem, 5vw, 3rem)`.

Vertical rhythm is a set of clamps, not a fixed scale: page bands are `clamp(2.5rem, 6vw, 4.5rem)`, list rows `clamp(1.75rem, 4vw, 2.5rem)`, and page-head margins `clamp(2.25rem, 5vw, 3.25rem)`. Sections separate with a 1px top rule plus 2rem of padding, and the first item in any list drops both its rule and its top padding.

Breakpoints are few and each has a reason: **46em** turns the archive row into columns; **52em** is where the hanging date margin engages (below it, the date reorders above the title); **64em** lets code panels overhang the measure by 2rem; **78em** promotes the table of contents into a sticky outer rail. Below **46.25em** the masthead wraps its nav onto its own horizontally scrollable strip rather than overflowing the document.

**The Measure-Is-The-World Rule.** New surfaces pick one of the three existing containers. Do not introduce a fourth width, and never set prose wider than 68ch.

**The Code-Overhangs Rule.** Code, and only code, may break the measure — by exactly 2rem on each side, and only at 64em and up.

## Elevation & Depth

**There are no box-shadows anywhere in this system.** Zero, in the whole stylesheet. Depth is expressed three ways and no others: a 1px hairline (`rule`, or `rule-strong` when the separation must read harder), a tonal ground change (`paper-sunk` recedes, `paper-raised` advances), and — for the one overlay — a translucent scrim.

The code panel's horizontal scroll cue is a four-layer background: two masks in the panel's own stock attached `local`, and two 2px rules in `code-cue` attached `scroll`, so a rule shows at an edge only while there is code past it. The rules sit inside the panel's 1.15rem padding, where no glyph is ever painted — a wash placed behind the code instead would cost the code contrast that a background-color audit cannot see. It is not a shadow and must not be replaced by one, and it must not move back behind the text. The search overlay reads as lifted because it sits on a `paper`-tinted scrim with `backdrop-filter: blur(6px) saturate(1.2)`, on `paper-raised`, inside a `rule-strong` border — again, no shadow. The masthead is sticky and flat, and announces itself only by fading in its bottom hairline once `scrollY > 8`.

**The Hairline-Only Rule.** Separation is a 1px rule or a tonal ground change. If a new element seems to need a shadow, it needs a border or a recessed ground instead.

## Shapes

Rectilinear and near-square. The corner scale is small, functional, and six steps wide — record it as a scale, not as a single `--radius` token:

- **2px (micro):** things drawn *on* text rather than around it — the `:focus-visible` ring and the search `mark` highlight.
- **3px (image):** photographs and screenshots in prose. The softest possible corner on content that is not a control.
- **4px (small):** tags, inline code, keycaps, and small buttons inside a panel (the copy control, the Esc button).
- **6px (`--radius`, the default):** buttons, code panels, pagination links, the inline TOC, skip link, search result rows, and embedded media. When in doubt, this one.
- **9px (panel inset):** derived, never authored fresh — a ring drawn *inside* a 10px panel at a -2px offset takes the outer radius minus 1. It exists once, on the search field's focus ring.
- **10px (large):** the search panel, the system's only floating surface.
- **99px / 50%:** the scrollbar thumb and the single circular avatar.

Nothing is a pill, nothing is heavily rounded, and no shape is decorative.

**The Inside-Corner Rule.** A ring or divider drawn inside a rounded panel matches the panel's radius minus its inset (10px panel, -2px outline offset → 9px). Never leave an inside corner at the outer radius, and never square it off.

Borders are the primary form-giver: every panel, tag, control, and divider is a 1px hairline. Hover states shift border color (often to `color-mix(in srgb, var(--accent) 45%, transparent)`) rather than adding weight, so nothing shifts by a pixel on hover.

Icons are a single authored SVG sprite of 11 symbols inlined in the document — 24×24 grid, `fill: none`, `stroke: currentColor`, `stroke-width: 1.6` (1.8 for the check), round caps and joins — rendered at 0.875–1.125rem. There is no icon font and no icon package.

## Components

### Buttons
- **Shape:** Softly squared (6px radius), 1px border, sans label at 0.8125rem.
- **Ghost (default):** Transparent ground, ink text, `rule-strong` border, `0.6rem 1rem` padding. Hover moves text to accent, border to a 50% accent mix, ground to `accent-wash`.
- **Primary:** Accent ground, paper text, matching border. Hover deepens to `accent-deep`. Used once in the whole site — the 404's "Browse the archive".
- **Icon button:** 2.25rem square, transparent, `ink-soft` icon. Hover fills with `paper-sunk`. The search variant widens into a labeled control with a `/` keycap and a hairline border, collapsing back to a bare square below 46.25em.

### Chips (tags)
- **Style:** Transparent ground, 1px `rule` border, 4px radius, `ink-soft` sans at 0.75rem, with an optional tabular count in `ink-faint`.
- **Hover:** Accent text, 45% accent border, `accent-wash` ground. The count turns accent with it.
- **Tag index weighting:** The `/tags/` field sizes each tag by how much of the archive it carries — `data-weight` 1 (≥10 posts) at 1.125rem/700 with an `ink-faint` border, 2 (≥5) at 1rem/650, 3 (≥3) at 0.875rem/600, 4 (the tail) at the base 0.8125rem. Weight is data, never decoration.

### Cards / Containers
The system has no cards. Content lists are rows separated by hairlines. The only bordered containers are functional panels: the code block, the inline TOC `<details>`, and the search panel.
- **Corner Style:** 6px (10px for the search panel).
- **Background:** `paper-sunk` for recessed panels, `paper-raised` for the search panel.
- **Shadow Strategy:** None. See Elevation & Depth.
- **Border:** 1px `rule` (`rule-strong` on the search panel).
- **Internal Padding:** `1rem 1.15rem 1.15rem` for code; `0.7–0.9rem` for the inline TOC.

### Inputs / Fields
- **Style:** The search input is borderless and transparent inside a `search-field` row with a bottom hairline; sans at 1rem; placeholder in `ink-faint`; native search decorations stripped.
- **Focus:** The input suppresses its own ring and the enclosing field carries a 2px accent outline at `-2px` offset, rounding its top corners to match the panel. Everywhere else, `:focus-visible` is a 2px accent outline at `+3px` offset with a 2px radius.

### Navigation
- **Masthead:** Sticky, flat, `paper` ground, 4.25rem tall, hairline appears on scroll. Wordmark in the reading serif at 1.1875rem/600, one ink, accent on hover. Four destinations — Writing, Tags, Archive, About — in sans 0.8125rem, `ink-soft` at rest, `ink` on hover with an accent underline that wipes in from the left (`scaleX` over 250ms). The current page is `ink`/600 with a static `rule-strong` underline. Below 46.25em the nav becomes its own full-width, horizontally scrollable strip with hidden scrollbars.
- **Pagination:** A hairline-topped row — bordered "Newer" and "Older" links with arrow icons, a tabular "Page n of m" between them.
- **Post nav:** Two columns at 40em and up, each a micro-label direction over a 0.9375rem/600 title that turns accent on hover.

### Post list entry (signature)
The archive's main pattern. At 52em and up, a two-column grid — a 6.5rem right-aligned date column of `ink-faint` sans, and the body — separated from its neighbors by a 1px top rule. The title is `ink` and gains its accent underline via a `background-size` wipe (0% → 100% of a 1px accent gradient) over 350ms, so nothing moves. The excerpt is `ink-soft`, capped at 62ch, and ends with an inline accent "Read →" on the same line. Tags close the row. Below 52em the date simply reorders above the title.

### Code block (signature)
The site's most important component. A `paper-sunk` panel with a 1px `rule` border and 6px radius. Its bar carries an uppercase micro-label naming the language and a copy button that sits at 0.65 opacity until the panel is hovered (always visible on touch), flipping to an accent check for a moment after a copy. The `<pre>` scrolls horizontally with the four-layer gradient scroll cue; syntax colors come from a Prism theme derived from this palette (comments in muted ink-gray italic, strings in the accent green, keywords in a plum, functions in a slate blue, numbers in a violet, plus full-width diff insert/delete bands). Every one of those token colors is contrast-checked against `paper-sunk`, not `paper` — see **The Sunk-Ground Rule**.

### Retired

The projects index and the project detail page were removed from the build: no `projects` collection, no templates, and Projects is out of the masthead. `/projects` and `/projects/*` are 301s to `/archive/`, so the published addresses keep their promise. The `.project*` rules still sitting in the stylesheet are dead and are not part of the system; do not build a new surface from them.

### Table of contents (signature)
Dual expression of one JS-built list. At 78em and up, a sticky rail in the right outer margin — `top: 6rem`, max 15rem wide, left hairline, sans 0.8125rem, `ink-soft` links, the current heading in accent/600 tracked by an IntersectionObserver. Below 78em the same list renders as a `<details>` panel above the prose with a rotating chevron drawn from two 1.5px borders. Both are `hidden` until JS populates them, so a post with no headings shows nothing.

### Search overlay (signature)
The system's one authored moment. A full-viewport `<dialog>` with a transparent native backdrop; the visible scrim is a `paper`-tinted 55% layer with a 6px blur. On open, JS sets `data-ready` on the next frame and the scrim fades in (320ms) while the panel settles from `translateY(-0.75rem) scale(0.985)` (300/400ms, `cubic-bezier(0.16, 1, 0.3, 1)`). Results stagger in at 28ms intervals. Result rows are a serif title over a sans micro-meta line; the active row takes a `paper-sunk` ground and an accent title; matched terms get a 22% accent `mark`. A footer strip shows the keyboard contract in mono keycaps. `prefers-reduced-motion` collapses all of it to a static appearance.

## Do's and Don'ts

### Do:
- **Do** put every new surface in one of the three existing containers: the 68ch measure, `measure + 9rem` for date-hung lists, or 54rem for non-prose indexes.
- **Do** separate things with a 1px hairline or a tonal ground change, per **The Hairline-Only Rule**.
- **Do** use `ink-faint` for every piece of metadata text; it is the contrast floor and it is already verified in both themes.
- **Do** contrast-check any new syntax token against `paper-sunk` and any new body or meta text against its own resolved ancestor background, computed in the browser rather than read off the file.
- **Do** define any new color twice — once in `:root`, once in `:root[data-theme="dark"]` — and never derive the dark value by inversion or opacity.
- **Do** keep the accent hue identical across both stocks; move its lightness, never its hue.
- **Do** re-measure a borrowed value against the ground it lands on before recording it, per **The Retune-Don't-Transplant Rule**.
- **Do** reach for the existing SVG sprite for icons, and author any new symbol on the same 24×24 grid at 1.6 stroke, `fill: none`, round caps.
- **Do** pick from the four-step interface register (1 / 0.8125 / 0.75 / 0.6875rem) and the six-step radius scale (2 / 3 / 4 / 6 / 10px, plus derived insets) rather than authoring a new size.
- **Do** animate color, border-color, opacity, `background-size`, and `transform` only, at 150–250ms on `cubic-bezier(0.16, 1, 0.3, 1)`.
- **Do** keep hover states from changing layout: shift border color rather than border width, and wipe underlines with `background-size` rather than adding a rule.
- **Do** treat code as content — panel, language label, copy control, horizontal scroll, and legibility at 0.8125rem on a phone.

### Don't:
- **Don't** add a `box-shadow`. There are none in the system, and the two places that might seem to want one (the code panel's scroll cue, the search overlay) already solve it with background layers and a scrim.
- **Don't** turn a list of posts or tags into cards. Rows and hairlines carry every index in the system.
- **Don't** introduce a second accent hue, including for status, category, or emphasis, and don't let the accent change hue between themes. See **The One Green Rule** and **The One Identity Rule**.
- **Don't** set prose wider than 68ch, and don't let anything but a code block overhang the measure.
- **Don't** use the uppercase micro-label as a kicker or eyebrow above a headline; it heads sections and names controls only.
- **Don't** add a third type register. Serif reads, sans labels, mono codes.
- **Don't** invent a size below 0.6875rem or a radius between the scale's steps. If something needs to be smaller or softer than the scale allows, the scale is right and the element is wrong.
- **Don't** color text with `rule` or `rule-strong`; those are border values, and text set in them fails contrast at any size.
- **Don't** apply palette tokens inside `@media print`; that block targets ink on paper and uses absolutes deliberately.
- **Don't** load anything from a third party — no font service, no CDN, no icon package, no analytics, no framework. Fonts are self-hosted variable woff2 and the whole front end is one stylesheet and one progressive-enhancement script with no build step.
- **Don't** ship a component that requires JavaScript to be legible. The TOC, the copy button, the language label, and search are all enhancements over markup that already works.
- **Don't** two-tone the wordmark, or mark any part of the name with color at rest.
- **Don't** reintroduce a cover image, a portrait masthead, or any marketing register.

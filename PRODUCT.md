# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Three real audiences, all confirmed by the site owner, in descending order of traffic but not of importance:

1. **Developers who arrived from a search engine with a specific problem.** They land deep — on a single post, not the homepage — carrying a concrete question ("how do I generate a ColdFusion thread dump", "how do I sign a JWT in CFML", "why does my Docker path break under Bash for Windows"). They are at work, often blocked, and reading on whatever screen is in front of them. Success is that the post answers the question and they can lift working code out of it. Most of them will never see the homepage.
2. **Peers, recruiters, conference organizers, and prospective clients sizing Jason up.** They arrive at the root or via a link someone sent them and read laterally — About, the archive, the range and recency of posts — to answer "what does this person actually know and build?" The writing carries that weight on its own; the projects pages were retired in September 2025, so the posts and the archive are now the whole of what a stranger can read.
3. **Jason himself, as the archive's primary reader.** The site is the durable record of what he has learned and built, written so future-Jason can find the answer again. This is the site's founding purpose and is not subordinate to the other two.

These audiences share one page set. No audience gets a separate site, and content is not rewritten for any one of them.

## Product Purpose

A personal technical blog and project record at **jasonsteinshouer.com**, published since June 2016 by Jason Steinshouer, a working software developer in Omaha, NE. It exists to document what he is learning, working on, or finds interesting — and, in doing so, to help the next developer with the same problem and to represent his work publicly.

Success is measured in usefulness, not volume: a post that solves a stranger's problem years after it was written, and an archive Jason himself keeps returning to. The publishing cadence is deliberate and irregular (roughly one to six posts a year since 2016), so the site must read as current and well-kept even during quiet stretches.

## Positioning

The site's distinguishing substance is its firsthand voice and the fact that everything on it came out of work actually done — real code, real failures, links to the repos. Nothing is aggregated, sponsored, or written to rank.

**Jason describes himself as a technologist, not by stack.** He is deliberately technology-agnostic: the subject of any given post is whatever the problem in front of him happened to be built with. The site must never present him as a specialist in one language or ecosystem, and no surface should introduce itself with a list of technologies. This is the owner's own framing, stated September 2025, and it overrides whatever the tag distribution happens to look like at any moment.

The corpus is correspondingly broad — CFML/ColdFusion work (CommandBox, CFLint, TestBox, ColdBox, Mura, JWT, a Jupyter kernel he wrote), Vue.js and Vite migrations, Node streams, .NET and xUnit, Docker, GitHub Actions, MS SQL Server query plans, an OWASP security series, and refactoring legacy code with approval and snapshot testing. Tag counts are real navigational data and should be shown honestly wherever they help a reader find things; they are not a positioning statement and must not be treated as one.

## Operating Context

- **Authoring:** Markdown files in `posts/`, one per post, named `YYYY-MM-DD-slug.md`, with YAML front matter (`title`, `date`, `tags`, `excerpt`, and often an explicit `permalink`). `posts/posts.json` supplies the shared layout and the default dated permalink. The `projects/` Markdown files are still in the repo but are excluded from the build through `.eleventyignore`; nothing renders them.
- **Posts are code-dense.** Nearly every post carries multiple fenced or indented code blocks — CFML, JavaScript, C#, shell, XML, JSON — plus inline links to GitHub repos and external docs. Prism handles highlighting. Long posts also use footnotes and heading anchors (markdown-it-anchor, markdown-it-footnote). Some posts are multi-part series (Node streams I/II, snapshot testing I/II, the OWASP Top 10 sequence).
- **Publishing:** commit to `main` on `github.com/jsteinshouer/jasonsteinshouer.com`; Netlify builds with `npm run build` and publishes `_site`.
- **Reading:** paginated homepage (15 posts per page, newest first), per-tag index pages at `/tag/<slug>/`, a tag index at `/tags/`, a year-grouped archive at `/archive/`, client-side search over `/search.json`, an About page, a 404, and an Atom/RSS feed at `/feed.xml`.

## Capabilities and Constraints

**Fixed — future work must not break these:**

- **Existing URLs.** Two permalink shapes are both in production and both hold years of inbound links and search rankings: the dated default `/YYYY/MM/DD/slug.html` and per-post overrides like `/xunit-test-runner-for-notebooks.html`. Tag pages live at `/tag/<slug>/` and the About page at `/about.html`. No redesign may change an existing URL. The one deliberate exception, made by the owner in September 2025: the four `/projects/` addresses were retired and now 301 to `/archive/` via `netlify.toml`, so the promise is kept by redirect rather than by the page.
- **The feed.** `/feed.xml` must keep working and keep its existing entry identity for current subscribers.
- **The stack.** Eleventy (currently 1.x) with **Liquid** templates via `liquidjs`, the `_includes/` layout chain, `_data/metadata.json` as the site metadata source, the markdown-it pipeline with anchor and footnote plugins, `eleventy-navigation`, `eleventy-plugin-rss`, and `assets/` passthrough copy. Netlify build config stays as-is. Custom Liquid filters in `.eleventy.js` (`excerpt`, `tag_list`, `array_to_sentence_string`, `date_to_string`) and the `year` shortcode are part of the contract templates rely on.
- **Content.** Every published post stays published, with its text unchanged. (Projects were the exception, retired by the owner in September 2025; the sources remain in the repo, unpublished.) Front-matter authoring conventions should keep working without a mass rewrite of 38 existing files.

**Explicitly not fixed — free to change or replace:**

- The Kasper/Casper theme identity inherited from Ghost, including the cover-image header, the Merriweather / Open Sans pairing loaded from Google Fonts, `assets/css/screen.css` and its overrides, the casper-icons webfont, and the "Powered by Eleventy using the Kasper theme" footer credit.
- The legacy front-end payload: jQuery 1.11 (plus an unused 1.10.2), jquery.fitvids, the Font Awesome 5.5 CDN stylesheet, and the deprecated `ga.js` Google Analytics snippet (`UA-80138644-1` — a Universal Analytics property that no longer collects data).
- `_includes/share.html`, which is unused and still references Google+ and pre-`x.com` Twitter sharing.

**Resolved, September 2025:** the redesign was carried out. The Kasper theme, the cover-image header, the Merriweather/Open Sans pairing, jQuery, jquery.fitvids, the Font Awesome CDN, the `ga.js` snippet, `_includes/share.html`, and the casper-icons webfont were all removed. Every existing URL and `/feed.xml` entry identity was preserved unchanged. Added in the same pass: a dark theme, a tag index at `/tags/`, a full archive at `/archive/`, and a build-time client-side search index at `/search.json`.

**Undecided / not established:** whether analytics are wanted at all going forward — the dead `ga.js` property was removed in the redesign and nothing replaced it. Whether a newsletter, comments, or any social presence should exist remains open. Twitter/X links were deliberately removed from the site in a prior commit.

## Brand Commitments

- **Name and title:** the site is titled "Jason Steinshouer"; the tagline in `_data/metadata.json` is "Blog on web development and technology". The domain is `jasonsteinshouer.com`.
- **Identity assets on hand:** the author's GitHub avatar, currently hot-linked from `avatars0.githubusercontent.com`. There is no logo, wordmark, custom photography, or brand palette. None exists to preserve.
- **Self-description:** technologist first, never a stack. Site chrome introduces the author by what he does — documenting what he is learning, working on, or finds interesting — and names no language or framework. See Positioning.
- **Voice:** first person, plain, modest, and practical. Posts routinely say what he did not know, what he tried, and what failed — "I am behind the curve when it comes to using an AI coding assistant" is a representative opening. There is no marketing register anywhere on the site, and none should be introduced.
- **Links out:** GitHub (`github.com/jsteinshouer`) and the RSS feed are the only external identities currently linked from the header.
- **Design register (standing preference, stated by the owner, September 2025):** "simple and elegant — close to the current look but modernized." The craft bar is quiet editorial: a serif reading column carries the page, chrome recedes, and decisions are typographic rather than decorative. The site should sit comfortably alongside adactio.com, Ethan Marcotte, and Robin Rendle. This is a durable preference, not a one-time brief: future work executes convention at full fidelity rather than reaching for a novel visual world.
- **Palette and faces (as built, September 2025):** paper-and-ink neutrals with a single spruce-green accent carrying links, tags, rules, and focus, in both a light and a dark theme. Source Serif 4 for reading, the system sans stack for interface metadata, JetBrains Mono for code — all self-hosted, no font service and no CDN.

## Evidence on Hand

- **38 published posts**, June 2016 through April 2025, in `posts/`. Real, first-person, code-bearing.
- **3 project write-ups** in `projects/` — `cf-jwt-simple` (CFML JWT library, a port of node-jwt-simple), `commandbox-cflint` (CommandBox module for CFLint), and `stock-trader` — each linking to a public GitHub repository. These are **no longer published**; the files are retained unbuilt, so restoring them is a config change rather than a rewrite.
- **Additional shipped work referenced in posts**: a CFML Jupyter kernel, an xUnit notebook test runner, and a 2021 GitHub Actions Hackathon submission. None of it has a page on the site.
- **Tag distribution** (usable as real navigational data): CFML 24, Vue.js 7, Security 5, OWASP 4, then TestBox / Refactoring / Legacy Code / Jupyter / JavaScript / GitHub / Docker / CommandBox / ColdFusion / ColdBox / CFLint at 3 each, with a long tail of single-use tags.
- **Author bio facts**, from `about.md`: husband and father in Omaha, NE; software developer by profession; interests include family, camping and fishing, guitar, cooking, and gluten-free home brewing.

**Absent — never fabricate:** testimonials, client names, employer names, traffic or subscriber numbers, awards, speaking history, publication credits, a résumé, an email address, or any social handle beyond the GitHub account. There are no photographs of the author other than the GitHub avatar, and no illustration or photography library of any kind.

## Product Principles

1. **The deep-linked post is the front door.** Most visitors will only ever see one page. Every post must stand alone — identifying who wrote it, when, on what, and where to go next — without depending on the homepage to supply context.
2. **Code is the content, not an inclusion.** Legibility, copyability, and language clarity of code blocks are core product quality, on a phone as much as on a desktop.
3. **Longevity over freshness.** A 2016 post on Node streams is still working product. Nothing in the design may make older writing look abandoned, and nothing may depend on a publishing cadence the site does not have.
4. **Preserve the archive's addresses.** URLs and the feed are promises already made to search engines, subscribers, and everyone who ever linked in. They outrank any design consideration.
5. **Honest, unpolished voice.** The site represents a working developer who documents what he learns. It must never read as a personal brand, a funnel, or a marketing site.

## Accessibility & Inclusion

No product-specific standard has been established by the owner. Baseline expectations apply: the audience reads long technical material in varied conditions and on varied devices, so text contrast, comfortable reading measure, keyboard navigability, and legible code blocks at small sizes are functional requirements rather than optional polish.

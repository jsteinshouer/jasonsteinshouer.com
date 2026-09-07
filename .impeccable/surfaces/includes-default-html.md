---
version: 1
slug: "includes-default-html"
primary_target: "_includes/default.html"
related_targets: ["_includes/header.html","index.html","_includes/post.html","assets/css/site.css"]
---

Scope: whole-site redesign — masthead, home, post, tag, tag index, archive, search, projects, about, 404, feed chrome. Visitor mode: **Read**.

Audience: (1) a developer who landed deep on one post from a search result and needs working code; (2) a peer or organizer reading laterally to size Jason up; (3) Jason himself using the archive as a reference. Job: answer the question, then show there is more of it. Constraints: every existing URL and /feed.xml unchanged; all 38 posts and 3 projects unchanged; Eleventy 1.x + Liquid + the existing filters and shortcode stay.

Confirmed this round: full front-end teardown (jQuery, fitvids, Font Awesome CDN, dead ga.js, share.html, casper-icons all removed); add dark mode, stronger tag surfacing, client-side search, and a full archive index.

## Direction contract

THESIS: Nine years of posts read as one continuous body of work, indexed from every page. Refuses the personal-brand homepage the category ships: no cover-image hero, no portrait masthead, no funnel.

OWN-WORLD: Paper ground, ink text, one spruce-green accent carrying links, tags, rules and focus. Source Serif 4 reading column, system sans for meta, JetBrains Mono for code. Hairline rules and a hanging date margin do the structural work — no cards, no shadows, no chrome.

STORY: The reader lands deep, lifts working code out of a first-class code block, learns who wrote it and when, and leaves with three more posts on the same tag.

FIRST VIEWPORT (post): a hairline masthead — wordmark, nav, search, theme toggle — then the title at display scale in the reading measure, date and tags on a rule beneath it, and prose already begun above the fold.

FORM: Brief-pinned by the user in plain words — "simple and elegant, close to the current look but modernized", craft bar quiet editorial (adactio, Ethan Marcotte, Robin Rendle). The standing exit taken deliberately; convention executed at full fidelity. No concept-seed roll: a brief-pinned direction beats the roll. No seed key.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

## Unresolved

- Analytics: ga.js removed; nothing added. Owner has not decided whether analytics are wanted.
- `icons:` front matter on projects (Font Awesome classes) is no longer rendered; `technology:` chips replace it. Fields left in place, harmless.

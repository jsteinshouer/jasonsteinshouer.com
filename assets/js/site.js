/* jasonsteinshouer.com — progressive enhancement only.
   Every page is complete and readable with this file absent. */

(function () {
	"use strict";

	/* ----------------------------------------------------------------------
	   Theme
	   ---------------------------------------------------------------------- */

	var root = document.documentElement;

	function applyTheme(theme) {
		root.setAttribute("data-theme", theme);
		var button = document.querySelector("[data-theme-toggle]");
		if (button) {
			button.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
		}
	}

	var toggle = document.querySelector("[data-theme-toggle]");
	if (toggle) {
		applyTheme(root.getAttribute("data-theme") || "light");
		toggle.addEventListener("click", function () {
			var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
			applyTheme(next);
			try { localStorage.setItem("theme", next); } catch (e) { /* private mode */ }
		});
	}

	/* Follow the OS while the reader has never chosen explicitly. */
	if (window.matchMedia) {
		var query = window.matchMedia("(prefers-color-scheme: dark)");
		var onSchemeChange = function (event) {
			var stored = null;
			try { stored = localStorage.getItem("theme"); } catch (e) { /* private mode */ }
			if (!stored) applyTheme(event.matches ? "dark" : "light");
		};
		if (query.addEventListener) query.addEventListener("change", onSchemeChange);
		else if (query.addListener) query.addListener(onSchemeChange);
	}

	/* ----------------------------------------------------------------------
	   Masthead — show its rule only once the page has moved under it
	   ---------------------------------------------------------------------- */

	var masthead = document.getElementById("masthead");
	if (masthead) {
		var syncMasthead = function () {
			masthead.setAttribute("data-scrolled", window.scrollY > 8 ? "true" : "false");
		};
		syncMasthead();
		window.addEventListener("scroll", syncMasthead, { passive: true });
	}

	/* ----------------------------------------------------------------------
	   Code blocks — a language label and a copy button on every fenced block
	   ---------------------------------------------------------------------- */

	var LANGUAGE_NAMES = {
		cfscript: "CFML",
		cfml: "CFML",
		csharp: "C#",
		cs: "C#",
		dotnet: ".NET",
		javascript: "JavaScript",
		js: "JavaScript",
		json: "JSON",
		bash: "Shell",
		shell: "Shell",
		sh: "Shell",
		markup: "HTML",
		html: "HTML",
		xml: "XML",
		svg: "SVG",
		css: "CSS",
		sql: "SQL",
		yaml: "YAML",
		yml: "YAML",
		java: "Java",
		diff: "Diff",
		none: "Text"
	};

	function languageLabel(pre) {
		// markdown-it writes the class onto <code>; Prism copies it up to <pre>
		// only after it runs, which may be after this.
		var code = pre.querySelector("code");
		var source = (pre.className || "") + " " + ((code && code.className) || "");
		var match = source.match(/language-([\w-]+)/);
		if (!match) return null;
		var raw = match[1];
		if (raw.indexOf("diff-") === 0) {
			var base = raw.slice(5);
			return "Diff · " + (LANGUAGE_NAMES[base] || base.toUpperCase());
		}
		return LANGUAGE_NAMES[raw] || raw.toUpperCase();
	}

	function icon(id) {
		return '<svg class="icon-' + id + '" aria-hidden="true" viewBox="0 0 24 24"><use href="#i-' + id + '" /></svg>';
	}

	/* Prism is only worth its weight on a page that actually carries code. */
	if (document.querySelector(".prose pre code")) {
		var prism = document.createElement("script");
		prism.src = "/assets/prism/prism.js";
		// An injected script can land after DOMContentLoaded, which is the only
		// hook Prism's own auto-highlight waits on. Call it ourselves.
		prism.onload = function () { if (window.Prism) window.Prism.highlightAll(); };
		document.head.appendChild(prism);
	}

	document.querySelectorAll(".prose pre").forEach(function (pre) {
		if (pre.closest(".codeblock")) return;

		var wrapper = document.createElement("figure");
		wrapper.className = "codeblock";

		var language = languageLabel(pre);
		var bar = document.createElement("figcaption");
		bar.className = "codeblock__bar";
		bar.innerHTML =
			'<span class="codeblock__lang">' + (language || "") + "</span>" +
			'<button type="button" class="codeblock__copy">' + icon("copy") + icon("check") +
			'<span class="codeblock__copy-label">Copy</span></button>';

		pre.parentNode.insertBefore(wrapper, pre);
		wrapper.appendChild(bar);
		wrapper.appendChild(pre);

		var button = bar.querySelector(".codeblock__copy");
		var label = button.querySelector(".codeblock__copy-label");
		var resetTimer;

		button.addEventListener("click", function () {
			var text = pre.textContent.replace(/\n$/, "");
			var done = function () {
				button.setAttribute("data-state", "copied");
				label.textContent = "Copied";
				clearTimeout(resetTimer);
				resetTimer = setTimeout(function () {
					button.removeAttribute("data-state");
					label.textContent = "Copy";
				}, 1800);
			};

			if (navigator.clipboard && navigator.clipboard.writeText) {
				navigator.clipboard.writeText(text).then(done, function () { label.textContent = "Press ⌘C"; });
			} else {
				var area = document.createElement("textarea");
				area.value = text;
				area.setAttribute("readonly", "");
				area.style.position = "fixed";
				area.style.opacity = "0";
				document.body.appendChild(area);
				area.select();
				try { document.execCommand("copy"); done(); } catch (e) { label.textContent = "Press ⌘C"; }
				document.body.removeChild(area);
			}
		});
	});

	/* ----------------------------------------------------------------------
	   Table of contents — built from the post's own headings
	   ---------------------------------------------------------------------- */

	var tocHost = document.querySelector("[data-toc]");
	var tocInline = document.querySelector("[data-toc-inline]");
	var prose = document.querySelector(".prose");

	if ((tocHost || tocInline) && prose) {
		var headings = Array.prototype.filter.call(
			prose.querySelectorAll("h2[id], h3[id]"),
			function (h) { return h.textContent.trim().length > 0; }
		);

		if (headings.length >= 3) {
			var list = document.createElement("ul");
			headings.forEach(function (heading) {
				var item = document.createElement("li");
				item.setAttribute("data-level", heading.tagName === "H3" ? "3" : "2");
				var link = document.createElement("a");
				link.href = "#" + heading.id;
				link.textContent = heading.textContent.replace(/#\s*$/, "").trim();
				item.appendChild(link);
				list.appendChild(item);
			});

			/* The rail is hidden below 1248px, so the same list also goes in a
			   collapsed block above the prose, where a phone can reach it. */
			if (tocInline) {
				tocInline.appendChild(list.cloneNode(true));
				tocInline.hidden = false;
			}

			if (!tocHost) return;

			var label = document.createElement("p");
			label.className = "toc__label";
			label.textContent = "On this page";
			tocHost.appendChild(label);
			tocHost.appendChild(list);
			tocHost.hidden = false;

			if ("IntersectionObserver" in window) {
				var links = {};
				list.querySelectorAll("a").forEach(function (a) {
					links[decodeURIComponent(a.hash.slice(1))] = a;
				});

				var visible = new Set();
				var observer = new IntersectionObserver(function (entries) {
					entries.forEach(function (entry) {
						if (entry.isIntersecting) visible.add(entry.target.id);
						else visible.delete(entry.target.id);
					});

					var current = null;
					for (var i = 0; i < headings.length; i++) {
						if (visible.has(headings[i].id)) { current = headings[i].id; break; }
					}
					if (!current) return;

					Object.keys(links).forEach(function (id) {
						if (id === current) links[id].setAttribute("aria-current", "true");
						else links[id].removeAttribute("aria-current");
					});
				}, { rootMargin: "-80px 0px -70% 0px", threshold: 0 });

				headings.forEach(function (h) { observer.observe(h); });
			}
		}
	}

	/* ----------------------------------------------------------------------
	   Search
	   ---------------------------------------------------------------------- */

	var dialog = document.getElementById("search-dialog");
	if (!dialog || typeof dialog.showModal !== "function") return;

	var input = document.getElementById("search-input");
	var resultsList = document.getElementById("search-results");
	var emptyState = document.getElementById("search-empty");

	var index = null;
	var loading = null;
	var activeIndex = -1;
	var current = [];

	function loadIndex() {
		if (index) return Promise.resolve(index);
		if (loading) return loading;
		loading = fetch("/search.json")
			.then(function (response) { return response.json(); })
			.then(function (data) { index = data; return index; })
			.catch(function () { index = []; return index; });
		return loading;
	}

	function escapeHtml(value) {
		return String(value).replace(/[&<>"]/g, function (c) {
			return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
		});
	}

	function highlight(text, terms) {
		var safe = escapeHtml(text);
		terms.forEach(function (term) {
			if (term.length < 2) return;
			var pattern = new RegExp("(" + term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "ig");
			safe = safe.replace(pattern, "<mark>$1</mark>");
		});
		return safe;
	}

	function score(entry, terms) {
		var total = 0;
		for (var i = 0; i < terms.length; i++) {
			var term = terms[i];
			var hit = 0;
			if (entry._title.indexOf(term) > -1) hit += entry._title.indexOf(term) === 0 ? 8 : 6;
			if (entry._tags.indexOf(term) > -1) hit += 4;
			if (entry._excerpt.indexOf(term) > -1) hit += 2;
			if (!hit) return 0;
			total += hit;
		}
		return total;
	}

	function render(query) {
		var terms = query.toLowerCase().split(/\s+/).filter(Boolean);
		resultsList.innerHTML = "";
		activeIndex = -1;

		if (!terms.length) {
			current = [];
			emptyState.hidden = false;
			emptyState.textContent = "Search titles, tags, and summaries across every post.";
			return;
		}

		current = (index || [])
			.map(function (entry) { return { entry: entry, score: score(entry, terms) }; })
			.filter(function (row) { return row.score > 0; })
			.sort(function (a, b) { return b.score - a.score || b.entry.date.localeCompare(a.entry.date); })
			.slice(0, 20)
			.map(function (row) { return row.entry; });

		if (!current.length) {
			emptyState.hidden = false;
			emptyState.textContent = "No posts match “" + query + "”.";
			return;
		}

		emptyState.hidden = true;
		current.forEach(function (entry, i) {
			var item = document.createElement("li");
			item.className = "search-result";
			item.setAttribute("role", "option");
			item.style.setProperty("--i", i);
			item.innerHTML =
				'<a href="' + escapeHtml(entry.url) + '">' +
				'<span class="search-result__title">' + highlight(entry.title, terms) + "</span>" +
				'<span class="search-result__meta"><span>' + escapeHtml(entry.dateLabel) + "</span>" +
				(entry.tags.length ? "<span>" + escapeHtml(entry.tags.join(" · ")) + "</span>" : "") +
				"</span></a>";
			resultsList.appendChild(item);
		});

		setActive(0);
	}

	function setActive(next) {
		var items = resultsList.querySelectorAll(".search-result");
		if (!items.length) return;
		activeIndex = (next + items.length) % items.length;
		items.forEach(function (item, i) {
			if (i === activeIndex) {
				item.setAttribute("data-active", "true");
				item.scrollIntoView({ block: "nearest" });
			} else {
				item.removeAttribute("data-active");
			}
		});
	}

	function open() {
		if (dialog.open) return;
		dialog.showModal();
		requestAnimationFrame(function () { dialog.setAttribute("data-ready", ""); });
		loadIndex().then(function () { render(input.value); });
		input.focus();
		input.select();
		render(input.value);
	}

	function close() {
		if (!dialog.open) return;
		dialog.removeAttribute("data-ready");
		setTimeout(function () { if (dialog.open) dialog.close(); }, 180);
	}

	document.querySelectorAll("[data-search-open]").forEach(function (button) {
		button.addEventListener("click", open);
	});
	document.querySelectorAll("[data-search-close]").forEach(function (button) {
		button.addEventListener("click", close);
	});

	dialog.addEventListener("cancel", function (event) {
		event.preventDefault();
		close();
	});

	input.addEventListener("input", function () { render(input.value); });

	input.addEventListener("keydown", function (event) {
		// A search input eats the first Escape to clear itself, so the dialog
		// needed two presses. Take Escape before the input sees it.
		if (event.key === "Escape") { event.preventDefault(); event.stopPropagation(); close(); return; }
		if (event.key === "ArrowDown") { event.preventDefault(); setActive(activeIndex + 1); }
		else if (event.key === "ArrowUp") { event.preventDefault(); setActive(activeIndex - 1); }
		else if (event.key === "Enter") {
			var active = resultsList.querySelector('.search-result[data-active="true"] a');
			if (active) { event.preventDefault(); window.location.href = active.href; }
		}
	});

	document.addEventListener("keydown", function (event) {
		var target = event.target;
		var typing = target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);

		if ((event.key === "k" || event.key === "K") && (event.metaKey || event.ctrlKey)) {
			event.preventDefault();
			open();
			return;
		}
		if (event.key === "/" && !typing && !event.metaKey && !event.ctrlKey && !event.altKey) {
			event.preventDefault();
			open();
		}
	});
})();

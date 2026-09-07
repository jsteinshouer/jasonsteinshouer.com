// Build-time search index. Small enough to fetch once, on the first keystroke,
// and to keep working with no service behind it.

function stripTags(value) {
	return String(value || "")
		.replace(/<pre[\s\S]*?<\/pre>/gi, " ")
		.replace(/<[^>]+>/g, " ")
		.replace(/&#?\w+;/g, " ")
		.replace(/\s+/g, " ")
		.trim();
}

function summarize(post) {
	let text = post.data.excerpt ? stripTags(post.data.excerpt) : stripTags(post.templateContent);
	if (text.length <= 200) return text;
	return text.slice(0, text.lastIndexOf(" ", 200)) + "…";
}

module.exports = class {
	data() {
		return {
			permalink: "/search.json",
			eleventyExcludeFromCollections: true
		};
	}

	render({ collections }) {
		const formatter = new Intl.DateTimeFormat("en-US", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

		const entries = [...collections.posts]
			.sort((a, b) => b.date - a.date)
			.map((post) => {
				const title = String(post.data.title || "");
				const tags = post.data.tags || [];
				const excerpt = summarize(post);

				return {
					title,
					url: post.url,
					date: post.date.toISOString().slice(0, 10),
					dateLabel: formatter.format(post.date),
					tags,
					// Pre-lowercased haystacks so the browser does no work per keystroke.
					_title: title.toLowerCase(),
					_tags: tags.join(" ").toLowerCase(),
					_excerpt: excerpt.toLowerCase()
				};
			});

		return JSON.stringify(entries);
	}
};

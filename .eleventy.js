
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItFootnote = require("markdown-it-footnote");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const { Liquid } = require("liquidjs");

module.exports = function(eleventyConfig) {

    eleventyConfig.addPlugin(pluginRss);

    let options = {
        extname: ".liquid",
        dynamicPartials: false,
        strictFilters: false, // renamed from `strict_filters` in Eleventy 1.0
        root: ["_includes"]
    };

    eleventyConfig.setLibrary("liquid", new Liquid(options));

    function stripTags(value) {
        return String(value || "")
            .replace(/<pre[\s\S]*?<\/pre>/gi, " ")
            .replace(/<[^>]+>/g, " ")
            .replace(/&#?\w+;/g, " ")
            .replace(/\s+/g, " ")
            .trim();
    }

    // Liquid Filter
    eleventyConfig.addLiquidFilter("excerpt", function(value) {
        let paragraph = value.match(/<p>([\s\S]*?)<\/p>/i);
        // Strip first: truncating raw HTML at a fixed offset can cut a tag in half.
        let text = stripTags(paragraph ? paragraph[1] : value);
        if (text.length <= 200) return text;
        return text.substring(0, text.lastIndexOf(" ", 200)) + "…";
    });
    eleventyConfig.addLiquidFilter("tag_list", function(tags) {
        let slugify = eleventyConfig.getFilter("slug");
        let tagLinks = tags.map( value => '<a href="/tag/' + slugify(value) + '/" >' + value + '</a>' );
        return new Intl.ListFormat().format(tagLinks);
    });
    eleventyConfig.addLiquidFilter("array_to_sentence_string", function(value) { return new Intl.ListFormat().format(value); });
    // Dates are authored as bare YYYY-MM-DD, so they parse as UTC midnight.
    // Format in UTC or the label drifts a day behind the front matter.
    eleventyConfig.addLiquidFilter("date_to_string", function(value) { return new Intl.DateTimeFormat('en-US',{day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC'}).format(value) ; });
    eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

    // --- Filters added for the redesign -------------------------------------

    // Plain-text summary for meta descriptions, cards, and the search index.
    eleventyConfig.addLiquidFilter("summary", function(value, length) {
        let text = stripTags(value);
        let max = length || 180;
        if (text.length <= max) return text;
        return text.substring(0, text.lastIndexOf(" ", max)) + "…";
    });

    eleventyConfig.addLiquidFilter("strip_tags", stripTags);

    // "Apr 18" — the archive's per-year rows, where the year is already a heading.
    eleventyConfig.addLiquidFilter("short_date", function(value) {
        return new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'short', timeZone: 'UTC' }).format(value);
    });

    eleventyConfig.addLiquidFilter("abs_url", function(path) {
        return new URL(String(path || "/"), "https://jasonsteinshouer.com/").toString();
    });

    // Machine-readable date for <time datetime> and the search index.
    eleventyConfig.addLiquidFilter("iso_date", function(value) {
        let d = value instanceof Date ? value : new Date(value);
        return d.toISOString().slice(0, 10);
    });

    eleventyConfig.addLiquidFilter("year_of", function(value) {
        let d = value instanceof Date ? value : new Date(value);
        return d.getUTCFullYear();
    });

    // Posts sharing the most tags with the current one. Serves the visitor who
    // landed deep on a single post from a search result.
    eleventyConfig.addLiquidFilter("related_posts", function(posts, url, tags, limit) {
        let own = new Set((tags || []).map(t => String(t).toLowerCase()));
        if (!own.size) return [];
        return (posts || [])
            .filter(p => p.url !== url)
            .map(p => ({
                post: p,
                shared: (p.data.tags || []).filter(t => own.has(String(t).toLowerCase())).length,
                time: p.date ? p.date.getTime() : 0
            }))
            .filter(p => p.shared > 0)
            .sort((a, b) => b.shared - a.shared || b.time - a.time)
            .slice(0, limit || 3)
            .map(p => p.post);
    });

    eleventyConfig.addLiquidFilter("previous_post", function(posts, url) {
        let i = (posts || []).findIndex(p => p.url === url);
        return i > 0 ? posts[i - 1] : null;
    });

    eleventyConfig.addLiquidFilter("next_post", function(posts, url) {
        let i = (posts || []).findIndex(p => p.url === url);
        return i > -1 && i < posts.length - 1 ? posts[i + 1] : null;
    });

    // Customize Markdown library and settings:
    let markdownLibrary = markdownIt({
        html: true,
        breaks: true,
        linkify: true,
        typographer: true
    }).use(markdownItAnchor, {
        permalink: markdownItAnchor.permalink.headerLink(),
        slugify: eleventyConfig.getFilter("slug")
    }).use(markdownItFootnote);
    eleventyConfig.setLibrary("md", markdownLibrary);

    // Copy anything in the assets/ folder verbatim
    eleventyConfig.addPassthroughCopy("assets");

    // Define a posts collection for all blog posts
    eleventyConfig.addCollection("posts", function(collectionApi) {
        return collectionApi.getFilteredByGlob("posts/**/*.md");
    });

    eleventyConfig.addCollection("tags", function(collectionApi) {
        return collectionApi.getAll().reduce(function( collection, item ) {
            if ( "tags" in item.data ){
                item.data.tags.forEach( (value) => {
                    if ( !collection.includes( value ) ) {
                        collection.push( value );
                    }
                });
            }
            return collection.sort();
        },[]);
    });

    // Every tag with the number of posts carrying it, heaviest first. Drives
    // the tag index and the masthead's tag surfacing.
    eleventyConfig.addCollection("tagsWithCount", function(collectionApi) {
        let slugify = eleventyConfig.getFilter("slug");
        let counts = new Map();
        collectionApi.getFilteredByGlob("posts/**/*.md").forEach(function(post) {
            (post.data.tags || []).forEach(function(tag) {
                counts.set(tag, (counts.get(tag) || 0) + 1);
            });
        });
        return Array.from(counts, ([name, count]) => ({ name, count, slug: slugify(name) }))
            .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
    });

    // Posts grouped by year, newest year first, newest post first within a year.
    eleventyConfig.addCollection("postsByYear", function(collectionApi) {
        let years = new Map();
        collectionApi.getFilteredByGlob("posts/**/*.md").forEach(function(post) {
            let year = post.date.getUTCFullYear();
            if (!years.has(year)) years.set(year, []);
            years.get(year).push(post);
        });
        return Array.from(years, ([year, posts]) => ({
            year,
            posts: posts.sort((a, b) => b.date - a.date)
        })).sort((a, b) => b.year - a.year);
    });
};

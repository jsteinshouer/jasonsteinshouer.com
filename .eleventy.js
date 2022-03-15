
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

    // Liquid Filter
    eleventyConfig.addLiquidFilter("excerpt", function(value) { 
        let paragraph = value.match(/<p>([\s\S]*)?<\/p>/i)||[];
        return paragraph[1].substring(0,200) + "..."; 
    });
    eleventyConfig.addLiquidFilter("tag_list", function(tags) {
        let slugify = eleventyConfig.getFilter("slug");
        let tagLinks = tags.map( value => '<a href="/tag/' + slugify(value) + '/" >' + value + '</a>' );
        return new Intl.ListFormat().format(tagLinks); 
    });
    eleventyConfig.addLiquidFilter("array_to_sentence_string", function(value) { return new Intl.ListFormat().format(value); });
    eleventyConfig.addLiquidFilter("date_to_string", function(value) { return new Intl.DateTimeFormat('en-US',{day: 'numeric', month: 'short', year: 'numeric',}).format(value) ; });
    eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
  
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
    eleventyConfig.addCollection("projects", function(collectionApi) {
        return collectionApi.getFilteredByGlob("projects/**/*.md");
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
};
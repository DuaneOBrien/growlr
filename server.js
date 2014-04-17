/*jslint node:true */

'use strict';

var RSS         = require('rss'),
    FeedParser  = require('feedparser'),
    request     = require('request'),
    fs          = require('fs'),
    http        = require('http'),
    ArticleCollection = require('./ArticleCollection'),
    feedCount = 0,
    feedParser,
    req,
    rollup,
    outputXML,
    server;

function handleError(error) {
    throw error;
}

function handleStreamReadable() {
    /* jshint validthis:true */
    var stream  = this,
        meta    = this.meta,
        item;

    while (null !== (item = stream.read())) {
        ArticleCollection.addArticle(item.title, (item.summary || item.description), item.link, item.pubDate);
    }
}

function handleFeedEnd() {
    feedCount -= 1;
    if (feedCount <= 0) {
        generateRollup(ArticleCollection.getArticles());
    }
}

function generateRollup(articles) {
    var article;
    rollup = new RSS({
        title: 'Growlr Rollup',
        feed_url: 'http://somefakededwebsite.notadomain/growlr.rss',
        site_url: 'http://somefakededwebsite.notadomain/',
        author: 'Some Fake Author'
    });
    for (article in articles) {
        if (articles.hasOwnProperty(article)) {
            rollup.item({
                title: articles[article].title,
                description: articles[article].description,
                url: articles[article].url,
                date: articles[article].date,
            });
        }
    }
    outputXML = rollup.xml();
}

fs.readFile('feeds.json', {encoding: 'UTF8'}, function (error, data) {
    if (error) {
        throw error;
    }
    var feeds = JSON.parse(data),
        feedTitle;
    feedCount = Object.keys(feeds).length;
    for (feedTitle in feeds) {
        if (feeds.hasOwnProperty(feedTitle)) {
            feedParser = new FeedParser([{}]);
            feedParser.on('error', handleError);
            feedParser.on('readable', handleStreamReadable);
            feedParser.on('end', handleFeedEnd);
            request(feeds[feedTitle].url).pipe(feedParser);
        }
    }
});

server = http.createServer(function (request, response) {
    if (outputXML) {
        response.writeHead(200, {"Content-Type": "application/rss+xml"});
        response.end(outputXML);
    }
});

server.listen(8064);




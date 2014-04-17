/*jslint node:true */

'use strict';

var RSS         = require('rss'),
    FeedParser  = require('feedparser'),
    request     = require('request'),
    fs          = require('fs'),
    ArticleCollection = require('./ArticleCollection'),
    feedCount = 0,
    feedParser,
    req;

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
        console.log(ArticleCollection.getArticles());
    }
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



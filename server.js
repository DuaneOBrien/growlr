/*jslint node:true */

'use strict';

var RSS         = require('rss'),
    FeedParser  = require('feedparser'),
    request     = require('request'),
    req         = request('https://github.com/DuaneOBrien/growlr/commits/master.atom'),
    feedparser  = new FeedParser([{}]),
    ArticleCollection = require('./ArticleCollection');

req.on('error', function (error) {
    // handle any request errors
    console.log(error);
});

req.on('response', function (res) {
    var stream = this;

    if (res.statusCode !== 200) {
        return this.emit('error', new Error('Bad status code'));
    }

    stream.pipe(feedparser);
});

feedparser.on('error', function (error) {
    // always handle errors
    console.log(error);
});

feedparser.on('readable', function () {
    var stream  = this,
        meta    = this.meta,
        item;
    
    while (null !== (item = stream.read())) {
        ArticleCollection.addArticle(item.title, (item.summary || item.description), item.link, item.pubDate);
    }
    console.log(ArticleCollection.getArticles());
});

/*jslint node: true */
'use strict';

var articles;

function init() {
    articles = [];
}

function sortByDateDesc(a, b) {
    var aComp = Date.parse(a.pubDate),
        bComp = Date.parse(b.pubDate);
    if (aComp < bComp) {
        return 1;
    }
    if (aComp > bComp) {
        return -1;
    }
    return 0;
}

function getArticles() {
    return articles.sort(sortByDateDesc);
}

function addArticle(title, summary, link, pubDate) {
    return articles.push({title: title, summary: summary, link: link, pubDate: pubDate});
}

init();

module.exports = {
    init: init,
    getArticles: getArticles,
    addArticle: addArticle
};
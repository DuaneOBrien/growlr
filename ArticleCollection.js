/*jslint node: true */
'use strict';

var articles;

function init() {
    articles = [];
}

function getArticles() {
    return articles;
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
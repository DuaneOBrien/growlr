/*jslint node: true */
'use strict';

var articles;

function init() {
    articles = [];
}

function sortByDateDesc(a, b) {
    var aComp = Date.parse(a.date),
        bComp = Date.parse(b.date);
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

function addArticle(title, description, url, date) {
    return articles.push({title: title, description: description, url: url, date: new Date(date).toString()});
}

init();

module.exports = {
    init: init,
    getArticles: getArticles,
    addArticle: addArticle
};
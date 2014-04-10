/*jslint node:true, regexp:true */
/*global beforeEach, afterEach, describe, xdescribe, it, xit, expect, runs, waitsFor, sinon */
(function () {
    'use strict';
    
    var sinon = require('sinon'),
        ArticleCollection = require('../../ArticleCollection');
    
    describe('Exercising the Article Collection', function () {
        beforeEach(function () {
            ArticleCollection.init();
        });
        it('initializes to an empty list', function () {
            ArticleCollection.init();
            expect(ArticleCollection.getArticles()).toEqual([]);
        });
        it('can add an article', function () {
            expect(ArticleCollection.getArticles()).toEqual([]);
            expect(ArticleCollection.addArticle('test title', 'test summary', 'alink', 'today')).toBe(1);
            expect(ArticleCollection.getArticles()).toEqual([{title: 'test title', summary: 'test summary', link: 'alink', pubDate: 'today'}]);
        });
        it('reinitializes to an empty list', function () {
            expect(ArticleCollection.addArticle('test title', 'test summary', 'alink', 'today')).toBe(1);
            ArticleCollection.init();
            expect(ArticleCollection.getArticles()).toEqual([]);
        });
    });
}());
    
    
    

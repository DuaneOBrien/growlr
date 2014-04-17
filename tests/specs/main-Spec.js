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
        it('returns the article count when it pushes in a new onw', function () {
            expect(ArticleCollection.getArticles()).toEqual([]);
            expect(ArticleCollection.addArticle('Article 1', 'test summary', 'alink', 'today')).toBe(1);
            expect(ArticleCollection.addArticle('Article 2', 'test summary', 'alink', 'today')).toBe(2);
        });
        it('reinitializes to an empty list', function () {
            expect(ArticleCollection.addArticle('test title', 'test summary', 'alink', 'today')).toBe(1);
            ArticleCollection.init();
            expect(ArticleCollection.getArticles()).toEqual([]);
        });
        it('sorts articles by descending pub date before returning', function () {
            var expectedResults = [
                {title: 'Third Article', summary: 'Third Summary', link: 'Third Link', pubDate: 'Tue Apr 08 2012 18:56:37 GMT-0500 (EST)'},
                {title: 'Second Article', summary: 'Second Summary', link: 'Second Link', pubDate: 'Tue Mar 07 2012 18:56:37 GMT-0500 (EST)'},
                {title: 'First Article', summary: 'First Summary', link: 'First Link', pubDate: 'Tue Mar 06 2012 18:56:37 GMT-0500 (EST)'}
            ];
            expect(ArticleCollection.addArticle('Second Article', 'Second Summary', 'Second Link', 'Tue Mar 07 2012 18:56:37 GMT-0500 (EST)')).toBe(1);
            expect(ArticleCollection.addArticle('Third Article', 'Third Summary', 'Third Link', 'Tue Apr 08 2012 18:56:37 GMT-0500 (EST)')).toBe(2);
            expect(ArticleCollection.addArticle('First Article', 'First Summary', 'First Link', 'Tue Mar 06 2012 18:56:37 GMT-0500 (EST)')).toBe(3);
            expect(ArticleCollection.getArticles()).toEqual(expectedResults);
        });
    });
}());
    
    
    

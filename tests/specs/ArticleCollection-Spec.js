/*jslint node:true, regexp:true */
/*global beforeEach, afterEach, describe, xdescribe, it, xit, expect, runs, waitsFor, sinon */
(function () {
    'use strict';
    
    var sinon = require('sinon'),
        ArticleCollection = require('../../ArticleCollection');
    
    describe('Exercising the Article Collection', function () {
        var testArticle,
            expectedResults = [
            {title: 'Third Article', description: 'Third Summary', url: 'Third Link', date: 'Sun Apr 08 2012 19:56:37 GMT-0400 (EDT)'},
            {title: 'Second Article', description: 'Second Summary', url: 'Second Link', date: 'Wed Mar 07 2012 17:56:37 GMT-0500 (EST)'},
            {title: 'First Article', description: 'First Summary', url: 'First Link', date: 'Tue Mar 06 2012 17:56:37 GMT-0500 (EST)'}
        ];
        beforeEach(function () {
            testArticle = expectedResults[0];
            ArticleCollection.init();
        });
        it('initializes to an empty list', function () {
            ArticleCollection.init();
            expect(ArticleCollection.getArticles()).toEqual([]);
        });
        it('can add an article', function () {
            expect(ArticleCollection.getArticles()).toEqual([]);
            expect(ArticleCollection.addArticle(testArticle.title, testArticle.description, testArticle.url, testArticle.date)).toBe(1);
            expect(ArticleCollection.getArticles()).toEqual([expectedResults[0]]);
        });
        it('returns the article count when it pushes in a new onw', function () {
            expect(ArticleCollection.getArticles()).toEqual([]);
            expect(ArticleCollection.addArticle(testArticle.title, testArticle.description, testArticle.url, testArticle.date)).toBe(1);
            testArticle = expectedResults[1];
            expect(ArticleCollection.addArticle(testArticle.title, testArticle.description, testArticle.url, testArticle.date)).toBe(2);
        });
        it('reinitializes to an empty list', function () {
            expect(ArticleCollection.addArticle(testArticle.title, testArticle.description, testArticle.url, testArticle.date)).toBe(1);
            ArticleCollection.init();
            expect(ArticleCollection.getArticles()).toEqual([]);
        });
        it('sorts articles by descending pub date before returning', function () {
            testArticle = expectedResults[1];
            expect(ArticleCollection.addArticle(testArticle.title, testArticle.description, testArticle.url, testArticle.date)).toBe(1);
            testArticle = expectedResults[0];
            expect(ArticleCollection.addArticle(testArticle.title, testArticle.description, testArticle.url, testArticle.date)).toBe(2);
            testArticle = expectedResults[2];
            expect(ArticleCollection.addArticle(testArticle.title, testArticle.description, testArticle.url, testArticle.date)).toBe(3);
            expect(ArticleCollection.getArticles()).toEqual(expectedResults);
        });
        it('normalizes article dates when pushing them in', function () {
            expect(ArticleCollection.addArticle(testArticle.title, testArticle.description, testArticle.url, '04/08/2012 18:56:37 GMT-0500 (EST)')).toBe(1);
            expect(ArticleCollection.getArticles()).toEqual([expectedResults[0]]);
        });
    });
}());
    
    
    

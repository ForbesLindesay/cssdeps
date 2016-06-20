'use strict';

var fs = require('fs');
var assert = require('assert');
var test = require('testit');
var cssdeps = require('../');

var fixture = fs.readFileSync(__dirname + '/fixture.css', 'utf8');

test('gets deps', function () {
  assert.deepEqual(cssdeps(fixture), [
    '/foo.css',
    '../bar.css',
    '../baz.css',
    'crazy.css',
    '../bing.css',
    '../photo.png',
    '../photoB.png'
  ]);
});

test('syntax error message', function () {
  assert.throws(function () {
    cssdeps('body {');   // syntax error
  }, /source\.css:1:7/); // expect error message to include file name (default: source.css)
})

test('pass opts to css-parse', function () {
  assert.throws(function () {
    cssdeps('body {', { source: 'index.css' });   // syntax error
  }, /index\.css:1:7/); // expect error message to include file name (default: source.css)
});

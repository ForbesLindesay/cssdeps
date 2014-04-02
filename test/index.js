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

# cssdeps

[![Greenkeeper badge](https://badges.greenkeeper.io/ForbesLindesay/cssdeps.svg)](https://greenkeeper.io/)

Take some CSS, figure out what files it depends on.

[![Build Status](https://img.shields.io/travis/ForbesLindesay/cssdeps/master.svg)](https://travis-ci.org/ForbesLindesay/cssdeps)
[![Coverage Status](https://img.shields.io/coveralls/ForbesLindesay/cssdeps/master.svg?style=flat)](https://coveralls.io/r/ForbesLindesay/cssdeps?branch=master)
[![Dependency Status](https://img.shields.io/david/ForbesLindesay/cssdeps.svg)](https://david-dm.org/ForbesLindesay/cssdeps)
[![NPM version](https://img.shields.io/npm/v/cssdeps.svg)](https://www.npmjs.com/package/cssdeps)

[![Sauce Test Status](https://saucelabs.com/browser-matrix/cssdeps.svg)](https://saucelabs.com/u/cssdeps)

## Installation

    npm install cssdeps

## Usage

```js
'use strict';

var fs = require('fs');
var assert = require('assert');
var cssdeps = require('cssdeps');

var fixture = fs.readFileSync(__dirname + '/fixture.css', 'utf8');

assert.deepEqual(cssdeps(fixture), [
  '/foo.css',
  '../bar.css',
  '../baz.css',
  'crazy.css',
  '../bing.css',
  '../photo.png',
  '../photoB.png'
]);
```

## License

  MIT

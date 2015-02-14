# cssdeps

Take some CSS, figure out what files it depends on.

[![Build Status](https://img.shields.io/travis/ForbesLindesay/cssdeps/master.svg)](https://travis-ci.org/ForbesLindesay/cssdeps)
[![Coverage Status](https://img.shields.io/coveralls/ForbesLindesay/cssdeps/master.svg?style=flat)](https://coveralls.io/r/ForbesLindesay/cssdeps?branch=master)
[![Dependency Status](https://img.shields.io/gemnasium/ForbesLindesay/cssdeps.svg)](https://gemnasium.com/ForbesLindesay/cssdeps)
[![NPM version](https://img.shields.io/npm/v/cssdeps.svg)](http://badge.fury.io/js/cssdeps)

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

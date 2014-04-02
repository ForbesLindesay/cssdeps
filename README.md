# cssdeps

Take some CSS, figure out what files it depends on.

[![Build Status](https://travis-ci.org/ForbesLindesay/cssdeps.png?branch=master)](https://travis-ci.org/ForbesLindesay/cssdeps)
[![Dependency Status](https://gemnasium.com/ForbesLindesay/cssdeps.png)](https://gemnasium.com/ForbesLindesay/cssdeps)
[![NPM version](https://badge.fury.io/js/cssdeps.png)](http://badge.fury.io/js/cssdeps)

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
'use strict';

var parse = require('css-parse');

module.exports = detect;
function detect(src) {
  var res = [];
  parseDeps(parse(src), res);
  return dedupe(res);
}

function parseDeps(ast, res) {
  function parse(rule) {
    parseDeps(rule, res);
  }
  switch (ast.type) {
    case 'stylesheet':
      ast.stylesheet.rules.forEach(parse);
      break;
    case 'supports':
    case 'host':
    case 'media':
    case 'document':
      ast.rules.forEach(parse);
      break;
    case 'page':
    case 'font-face':
    case 'rule':
      ast.declarations.forEach(parse);
      break;
    case 'declaration':
      findUrls(ast.value).urls.map(function (url) {
        var parsed = findUrls(url);
        if (parsed.strings.length === 1) return parsed.strings[0];
        else return url;
      }).forEach(function (url) {
        res.push(url);
      });
      break;
    case 'import':
      var imports = findUrls(ast.import);
      imports.strings.concat(imports.urls.map(function (url) {
        var parsed = findUrls(url);
        if (parsed.strings.length === 1) return parsed.strings[0];
        else return url;
      })).forEach(function (url) {
        res.push(url);
      });
      break;
    case 'charset':
    case 'namespace':
    case 'keyframe':
    case 'keyframes':
    case 'comment':
      break;
    default:
      /* istanbul ignore next */
      throw new Error('Unexpected AST type ' + ast.type);
  }
}
function findUrls(str) {
  var strings = [], urls = [];

  var stringStart = '"';
  while (str.length) {
    str = str.replace(/^[^\"\'u]+/, '');
    if (str.length) {
      if (str[0] === '"' || str[0] === '\'') {
        var currentString = '';
        stringStart = str[0];
        str = str.substr(1);
        while (str[0] !== stringStart && str.length) {
          currentString += str[0];
          str = str.substr(1);
        }
        str = str.substr(1);
        strings.push(currentString);
        currentString = '';
      } else if (/^url\(/.test(str)) {
        var url = '', inString = false;
        str = str.substr(4);
        while ((inString || str[0] !== ')') && str.length) {
          if (inString && str[0] === stringStart) {
            inString = false;
          } else if (!inString && (str[0] === '"' || str[0] === '\'')) {
            inString = true;
            stringStart = str[0];
          }
          url += str[0];
          str = str.substr(1);
        }
        str = str.substr(1);
        urls.push(url);
      } else {
        str = str.substr(1);
      }
    }
  }
  return {strings: strings, urls: urls};
}


function dedupe(urls) {
  var seen = {}
  return urls.filter(function (url) {
    if (seen['key:' + url]) return false
    else return seen['key:' + url] = true
  });
}

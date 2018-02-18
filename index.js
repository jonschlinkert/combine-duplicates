'use strict';

const typeOf = require('kind-of');

module.exports = function(str, substrings) {
  let substr = '.';

  if (typeof str !== 'string') {
    throw new TypeError('expected a string');
  }

  if (typeof substrings === 'string') {
    substrings = [substrings];
  }

  if (Array.isArray(substrings)) {
    substr = substrings.join('|').split('|').map(s => s.replace(/\\?(\W)/g, '\\$1')).join('|');
  }

  return str.replace(new RegExp('(' + substr + ')(?=\\1)', 'g'), '');
};


'use strict';

require('mocha');
var assert = require('assert');
var combine = require('..');

describe('combine-duplicates', function() {
  it('should throw an error when a string is not passed', function() {
    assert.throws(function() {
      combine();
    }, /expected/);
  });

  it('should remove all duplicate substrings', function() {
    assert.equal(combine('abbbcddddeee'), 'abcde');
    assert.equal(combine('abbbcddddeeefg'), 'abcdefg');
    assert.equal(combine('abbbabbbbabbbbabbb'), 'abababab');
    assert.equal(combine('abbb***abbbb***abbbb***abbb'), 'ab*ab*ab*ab');
  });

  it('should remove duplicates of the given substring', function() {
    assert.equal(combine('abbbcddddeeeddddd', 'd'), 'abbbcdeeed');
    assert.equal(combine('abbbcddddeeefg', 'g'), 'abbbcddddeeefg');
    assert.equal(combine('abbbabbbbabbbbabbb', 'b'), 'abababab');
    assert.equal(combine('abbb***abbbb***abbbb***abbb', '*'), 'abbb*abbbb*abbbb*abbb');
    assert.equal(combine('abbb***abbbb***abbbb***abbb', '*|b'), 'ab*ab*ab*ab');
  });

  it('should remove duplicates of the given substrings', function() {
    assert.equal(combine('abbbcddddeeeddddd', ['d', 'b']), 'abcdeeed');
    assert.equal(combine('abbbcddddeeefg', ['g', 'g', 'd']), 'abbbcdeeefg');
    assert.equal(combine('aaabbbabbbbabbbbabbb', ['b', 'c', 'a']), 'abababab');
    assert.equal(combine('abbb***abbbb***abbbb***abbb', ['b', '*']), 'ab*ab*ab*ab');
  });
});

import { describe, test, expect } from '@jest/globals';
import search from '../src/index.js';

describe('search', () => {
  const doc1 = { id: 'doc1', text: "I can't shoot straight unless I've had a pint!" };
  const doc2 = { id: 'doc2', text: "Don't shoot shoot shoot that thing at me." };
  const doc3 = { id: 'doc3', text: "I'm your shooter." };
  const docs = [doc1, doc2, doc3];

  test('ranks documents by term frequency', () => {
    expect(search(docs, 'shoot')).toEqual(['doc2', 'doc1']);
  });

  test('returns an empty array when there are no documents', () => {
    expect(search([], 'shoot')).toEqual([]);
  });

  test('returns an empty array when no matches found', () => {
    expect(search(docs, 'dragon')).toEqual([]);
  });

  test('does not match substrings inside other words', () => {
    expect(search(docs, 'shooter')).toEqual(['doc3']);
  });

  test('is case-insensitive', () => {
    expect(search(docs, 'Shoot')).toEqual(['doc2', 'doc1']);
  });

  test('matches words next to punctuation', () => {
    expect(search(docs, 'pint')).toEqual(['doc1']);
  });

  test('strips punctuation from the query', () => {
    expect(search(docs, 'pint!')).toEqual(['doc1']);
  });

  test('keeps documents with equal score in their original order', () => {
    const a = { id: 'a', text: 'cat dog' };
    const b = { id: 'b', text: 'dog cat' };
    const c = { id: 'c', text: 'cat cat dog' };
    expect(search([a, b, c], 'cat')).toEqual(['c', 'a', 'b']);
  });
});

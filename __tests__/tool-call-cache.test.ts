import { describe, expect, it } from 'vitest';
import { createToolCallCache } from '@/lib/tool-call-cache';

describe('tool call cache', () => {
  it('evicts oldest entries when limit is exceeded', () => {
    const cache = createToolCallCache(2);
    cache.add('first');
    cache.add('second');
    cache.add('third');

    expect(cache.has('first')).toBe(false);
    expect(cache.has('second')).toBe(true);
    expect(cache.has('third')).toBe(true);
  });

  it('clears entries', () => {
    const cache = createToolCallCache(2);
    cache.add('first');
    cache.clear();
    expect(cache.size()).toBe(0);
  });
});

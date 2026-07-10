import { describe, expect, test } from 'vitest';
import { getDocsOgImagePath, getHomeOgImagePath } from './og';

describe('OG asset paths', () => {
  test('uses a stable path for the home card', () => {
    expect(getHomeOgImagePath()).toBe('/og/home.webp');
  });

  test('uses a stable path for nested docs slugs', () => {
    expect(getDocsOgImagePath(['guides', 'react-adapter'])).toBe(
      '/og/docs/guides--react-adapter.webp',
    );
  });
});

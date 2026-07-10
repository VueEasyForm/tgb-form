import { describe, expect, test } from 'vitest';
import { getSocialImageUrl, getSiteConfig, withBasePath } from './site';

describe('getSiteConfig', () => {
  test('uses the local development origin when no site URL is configured', () => {
    expect(getSiteConfig({}).url()).toBe('http://localhost:3000/');
  });

  test('uses the root path when no base path is configured', () => {
    expect(getSiteConfig({}).basePath).toBe('/');
  });

  test('combines a project base path with public URLs', () => {
    const site = getSiteConfig({
      VITE_BASE_PATH: '/some-route/',
      VITE_SITE_URL: 'https://some-subdomain.github.io',
    });

    expect(site.basePath).toBe('/some-route/');
    expect(site.url('/docs/react-adapter')).toBe(
      'https://some-subdomain.github.io/some-route/docs/react-adapter',
    );
  });

  test('builds an absolute URL for an Open Graph asset', () => {
    const site = getSiteConfig({
      VITE_BASE_PATH: '/some-route/',
      VITE_SITE_URL: 'https://some-subdomain.github.io',
    });

    expect(site.url('/og/home.webp')).toBe(
      'https://some-subdomain.github.io/some-route/og/home.webp',
    );
  });

  test('uses the configured base path for social image URLs', () => {
    expect(
      getSocialImageUrl('/og/docs/react-adapter.webp', {
        VITE_BASE_PATH: '/some-route/',
        VITE_SITE_URL: 'https://some-subdomain.github.io',
      }),
    ).toBe('https://some-subdomain.github.io/some-route/og/docs/react-adapter.webp');
  });

  test('prefixes internal links with the configured base path', () => {
    expect(
      withBasePath('/docs/react-adapter', {
        VITE_BASE_PATH: '/some-route/',
      }),
    ).toBe('/some-route/docs/react-adapter');
  });
});

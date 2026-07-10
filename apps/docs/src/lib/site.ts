type SiteEnvironment = Record<string, string | undefined>;

const defaultSiteUrl = 'http://localhost:3000';
const defaultBasePath = '/';

function normalizeBasePath(basePath: string) {
  const normalized = basePath.replace(/^\/+|\/+$/g, '');
  return normalized ? `/${normalized}/` : '/';
}

function getRuntimeEnvironment(): SiteEnvironment {
  return (import.meta.env ?? {}) as SiteEnvironment;
}

export function getSiteConfig(env: SiteEnvironment = getRuntimeEnvironment()) {
  const origin = (env.VITE_SITE_URL ?? defaultSiteUrl).replace(/\/$/, '');
  const basePath = normalizeBasePath(env.VITE_BASE_PATH ?? defaultBasePath);

  return {
    basePath,
    url(pathname = '/') {
      return new URL(pathname.replace(/^\//, ''), `${origin}${basePath}`).toString();
    },
  };
}

export function getSocialImageUrl(pathname: string, env?: SiteEnvironment) {
  return getSiteConfig(env).url(pathname);
}

export function withBasePath(pathname: string, env?: SiteEnvironment) {
  return `${getSiteConfig(env).basePath}${pathname.replace(/^\//, '')}`;
}

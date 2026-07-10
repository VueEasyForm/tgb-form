export function getHomeOgImagePath() {
  return '/og/home.webp';
}

export function getDocsOgImagePath(slugs: string[]) {
  return `/og/docs/${slugs.join('--') || 'index'}.webp`;
}

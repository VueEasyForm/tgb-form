import { createRouter as createTanStackRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { NotFound } from '@/components/not-found';
import { getSiteConfig } from '@/lib/site';

export function getRouter() {
  return createTanStackRouter({
    basepath: getSiteConfig().basePath,
    routeTree,
    defaultPreload: 'intent',
    scrollRestoration: true,
    defaultViewTransition: true,
    defaultNotFoundComponent: NotFound,
  });
}

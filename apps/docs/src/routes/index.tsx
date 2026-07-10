import { createFileRoute, Link } from '@tanstack/react-router';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';
import { getHomeOgImagePath } from '@/lib/og';
import { getSiteConfig, getSocialImageUrl } from '@/lib/site';

export const Route = createFileRoute('/')({
  component: Home,
  head: () => {
    const site = getSiteConfig();
    const description = 'Schema-first forms for React and Vue.';
    const image = getSocialImageUrl(getHomeOgImagePath());
    const url = site.url();

    return {
      links: [{ href: url, rel: 'canonical' }],
      meta: [
        { title: 'EasyForm' },
        { content: description, name: 'description' },
        { content: 'website', property: 'og:type' },
        { content: url, property: 'og:url' },
        { content: 'EasyForm', property: 'og:title' },
        { content: description, property: 'og:description' },
        { content: image, property: 'og:image' },
        { content: 'summary_large_image', name: 'twitter:card' },
        { content: 'EasyForm', name: 'twitter:title' },
        { content: description, name: 'twitter:description' },
        { content: image, name: 'twitter:image' },
      ],
    };
  },
});

function Home() {
  return (
    <HomeLayout {...baseOptions()}>
      <div className="flex flex-1 flex-col items-center justify-center gap-5 px-6 text-center">
        <p className="text-fd-muted-foreground text-sm font-medium">EasyForm</p>
        <h1 className="max-w-xl text-3xl font-semibold">Schema-first forms for React and Vue.</h1>
        <p className="text-fd-muted-foreground max-w-lg text-base">
          Define portable forms as data, then render them with your framework and components.
        </p>
        <Link
          to="/docs/$"
          params={{
            _splat: '',
          }}
          className="bg-fd-primary text-fd-primary-foreground rounded-lg px-3 py-2 text-sm font-medium"
        >
          Open Docs
        </Link>
      </div>
    </HomeLayout>
  );
}

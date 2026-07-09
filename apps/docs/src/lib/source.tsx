import { loader } from 'fumadocs-core/source';
import { icons as lucideIcons } from 'lucide-react';
import { createElement } from 'react';
import { docs } from 'collections/server';
import { docsRoute } from './shared';

import {
  SiReact,
  SiVuedotjs,
  SiReactHex,
  SiVuedotjsHex,
  SiJson,
  SiJsonHex,
  SiTanstack,
} from '@icons-pack/react-simple-icons';

const brandIcons = {
  React: () => <SiReact />,
  Vue: () => <SiVuedotjs />,
  Json: () => <SiJson />,
  Tanstack: () => <SiTanstack />,
} satisfies Record<string, React.ComponentType>;

export const source = loader({
  source: docs.toFumadocsSource(),
  baseUrl: docsRoute,
  icon(icon) {
    if (!icon) return;

    if (icon in brandIcons) {
      return createElement(brandIcons[icon as keyof typeof brandIcons]);
    }

    if (icon in lucideIcons) {
      return createElement(lucideIcons[icon as keyof typeof lucideIcons]);
    }
  },
});

export function markdownPathToSlugs(segs: string[]) {
  if (segs.length === 0) return [];

  const out = [...segs];
  out[out.length - 1] = out[out.length - 1].replace(/\.md$/, '');
  if (out.length === 1 && out[0] === 'index') out.pop();
  return out;
}

export function slugsToMarkdownPath(slugs: string[]) {
  const segments = [...slugs];
  if (segments.length === 0) {
    segments.push('index.md');
  } else {
    segments[segments.length - 1] += '.md';
  }

  return {
    segments,
    url: `${docsRoute}/${segments.join('/')}`,
  };
}

export async function getLLMText(page: (typeof source)['$inferPage']) {
  const processed = await page.data.getText('processed');

  return `# ${page.data.title} (${page.url})

${processed}`;
}

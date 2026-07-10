import { source } from '@/lib/source';
import { createFileRoute } from '@tanstack/react-router';
import { llms } from 'fumadocs-core/source';
import { withBasePath } from '@/lib/site';

export const Route = createFileRoute('/llms.txt')({
  server: {
    handlers: {
      GET() {
        const content = llms(source)
          .index()
          .replace(/\]\((\/[^)\s]*)\)/g, (_, url: string) => `](${withBasePath(url)})`);
        return new Response(content);
      },
    },
  },
});

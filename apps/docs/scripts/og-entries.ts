import { getDocsOgImagePath, getHomeOgImagePath } from '../src/lib/og';

export type DocsOgEntry = {
  description: string;
  slugs: string[];
  title: string;
};

export type OgImageEntry = Omit<DocsOgEntry, 'slugs'> & {
  outputPath: string;
};

const homeEntry: OgImageEntry = {
  description: 'Schema-first forms for React and Vue.',
  outputPath: getHomeOgImagePath().slice(1),
  title: 'TGB Form',
};

export function getOgImageEntries(entries: DocsOgEntry[]): OgImageEntry[] {
  return [
    homeEntry,
    ...entries.map(({ description, slugs, title }) => ({
      description,
      outputPath: getDocsOgImagePath(slugs).slice(1),
      title,
    })),
  ];
}

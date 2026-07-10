import { describe, expect, test } from 'vitest';
import { getOgImageEntries } from './og-entries';

describe('getOgImageEntries', () => {
  test('includes the home card and a card for every docs entry', () => {
    expect(
      getOgImageEntries([
        {
          description: 'Start here.',
          slugs: [],
          title: 'Getting Started',
        },
        {
          description: 'Use EasyForm with React.',
          slugs: ['react-adapter'],
          title: 'React Adapter',
        },
      ]),
    ).toEqual([
      {
        description: 'Schema-first forms for React and Vue.',
        outputPath: 'og/home.webp',
        title: 'EasyForm',
      },
      {
        description: 'Start here.',
        outputPath: 'og/docs/index.webp',
        title: 'Getting Started',
      },
      {
        description: 'Use EasyForm with React.',
        outputPath: 'og/docs/react-adapter.webp',
        title: 'React Adapter',
      },
    ]);
  });
});

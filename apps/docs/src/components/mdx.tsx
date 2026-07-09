import * as Twoslash from 'fumadocs-twoslash/ui';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import { TypeTable } from './type-table';
import type { MDXComponents } from 'mdx/types';
import { OtherDocs } from './other-docs';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    ...Twoslash,
    Tab,
    Tabs,
    TypeTable,
    OtherDocs,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}

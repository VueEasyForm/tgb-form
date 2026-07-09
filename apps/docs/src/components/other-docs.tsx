'use client';

import { Card, Cards } from 'fumadocs-ui/components/card';
import { useTreeContext, useTreePath } from 'fumadocs-ui/contexts/tree';
import type * as PageTree from 'fumadocs-core/page-tree';

function getCardTarget(node: PageTree.Item | PageTree.Folder) {
  if (node.type === 'page') return node;
  return node.index;
}

function hasTarget(entry: {
  node: PageTree.Item | PageTree.Folder;
  target: PageTree.Item | undefined;
}): entry is {
  node: PageTree.Item | PageTree.Folder;
  target: PageTree.Item;
} {
  return Boolean(entry.target);
}

export function OtherDocs() {
  const { root } = useTreeContext();
  const path = useTreePath();
  const current = path.at(-1);
  const currentUrl = current?.type === 'page' ? current.url : undefined;

  const entries = root.children
    .filter(
      (node): node is PageTree.Item | PageTree.Folder =>
        node.type === 'page' || node.type === 'folder',
    )
    .map((node) => ({
      node,
      target: getCardTarget(node),
    }))
    .filter(hasTarget)
    .filter(({ target }) => target.url !== currentUrl);

  if (entries.length === 0) return null;

  return (
    <Cards>
      {entries.map(({ node, target }) => (
        <Card
          key={node.$id ?? target.url}
          icon={node.icon ?? target.icon}
          title={node.name}
          description={node.description ?? target.description}
          href={target.url}
          external={target.external}
        />
      ))}
    </Cards>
  );
}

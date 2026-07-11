import { faker } from '@faker-js/faker';
import { FieldDataType, defineForm, toTanStackOptions } from '@tgb-form/core';
import { useForm } from '@tanstack/react-form';
import { Profiler } from 'react';
import { expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { TgbForm, createReactRendererRegistry, type ReactRendererProps } from '../src';

type FieldBinding = {
  handleChange(value: unknown): void;
};

test('updates only the changed renderer in a seeded multi-form builder workload', async () => {
  faker.seed(20260711);

  const templates = Array.from({ length: 25 }, () => ({
    defaultValue: faker.lorem.words(3),
    name: faker.helpers.slugify(faker.lorem.words(3)).toLowerCase(),
  }));
  const fields = Object.fromEntries(
    ['lead', 'billing', 'compliance', 'operations'].flatMap((section) =>
      templates.map((template) => [
        `${section}-${template.name}`,
        { type: FieldDataType.String, defaultValue: template.defaultValue },
      ]),
    ),
  );
  const definition = defineForm({ fields });
  const targetName = Object.keys(definition.fields)[50]!;
  const nextValue = faker.lorem.words(4);
  const bindings = new Map<string, FieldBinding>();
  const renderCounts = new Map<string, number>();
  const commits = vi.fn();

  const StressRenderer = ({ name, field, value }: ReactRendererProps) => {
    bindings.set(name, field as FieldBinding);
    renderCounts.set(name, (renderCounts.get(name) ?? 0) + 1);

    return <output data-testid={`value-${name}`}>{String(value)}</output>;
  };
  const renderers = createReactRendererRegistry({
    byType: { [FieldDataType.String]: StressRenderer },
  });

  function FormBuilder() {
    const form = useForm(toTanStackOptions(definition) as any);

    return (
      <TgbForm
        definition={definition}
        instance={form as any}
        renderers={renderers}
      />
    );
  }

  const screen = await render(
    <Profiler
      id="form-builder"
      onRender={(_id, phase) => {
        if (phase === 'update') commits();
      }}
    >
      <FormBuilder />
    </Profiler>,
  );

  expect(bindings).toHaveLength(100);
  renderCounts.clear();

  bindings.get(targetName)?.handleChange(nextValue);

  await vi.waitFor(() =>
    expect(screen.getByTestId(`value-${targetName}`)).toHaveTextContent(nextValue),
  );

  expect(commits).toHaveBeenCalledTimes(1);
  expect(
    [...renderCounts.entries()].filter(([, count]) => count > 0).map(([name]) => name),
  ).toEqual([targetName]);
});

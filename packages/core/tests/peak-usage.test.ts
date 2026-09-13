import { describe, expect, expectTypeOf, test } from 'vitest';
import * as v from 'valibot';
import type { FormValidateOrFn } from '@tanstack/form-core';
import {
  createValidatorRegistry,
  defineForm,
  deserializeForm,
  FieldDataType,
  getDefaultValues,
  serializeForm,
  toTanStackOptions,
  toValibotSchema,
  ValidationRuleKind,
  type FieldDefinitionInput,
  type FormDefinition,
  type FormDefinitionInput,
  type InferFormValues,
  type JsonValue,
} from '../src';

// ---------------------------------------------------------------------------
// Dynamic form builder (visual editor): spread-built wide inputs compiled at
// runtime, with defineForm failures surfaced as editor error strings.
// ---------------------------------------------------------------------------
type BuilderNode = {
  readonly key: string;
  readonly type: FieldDataType;
  readonly label: string;
  readonly component: string;
  readonly defaultValue: string | number | boolean;
  readonly children: readonly BuilderNode[];
  readonly elementType: FieldDataType;
};

function nodeToInput(node: BuilderNode, order: number): FieldDefinitionInput {
  const base = {
    ...(node.label ? { label: node.label } : {}),
    ...(node.component ? { component: node.component } : {}),
    order,
  };
  if (node.type === FieldDataType.Number) {
    const raw = typeof node.defaultValue === 'number' ? node.defaultValue : 0;
    return { type: FieldDataType.Number, defaultValue: raw, ...base };
  }
  if (node.type === FieldDataType.Boolean) {
    return { type: FieldDataType.Boolean, defaultValue: Boolean(node.defaultValue), ...base };
  }
  if (node.type === FieldDataType.Object) {
    const fields: Record<string, FieldDefinitionInput> = {};
    node.children.forEach((child, index) => {
      fields[child.key] = nodeToInput(child, index);
    });
    return { type: FieldDataType.Object, defaultValue: {}, fields, ...base };
  }
  if (node.type === FieldDataType.Array) {
    return {
      type: FieldDataType.Array,
      defaultValue: [],
      element: elementToInput(node),
      ...base,
    };
  }
  return { type: FieldDataType.String, defaultValue: String(node.defaultValue ?? ''), ...base };
}

function elementToInput(node: BuilderNode): FieldDefinitionInput {
  if (node.elementType === FieldDataType.Object) {
    const fields: Record<string, FieldDefinitionInput> = {};
    node.children.forEach((child, index) => {
      fields[child.key] = nodeToInput(child, index);
    });
    return { type: FieldDataType.Object, defaultValue: {}, label: 'Item', fields };
  }
  if (node.elementType === FieldDataType.Number) {
    return { type: FieldDataType.Number, defaultValue: 0, label: 'Item' };
  }
  if (node.elementType === FieldDataType.Boolean) {
    return { type: FieldDataType.Boolean, defaultValue: false, label: 'Item' };
  }
  return { type: FieldDataType.String, defaultValue: '', label: 'Item' };
}

function buildEditorInput(nodes: readonly BuilderNode[]): FormDefinitionInput {
  const fields: Record<string, FieldDefinitionInput> = {};
  nodes.forEach((node, index) => {
    fields[node.key] = nodeToInput(node, index);
  });
  return { fields, meta: { title: 'Editor form' } };
}

describe('dynamic builder', () => {
  test('compiles spread-built wide inputs and round-trips through JSON', () => {
    const input = buildEditorInput([
      {
        key: 'bio',
        type: FieldDataType.String,
        label: 'Bio',
        component: 'long-text',
        defaultValue: '',
        children: [],
        elementType: FieldDataType.String,
      },
      {
        key: 'rating',
        type: FieldDataType.Number,
        label: 'Rating',
        component: 'star',
        defaultValue: 4,
        children: [],
        elementType: FieldDataType.String,
      },
      {
        key: 'address',
        type: FieldDataType.Object,
        label: 'Address',
        component: '',
        defaultValue: '',
        children: [
          {
            key: 'street',
            type: FieldDataType.String,
            label: 'Street',
            component: '',
            defaultValue: '',
            children: [],
            elementType: FieldDataType.String,
          },
        ],
        elementType: FieldDataType.String,
      },
      {
        key: 'scores',
        type: FieldDataType.Array,
        label: 'Scores',
        component: '',
        defaultValue: '',
        children: [],
        elementType: FieldDataType.Number,
      },
    ]);

    const definition = defineForm(input);
    expect(definition.fields.bio.component).toBe('long-text');

    const restored = deserializeForm(JSON.stringify(serializeForm(definition)));
    expect(Object.keys(restored.fields)).toEqual(['bio', 'rating', 'address', 'scores']);
    expect(getDefaultValues(restored)).toEqual({
      bio: '',
      rating: 4,
      address: { street: '' },
      scores: [],
    });
    expect(v.safeParse(toValibotSchema(restored), getDefaultValues(restored)).success).toBe(true);
  });

  test('defineForm throws descriptive errors for editor error display', () => {
    expect(() =>
      defineForm({
        fields: {
          age: { type: FieldDataType.Number, defaultValue: 'old' } as unknown as never,
        },
      } as FormDefinitionInput),
    ).toThrow('fields.age.defaultValue must be a number');
  });
});

// ---------------------------------------------------------------------------
// Stored payloads merged over defaults (baseline restore): nested partials
// must keep sibling values, arrays replace wholesale.
// ---------------------------------------------------------------------------
const profileForm = defineForm({
  fields: {
    url: { type: FieldDataType.String, defaultValue: 'https://example.com' },
    profile: {
      type: FieldDataType.Object,
      defaultValue: { nickname: '', tagline: '' },
      fields: {
        nickname: { type: FieldDataType.String, defaultValue: '' },
        tagline: { type: FieldDataType.String, defaultValue: '' },
      },
    },
    tags: {
      type: FieldDataType.Array,
      defaultValue: ['news'],
      element: { type: FieldDataType.String, defaultValue: '' },
    },
  },
});

describe('stored payload restore', () => {
  test('getDefaultValues accepts overrides without dropping nested siblings', () => {
    expect(getDefaultValues(profileForm, { profile: { nickname: 'ada' } })).toEqual({
      url: 'https://example.com',
      profile: { nickname: 'ada', tagline: '' },
      tags: ['news'],
    });
  });

  test('payload arrays replace definition arrays wholesale', () => {
    expect(getDefaultValues(profileForm, { tags: ['only'] })).toEqual({
      url: 'https://example.com',
      profile: { nickname: '', tagline: '' },
      tags: ['only'],
    });
  });

  test('toTanStackOptions defaultValues accept the same payload shape', () => {
    const baseline: Record<string, unknown> = {
      url: 'https://edited.example',
      profile: { nickname: 'ada' },
    };
    const options = toTanStackOptions(profileForm, {
      defaultValues: baseline as { url?: string; profile?: { nickname?: string } },
    });

    expect(options.defaultValues).toEqual({
      url: 'https://edited.example',
      profile: { nickname: 'ada', tagline: '' },
      tags: ['news'],
    });
  });
});

// ---------------------------------------------------------------------------
// Extension-style definitions: named custom validators with a validators-only
// registry, plus custom component names without a renderer registry.
// ---------------------------------------------------------------------------
describe('named validators without renderer registry', () => {
  test('compiles custom validators referenced by name', () => {
    const validators = createValidatorRegistry().register('assetsExist', ({ message }) =>
      v.check((value: string) => value.length > 0, message ?? 'Missing asset'),
    );

    const form = defineForm(
      {
        fields: {
          assetId: {
            type: FieldDataType.String,
            defaultValue: '',
            label: 'Asset',
            component: 'asset-selector',
            rules: [{ kind: ValidationRuleKind.Required, message: 'Asset is required' }],
            validators: [{ name: 'assetsExist', message: 'Asset not found' }],
          },
          fit: {
            type: FieldDataType.String,
            defaultValue: 'cover',
            label: 'Fit',
            component: 'select-input',
            props: {
              options: [
                { value: 'cover', label: 'Cover' },
                { value: 'contain', label: 'Contain' },
              ],
            },
          },
        },
      },
      { validators },
    );

    type Values = InferFormValues<typeof form>;
    expectTypeOf<Values>().toEqualTypeOf<{ assetId: string; fit: string }>();

    const schema = toValibotSchema(form);
    expect(v.safeParse(schema, { assetId: '', fit: 'cover' }).success).toBe(false);
    expect(v.safeParse(schema, { assetId: 'a1', fit: 'cover' }).success).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Wide (JSON-shaped) definitions plug into TanStack validators directly.
// ---------------------------------------------------------------------------
describe('wide definitions', () => {
  test('compiled schema needs no cast as a TanStack form validator', () => {
    const wide: FormDefinition = deserializeForm({
      fields: {
        nickname: { type: FieldDataType.String, defaultValue: '' },
      },
    });

    const schema = toValibotSchema(wide);
    expectTypeOf(schema).toExtend<FormValidateOrFn<Record<string, unknown>>>();
  });

  test('wide values flow through getDefaultValues', () => {
    const wide: FormDefinition = {
      fields: {
        nickname: { type: FieldDataType.String, defaultValue: 'ada' },
        extra: { type: FieldDataType.Array, defaultValue: [] } as FormDefinition['fields'][string],
      },
    };

    expectTypeOf<InferFormValues<typeof wide>>().toExtend<Record<string, JsonValue>>();
    expect(getDefaultValues(wide)).toEqual({ nickname: 'ada', extra: [] });
  });
});

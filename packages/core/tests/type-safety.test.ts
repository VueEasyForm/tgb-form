import { describe, expectTypeOf, test } from 'vitest';
import * as v from 'valibot';
import type { StandardSchemaV1 } from '@tanstack/form-core';
import {
  cloneJson,
  type InferFormValues,
  createRendererRegistry,
  createValidatorRegistry,
  defineForm,
  deserializeForm,
  FieldDataType,
  getDefaultValues,
  resolveRenderer,
  serializeForm,
  toTanStackOptions,
  toValibotSchema,
  type FieldDefinition,
  type FormDefinition,
  type FormDefinitionInput,
  type JsonValue,
  type RuntimeFormDefinition,
} from '../src';

// ---------------------------------------------------------------------------
// InferFormValues
// ---------------------------------------------------------------------------
describe('InferFormValues', () => {
  test('resolves concrete form values from field defaultValues', () => {
    type T = InferFormValues<{
      readonly fields: {
        readonly name: { readonly type: FieldDataType.String; readonly defaultValue: string };
        readonly age: { readonly type: FieldDataType.Number; readonly defaultValue: number };
        readonly active: { readonly type: FieldDataType.Boolean; readonly defaultValue: boolean };
      };
    }>;

    expectTypeOf<T>().toEqualTypeOf<{
      readonly name: string;
      readonly age: number;
      readonly active: boolean;
    }>();
  });
});

// ---------------------------------------------------------------------------
// TgbFormTanStackOutput — onSubmit is StandardSchemaV1 (not intersected with fn)
// ---------------------------------------------------------------------------
describe('TgbFormTanStackOutput', () => {
  test('onSubmit is a StandardSchemaV1', () => {
    const form = defineForm({
      fields: {
        email: { type: FieldDataType.String, defaultValue: '' },
      },
    });

    const options = toTanStackOptions(form);
    expectTypeOf(options.validators.onSubmit).toExtend<StandardSchemaV1>();
  });
});

// ---------------------------------------------------------------------------
// serializeForm — strips runtime-only properties
// ---------------------------------------------------------------------------
describe('serializeForm', () => {
  test('output equals FormDefinition exactly (no runtime props)', () => {
    const validators = createValidatorRegistry();
    const renderers = createRendererRegistry({});

    const form = defineForm(
      {
        fields: {
          x: { type: FieldDataType.String, defaultValue: '' },
        },
      },
      { validators, renderers },
    );

    // Input has runtime-only properties
    expectTypeOf(form).toExtend<RuntimeFormDefinition>();

    // Serialized output matches FormDefinition
    const serialized = serializeForm(form);
    expectTypeOf(serialized).toEqualTypeOf<FormDefinition>();
  });
});

// ---------------------------------------------------------------------------
// deserializeForm — returns RuntimeFormDefinition
// ---------------------------------------------------------------------------
describe('deserializeForm', () => {
  test('returns RuntimeFormDefinition with registries', () => {
    const renderers = createRendererRegistry({});
    const raw = JSON.stringify({
      fields: { name: { type: FieldDataType.String, defaultValue: '' } },
    });

    const form = deserializeForm(raw, { renderers });
    expectTypeOf(form).toExtend<RuntimeFormDefinition>();
  });

  test('returns RuntimeFormDefinition from unknown input', () => {
    const form = deserializeForm({ fields: {} });
    expectTypeOf(form).toExtend<RuntimeFormDefinition>();
  });
});

// ---------------------------------------------------------------------------
// defineForm — returns correct type with/without registries
// ---------------------------------------------------------------------------
describe('defineForm', () => {
  test('returns RuntimeFormDefinition with both registries', () => {
    const validators = createValidatorRegistry();
    const renderers = createRendererRegistry({});

    const form = defineForm(
      {
        fields: {
          name: { type: FieldDataType.String, defaultValue: '' },
        },
      },
      { validators, renderers },
    );

    expectTypeOf(form).toExtend<RuntimeFormDefinition>();
  });

  test('returns plain FormDefinition without registries', () => {
    const form = defineForm({
      fields: {
        name: { type: FieldDataType.String, defaultValue: '' },
      },
    });

    expectTypeOf(form).toExtend<FormDefinition>();
  });
});

// ---------------------------------------------------------------------------
// createRendererRegistry — preserves literal type keys
// ---------------------------------------------------------------------------
describe('createRendererRegistry literal types', () => {
  test('preserves named renderer keys', () => {
    const registry = createRendererRegistry({
      byName: { email: Symbol('email'), text: Symbol('text') },
    });

    expectTypeOf(registry.byName.email).toExtend<symbol>();
    expectTypeOf(registry.byName.text).toExtend<symbol>();
  });

  test('preserves type renderer keys', () => {
    const registry = createRendererRegistry({
      byType: { [FieldDataType.String]: Symbol('str') },
    });

    expectTypeOf(registry.byType[FieldDataType.String]).toExtend<symbol | undefined>();
  });
});

// ---------------------------------------------------------------------------
// FormDefinitionInput — component name narrowing with renderer registry
// ---------------------------------------------------------------------------
describe('component name narrowing', () => {
  test('allows known component names when registry is provided', () => {
    const registry = createRendererRegistry({
      byName: { known: Symbol('known') },
    });

    defineForm(
      {
        fields: {
          name: {
            type: FieldDataType.String,
            defaultValue: '',
            component: 'known',
          },
        },
      },
      { renderers: registry },
    );
  });

  test('rejects unknown component names when registry is provided', () => {
    const registry = createRendererRegistry({
      byName: { known: Symbol('known') },
    });

    defineForm(
      {
        fields: {
          name: {
            type: FieldDataType.String,
            defaultValue: '',
            // @ts-expect-error: 'unknown' is not in the known component names
            component: 'unknown',
          },
        },
      },
      { renderers: registry },
    );
  });

  test('accepts any component name without registry', () => {
    defineForm({
      fields: {
        name: {
          type: FieldDataType.String,
          defaultValue: '',
          component: 'anything-goes',
        },
      },
    });
  });
});

// ---------------------------------------------------------------------------
// Valibot schema is Standard Schema V1 compliant (justifies the sole cast)
// ---------------------------------------------------------------------------
describe('valibot Standard Schema V1 compliance', () => {
  test('valibot schema has ~standard with correct shape', () => {
    const form = defineForm({
      fields: {
        email: { type: FieldDataType.String, defaultValue: '' },
      },
    });

    const schema = toValibotSchema(form) as v.BaseSchema<unknown, unknown, v.BaseIssue<unknown>>;

    expectTypeOf(schema).toHaveProperty('~standard');
    expectTypeOf(schema['~standard'].version).toEqualTypeOf<1>();
    expectTypeOf(schema['~standard'].vendor).toEqualTypeOf<'valibot'>();
    expectTypeOf(schema['~standard'].validate).toExtend<Function>();
  });

  test('valibot BaseSchema is compatible with StandardSchemaV1<unknown, unknown>', () => {
    type ValibotSchema = v.BaseSchema<unknown, unknown, v.BaseIssue<unknown>>;

    // Structural check: valibot's ~standard matches StandardSchemaV1Props
    expectTypeOf<ValibotSchema>().toExtend<StandardSchemaV1<unknown, unknown>>();
  });
});

// ---------------------------------------------------------------------------
// resolveRenderer — returns correct union type from registry
// ---------------------------------------------------------------------------
describe('resolveRenderer return type', () => {
  test('returns union of all renderer values', () => {
    const registry = createRendererRegistry({
      byName: { a: 'A' as const },
      byType: { [FieldDataType.Number]: 42 as const },
    });

    const field: FieldDefinition = {
      type: FieldDataType.Number,
      defaultValue: 0,
      component: 'a',
    };

    const renderer = resolveRenderer(field, registry);
    expectTypeOf(renderer).toMatchTypeOf<'A' | 42>();
  });
});

// ---------------------------------------------------------------------------
// cloneJson — preserves input type
// ---------------------------------------------------------------------------
describe('cloneJson type preservation', () => {
  test('returns the same type as input', () => {
    expectTypeOf(cloneJson({ a: 1 } as const)).toEqualTypeOf<{ readonly a: 1 }>();
    expectTypeOf(cloneJson([1, 2, 3])).toEqualTypeOf<number[]>();
    expectTypeOf(cloneJson('hello')).toEqualTypeOf<'hello'>();
  });
});

// ---------------------------------------------------------------------------
// getDefaultValues — mapped type correctness
// ---------------------------------------------------------------------------
describe('getDefaultValues mapped type', () => {
  test('includes only defined field keys', () => {
    const form = defineForm({
      fields: {
        a: { type: FieldDataType.String, defaultValue: '' },
        b: { type: FieldDataType.Number, defaultValue: 0 },
      },
    });

    const values = getDefaultValues(form);
    expectTypeOf(values).toHaveProperty('a').toEqualTypeOf<JsonValue>();
    expectTypeOf(values).toHaveProperty('b').toEqualTypeOf<JsonValue>();
  });
});

// ---------------------------------------------------------------------------
// FormDefinitionInput is structurally broader than FormDefinition
// ---------------------------------------------------------------------------
describe('FormDefinitionInput / FormDefinition relationship', () => {
  test('FormDefinition is assignable to FormDefinitionInput<string>', () => {
    // This relationship must hold for deserializeForm to work without casts.
    // FormDefinitionInput<string> has optional component/element/fields
    // which are compatible with FormDefinition's properties.
    const form: FormDefinition = {
      fields: {
        name: {
          type: FieldDataType.String,
          defaultValue: '',
        },
      },
    };

    // This assignment should compile:
    const _input: FormDefinitionInput<string> = form;
    void _input;
  });
});

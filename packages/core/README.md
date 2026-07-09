# @easyform/core

Portable form definitions for TanStack Form and Valibot.

`@easyform/core` owns the data layer: JSON-safe schemas, validation rules, serialization, renderer keys, custom validator references, and TanStack-compatible options. Framework packages render those definitions.

## Quick Start

```ts
import {
  defineForm,
  deserializeForm,
  FieldDataType,
  serializeForm,
  toTanStackOptions,
  toValibotSchema,
  ValidationRuleKind,
} from '@easyform/core';

const form = defineForm({
  fields: {
    email: {
      type: FieldDataType.String,
      defaultValue: '',
      label: 'Email',
      component: 'email-input',
      props: { autocomplete: 'email' },
      rules: [
        { kind: ValidationRuleKind.Required, message: 'Email is required' },
        { kind: ValidationRuleKind.Email, message: 'Enter a valid email' },
      ],
    },
    subscribed: {
      type: FieldDataType.Boolean,
      defaultValue: true,
      label: 'Subscribe',
    },
  },
});

const stored = JSON.stringify(serializeForm(form));
const restored = deserializeForm(stored);
const schema = toValibotSchema(restored);
const tanstackOptions = toTanStackOptions(restored);
```

## APIs

| API                                 | Purpose                                                              |
| ----------------------------------- | -------------------------------------------------------------------- |
| `defineForm(definition, options?)`  | Parse, validate, normalize, and clone a form definition.             |
| `serializeForm(form)`               | Return JSON-safe data and omit runtime-only registries.              |
| `deserializeForm(input, options?)`  | Parse a JSON string or unknown value into a normalized runtime form. |
| `toValibotSchema(form)`             | Compile the form into a Valibot object schema.                       |
| `toTanStackOptions(form, options?)` | Generate default values and `validators.onSubmit` for TanStack Form. |
| `getDefaultValues(form)`            | Extract cloned default values from each field.                       |
| `createRendererRegistry(registry)`  | Create named and type-based renderer lookup tables.                  |
| `resolveRenderer(field, registry)`  | Resolve a field renderer by `component`, then by field type.         |
| `createValidatorRegistry()`         | Register named custom validators used by JSON definitions.           |

## Renderer Keys

Core stores renderer keys, not framework components.

```ts
import { createRendererRegistry, FieldDataType, resolveRenderer } from '@easyform/core';

const renderers = createRendererRegistry({
  byName: {
    'email-input': EmailInput,
  },
  byType: {
    [FieldDataType.String]: TextInput,
    [FieldDataType.Boolean]: CheckboxInput,
  },
});

const Renderer = resolveRenderer(form.fields.email, renderers);
```

An explicit `component` must exist in `byName`. Fields without `component` fall back to `byType[field.type]`.

## Custom Validators

Custom validators keep code out of JSON. The definition stores a name; runtime code supplies the Valibot compiler.

```ts
import * as v from 'valibot';
import { createValidatorRegistry, defineForm, FieldDataType } from '@easyform/core';

const validators = createValidatorRegistry().register('companyEmail', ({ message }) =>
  v.check((value: string) => value.endsWith('@example.com'), message),
);

const form = defineForm(
  {
    fields: {
      email: {
        type: FieldDataType.String,
        defaultValue: '',
        validators: [{ name: 'companyEmail', message: 'Use a company email' }],
      },
    },
  },
  { validators },
);
```

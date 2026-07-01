# @easyform/core

Headless, JSON-serializable form definitions for building form builders on top of Valibot and TanStack Form Core.

## Form Definitions

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
      rules: [{ kind: ValidationRuleKind.Required }, { kind: ValidationRuleKind.Email }],
    },
    subscribed: {
      type: FieldDataType.Boolean,
      defaultValue: false,
    },
  },
});

const json = serializeForm(form);
const restored = deserializeForm(json);
const schema = toValibotSchema(restored);
const tanstackOptions = toTanStackOptions(restored);
```

## Custom Validators

Custom validators are referenced by name in JSON and resolved from code.

```ts
import * as v from 'valibot';
import { createValidatorRegistry, defineForm, FieldDataType } from '@easyform/core';

const validators = createValidatorRegistry().register('uniqueEmail', ({ message }) =>
  v.check((value: string) => value.endsWith('@example.com'), message),
);

const form = defineForm(
  {
    fields: {
      email: {
        type: FieldDataType.String,
        defaultValue: '',
        validators: [{ name: 'uniqueEmail', message: 'Use a company email' }],
      },
    },
  },
  { validators },
);
```

## Renderer Keys

Core stores renderer keys only. React and Vue adapters can map those keys to user components.

```ts
import { createRendererRegistry, resolveRenderer } from '@easyform/core';

const registry = createRendererRegistry({
  byName: {
    'email-input': EmailInput,
  },
  byType: {
    string: TextInput,
    boolean: CheckboxInput,
  },
});

const renderer = resolveRenderer(form.fields.email, registry);
```

Resolution is strict: an explicit `component` key must exist in `byName`; otherwise fields fall back to `byType`.

# @easyform/vue

Vue 3 adapter for EasyForm definitions. It renders an existing `@tanstack/vue-form` form instance with Vue renderer components. This package uses the Vue 3 Composition API and does not add `vue-demi` as a direct dependency.

```ts
import { defineForm, FieldDataType, toTanStackOptions } from '@easyform/core';
import { useForm } from '@tanstack/vue-form';
import { EasyForm, createVueRendererRegistry } from '@easyform/vue';

const definition = defineForm({
  fields: {
    email: {
      type: FieldDataType.String,
      defaultValue: '',
      label: 'Email',
    },
  },
});

const renderers = createVueRendererRegistry({
  byType: {
    [FieldDataType.String]: EmailRenderer,
  },
});

const form = useForm(toTanStackOptions(definition));
```

```vue
<EasyForm :form="form" :definition="definition" :renderers="renderers" />
```

## Public API

- `EasyForm`
- `EasyField`
- `createVueRendererRegistry`
- `EasyFormProps`
- `EasyFieldProps`
- `VueRenderer`
- `VueRendererProps`

`EasyForm` accepts the form instance returned by `useForm` from `@tanstack/vue-form`:

```ts
const form = useForm(toTanStackOptions(definition));
```

`EasyField` renders through `form.Field` and passes `name`, `field`, `form`, `label`, `description`, `props`, `value`, and `errors` to the resolved renderer. Validation remains owned by the supplied form instance.

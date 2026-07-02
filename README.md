# EasyForm

EasyForm is a schema-first form definition toolkit for teams that want form builders, generated UIs, and runtime validation without locking field definitions to one framework.

Definitions are plain JSON-safe data. The core package validates and normalizes those definitions, compiles them to Valibot, produces TanStack Form options, and lets React or Vue renderers resolve field definitions through registries.

## Packages

- `@easyform/core` - JSON-serializable form definitions, validation rules, custom validator registries, renderer registries, Valibot compilation, and TanStack Form options.
- `@easyform/react` - React adapter package for EasyForm renderer work.
- `@easyform/vue` - Vue adapter package for EasyForm renderer work.
- `@easyform/docs` - TanStack Start and Fumadocs documentation app.

## Install

```sh
pnpm add @easyform/core valibot @tanstack/form-core
```

Framework adapters are installed alongside the core package when you need them:

```sh
pnpm add @easyform/react
pnpm add @easyform/vue
```

## Quick Example

```ts
import { defineForm, FieldDataType, toTanStackOptions, ValidationRuleKind } from '@easyform/core';

const newsletterForm = defineForm({
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
      label: 'Subscribe me',
    },
  },
});

const tanstackOptions = toTanStackOptions(newsletterForm, {
  formId: 'newsletter',
});
```

## Documentation

The docs live in `apps/docs/content/docs` and cover:

- Getting started
- Form definitions
- Validation
- TanStack Form integration
- Renderer registries
- Custom validators
- JSON serialization and deserialization
- React and Vue adapter guidance
- API reference

Run the docs app locally:

```sh
pnpm --filter @easyform/docs dev
```

## Development

Install dependencies:

```sh
pnpm install
```

Run tests and type checks:

```sh
pnpm test
pnpm check-types
```

Build all packages and apps:

```sh
pnpm build
```

## Repository

- GitHub: https://github.com/VueEasyForm/easyform
- Issues: https://github.com/VueEasyForm/easyform/issues
- License: MIT

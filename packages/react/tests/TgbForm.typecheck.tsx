import { defineForm, FieldDataType } from '@tgb-form/core';
import { TgbForm } from '../src/TgbForm';

const definition = defineForm({
  fields: {
    profile: {
      type: FieldDataType.Object,
      defaultValue: { email: 'ada@example.com' },
      fields: {
        email: { type: FieldDataType.String, defaultValue: 'ada@example.com' },
      },
    },
    age: { type: FieldDataType.Number, defaultValue: 30 },
  },
});

// JSX must infer the exact mutable form shape from `definition` for onSubmit.
const element = (
  <TgbForm
    definition={definition}
    tanstackOptions={{
      onSubmit: ({ value }) => {
        value.profile.email = 'grace@example.com';
        value.age += 1;

        // @ts-expect-error: inferred numeric values cannot be assigned strings.
        value.age = 'not a number';
      },
    }}
  />
);

void element;

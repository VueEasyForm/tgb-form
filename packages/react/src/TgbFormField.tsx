import { resolveRenderer, type FieldDefinition } from '@tgb-form/core';
import { useTgbFormInstance, useTgbFormRegistry } from './TgbFormContext';
import type { ReactRendererField } from './types';
import type { ReactRendererRegistry } from './types';

export type TgbFormFieldProps = {
  readonly name: string;
  readonly field: FieldDefinition;
  readonly renderers?: ReactRendererRegistry | undefined;
};

export function TgbFormField({ name, field, renderers: propRenderers }: TgbFormFieldProps) {
  const form = useTgbFormInstance();
  const ctx = useTgbFormRegistry();
  const renderers = propRenderers ?? ctx?.renderers;

  if (!form) {
    throw new Error('TgbFormField must be used inside a TgbForm component');
  }

  if (!renderers) {
    throw new Error(
      'No renderer registry found. Pass a renderers prop to TgbFormField or to the parent TgbForm.',
    );
  }

  const Field = form.Field;
  const Renderer = resolveRenderer(field, renderers);

  return (
    <Field name={name}>
      {(boundField) => {
        // @ts-expect-error: FieldApi generics ~ ReactRendererField structurally
        const fieldApi: ReactRendererField = boundField;

        return (
          <Renderer
            description={field.description}
            errors={fieldApi.state.meta.errors ?? []}
            field={fieldApi}
            form={form}
            label={field.label}
            name={name}
            props={field.props}
            value={fieldApi.state.value}
          />
        );
      }}
    </Field>
  );
}

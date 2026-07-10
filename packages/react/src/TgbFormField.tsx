import { resolveRenderer, type FieldDefinition } from '@tgb-form/core';
import { useTgbFormInstance, useTgbFormRegistry } from './TgbFormContext';
import type { ReactRenderer } from './types';
import type { ReactRendererRegistry } from './types';

type FieldState = {
  readonly value?: unknown;
  readonly meta?: {
    readonly errors?: readonly unknown[];
  };
};

type BoundField = {
  readonly state?: FieldState;
};

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
  const Renderer = resolveRenderer(field, renderers) as ReactRenderer;

  return (
    <Field name={name}>
      {(boundField: unknown) => {
        const fieldState = (boundField as BoundField).state;

        return (
          <Renderer
            description={field.description}
            errors={fieldState?.meta?.errors ?? []}
            field={boundField}
            form={form}
            label={field.label}
            name={name}
            props={field.props}
            value={fieldState?.value}
          />
        );
      }}
    </Field>
  );
}

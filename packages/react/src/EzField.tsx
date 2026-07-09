import { resolveRenderer, type FieldDefinition } from '@easyform/core';
import { useEzFormInstance, useEzFormRegistry } from './EzFormContext';
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

export type EzFieldProps = {
  readonly name: string;
  readonly field: FieldDefinition;
  readonly renderers?: ReactRendererRegistry | undefined;
};

export function EzField({ name, field, renderers: propRenderers }: EzFieldProps) {
  const form = useEzFormInstance();
  const ctx = useEzFormRegistry();
  const renderers = propRenderers ?? ctx?.renderers;

  if (!form) {
    throw new Error('EzField must be used inside an EzForm component');
  }

  if (!renderers) {
    throw new Error(
      'No renderer registry found. Pass a renderers prop to EzField or to the parent EzForm.',
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

import type { FieldDefinition } from './schema';
import { FieldDataType } from './schema';

/**
 * Registry used by framework adapters to resolve {@link FieldDefinition} values to user components.
 */
export type RendererRegistry<
  TByName extends Readonly<Record<string, unknown>> = Readonly<Record<string, unknown>>,
  TByType extends Partial<Readonly<Record<FieldDataType, unknown>>> = Partial<
    Readonly<Record<FieldDataType, unknown>>
  >,
> = {
  readonly byName: TByName;
  readonly byType: TByType;
};

type ResolvedRenderer<TRegistry extends RendererRegistry> = Exclude<
  TRegistry['byName'][keyof TRegistry['byName']] | TRegistry['byType'][keyof TRegistry['byType']],
  undefined
>;

/**
 * Creates a {@link RendererRegistry} while preserving literal renderer names for type checking.
 */
export function createRendererRegistry<
  const TByName extends Readonly<Record<string, unknown>> = {},
  const TByType extends Partial<Readonly<Record<FieldDataType, unknown>>> = {},
>(registry: {
  readonly byName?: TByName;
  readonly byType?: TByType;
}): RendererRegistry<TByName, TByType> {
  return {
    byName: { ...registry.byName },
    byType: { ...registry.byType },
  } as RendererRegistry<TByName, TByType>;
}

/**
 * Resolves a {@link FieldDefinition} renderer by explicit component name first, then by {@link FieldDataType}.
 *
 * Missing explicit component names throw instead of falling back to type renderers.
 */
export function resolveRenderer<const TRegistry extends RendererRegistry>(
  field: FieldDefinition,
  registry: TRegistry,
): ResolvedRenderer<TRegistry> {
  if (field.component) {
    const namedRenderer = registry.byName[field.component];
    if (namedRenderer === undefined) {
      throw new Error(`Missing renderer named "${field.component}"`);
    }
    return namedRenderer as ResolvedRenderer<TRegistry>;
  }

  const typeRenderer = registry.byType[field.type];
  if (typeRenderer === undefined) {
    throw new Error(`Missing renderer for field type "${field.type}"`);
  }

  return typeRenderer as ResolvedRenderer<TRegistry>;
}

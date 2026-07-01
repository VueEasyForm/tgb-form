import type * as v from 'valibot';
import type { CustomValidatorReference } from './schema';

/**
 * Valibot pipe item returned by {@link ValidatorCompiler}.
 */
export type ValibotValidationItem = v.GenericPipeItem;

/**
 * Data passed to a named {@link ValidatorCompiler}.
 */
export type ValidatorCompilerContext = {
  readonly name: string;
  readonly message?: string;
  readonly options?: Record<string, unknown>;
};

/**
 * Converts a {@link CustomValidatorReference} into one or more {@link ValibotValidationItem} values.
 */
export type ValidatorCompiler = (
  context: ValidatorCompilerContext,
) => ValibotValidationItem | readonly ValibotValidationItem[];

/**
 * Runtime-only registry for {@link CustomValidatorReference} values referenced by name in JSON.
 */
export type ValidatorRegistry = {
  readonly register: (name: string, compiler: ValidatorCompiler) => ValidatorRegistry;
  readonly get: (name: string) => ValidatorCompiler | undefined;
  readonly has: (name: string) => boolean;
  readonly names: () => readonly string[];
};

/**
 * Creates a mutable {@link ValidatorRegistry} for code-defined custom validators.
 */
export function createValidatorRegistry(
  entries: Record<string, ValidatorCompiler> = {},
): ValidatorRegistry {
  const compilers = new Map(Object.entries(entries));

  const registry: ValidatorRegistry = {
    register(name, compiler) {
      compilers.set(name, compiler);
      return registry;
    },
    get(name) {
      return compilers.get(name);
    },
    has(name) {
      return compilers.has(name);
    },
    names() {
      return [...compilers.keys()];
    },
  };

  return registry;
}

export function compileCustomValidators(
  references: readonly CustomValidatorReference[] | undefined,
  registry: ValidatorRegistry | undefined,
): ValibotValidationItem[] {
  if (!references?.length) return [];

  return references.flatMap((reference) => {
    const compiler = registry?.get(reference.name);
    if (!compiler) {
      throw new Error(`Unknown validator "${reference.name}"`);
    }

    const compiled = compiler({
      name: reference.name,
      message: reference.message,
      options: reference.options,
    });

    return Array.isArray(compiled) ? [...compiled] : [compiled];
  });
}

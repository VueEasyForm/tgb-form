import * as v from 'valibot';

/**
 * Primitive value allowed inside {@link JsonValue}.
 */
export type JsonPrimitive = string | number | boolean | null;

/**
 * Any JSON-serializable value accepted by {@link VJsonValue}.
 */
export type JsonValue = JsonPrimitive | JsonObject | JsonValue[];

/**
 * JSON object used for metadata, renderer props, and {@link CustomValidatorReference} options.
 */
export type JsonObject = {
  /**
   * JSON-serializable property value keyed by string.
   */
  readonly [key: string]: JsonValue;
};

/**
 * Valibot schema for any {@link JsonValue}.
 */
export const VJsonValue = v.custom<JsonValue>(isJsonValue, 'Value must be JSON-serializable');

/**
 * Valibot schema for {@link JsonObject}.
 */
export const VJsonObject = v.custom<JsonObject>(isJsonObject, 'Value must be a JSON object');

/**
 * Deep-clones a {@link JsonValue} so normalized definitions do not share caller-owned references.
 */
export function cloneJson<T extends JsonValue>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

/**
 * Returns true when a value is a {@link JsonObject}, excluding arrays and null.
 */
export function isJsonObject(value: unknown): value is JsonObject {
  return typeof value === 'object' && value !== null && !Array.isArray(value) && isJsonValue(value);
}

function isJsonValue(value: unknown): value is JsonValue {
  if (
    value === null ||
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean'
  ) {
    return true;
  }

  if (Array.isArray(value)) {
    return value.every(isJsonValue);
  }

  if (typeof value === 'object' && value !== null) {
    return Object.values(value).every(isJsonValue);
  }

  return false;
}

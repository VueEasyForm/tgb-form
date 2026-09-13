import { FieldDataType } from './enums';
import type { FieldDefinition, FormDefinition, FormFieldsDefinition } from './definitions';
import type { JsonObject, JsonValue } from './json';

/**
 * Maps a single {@link FieldDefinition} to the runtime value type it stores,
 * recursing into nested object fields and array elements.
 */
export type InferFieldValue<TField extends FieldDefinition> = TField extends {
  readonly type: FieldDataType.String;
}
  ? string
  : TField extends { readonly type: FieldDataType.Number }
    ? number
    : TField extends { readonly type: FieldDataType.Boolean }
      ? boolean
      : TField extends {
            readonly type: FieldDataType.Object;
            readonly fields: infer TInner extends FormFieldsDefinition;
          }
        ? {
            -readonly [TKey in keyof TInner]: InferFieldValue<TInner[TKey]>;
          }
        : TField extends { readonly type: FieldDataType.Object }
          ? JsonObject
          : TField extends {
                readonly type: FieldDataType.Array;
                readonly element: infer TElement extends FieldDefinition;
              }
            ? InferFieldValue<TElement>[]
            : TField extends { readonly type: FieldDataType.Array }
              ? JsonValue[]
              : JsonValue;

/**
 * Infers the runtime form values shape from each field's {@link FieldDataType},
 * preserving literal keys on code-defined forms.
 */
export type InferFormValues<TForm extends FormDefinition> = {
  -readonly [TKey in keyof TForm['fields']]: InferFieldValue<TForm['fields'][TKey]>;
};

---
editUrl: false
next: false
prev: false
title: "ValidationRule"
---

> **ValidationRule** = \{ `kind`: [`Required`](/api/core/src/enumerations/validationrulekind/#required); `message?`: `string`; \} \| \{ `kind`: [`MinLength`](/api/core/src/enumerations/validationrulekind/#minlength) \| [`MaxLength`](/api/core/src/enumerations/validationrulekind/#maxlength) \| [`Min`](/api/core/src/enumerations/validationrulekind/#min) \| [`Max`](/api/core/src/enumerations/validationrulekind/#max); `message?`: `string`; `value`: `number`; \} \| \{ `kind`: [`Pattern`](/api/core/src/enumerations/validationrulekind/#pattern); `message?`: `string`; `value`: `string`; \} \| \{ `kind`: [`Email`](/api/core/src/enumerations/validationrulekind/#email) \| [`Url`](/api/core/src/enumerations/validationrulekind/#url); `message?`: `string`; \}

Defined in: [core/src/schema/rules.ts:8](https://github.com/VueEasyForm/tgb-form/blob/116ebfe00d30a36ed6447b9ac893611229bfde62/packages/core/src/schema/rules.ts#L8)

A built-in validation rule that can round-trip through JSON and compile via [toValibotSchema](/api/core/src/functions/tovalibotschema/).

## Union Members

### Type Literal

\{ `kind`: [`Required`](/api/core/src/enumerations/validationrulekind/#required); `message?`: `string`; \}

#### kind

> `readonly` **kind**: [`Required`](/api/core/src/enumerations/validationrulekind/#required)

Identifies this rule as a required-value check.

#### message?

> `readonly` `optional` **message?**: `string`

Optional message shown when the required-value check fails.

***

### Type Literal

\{ `kind`: [`MinLength`](/api/core/src/enumerations/validationrulekind/#minlength) \| [`MaxLength`](/api/core/src/enumerations/validationrulekind/#maxlength) \| [`Min`](/api/core/src/enumerations/validationrulekind/#min) \| [`Max`](/api/core/src/enumerations/validationrulekind/#max); `message?`: `string`; `value`: `number`; \}

#### kind

> `readonly` **kind**: [`MinLength`](/api/core/src/enumerations/validationrulekind/#minlength) \| [`MaxLength`](/api/core/src/enumerations/validationrulekind/#maxlength) \| [`Min`](/api/core/src/enumerations/validationrulekind/#min) \| [`Max`](/api/core/src/enumerations/validationrulekind/#max)

Identifies this rule as a numeric or string-length boundary check.

#### message?

> `readonly` `optional` **message?**: `string`

Optional message shown when the boundary check fails.

#### value

> `readonly` **value**: `number`

Boundary value used by the selected rule kind.

***

### Type Literal

\{ `kind`: [`Pattern`](/api/core/src/enumerations/validationrulekind/#pattern); `message?`: `string`; `value`: `string`; \}

#### kind

> `readonly` **kind**: [`Pattern`](/api/core/src/enumerations/validationrulekind/#pattern)

Identifies this rule as a regular expression pattern check.

#### message?

> `readonly` `optional` **message?**: `string`

Optional message shown when the pattern check fails.

#### value

> `readonly` **value**: `string`

Regular expression source string used for the pattern check.

***

### Type Literal

\{ `kind`: [`Email`](/api/core/src/enumerations/validationrulekind/#email) \| [`Url`](/api/core/src/enumerations/validationrulekind/#url); `message?`: `string`; \}

#### kind

> `readonly` **kind**: [`Email`](/api/core/src/enumerations/validationrulekind/#email) \| [`Url`](/api/core/src/enumerations/validationrulekind/#url)

Identifies this rule as a built-in string format check.

#### message?

> `readonly` `optional` **message?**: `string`

Optional message shown when the format check fails.

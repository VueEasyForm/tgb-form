---
editUrl: false
next: false
prev: false
title: "ValidationRuleKind"
---

Defined in: [core/src/schema/enums.ts:20](https://github.com/VueEasyForm/tgb-form/blob/397eda42c5611a90c55569ab63ad273a22ef9b8c/packages/core/src/schema/enums.ts#L20)

Built-in validation rules used by [ValidationRule](/api/core/src/type-aliases/validationrule/).

## Enumeration Members

### Email

> **Email**: `"email"`

Defined in: [core/src/schema/enums.ts:34](https://github.com/VueEasyForm/tgb-form/blob/397eda42c5611a90c55569ab63ad273a22ef9b8c/packages/core/src/schema/enums.ts#L34)

Requires a string to be formatted as an email address.

***

### Max

> **Max**: `"max"`

Defined in: [core/src/schema/enums.ts:32](https://github.com/VueEasyForm/tgb-form/blob/397eda42c5611a90c55569ab63ad273a22ef9b8c/packages/core/src/schema/enums.ts#L32)

Requires a number to be less than or equal to the configured maximum.

***

### MaxLength

> **MaxLength**: `"maxLength"`

Defined in: [core/src/schema/enums.ts:26](https://github.com/VueEasyForm/tgb-form/blob/397eda42c5611a90c55569ab63ad273a22ef9b8c/packages/core/src/schema/enums.ts#L26)

Requires a string to contain no more than the configured number of characters.

***

### Min

> **Min**: `"min"`

Defined in: [core/src/schema/enums.ts:30](https://github.com/VueEasyForm/tgb-form/blob/397eda42c5611a90c55569ab63ad273a22ef9b8c/packages/core/src/schema/enums.ts#L30)

Requires a number to be greater than or equal to the configured minimum.

***

### MinLength

> **MinLength**: `"minLength"`

Defined in: [core/src/schema/enums.ts:24](https://github.com/VueEasyForm/tgb-form/blob/397eda42c5611a90c55569ab63ad273a22ef9b8c/packages/core/src/schema/enums.ts#L24)

Requires a string to contain at least the configured number of characters.

***

### Pattern

> **Pattern**: `"pattern"`

Defined in: [core/src/schema/enums.ts:28](https://github.com/VueEasyForm/tgb-form/blob/397eda42c5611a90c55569ab63ad273a22ef9b8c/packages/core/src/schema/enums.ts#L28)

Requires a string to match the configured regular expression pattern.

***

### Required

> **Required**: `"required"`

Defined in: [core/src/schema/enums.ts:22](https://github.com/VueEasyForm/tgb-form/blob/397eda42c5611a90c55569ab63ad273a22ef9b8c/packages/core/src/schema/enums.ts#L22)

Rejects empty strings, nullish values, and missing values.

***

### Url

> **Url**: `"url"`

Defined in: [core/src/schema/enums.ts:36](https://github.com/VueEasyForm/tgb-form/blob/397eda42c5611a90c55569ab63ad273a22ef9b8c/packages/core/src/schema/enums.ts#L36)

Requires a string to be formatted as a URL.

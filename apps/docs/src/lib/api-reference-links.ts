const apiReferenceSymbolLinks = {
  'CustomValidatorReference.options':
    '/docs/api-reference#type-table-rules.ts-CustomValidatorReference-options',
  'FieldDefinition.defaultValue':
    '/docs/api-reference#type-table-definitions.ts-FieldDefinition-defaultValue',
  CustomValidatorReference: '/docs/api-reference#type-table-rules.ts-CustomValidatorReference',
  FieldDefinition: '/docs/api-reference#type-table-definitions.ts-FieldDefinition',
  FieldDefinitionInput: '/docs/api-reference#type-table-form.ts-FieldDefinitionInput',
  FieldDataType: '/docs/api-reference#enums',
  FormDefinition: '/docs/api-reference#type-table-definitions.ts-FormDefinition',
  FormDefinitionInput: '/docs/api-reference#type-table-form.ts-FormDefinitionInput',
  FormFieldsDefinition: '/docs/api-reference#type-table-definitions.ts-FormFieldsDefinition',
  InferFormValues: '/docs/api-reference#type-table-tanstack.ts-InferFormValues',
  JsonObject: '/docs/api-reference#type-table-json.ts-JsonObject',
  JsonValue: '/docs/api-reference#type-table-json.ts-JsonValue',
  RendererRegistry: '/docs/api-reference#type-table-renderer-registry.ts-RendererRegistry',
  RuntimeFormDefinition: '/docs/api-reference#type-table-form.ts-RuntimeFormDefinition',
  ValidationRule: '/docs/api-reference#type-table-rules.ts-ValidationRule',
  ValidationRuleKind: '/docs/api-reference#enums',
  ValidatorCompiler: '/docs/api-reference#type-table-validator-registry.ts-ValidatorCompiler',
  ValidatorCompilerContext:
    '/docs/api-reference#type-table-validator-registry.ts-ValidatorCompilerContext',
  ValidatorRegistry: '/docs/api-reference#type-table-validator-registry.ts-ValidatorRegistry',
  getDefaultValues: '/docs/api-reference#functions',
  toTanStackOptions: '/docs/api-reference#functions',
  toValibotSchema: '/docs/api-reference#functions',
} as const;

const orderedApiReferenceSymbolLinks = Object.entries(apiReferenceSymbolLinks).sort(
  ([left], [right]) => right.length - left.length,
);

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getApiReferenceLink(symbol: string): string | undefined {
  return apiReferenceSymbolLinks[symbol as keyof typeof apiReferenceSymbolLinks];
}

export function linkApiReferenceSymbols(text: string): string {
  let output = text;

  for (const [symbol, href] of orderedApiReferenceSymbolLinks) {
    output = output.replace(
      new RegExp(`\\b${escapeRegExp(symbol)}\\b`, 'g'),
      `[${symbol}](${href})`,
    );
  }

  return output;
}

export function rewriteJsdocLinks(text: string): string {
  return text.replace(/\{@link\s+([^}\s|]+)(?:\s*\|\s*([^}]+))?\s*\}/g, (_match, target, label) => {
    const href = getApiReferenceLink(target);
    const resolvedLabel = String(label ?? target).trim();

    if (!href) {
      return resolvedLabel;
    }

    return `[${resolvedLabel}](${href})`;
  });
}

export function preprocessApiReferenceMarkdown(text: string): string {
  return rewriteJsdocLinks(text);
}

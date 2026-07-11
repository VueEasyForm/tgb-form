import TgbFormComponent from './TgbForm.vue';
import TgbFormFieldComponent from './TgbFormField.vue';
import TgbFormProviderComponent from './TgbFormProvider.vue';

export const TgbForm = TgbFormComponent;
export const TgbFormField = TgbFormFieldComponent;
export const TgbFormProvider = TgbFormProviderComponent;

export { createVueRendererRegistry } from './types';
export { TgbFormRegistriesKey, TgbFormInstanceKey } from './context';
export type { TgbFormRegistries } from './context';
export type {
  BaseVueRendererProps,
  VueRenderer,
  VueRendererField,
  VueRendererProps,
  VueRendererRegistry,
  TgbFormTanStackForm,
} from './types';

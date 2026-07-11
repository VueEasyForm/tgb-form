import type { InjectionKey } from 'vue';
import type { VueRendererRegistry } from './types';

export type TgbFormRegistries = {
  renderers?: VueRendererRegistry;
};

export const TgbFormRegistriesKey: InjectionKey<TgbFormRegistries> = Symbol('tgb-form-registries');
export const TgbFormInstanceKey: InjectionKey<unknown> = Symbol('tgb-form-instance');

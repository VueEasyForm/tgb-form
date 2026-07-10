import { type InjectionKey, type PropType, defineComponent, provide } from 'vue';
import type { VueRendererRegistry } from './types';

export type TgbFormRegistries = {
  renderers?: VueRendererRegistry;
};

export const TgbFormRegistriesKey: InjectionKey<TgbFormRegistries> = Symbol('tgb-form-registries');
export const TgbFormInstanceKey: InjectionKey<unknown> = Symbol('tgb-form-instance');

export const TgbFormProvider = defineComponent({
  name: 'TgbFormProvider',
  props: {
    renderers: {
      type: Object as PropType<VueRendererRegistry>,
      default: undefined,
    },
  },
  setup(props, { slots }) {
    provide(TgbFormRegistriesKey, { renderers: props.renderers });

    return () => slots.default?.();
  },
});

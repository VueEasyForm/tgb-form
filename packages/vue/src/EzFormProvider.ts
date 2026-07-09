import { type InjectionKey, type PropType, defineComponent, provide } from 'vue';
import type { VueRendererRegistry } from './types';

export type EzFormRegistries = {
  renderers?: VueRendererRegistry;
};

export const EzFormRegistriesKey: InjectionKey<EzFormRegistries> = Symbol('ezform-registries');
export const EzFormInstanceKey: InjectionKey<unknown> = Symbol('ezform-instance');

export const EzFormProvider = defineComponent({
  name: 'EzFormProvider',
  props: {
    renderers: {
      type: Object as PropType<VueRendererRegistry>,
      default: undefined,
    },
  },
  setup(props, { slots }) {
    provide(EzFormRegistriesKey, { renderers: props.renderers });

    return () => slots.default?.();
  },
});
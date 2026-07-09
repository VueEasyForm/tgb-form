import { createContext, useContext } from 'react';
import type { ReactRendererRegistry, ReactEasyFormInstance } from './types';

export type EzFormRegistryContextValue = {
  renderers?: ReactRendererRegistry;
};

export const EzFormRegistryContext = createContext<EzFormRegistryContextValue | null>(null);

export const EzFormInstanceContext = createContext<ReactEasyFormInstance | null>(null);

export function useEzFormRegistry(): EzFormRegistryContextValue | null {
  return useContext(EzFormRegistryContext);
}

export function useEzFormInstance(): ReactEasyFormInstance | null {
  return useContext(EzFormInstanceContext);
}

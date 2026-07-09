import { createContext, useContext, type ReactNode } from 'react';
import type { ReactRendererRegistry, ReactEasyFormInstance } from './types';

// ── Registry context (root-level) ───────────────────────────────

export type EzFormRegistryContextValue = {
  readonly renderers?: ReactRendererRegistry | undefined;
};

export const EzFormRegistryContext = createContext<EzFormRegistryContextValue | null>(null);

export type EzFormContextProps = {
  readonly children: ReactNode;
  readonly renderers?: ReactRendererRegistry;
};

export function EzFormContext({ children, renderers }: EzFormContextProps) {
  return (
    <EzFormRegistryContext.Provider value={{ renderers }}>
      {children}
    </EzFormRegistryContext.Provider>
  );
}

// ── Form instance context (per-form, internal) ──────────────────

export const EzFormInstanceContext = createContext<ReactEasyFormInstance | null>(null);

export function useEzFormRegistry(): EzFormRegistryContextValue | null {
  return useContext(EzFormRegistryContext);
}

export function useEzFormInstance(): ReactEasyFormInstance | null {
  return useContext(EzFormInstanceContext);
}

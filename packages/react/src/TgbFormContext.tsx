import { createContext, useContext, type ReactNode } from 'react';
import type { ReactRendererRegistry, ReactTgbFormInstance } from './types';

// ── Registry context (root-level) ───────────────────────────────

export type TgbFormRegistryContextValue = {
  readonly renderers?: ReactRendererRegistry | undefined;
};

export const TgbFormRegistryContext = createContext<TgbFormRegistryContextValue | null>(null);

export type TgbFormContextProps = {
  readonly children: ReactNode;
  readonly renderers?: ReactRendererRegistry;
};

export function TgbFormContext({ children, renderers }: TgbFormContextProps) {
  return (
    <TgbFormRegistryContext.Provider value={{ renderers }}>
      {children}
    </TgbFormRegistryContext.Provider>
  );
}

// ── Form instance context (per-form, internal) ──────────────────

export const TgbFormInstanceContext = createContext<ReactTgbFormInstance | null>(null);

export function useTgbFormRegistry(): TgbFormRegistryContextValue | null {
  return useContext(TgbFormRegistryContext);
}

export function useTgbFormInstance(): ReactTgbFormInstance | null {
  return useContext(TgbFormInstanceContext);
}

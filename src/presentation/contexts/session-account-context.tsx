import { createContext, ReactNode, useContext, useMemo } from 'react';
import { AccountModel } from '@/domain/models';
import {
  getSessionAccountAdapter,
  setSessionAccountAdapter,
} from '@/main/adapters';

type SessionAccountContextData = {
  setSessionAccount: (account: AccountModel) => void;
  getSessionAccount: () => AccountModel;
};

type SessionAccountContextProviderParams = {
  children: ReactNode;
};

export const SessionAccountContext =
  createContext<SessionAccountContextData>(null);

export function SessionAccountContextProvider({
  children,
}: SessionAccountContextProviderParams) {
  const setSessionAccountState = useMemo(
    () => ({
      setSessionAccount: setSessionAccountAdapter,
      getSessionAccount: getSessionAccountAdapter,
    }),
    [],
  );

  return (
    <SessionAccountContext.Provider value={setSessionAccountState}>
      {children}
    </SessionAccountContext.Provider>
  );
}

export const useSessionAccount = (): SessionAccountContextData =>
  useContext(SessionAccountContext);

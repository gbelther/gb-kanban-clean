import { AccountModel } from '@/domain/models';
import { makeLocalStorageAdapter } from '../factories/cache';

export const setSessionAccountAdapter = (account: AccountModel): void => {
  makeLocalStorageAdapter().set('@GB-Kanban/session-account', account);
};

export const getSessionAccountAdapter = (): AccountModel =>
  makeLocalStorageAdapter().get('@GB-Kanban/session-account');

import { useCallback, useEffect } from 'react';
import { DevOpsAccount } from '../../api/types';
import { useDevOpsContext } from '../DevOpsContext';

const localStorageAccountKey = 'settings.account';
export const initialState: DevOpsAccount = {
  organization: '',
  project: '',
  pat: ''
};
export type useSettingsActionsResult = {
  devOpsAccount: DevOpsAccount;
  storeDevOpsAccount: (devOpsAccount: DevOpsAccount) => void;
  clearDevOpsAccount: () => void;
};
export const useSettingsActions = (): useSettingsActionsResult => {
  const {
    settings: { devOpsAccount, setDevOpsAccount }
  } = useDevOpsContext();

  useEffect(() => {
    const existing = localStorage.getItem(localStorageAccountKey);
    if (existing) {
      setDevOpsAccount(JSON.parse(existing));
    }
  }, [setDevOpsAccount]);

  const storeDevOpsAccount = useCallback((devOpsAccount: DevOpsAccount) => {
    setDevOpsAccount(devOpsAccount);
    localStorage.setItem(localStorageAccountKey, JSON.stringify(devOpsAccount));
  }, [setDevOpsAccount]);

  const clearDevOpsAccount = useCallback(() => {
    setDevOpsAccount(initialState);
    localStorage.removeItem(localStorageAccountKey);
  }, [setDevOpsAccount]);

  return {
    devOpsAccount,
    storeDevOpsAccount,
    clearDevOpsAccount
  };
};
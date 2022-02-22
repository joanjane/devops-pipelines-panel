import { useEffect, useState } from 'react';
import { DevOpsAccount } from '../../api/types';

export const devOpsAccountInitialState: DevOpsAccount = {
  organization: '',
  project: '',
  pat: ''
};

export const pipelinesFilterInitialState: PipelinesFilter = {
  folder: ''
};

type PipelinesFilter = {
  folder: string;
};

const localStorageFiltersKey = 'settings.filters';

export type useSettingsStateResult = {
  devOpsAccount: DevOpsAccount;
  setDevOpsAccount: React.Dispatch<React.SetStateAction<DevOpsAccount>>;
  pipelinesFilter: PipelinesFilter;
  setPipelinesFilter: React.Dispatch<React.SetStateAction<PipelinesFilter>>;
};
export const useSettingsState = (): useSettingsStateResult => {
  const [devOpsAccount, setDevOpsAccount] = useState<DevOpsAccount>(devOpsAccountInitialState);
  const [pipelinesFilter, setPipelinesFilter] = useState<PipelinesFilter>(pipelinesFilterInitialState);

  useEffect(() => {
    const filter = localStorage.getItem(localStorageFiltersKey);
    if (filter) {
      setPipelinesFilter(JSON.parse(filter));
    }
  }, [setPipelinesFilter]);

  useEffect(() => {
    localStorage.setItem(localStorageFiltersKey, JSON.stringify(pipelinesFilter));
  }, [pipelinesFilter]);

  return {
    devOpsAccount,
    setDevOpsAccount,
    pipelinesFilter,
    setPipelinesFilter
  };
};
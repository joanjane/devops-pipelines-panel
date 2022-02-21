import { useState } from 'react';
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

export type useSettingsStateResult = {
  devOpsAccount: DevOpsAccount;
  setDevOpsAccount: React.Dispatch<React.SetStateAction<DevOpsAccount>>;
  pipelinesFilter: PipelinesFilter;
  setPipelinesFilter: React.Dispatch<React.SetStateAction<PipelinesFilter>>;
};
export const useSettingsState = (): useSettingsStateResult => {
  const [devOpsAccount, setDevOpsAccount] = useState<DevOpsAccount>(devOpsAccountInitialState);
  const [pipelinesFilter, setPipelinesFilter] = useState<PipelinesFilter>(pipelinesFilterInitialState);

  return {
    devOpsAccount,
    setDevOpsAccount,
    pipelinesFilter,
    setPipelinesFilter
  };
};
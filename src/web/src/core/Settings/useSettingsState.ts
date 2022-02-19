import { useState } from 'react';
import { DevOpsAccount } from '../../api/types';

export const initialState: DevOpsAccount = {
  organization: '',
  project: '',
  pat: ''
};
export type useSettingsStateResult = {
  devOpsAccount: DevOpsAccount;
  setDevOpsAccount: React.Dispatch<React.SetStateAction<DevOpsAccount>>;
};
export const useSettingsState = (): useSettingsStateResult => {
  const [devOpsAccount, setDevOpsAccount] = useState<DevOpsAccount>(initialState);

  return {
    devOpsAccount,
    setDevOpsAccount
  };
};
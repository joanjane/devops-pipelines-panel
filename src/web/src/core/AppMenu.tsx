import { FC } from 'react';
import { FloatingMenu } from '../shared/FloatingMenu';
import { AppSettingsForm } from './settings/AppSettingsForm';

export const AppMenu: FC<{}> = () => {
  return <FloatingMenu>
    <AppSettingsForm />
  </FloatingMenu>;
}

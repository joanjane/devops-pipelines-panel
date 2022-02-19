import { FC } from 'react';
import { FloatingMenu } from '../shared/FloatingMenu';
import { AppSettingsForm } from './Settings/AppSettingsForm';

export const AppMenu: FC<{}> = () => {
  return <FloatingMenu>
    <AppSettingsForm />
  </FloatingMenu>;
}

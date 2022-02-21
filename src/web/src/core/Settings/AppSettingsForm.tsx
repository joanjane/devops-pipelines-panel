import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Shape } from '../yup';
import { FormTextInputControl } from '../../shared/forms';
import { useSettingsActions } from './useSettingsActions';
import { useDevOpsContext } from '../DevOpsContext';

type AppSettingsFormFields = {
  organization: string;
  project: string;
  pat: string;
};

const schema = yup.object().shape<Shape<AppSettingsFormFields>>({
  organization: yup.string().label('Organization').required(),
  project: yup.string().label('Project').required(),
  pat: yup.string().label('Personal Access Token').required()
}).required();

export const AppSettingsForm: FC<{}> = () => {
  const { settings: { devOpsAccount } } = useDevOpsContext();
  const { storeDevOpsAccount, clearDevOpsAccount } = useSettingsActions();
  const { control, handleSubmit, reset } = useForm<AppSettingsFormFields>({
    resolver: yupResolver(schema),
    defaultValues: devOpsAccount
  });

  useEffect(() => {
    reset(devOpsAccount);
  }, [devOpsAccount, reset]);

  const onSubmit = (data: AppSettingsFormFields) => storeDevOpsAccount(data);
  const resetData = () => {
    reset({
      organization: '',
      project: '',
      pat: ''
    });
    clearDevOpsAccount();
  }

  return <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
    <h2>Settings</h2>
    <section>
      <FormTextInputControl control={control} name="organization" type="text" label="Azure DevOps Organization" />
      <FormTextInputControl control={control} name="project" type="text" label="Project Name / Project ID" />
      <FormTextInputControl control={control} name="pat" type="password" label="Personal Access Token" />
    </section>

    <button type="submit" className="app-btn">Save</button>
    <button type="reset" className="app-btn" onClick={resetData}>Clear data</button>
  </form>;
}

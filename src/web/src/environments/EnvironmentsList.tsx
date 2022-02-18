import './EnvironmentsList.scss';

import { FC } from 'react';
import { useDevOpsContext } from '../core/DevOpsContext';

export const EnvironmentsList: FC<{}> = () => {
  const { environmentsState: { environments } } = useDevOpsContext();

  return (
    <div className="app-environments">
      {environments.value.map(e => <div className="app-environments__item" key={e.id}>
        <strong>{e.name}</strong>
      </div>
      )}
    </div>
  );
}
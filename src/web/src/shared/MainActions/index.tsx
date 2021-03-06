import './index.scss';

import { FC } from 'react';
import { usePipelineList } from '../../pipelines/usePipelineList';
import { useEnvironmentsList } from '../../environments/useEnvironmentsList';
import { useDeploymentsList } from '../../deployments/useDeploymentsList';
import { useDevOpsContext } from '../../core/DevOpsContext';
import { TextInputControl } from '../forms';

export const MainActions: FC<{}> = () => {
  const { fetchAllPipelines } = usePipelineList();
  const { fetchAllEnvironments } = useEnvironmentsList();
  const { fetchAllDeployments, enabled: fetchDeploymentsEnabled } = useDeploymentsList();
  const { settings } = useDevOpsContext();
  return (
    <div className="app-actions">
      <div>
        <button className="app-btn" type="button" onClick={() => {
          fetchAllPipelines();
          fetchAllEnvironments();
        }}>🔄 Sync</button>

        <button className="app-btn" type="button"
          onClick={() => fetchAllDeployments()}
          disabled={!fetchDeploymentsEnabled}>Get deployments</button>
      </div>

      <TextInputControl
        type="search"
        placeholder="\MyFolder"
        label="📂 Pipeline folder"
        autoComplete="on"
        value={settings.pipelinesFilter.folder}
        onChange={(e) => settings.setPipelinesFilter(f => ({ ...f, folder: e.target.value }))}
      />

    </div>
  );
};
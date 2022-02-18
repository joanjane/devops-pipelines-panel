import './EnvironmentDeployments.css';

import { FC } from 'react';
import { PipelineResult } from '../api/types';
import { useDevOpsContext } from '../core/DevOpsContext';

type EnvironmentsListProps = {
  pipelineId: number;
}
export const EnvironmentDeployments: FC<EnvironmentsListProps> = ({ pipelineId }) => {
  const { deploymentsState: { deployments } } = useDevOpsContext();
  return (
    <div className="app-deployment">
      {deployments[pipelineId]?.map(e => <div className={`app-deployment__stage ${e.pendingDeployments ? 'app-deployment__stage--pending' : ''}`} key={e.id}>
        <div className="app-deployment__stage-name">
          <a className="app-pipeline-link" href={e.pipelineUrl} target="_blank" rel="noreferrer">
            {e.stageName}
          </a>
        </div>
        <small className="app-deployment__build-name">{e.buildName}</small>
        <EnvironmentDeploymentStatusIcon result={e.result} />
        {e.pendingDeployments && <span title="Has pending deployments">🤚</span>}
      </div>)}
    </div>
  );
};

export const EnvironmentDeploymentStatusIcon: FC<{ result: PipelineResult }> = ({ result }) => {
  if (result === 'succeeded') {
    return <>✅</>;
  } else if (result === 'failed') {
    return <>❌</>;
  } else {
    return <>{result}</>;
  }
};
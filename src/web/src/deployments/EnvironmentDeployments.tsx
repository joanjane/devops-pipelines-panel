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
      {deployments[pipelineId]?.map(e => <div key={e.id}>
        <a href={e.pipelineUrl} target="_blank" rel="noreferrer">
          {e.stageName} ({e.buildName}) <EnvironmentDeploymentStatusIcon result={e.result} />
        </a>
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
import { FC } from 'react';
import { useDevOpsContext } from '../core/DevOpsContext';

type EnvironmentsListProps = {
  environmentId: number;
}
export const EnvironmentDeployments: FC<EnvironmentsListProps> = ({ environmentId }) => {
  const { deploymentsState: { deployments } } = useDevOpsContext();
  return (
    <div className="app-deployment">
      {deployments[environmentId]?.map(e => <div key={e.id}>
        <a href={e.pipelineUrl} target="_blank" rel="noreferrer">{e.stageName} ({e.result})</a>
      </div>)}
    </div>
  );
}
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
        <a href={e.pipelineUrl} target="_blank" rel="noreferrer">{e.stageName} ({e.buildName}) <EnvironmentDeploymentStatusIcon result={e.result} /></a>
      </div>)}
    </div>
  );
};

export const EnvironmentDeploymentStatusIcon: FC<{result: 'succeeded' | 'failed' | 'inprogress'}> = ({ result }) => {
  if (result === 'succeeded') {
    return <>✅</>;
  } else if (result === 'failed') {
    return <>❌</>;
  } else if (result === 'inprogress') {
    return <>🔄</>;
  } else {
    return <>{result}</>;
  }
};
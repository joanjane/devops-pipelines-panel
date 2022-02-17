import { FC } from 'react';
import { useDevOpsContext } from '../core/DevOpsContext';
import { EnvironmentDeployments } from '../deployments/EnvironmentDeployments';

export const PipelineList: FC<{}> = () => {
  const { pipelinesState: { pipelines } } = useDevOpsContext();
  return (
    <div className="app-pipelines">
      {pipelines.value.map(e => <div key={e.id}>
        <a href={e.pipelineUrl} target="_blank" rel="noreferrer">
          {e.name}
        </a>
        <EnvironmentDeployments pipelineId={e.id} />
      </div>)}
    </div>
  );
};
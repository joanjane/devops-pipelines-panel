import './PipelineList.css';

import { FC } from 'react';
import { useDevOpsContext } from '../core/DevOpsContext';
import { EnvironmentDeployments } from '../deployments/EnvironmentDeployments';

export const PipelineList: FC<{}> = () => {
  const { pipelinesState: { pipelines } } = useDevOpsContext();
  return (
    <div className="app-pipelines">
      {pipelines.value.map(e => <div className="app-pipelines__item" key={e.id}>
        <a className="app-pipelines__name app-pipeline-link" href={e.pipelineUrl} target="_blank" rel="noreferrer">
          {e.name}
        </a>
        <EnvironmentDeployments pipelineId={e.id} />
      </div>)}
    </div>
  );
};
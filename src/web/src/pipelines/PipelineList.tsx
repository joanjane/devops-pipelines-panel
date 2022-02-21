import './PipelineList.scss';

import { FC } from 'react';
import { EnvironmentDeployments } from '../deployments/EnvironmentDeployments';
import { usePipelinesFilter } from './usePipelinesFilter';

export const PipelineList: FC<{}> = () => {
  const { filteredPipelines } = usePipelinesFilter();
  return (
    <div className="app-pipelines">
      {filteredPipelines.map(e => <div className="app-pipelines__item" key={e.id}>
        <div className="app-pipelines__details">
          <a className="app-pipelines__name app-pipeline-link" href={e.pipelineUrl} target="_blank" rel="noreferrer">
            {e.name}
          </a>
          <small className="app-pipelines__folder">{e.folder}</small>
        </div>
        <EnvironmentDeployments pipelineId={e.id} />
      </div>)}
    </div>
  );
};
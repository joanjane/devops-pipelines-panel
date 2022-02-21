import { useEffect, useState } from 'react';
import { useDevOpsContext } from '../core/DevOpsContext';
import { Pipeline } from './usePipelinesState';

type usePipelinesFilterResult = {
  filteredPipelines: Pipeline[]
};

export const usePipelinesFilter = (): usePipelinesFilterResult => {
  const [filteredPipelines, setFilteredPipelines] = useState<Pipeline[]>([]);
  const {
    settings: { pipelinesFilter },
    pipelinesState: { pipelines }
  } = useDevOpsContext();

  useEffect(() => {
    if (!pipelinesFilter.folder) {
      setFilteredPipelines(pipelines.value);
    } else {
      setFilteredPipelines(pipelines.value.filter(p => p.folder === pipelinesFilter.folder));
    }
  }, [setFilteredPipelines, pipelines, pipelinesFilter.folder]);

  return {
    filteredPipelines
  };
};

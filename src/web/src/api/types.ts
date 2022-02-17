export interface DevOpsAccount {
  organization: string;
  project: string;
  pat: string;
}

export interface DevOpsPagedList<T> {
  count: number;
  continuationToken: string | false;
  value: T[];
}

export interface DevOpsEnvironmentList extends DevOpsPagedList<DevOpsEnvironment> { }
export interface DevOpsEnvironment {
  id: number;
  name: string;
}

export interface DevOpsEnvironmentDeploymentList extends DevOpsPagedList<DevOpsEnvironmentDeployment> { }
export type PipelineResult = 'abandoned' | 'canceled' | 'failed' | 'skipped' | 'succeeded' | 'succeededWithIssue'
export interface DevOpsEnvironmentDeployment {
  id: number;
  name: string;
  environmentId: number;
  stageName: string;
  definition: {
    id: number;
    name: string;
    _links: {
      web: {
        href: string;
      };
    };
  };
  owner: {
    id: number;
    name: string;
    _links: {
      web: {
        href: string;
      };
    };
  };
  result: PipelineResult;
  queueTime: string;
  startTime: string;
  finishTime: string;
}

export interface DevOpsPipelineList extends DevOpsPagedList<DevOpsPipeline> { }
export interface DevOpsPipeline {
  id: number;
  name: string;
  folder: string;
  _links: {
    web: {
      href: string;
    };
  };
}
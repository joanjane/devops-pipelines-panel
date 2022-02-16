export interface DevOpsAccount {
  organization: string;
  project: string;
  pat: string;
}

export interface DevOpsPagedList<T> {
  count: number;
  continuationToken?: string;
  value: T[];
  page: number;
}


export interface DevOpsEnvironmentList extends DevOpsPagedList<DevOpsEnvironment> { }
export interface DevOpsEnvironment {
  id: number;
  name: string;
}

export interface DevOpsEnvironmentDeploymentList extends DevOpsPagedList<DevOpsEnvironmentDeployment> { }
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
  result: 'succeeded' | 'failed';
  queueTime: string;
  startTime: string;
  finishTime: string;
}
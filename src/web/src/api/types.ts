export interface DevOpsAccount {
    organization: string;
    project: string;
    pat: string;
}

export interface DevOpsEnvironmentList {
    count: number;
    continuationToken?: string;
    value: DevOpsEnvironment[];
}

export interface DevOpsEnvironment {
    id: number;
    name: string;
}
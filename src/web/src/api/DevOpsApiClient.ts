import { serializeQueryParams } from './utils';
import {
  DevOpsAccount,
  DevOpsEnvironmentDeploymentList,
  DevOpsEnvironmentList,
  DevOpsPipelineList
} from './types';

export class DevOpsApiClient {
  private baseUrl(devOpsAccount: DevOpsAccount) {
    return `https://dev.azure.com/${devOpsAccount.organization}/${devOpsAccount.project}/_apis`;
  }

  public async getEnvironments(devOpsAccount: DevOpsAccount, continuationToken?: string, top?: number, name?: string): Promise<DevOpsEnvironmentList> {
    const query = serializeQueryParams({
      continuationToken,
      '$top': top,
      name
    });

    const url = `${this.baseUrl(devOpsAccount)}/distributedtask/environments?api-version=7.1-preview.1&${query}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: this.buildDefaultHeaders(devOpsAccount)
    });

    const data = await response.json();
    return {
      ...data,
      continuationToken: response.headers.get('x-ms-continuationtoken')
    }
  }

  public async getEnvironmentDeployments(devOpsAccount: DevOpsAccount, environmentId: number, continuationToken?: string, top?: number, name?: string): Promise<DevOpsEnvironmentDeploymentList> {
    const query = serializeQueryParams({
      continuationToken,
      top,
      name
    });

    const url = `${this.baseUrl(devOpsAccount)}/distributedtask/environments/${environmentId}/environmentdeploymentrecords?api-version=7.1-preview.1&${query}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: this.buildDefaultHeaders(devOpsAccount)
    });

    const data = await response.json();
    return {
      ...data,
      continuationToken: response.headers.get('x-ms-continuationtoken')
    }
  }

  public async getPipelines(devOpsAccount: DevOpsAccount, continuationToken?: string, top?: number): Promise<DevOpsPipelineList> {
    const query = serializeQueryParams({
      continuationToken,
      '$top': top
    });

    const url = `${this.baseUrl(devOpsAccount)}/pipelines?api-version=7.1-preview.1&${query}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: this.buildDefaultHeaders(devOpsAccount)
    });

    const data = await response.json();
    return {
      ...data,
      continuationToken: response.headers.get('x-ms-continuationtoken')
    }
  }

  private buildDefaultHeaders(devOpsAccount: DevOpsAccount): HeadersInit {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${btoa(':' + devOpsAccount.pat)}`
    };
  }
}

export const devOpsApiClient = new DevOpsApiClient();
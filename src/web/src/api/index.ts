import { DevOpsAccount, DevOpsEnvironmentList } from './types';

export class DevOpsApiClient {
    private devopsAccount: DevOpsAccount = {
        organization: process.env.REACT_APP_DEVOPS_ORG,
        project: process.env.REACT_APP_DEVOPS_PROJECT,
        pat: process.env.REACT_APP_DEVOPS_PAT
    };

    private get baseUrl() {
        return `https://dev.azure.com/${this.devopsAccount.organization}/${this.devopsAccount.project}/_apis`;
    }

    public async fetchEnvironments(): Promise<DevOpsEnvironmentList> {
        const url = `${this.baseUrl}/distributedtask/environments?api-version=7.1-preview.1`;
        const response = await fetch(url, {
            method: 'GET', headers: this.buildDefaultHeaders()
        });
        
        const continuationToken = response.headers.get('x-ms-continuationtoken');
        const data = await response.json();

        return {
            ...data,
            continuationToken
        }
    }

    private buildDefaultHeaders(): HeadersInit {
        return {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${btoa(':' + this.devopsAccount.pat)}`
        };
    }
}

export const devOpsApiClient = new DevOpsApiClient();
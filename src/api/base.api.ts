import { APIRequestContext } from '@playwright/test';

export class BaseAPI {
  constructor(
    private request: APIRequestContext,
    private baseURL: string
  ) {}

  async post<T>(endpoint: string, data: unknown) {
    const response = await this.request.post(
      `${this.baseURL}${endpoint}`,
      {
        data,
      }
    );

    if (!response.ok()) {
      throw new Error(
        `POST ${endpoint} failed: ${response.status()} ${await response.text()}`
      );
    }

    return response;
  }

  async get<T>(endpoint: string) {
    const response = await this.request.get(
      `${this.baseURL}${endpoint}`
    );

    if (!response.ok()) {
      throw new Error(
        `GET ${endpoint} failed: ${response.status()} ${await response.text()}`
      );
    }

    return response;
  }
}
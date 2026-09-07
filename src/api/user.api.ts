import { expect } from '@playwright/test';
import { BaseAPI } from './base.api';
import { User } from '../data/customer';

export class UserAPI {

  constructor(private api: BaseAPI) { }

  async registerCustomer(user): Promise<User> {
    const response = await this.api.post<User>('/users/register', user);

    // Ensure the registration was successful (usually 201 Created or 200 OK)
    expect(response.status()).toBe(201);

    return response.json();
  }
}
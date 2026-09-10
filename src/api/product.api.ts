import { expect } from '@playwright/test';
import { BaseAPI } from './base.api';
import { ProductResponse } from '../data/product';

export class ProductAPI {

  constructor(private api: BaseAPI) { }

  readonly path = '/products';

  async getProducts(): Promise<ProductResponse> {
    const response = await this.api.get(this.path);

    // Ensure the registration was successful (usually 201 Created or 200 OK)
    expect(response.status()).toBe(200);

    return await response.json();
  }
}

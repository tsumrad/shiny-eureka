import { defineStore } from 'pinia';

import api from '../api/client';
import type { Product } from '../types';

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [] as Product[],
  }),
  actions: {
    async fetchProducts() {
      const { data } = await api.get<Product[]>('/api/products');
      this.products = data;
    },
    async saveProduct(payload: Partial<Product>) {
      if (payload.id) {
        await api.put(`/api/products/${payload.id}`, payload);
      } else {
        await api.post('/api/products', payload);
      }
      await this.fetchProducts();
    },
    async deleteProduct(id: number) {
      await api.delete(`/api/products/${id}`);
      await this.fetchProducts();
    },
  },
});

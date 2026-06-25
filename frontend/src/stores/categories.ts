import { defineStore } from 'pinia';

import api from '../api/client';
import type { Category } from '../types';

export const useCategoryStore = defineStore('categories', {
  state: () => ({
    categories: [] as Category[],
  }),
  actions: {
    async fetchCategories() {
      const { data } = await api.get<Category[]>('/api/categories');
      this.categories = data;
    },
    async saveCategory(payload: Partial<Category>) {
      if (payload.id) {
        await api.put(`/api/categories/${payload.id}`, payload);
      } else {
        await api.post('/api/categories', payload);
      }
      await this.fetchCategories();
    },
    async deleteCategory(id: number) {
      await api.delete(`/api/categories/${id}`);
      await this.fetchCategories();
    },
  },
});

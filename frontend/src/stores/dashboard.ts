import { defineStore } from 'pinia';

import api from '../api/client';
import type { DashboardStats } from '../types';

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    stats: null as DashboardStats | null,
  }),
  actions: {
    async fetchStats() {
      const { data } = await api.get<DashboardStats>('/api/dashboard/stats');
      this.stats = data;
    },
  },
});

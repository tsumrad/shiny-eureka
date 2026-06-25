import { defineStore } from 'pinia';

import api from '../api/client';
import type { User } from '../types';

interface AuthState {
  token: string | null;
  user: User | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: localStorage.getItem('accessToken'),
    user: null,
  }),
  getters: {
    isAuthenticated: (state) => Boolean(state.token),
  },
  actions: {
    async login(email: string, password: string) {
      const body = new URLSearchParams();
      body.set('username', email);
      body.set('password', password);
      const { data } = await api.post('/api/auth/login', body, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });
      this.token = data.access_token;
      localStorage.setItem('accessToken', data.access_token);
      await this.fetchMe();
    },
    async fetchMe() {
      if (!this.token) return;
      const { data } = await api.get<User>('/api/auth/me');
      this.user = data;
    },
    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem('accessToken');
    },
  },
});

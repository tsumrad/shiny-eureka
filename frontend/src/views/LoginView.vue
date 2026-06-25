<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { useAuthStore } from '../stores/auth';

const email = ref('');
const password = ref('');
const error = ref('');
const loading = ref(false);
const auth = useAuthStore();
const router = useRouter();

async function submit() {
  error.value = '';
  loading.value = true;
  try {
    await auth.login(email.value, password.value);
    router.push('/');
  } catch {
    error.value = 'Invalid email or password.';
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-slate-100 px-4">
    <form class="card w-full max-w-md space-y-4" @submit.prevent="submit">
      <div>
        <h1 class="text-2xl font-bold">Inventory Login</h1>
        <p class="text-sm text-slate-600">Sign in with a registered backend user.</p>
      </div>
      <p v-if="error" class="rounded-md bg-red-50 p-3 text-sm text-red-700">{{ error }}</p>
      <label class="block">
        <span class="text-sm font-medium">Email</span>
        <input v-model="email" class="input mt-1" type="email" required />
      </label>
      <label class="block">
        <span class="text-sm font-medium">Password</span>
        <input v-model="password" class="input mt-1" type="password" required />
      </label>
      <button class="btn-primary w-full" :disabled="loading" type="submit">
        {{ loading ? 'Signing in...' : 'Sign in' }}
      </button>
    </form>
  </div>
</template>

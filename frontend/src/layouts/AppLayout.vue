<script setup lang="ts">
import { useRouter } from 'vue-router';

import { useAuthStore } from '../stores/auth';

const auth = useAuthStore();
const router = useRouter();

function logout() {
  auth.logout();
  router.push('/login');
}
</script>

<template>
  <div class="min-h-screen">
    <nav class="border-b bg-white">
      <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <RouterLink to="/" class="text-xl font-bold text-blue-700">Inventory</RouterLink>
        <div class="flex items-center gap-4">
          <RouterLink class="font-medium hover:text-blue-700" to="/">Dashboard</RouterLink>
          <RouterLink class="font-medium hover:text-blue-700" to="/products">Products</RouterLink>
          <RouterLink class="font-medium hover:text-blue-700" to="/categories">Categories</RouterLink>
          <button class="btn-secondary" type="button" @click="logout">Logout</button>
        </div>
      </div>
    </nav>
    <main class="mx-auto max-w-6xl px-6 py-8">
      <slot />
    </main>
  </div>
</template>

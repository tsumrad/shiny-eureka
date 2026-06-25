<script setup lang="ts">
import { onMounted } from 'vue';

import AppLayout from '../layouts/AppLayout.vue';
import { useDashboardStore } from '../stores/dashboard';

const dashboard = useDashboardStore();

onMounted(() => dashboard.fetchStats());
</script>

<template>
  <AppLayout>
    <h1 class="mb-6 text-3xl font-bold">Dashboard</h1>
    <div class="grid gap-4 md:grid-cols-5">
      <div class="card">
        <p class="text-sm text-slate-500">Products</p>
        <p class="text-3xl font-bold">{{ dashboard.stats?.product_count ?? 0 }}</p>
      </div>
      <div class="card">
        <p class="text-sm text-slate-500">Categories</p>
        <p class="text-3xl font-bold">{{ dashboard.stats?.category_count ?? 0 }}</p>
      </div>
      <div class="card">
        <p class="text-sm text-slate-500">Units</p>
        <p class="text-3xl font-bold">{{ dashboard.stats?.total_quantity ?? 0 }}</p>
      </div>
      <div class="card">
        <p class="text-sm text-slate-500">Low Stock</p>
        <p class="text-3xl font-bold">{{ dashboard.stats?.low_stock_count ?? 0 }}</p>
      </div>
      <div class="card">
        <p class="text-sm text-slate-500">Value</p>
        <p class="text-3xl font-bold">${{ dashboard.stats?.inventory_value ?? '0.00' }}</p>
      </div>
    </div>
  </AppLayout>
</template>

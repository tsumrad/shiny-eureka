<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';

import AppLayout from '../layouts/AppLayout.vue';
import { useCategoryStore } from '../stores/categories';
import { useProductStore } from '../stores/products';
import type { Product } from '../types';

const products = useProductStore();
const categories = useCategoryStore();
const error = ref('');
const form = reactive<Partial<Product>>({
  name: '',
  sku: '',
  description: '',
  quantity: 0,
  price: '0.00',
  category_id: null,
});

function edit(product: Product) {
  Object.assign(form, product);
}

function reset() {
  Object.assign(form, {
    id: undefined,
    name: '',
    sku: '',
    description: '',
    quantity: 0,
    price: '0.00',
    category_id: null,
  });
}

async function save() {
  error.value = '';
  try {
    await products.saveProduct({
      ...form,
      category_id: form.category_id ? Number(form.category_id) : null,
      quantity: Number(form.quantity ?? 0),
      price: String(form.price ?? '0.00'),
    });
    reset();
  } catch {
    error.value = 'Unable to save product. Check SKU uniqueness and category.';
  }
}

async function remove(id: number) {
  await products.deleteProduct(id);
}

function categoryName(id?: number | null) {
  return categories.categories.find((category) => category.id === id)?.name ?? 'Uncategorized';
}

onMounted(async () => {
  await Promise.all([products.fetchProducts(), categories.fetchCategories()]);
});
</script>

<template>
  <AppLayout>
    <div class="grid gap-6 lg:grid-cols-[1fr_2fr]">
      <form class="card space-y-4" @submit.prevent="save">
        <h1 class="text-2xl font-bold">{{ form.id ? 'Edit Product' : 'New Product' }}</h1>
        <p v-if="error" class="rounded-md bg-red-50 p-3 text-sm text-red-700">{{ error }}</p>
        <label class="block">
          <span class="text-sm font-medium">Name</span>
          <input v-model="form.name" class="input mt-1" required />
        </label>
        <label class="block">
          <span class="text-sm font-medium">SKU</span>
          <input v-model="form.sku" class="input mt-1" required />
        </label>
        <label class="block">
          <span class="text-sm font-medium">Description</span>
          <textarea v-model="form.description" class="input mt-1" rows="3" />
        </label>
        <div class="grid gap-3 md:grid-cols-2">
          <label class="block">
            <span class="text-sm font-medium">Quantity</span>
            <input v-model.number="form.quantity" class="input mt-1" min="0" type="number" required />
          </label>
          <label class="block">
            <span class="text-sm font-medium">Price</span>
            <input v-model="form.price" class="input mt-1" min="0" step="0.01" type="number" required />
          </label>
        </div>
        <label class="block">
          <span class="text-sm font-medium">Category</span>
          <select v-model="form.category_id" class="input mt-1">
            <option :value="null">Uncategorized</option>
            <option v-for="category in categories.categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </option>
          </select>
        </label>
        <div class="flex gap-2">
          <button class="btn-primary" type="submit">Save</button>
          <button class="btn-secondary" type="button" @click="reset">Clear</button>
        </div>
      </form>

      <section class="card overflow-x-auto">
        <h2 class="mb-4 text-2xl font-bold">Products</h2>
        <table class="w-full text-left text-sm">
          <thead>
            <tr class="border-b">
              <th class="py-2">Name</th>
              <th>SKU</th>
              <th>Category</th>
              <th>Qty</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products.products" :key="product.id" class="border-b">
              <td class="py-3 font-medium">{{ product.name }}</td>
              <td>{{ product.sku }}</td>
              <td>{{ categoryName(product.category_id) }}</td>
              <td>{{ product.quantity }}</td>
              <td>${{ product.price }}</td>
              <td class="space-x-2 text-right">
                <button class="btn-secondary" type="button" @click="edit(product)">Edit</button>
                <button class="btn-secondary" type="button" @click="remove(product.id)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  </AppLayout>
</template>

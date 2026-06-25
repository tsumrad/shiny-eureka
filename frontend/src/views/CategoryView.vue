<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';

import AppLayout from '../layouts/AppLayout.vue';
import { useCategoryStore } from '../stores/categories';
import type { Category } from '../types';

const store = useCategoryStore();
const error = ref('');
const form = reactive<Partial<Category>>({ name: '', description: '' });

function edit(category: Category) {
  Object.assign(form, category);
}

function reset() {
  Object.assign(form, { id: undefined, name: '', description: '' });
}

async function save() {
  error.value = '';
  try {
    await store.saveCategory(form);
    reset();
  } catch {
    error.value = 'Unable to save category.';
  }
}

async function remove(id: number) {
  error.value = '';
  try {
    await store.deleteCategory(id);
  } catch {
    error.value = 'Unable to delete category. Remove products in this category first.';
  }
}

onMounted(() => store.fetchCategories());
</script>

<template>
  <AppLayout>
    <div class="grid gap-6 lg:grid-cols-[1fr_2fr]">
      <form class="card space-y-4" @submit.prevent="save">
        <h1 class="text-2xl font-bold">{{ form.id ? 'Edit Category' : 'New Category' }}</h1>
        <p v-if="error" class="rounded-md bg-red-50 p-3 text-sm text-red-700">{{ error }}</p>
        <label class="block">
          <span class="text-sm font-medium">Name</span>
          <input v-model="form.name" class="input mt-1" required />
        </label>
        <label class="block">
          <span class="text-sm font-medium">Description</span>
          <textarea v-model="form.description" class="input mt-1" rows="3" />
        </label>
        <div class="flex gap-2">
          <button class="btn-primary" type="submit">Save</button>
          <button class="btn-secondary" type="button" @click="reset">Clear</button>
        </div>
      </form>

      <section class="card">
        <h2 class="mb-4 text-2xl font-bold">Categories</h2>
        <div class="divide-y">
          <div v-for="category in store.categories" :key="category.id" class="flex items-center justify-between py-3">
            <div>
              <p class="font-semibold">{{ category.name }}</p>
              <p class="text-sm text-slate-600">{{ category.description }}</p>
            </div>
            <div class="flex gap-2">
              <button class="btn-secondary" type="button" @click="edit(category)">Edit</button>
              <button class="btn-secondary" type="button" @click="remove(category.id)">Delete</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import axios from '../config/axios.js';
import { ref, onMounted } from 'vue';
import { Product } from '../interface/product.interface';
import { defineEmits } from 'vue';
import Chat from './Chat.vue';
const emit = defineEmits(['logout']);

interface Props {
  fullname: string;
}

const { fullname } = defineProps<Props>();

const products = ref<Product[]>([]);

onMounted(async () => {
  try {
    const { data } = await axios.get('/products');

    products.value = data;
  } catch (error) {
    console.error('Error al obtener datos de la API:', error);
  }
});
const getImageUrl = (image: string) => {
  const apiUrlProducts = import.meta.env.VITE_API_URL_PRODUCTS;
  return `${apiUrlProducts}/${image}`;
};

const handleLogOut = () => {
  emit('logout');
};
</script>

<template>
  <v-container class="d-flex align-center justify-space-between">
    <v-btn @click="handleLogOut"> Close Session </v-btn>
    <p>{{ fullname }}</p>
  </v-container>
  <v-container>
    <v-row>
      <v-col v-for="product in products" :key="product.id" cols="12" md="2">
        <v-card>
          <v-img
            :src="getImageUrl(product.images[0])"
            alt="Product Image"
          ></v-img>
          <v-card-title>{{ product.title }}</v-card-title>
          <v-card-subtitle>{{ `$${product.price}` }}</v-card-subtitle>
          <v-card-text>{{ product.description }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <div class="mt-2 d-flex justify-end">
      <Chat :fullname="fullname"/>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import axios from '../config/axios.js';
import { ref, onMounted } from 'vue';
import { Product } from '../interface/product.interface';
import { defineEmits } from 'vue';
import { connectToServer } from '../config/socket-io';
import Chat from './Chat.vue';
const emit = defineEmits(['logout']);

const products = ref<Product[]>([]);
const isChatWindowVisible = ref<boolean>(false);

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

const toggleChat = () => {
  isChatWindowVisible.value = !isChatWindowVisible.value;
  console.log("🚀 ~ isChatWindowVisible.value:", isChatWindowVisible.value)
};
</script>

<template>
  <v-container>
    <v-btn @click="handleLogOut"> Close Session </v-btn>
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
  </v-container>
  <v-btn @click="toggleChat"> Open Chat </v-btn>
  <Chat :initialShowChatWindow="isChatWindowVisible"/>
  <!-- {{ connectToServer() }} -->
</template>

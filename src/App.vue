<script setup lang="ts">
import Shop from './components/Shop.vue';
import Login from './components/Login.vue';
import { ref, onMounted } from 'vue';

const isLogin = ref<boolean>(false);
onMounted(() => {
  const token = localStorage.getItem('token');
  if (token) {
    getToken(token);
  }
});

const getToken = (data: string) => {
  isLogin.value = data ? true : false;
};
const logOut = () => {
  isLogin.value = false;
  localStorage.removeItem('token')
};
</script>

<template>
  <div>
    <Login @login="getToken" v-if="!isLogin" />
    <Shop v-else @logout="logOut"/>
  </div>
</template>

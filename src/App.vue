<script setup lang="ts">
import Shop from './components/Shop.vue';
import Login from './components/Login.vue';
import { ref, onMounted } from 'vue';

const isLogin = ref<boolean>(false);
const fullname = ref<string | null>(null);

onMounted(() => {
  const token = localStorage.getItem('token');
  if (token) {
    getToken(token);
  }
});

const getToken = (data: {token: string, fullname: string}) => {  
  isLogin.value = data.token ? true : false;
  fullname.value = data.fullname;  
};
const logOut = () => {
  isLogin.value = false;
  localStorage.removeItem('token')
};
</script>

<template>
  <div>
    <Login @login="getToken" v-if="!isLogin" />
    <Shop v-else @logout="logOut" :fullname="fullname"/>
  </div>
</template>

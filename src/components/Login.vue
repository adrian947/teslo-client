<!-- Login.vue -->
<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card>
          <v-card-title class="headline">Inicio de Sesión</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="login">
              <v-text-field v-model="email" label="Usuario"></v-text-field>
              <v-text-field
                v-model="password"
                label="Contraseña"
                type="password"
              ></v-text-field>
              <v-btn type="submit" color="primary">Iniciar Sesión</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from '../config/axios.js';

import { defineEmits } from 'vue';
const emit = defineEmits(['login']);

const email = ref('usuario3@example.com');
const password = ref('Contrasena3');

const login = async () => {
  try {
    const { data } = await axios.post('/auth/login', {
      email: email.value,
      password: password.value,
    });

    if (data) {
      const token = data.token;
      const fullname = data.fullname;
      localStorage.setItem('token', token);
      emit('login', { token, fullname });
    } else {
      console.error('Credenciales incorrectas');
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
  }
};
</script>

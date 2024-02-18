<template>
	<v-dialog v-model="showChatWindow" persistent max-width="600px">
	  <v-card>
		<v-card-title class="d-flex align-center">
		  Chat Window
		  <v-spacer></v-spacer>
		  <v-btn icon @click="closeChatWindow">
			X
		  </v-btn>
		</v-card-title>
		<v-card-text>
		  <!-- Aquí iría el contenido del chat -->
		  <!-- <v-list>
			<v-list-item v-for="(message, index) in messages" :key="index">
			  <v-list-item-content>
				<v-list-item-title>{{ message }}</v-list-item-title>
			  </v-list-item-content>
			</v-list-item>
		  </v-list> -->
		</v-card-text>
		<v-card-actions>
		  <v-text-field v-model="newMessage" label="Type your message" @keydown.enter="sendMessage"></v-text-field>
		  <v-btn @click="sendMessage">Send</v-btn>
		</v-card-actions>
	  </v-card>
	</v-dialog>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  const props = defineProps({
	initialShowChatWindow: Boolean
  });
  console.log("🚀 ~ props:", props.initialShowChatWindow)
  
  const showChatWindow = ref(props.initialShowChatWindow || false);
  const messages = ref([]);
  const newMessage = ref('');
  
  const openChatWindow = () => {
	showChatWindow.value = true;
  };
  
  const closeChatWindow = () => {
	showChatWindow.value = false;
  };
  
  const sendMessage = () => {
	if (newMessage.value.trim() !== '') {
	  messages.value.push(newMessage.value);
	  newMessage.value = '';
	}
  };
  </script>
  
  <style scoped>
  /* Estilos adicionales según tus preferencias */
  </style>
  
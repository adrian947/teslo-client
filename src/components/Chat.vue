<template>
  <v-btn @click="openChatWindow"> Open Chat </v-btn>
  <v-dialog v-model="showChatWindow" persistent max-width="600px">
    <v-card>
      <v-card-title class="d-flex align-center">
        Chat Window {{ statusSocket }}
        <v-spacer></v-spacer>
        <v-btn icon @click="closeChatWindow"> X </v-btn>
      </v-card-title>
      <v-list>
		<h6>Users connected</h6>
        <v-list-item v-for="client in clientsConnected" :key="client">
          <v-list-item-title>{{ client }}</v-list-item-title>
        </v-list-item>
      </v-list>
      <v-card-text>
        <h6>Messages</h6>
        <v-list>
          <v-list-item v-for="(message, index) in messages" :key="index">
            <v-list-item-title>{{ message.fullName }}: {{ message.message}}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-card-actions>
        <v-text-field
          v-model="newMessage"
          label="Type your message"
          @keydown.enter="sendMessage"
        ></v-text-field>
        <v-btn @click="sendMessage">Send</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { connectToServer } from '../config/socket-io';
import { Socket } from 'socket.io-client';

const showChatWindow = ref(false);
const statusSocket = ref('disconnect');
const messages = ref<string[]>([]);
const socket = ref<Socket | null>(null);
const clientsConnected = ref<string[]>([]);
const newMessage = ref('');

onMounted(() => {
  getStatusSocket();
});

const openChatWindow = () => {
  showChatWindow.value = true;
};

const closeChatWindow = () => {
  showChatWindow.value = false;
};

const sendMessage = () => {
  if (newMessage.value.trim() !== '') {
    socket.value.emit('message-from-client', {
      id: 'YO',
      message: newMessage.value,
    });
   
    newMessage.value = '';
  }
};

const getStatusSocket = async () => {
  socket.value = await connectToServer();
  listenStatusSocket(socket.value);
};

const listenStatusSocket = (socket: Socket): Promise<string> => {
  return new Promise((resolve) => {
    socket.on('connect', () => {
      resolve((statusSocket.value = 'connect'));
    });

    socket.on('disconnect', () => {
      resolve((statusSocket.value = 'disconnect'));
    });

    socket.on('clients-updated', (clients: string[]) => {
      clientsConnected.value = clients;
    });
    socket.on(
      'message-from-server',
      (payload: { fullName: string; message: string }) => { 
		messages.value.push(payload);
        
      }
    );
  });
};
</script>

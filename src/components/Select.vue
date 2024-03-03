<template>
  <div class="text-start px-4">
    <v-select
      v-model="selectUserSendMessage"
      label="Select"
      :items="clientsConnected"
      item-title="fullname"
      item-value="socketId"
      variant="outlined"
      @update:modelValue="handleUserSelect"
    ></v-select>    
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue';

const emit = defineEmits(['socketId']);

interface PropsClients {
  clientsConnected: string[];
}

const { clientsConnected } = defineProps<PropsClients>();

const selectUserSendMessage = ref<string | null>(null);

const handleUserSelect = () => {
  emit('socketId', selectUserSendMessage.value);
};
</script>

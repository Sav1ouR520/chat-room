<template>
  <form flex h-10 max-md:mb-2 @submit.prevent="sendMessage">
    <input v-model="message" type="text" flex-grow w-full rounded bg-inherit border-3 border-green-500
      focus:border-green-500 mr-4>
    <ButtonItem :name="'enter'" />
  </form>
</template>

<script lang="ts" setup>
import { RoomStore } from '@/stores';
import { useWS } from '@/utils';

const room = RoomStore()
const message = ref("")

const { send } = useWS()
const sendMessage = () => {
  if (message.value.length) {
    send(JSON.stringify({ "roomId": room.room.roomId, "message": message.value, type: "message" }))
    message.value = ""
  }
}
</script>

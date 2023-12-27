<template>
  <div overflow-auto class="scrollbar-hidden">
    <template v-for="item in list" :key="item.messageId">
      <ChatMsgItem v-bind="item" mb-8 />
    </template>
  </div>
</template>

<script lang="ts" setup>
import { fetchGetMessage, type ChatMessage } from '@/apis';
const list = ref<ChatMessage>([])
const props = defineProps<{ roomId: string }>()
useRequest(() => fetchGetMessage({ roomId: props.roomId }), { onSuccess: ({ data }) => list.value = data })
</script>

<style scoped>
.scrollbar-hidden::-webkit-scrollbar {
  display: none;
}
</style>

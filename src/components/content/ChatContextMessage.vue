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

// 获取聊天室Id
const route = useRoute()
const roomId = ref(route.params['id'] as string)

// 监听是否切换房间 如果切换则刷新聊天室
watch(route, () => (roomId.value = route.params['id'] as string, run()))

// 请求聊天室消息
const { run } = useRequest(() => fetchGetMessage({ roomId: roomId.value }), { onSuccess: ({ data }) => list.value = data })
</script>

<style scoped>
.scrollbar-hidden::-webkit-scrollbar {
  display: none;
}
</style>

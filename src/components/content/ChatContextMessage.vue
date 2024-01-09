<template>
  <div flex flex-col-reverse flex-grow overflow-auto class="scrollbar-hidden">
    <template v-for="item in list" :key="item.messageId">
      <ChatMsgItem v-bind="item" mb-10 />
    </template>
  </div>
</template>

<script lang="ts" setup>
import { fetchGetMessage, type ChatMessageItem } from '@/apis';
import { RoomStore } from '@/stores';
import type { SendMessage} from '@/types/ws-res-data';
import { useWS } from '@/utils';
const list = ref<ChatMessageItem[]>([])

// 获取聊天室信息
const room = RoomStore()

// 监听是否切换房间
watch(room, () => { if (room.members.length !== 0) getMessage() })

// 请求聊天室消息
const { run: getMessage } = useRequest(() => fetchGetMessage({ roomId: room.room.roomId }), { onSuccess: ({ data }) => list.value = data.reverse() })

// 获取最新的消息
const { data: res } = useWS()
watch(res, () => {
  const resData: SendMessage= JSON.parse(res.value!)
  const { wsData, type, operation } = resData.data
  if (type === 'message' && operation === 'send' && wsData.roomId == room.room.roomId) {
    const { message, messageId, memberId, sendTime } = wsData
    list.value.unshift({ message, messageId, memberId, sendTime })
  }
})


</script>

<style scoped>
.scrollbar-hidden::-webkit-scrollbar {
  display: none;
}
</style>

<template>
  <div flex h-full md:p-8>
    <div flex w-full justify-center dark:bg-zinc-900 bg-gray-100 md:rounded-xl>
      <ChatList :class="$route.name !== 'main' ? ' max-md:hidden ' : ''" />
      <div flex flex-grow md:m-8 md:ml-0 md:rounded-xl dark:box-shadow-black box-shadow-white
        :class="$route.name === 'main' ? ' max-md:hidden ' : ''">
        <ChatContext v-if="room.room.roomId !== ''" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { RoomStore } from '@/stores';
import { useWS } from '@/utils';

// 创建WebSocket连接
const { send } = useWS()

// 当有房间显示聊天室，切换房间的更新聊天室
const route = useRoute()
const room = RoomStore()

// 获取房间id，并切换
const roomId = ref(route.params['id'] as string)
send(JSON.stringify({ data: { roomId: roomId.value ? roomId.value : null }, type: "room", operation: "switch" }))
if (roomId.value) room.room.roomId = roomId.value

watch(route, () => {
  roomId.value = route.params['id'] as string
  if (roomId) {
    room.room.roomId = roomId.value
    send(JSON.stringify({ data: { roomId: roomId.value }, type: "room", operation: "switch" }))
  }
})

// 注入全局依赖 用于修改信息时，局部更新
const refreshUser = ref(Date.now())
provide("refreshUser", refreshUser)
</script>

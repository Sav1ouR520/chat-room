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

// 当有房间显示聊天室，切换房间的更新聊天室
const route = useRoute()
const room = RoomStore()
if (route.params['id']) room.room.roomId = route.params['id'] as string
watch(route, () => room.room.roomId = route.params['id'] as string)

// 注入全局依赖 用于修改信息时，局部更新
const [refreshUser, refreshRoom] = [ref(Date.now()), ref(Date.now())]
provide("refreshUser", refreshUser)
provide("refreshRoom", refreshRoom)

// 创建WebSocket连接
useWS()
</script>

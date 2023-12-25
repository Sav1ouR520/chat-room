<template>
  <div flex flex-grow md:m-8 md:ml-0 md:rounded-xl dark:box-shadow-black box-shadow-white>
    <div flex flex-col w-full justify-between overflow-auto px-8 py-4 v-if="roomId" :key="roomId">
      <div flex justify-between items-center>
        <ChatCardInfo :name="room?.roomName" :icon="room?.roomIcon" />
        <ChatContextMoreOpt />
      </div>
      <ChatContextMessage :roomId="roomId" my-4 />
      <ChatContextSend max-md:mb-2 />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { fetchGetRoomInfo, type Room } from '@/apis';
const route = useRoute()
const roomId = ref(route.params['id'] as string)
const room = ref<Room>()
watch(route, () => {
  const id = route.params['id'] as string
  roomId.value = id !== roomId.value ? id : roomId.value
})
if (roomId.value) useRequest(fetchGetRoomInfo(roomId.value), { onSuccess: ({ data }) => room.value = data })

</script>

<template>
  <div flex flex-grow md:m-8 md:ml-0 md:rounded-xl dark:box-shadow-black box-shadow-white>
    <div flex flex-col w-full justify-between overflow-auto px-8 py-4 v-if="roomId" :key="roomId">
      <div flex justify-between items-center>
        <ChatCardInfo :name="room?.roomName" :icon="room?.roomIcon" cursor-pointer />
        <ChatContextMembers :roomId="roomId" />
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
const { run } = useRequest(fetchGetRoomInfo, { onSuccess: ({ data }) => room.value = data, manual: true })
watch(route, () => {
  const id = route.params['id'] as string
  roomId.value = id !== roomId.value ? id : roomId.value
  if (roomId.value !== "") run(roomId.value)
})
if (route.params['id'] && roomId.value === route.params['id']) run(roomId.value)
</script>

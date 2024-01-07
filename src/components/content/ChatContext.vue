<template>
  <div flex flex-col flex-grow justify-between px-8 py-4>
    <div flex items-center justify-between>
      <ChatRoomHeader />
      <ChatContextMembers />
    </div>
    <ChatContextMessage my-4 />
    <ChatContextSend />
  </div>
</template>
<script lang="ts" setup>
import { fetchGetOwnMemberInfo } from '@/apis';
import { RoomStore } from '@/stores';

// 更新聊天室的个人信息
const route = useRoute()
watch(route, () => run())

// 请求用户在聊天室的个人信息
const room = RoomStore()
const { run } = useRequest(() => fetchGetOwnMemberInfo({ roomId: room.room.roomId }), {
  onSuccess: ({ data }) => room.setMember(data)
})

</script>

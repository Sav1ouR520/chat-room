<template>
  <div flex flex-grow w-full px-8 pt-0 py-8 overflow-auto :class="list.length !== 0 ? 'mb-8 mt-4' : ''"
    class="scrollbar-hidden">
    <div v-if="!list.length" flex-grow dark:box-shadow-black box-shadow-white rounded-xl mt-8> </div>
    <VueDraggable v-else ref="el" v-model="list" :animation="150" mt-4 flex-grow>
      <template v-for="item in list" :key=item.roomId>
        <ChatListItem mb-5 v-bind="item" @click="$router.push('/main/' + item.roomId)" />
      </template>
    </VueDraggable>
  </div>
</template>

<script setup lang="ts">
import { fetchGetList, type ChatListItem } from '@/apis';
import { useWS } from '@/utils';
import { VueDraggable } from 'vue-draggable-plus'

// 获取聊天室列表
const list = reactive<ChatListItem[]>([])
const query = ref("")
const { run } = useRequest((roomName?: string) => fetchGetList({ roomName }), { onSuccess: ({ data }) => (list.splice(0, list.length), list.push(...data)) })

// 获取全局注入 refreshRoom
const refreshRoom = inject<Ref<number>>('refreshRoom', ref(Date.now()))

// 当修改房间信息时候更新列表信息
watch(refreshRoom, () => query.value !== '' ? run(query.value) : run())
watch(query, () => query.value !== '' ? run(query.value) : run())

// 从全局事件总线获取roomName
const instance = getCurrentInstance()
instance!.proxy!.$Bus.on("room-name", (roomName: any) => query.value = roomName)


// 获取最新的消息
const { data: res } = useWS()
watch(res, () => {
  const data = JSON.parse(res.value!)
  if (data['data']['type'] === 'message') {
    const room = list.find(item => item.roomId === data['data']['roomId'])
    room!.message = {
      messageId: data['data']['message']['messageId'],
      message: data['data']['message']['message'],
      memberName: data['data']['message']['member']['memberName'],
      memberId: data['data']['message']['member']['memberId'],
      sendTime: data['data']['message']['sendTime'],
    }
  }
})
</script>

<style scoped>
.scrollbar-hidden::-webkit-scrollbar {
  display: none;
}
</style>

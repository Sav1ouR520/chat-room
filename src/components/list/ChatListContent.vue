<template>
  <div w-full overflow-auto py-2 px-8 class="scrollbar-hidden">
    <VueDraggable ref="el" v-model="list" :animation="150">
      <template v-for="item in list" :key=item.roomId>
        <ChatListItem mb-5 v-bind="item" @click="$router.push('/main/' + item.roomId)" />
      </template>
    </VueDraggable>
  </div>
</template>

<script setup lang="ts">
import { fetchGetList, type ChatList } from '@/apis';
import { VueDraggable } from 'vue-draggable-plus'

// 获取聊天室列表
const list = ref<ChatList>([])
const query = ref("")
const { run } = useRequest((roomName?: string) => fetchGetList({ roomName }), { onSuccess: ({ data }) => list.value = data })

// 获取全局注入 refreshRoom
const refreshRoom = inject<Ref<number>>('refreshRoom', ref(Date.now()))

// 当修改房间信息时候更新列表信息
watch(refreshRoom, () => query.value !== '' ? run(query.value) : run())
watch(query, () => query.value !== '' ? run(query.value) : run())

// 从全局事件总线获取roomName
const instance = getCurrentInstance()
instance!.proxy!.$Bus.on("room-name", (roomName: any) => query.value = roomName)
</script>

<style scoped>
.scrollbar-hidden::-webkit-scrollbar {
  display: none;
}
</style>

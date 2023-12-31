<template>
  <div flex flex-col items-center my-8 :class="$route.name === 'main' ? 'max-md:w-full' : ''">
    <ChatListHeader mb-4 @getValue="getValue" w-75 />
    <div w-full overflow-auto py-2 px-8 class="scrollbar-hidden">
      <VueDraggable ref="el" v-model="list" :animation="150">
        <template v-for="item in list" :key=item.roomId>
          <ChatListItem mb-5 v-bind="item" @click="$router.push('/main/' + item.roomId)" />
        </template>
      </VueDraggable>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { fetchGetList, type ChatList } from '@/apis';
import { VueDraggable } from 'vue-draggable-plus'

// 获取聊天室列表
const list = ref<ChatList>([])
const query = ref("")
const { run } = useRequest((roomName?: string) => fetchGetList({ roomName }), { onSuccess: ({ data }) => list.value = data })
const getValue = (value: string) => value !== "" ? (query.value = value, run(value)) : run()

// 获取全局注入 refreshRoom
const refreshRoom = inject<Ref<number>>('refreshRoom', ref(Date.now()))

// 当修改房间信息时候更新列表信息
watch(refreshRoom, () => query.value !== '' ? run(query.value) : run())
</script>

<style scoped>
.scrollbar-hidden::-webkit-scrollbar {
  display: none;
}
</style>

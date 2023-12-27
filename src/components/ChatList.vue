<template>
  <div flex flex-col justify-between items-center my-8 :class="$route.name === 'main' ? 'max-md:w-full' : ''">
    <div w-full mb-4 px-8>
      <ChatListHeader md:w-75 @getValue="getValue" />
    </div>
    <div w-full overflow-auto mb-8 py-2 px-8 class="scrollbar-hidden">
      <VueDraggable ref="el" v-model="list" :animation="150">
        <template v-for="item in list" :key=item.roomId>
          <ChatListItem mb-5 v-bind="item" @click="$router.push('/main/' + item.roomId)" />
        </template>
      </VueDraggable>
    </div>
    <ChatListFooter />
  </div>
</template>

<script lang="ts" setup>
import { fetchGetList, type ChatList } from '@/apis';
import { VueDraggable } from 'vue-draggable-plus'

//  获取列表
const list = ref<ChatList>([])
const { run } = useRequest((value?: string) => fetchGetList({ roomName: value }), { onSuccess: ({ data }) => list.value = data })
const getValue = (value: string) => value !== "" ? run(value) : run()

</script>

<style scoped>
.scrollbar-hidden::-webkit-scrollbar {
  display: none;
}
</style>

<template>
  <div flex flex-col justify-between items-center my-8 :class="$route.name === 'main' ? 'max-md:w-full' : ''">
    <div w-full mb-4 px-8>
      <ChatListHeader md:w-70 />
    </div>
    <div w-full overflow-auto mb-8 py-2 px-8 class="scrollbar-hidden">
      <VueDraggable ref="el" v-model="list" :animation="150">
        <template v-for="(item, index) in list" :key=index>
          <ChatListItem mb-5 :info="item" @click="$router.push('/main/' + item.roomId)" />
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
useRequest(fetchGetList, { onSuccess: ({ data }) => list.value = data })
</script>
<style scoped>
.scrollbar-hidden::-webkit-scrollbar {
  display: none;
}
</style>

<template>
  <div relative>
    <div ml-4 h-12 w-12 flex justify-center items-center ref="box">
      <Icon-ep:more-filled text-6 cursor-pointer />
    </div>
    <div absolute right-0 dark:bg-zinc-800 w-60 rounded-xl ref="info" v-show="show">
      <div h-100 overflow-auto class="scrollbar-hidden" my-2>
        <template v-for="item in list" :key=item.memberId>
          <ChatMemberItem v-bind=item />
        </template>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { fetchGetMember, type MemberList } from '@/apis';

// 获取聊天室成员列表
const list = ref<MemberList>([])
const props = defineProps<{ roomId: string }>()
useRequest(() => fetchGetMember({ roomId: props.roomId }), { onSuccess: ({ data }) => list.value = data })

// 浮动的成员列表
const info = ref()
const box = ref()
const { isOutside: infoIsOutSide } = useMouseInElement(info)
const { isOutside: boxIsOutSide } = useMouseInElement(box)
const show = ref(false)
watch(infoIsOutSide, () => show.value = !infoIsOutSide.value)
watch(boxIsOutSide, () => show.value = boxIsOutSide.value && infoIsOutSide.value ? false : true)
</script>

<style scoped>
.scrollbar-hidden::-webkit-scrollbar {
  display: none;
}
</style>

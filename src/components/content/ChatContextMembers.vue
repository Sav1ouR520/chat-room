<template>
  <div relative>
    <div ml-4 h-12 w-12 flex justify-center items-center ref="box">
      <Icon-ep:more-filled text-6 cursor-pointer />
    </div>
    <div absolute right-0 dark:bg-zinc-800 bg-gray-200 w-60 rounded-xl ref="info" v-show="show">
      <div flex justify-between p-2 pb-0>
        <div><span>{{ $t('main.member') }}</span></div>
        <div v-show="!modify" @click="modifyToggle()">
          <span cursor-pointer><Icon-mdi:pencil /></span>
        </div>
        <div flex items-center v-show="modify">
          <span cursor-pointer mr-1 @click="reverseToggle()"><Icon-system-uicons:reverse-alt /></span>
          <span cursor-pointer mr-1 @click="modifyToggle()"><Icon-mdi:cancel-outline /></span>
          <span cursor-pointer @click="sumbit()"><Icon-mdi:check-outline /></span>
        </div>
      </div>
      <div h-100 overflow-auto class="scrollbar-hidden" my-2>
        <template v-for="item in list" :key=item.memberId>
          <ChatMemberItem v-bind=item :modify=modify :reverse=reverse @member="getMemberId" />
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { fetchDeleteMember, fetchGetMember, type Member } from '@/apis';
import { useToast } from 'vue-toastification';

const toast = useToast();

// 获取聊天室Id
const roomId = useRoute().params['id'] as string

// 获取聊天室成员列表
const list = reactive<Member[]>([])
const { run: getMemeber, } = useRequest(() => fetchGetMember({ roomId }), {
  onSuccess: ({ data }) => {
    list.splice(0, list.length)
    list.push(...data)
  }
})

// 浮动的成员列表
const [info, box] = [ref(), ref()]
const { isOutside: infoIsOutSide } = useMouseInElement(info)
const { isOutside: boxIsOutSide } = useMouseInElement(box)
const show = ref(false)
watch(infoIsOutSide, () => show.value = !infoIsOutSide.value)
watch(boxIsOutSide, () => show.value = boxIsOutSide.value && infoIsOutSide.value ? false : true)

// 开启修改功能
const [modify, modifyToggle] = useToggle()
const [reverse, reverseToggle] = useToggle()

// 获取修改的成员列表
const members = reactive<string[]>([])
const getMemberId = (member: { memberId: string, value: boolean }) =>
  member.value ? members.push(member.memberId) : members.splice(members.indexOf(member.memberId), 1)

// 提交修改
const { run: deleteMemebr } = useRequest(fetchDeleteMember, {
  onSuccess: ({ data, message }) =>
    data.verify ? (modifyToggle(), toast.success(message), getMemeber()) : toast.error(message)
  , manual: true
})

// 提交修改，如果数组为0就直接关闭
const sumbit = () => members.length != 0 ? deleteMemebr({ members, roomId }) : modifyToggle()
</script>

<style scoped>
.scrollbar-hidden::-webkit-scrollbar {
  display: none;
}
</style>

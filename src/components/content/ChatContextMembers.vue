<template>
  <div relative>
    <div ml-4 h-12 w-12 flex justify-center items-center ref="box">
      <Icon-ep:more-filled text-6 cursor-pointer />
    </div>
    <div absolute right--8 top--4 dark:bg-zinc-800 bg-gray-200 w-60 px-2 rounded-xl ref="info" v-show="show">
      <div flex items-center justify-between px-2 mt-2>
        <div>{{ $t('main.member') }}</div>
        <div v-show="!modify" @click="modifyToggle()">
          <span cursor-pointer><Icon-mdi:pencil /></span>
        </div>
        <div flex items-center v-show="modify">
          <span cursor-pointer mr-1 @click="reverseToggle()"><Icon-system-uicons:reverse-alt /></span>
          <span cursor-pointer mr-1 @click="modifyToggle()"><Icon-mdi:cancel-outline /></span>
          <span cursor-pointer @click="sumbit()"><Icon-mdi:check-outline /></span>
        </div>
      </div>
      <div max-h-100 overflow-auto class="scrollbar-hidden" mb-2>
        <template v-for="item in room.members" :key=item.memberId>
          <ChatMemberItem v-bind=item :modify=modify :reverse=reverse @member="getMemberId" />
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { fetchDeleteMember, fetchGetMemberList } from '@/apis';
import { RoomStore } from '@/stores';
import type { UpdateMemeberIcon } from '@/types/ws-res-data';
import { useWS } from '@/utils';

// 获取聊天室信息
const room = RoomStore()

// 监听是否切换房间
const route = useRoute()
watch(route, () => getMemeber())

// 获取聊天室成员列表
const { run: getMemeber } = useRequest(() => fetchGetMemberList({ roomId: room.room.roomId }), { onSuccess: ({ data }) => (room.setMembers(data)) })

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
  onSuccess: ({ action }) => { if (action) { modifyToggle(), getMemeber() } }
  , manual: true
})

// 获取最新的消息
const { data: res } = useWS()
watch(res, () => {
  const resData: UpdateMemeberIcon = JSON.parse(res.value!)
  const { wsData, type, operation } = resData.data
  if (type === 'member' && operation === 'updateIcon') {
    const index = room.members.findIndex(item => item.user.userId === wsData.userId)
    if (index >= 0) room.members[index].user.userIcon = wsData.userIcon
  }
})

// 提交修改，如果数组为0就直接关闭
const sumbit = () => members.length != 0 ? deleteMemebr({ members, roomId: room.room.roomId }) : modifyToggle()
</script>

<style scoped>
.scrollbar-hidden::-webkit-scrollbar {
  display: none;
}
</style>

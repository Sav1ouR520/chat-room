<template>
  <div flex items-center @click="active = true">
    <div rounded-full w-12 h-12 overflow-hidden bg-white><img :src="room.room.roomIcon" w-full h-full></div>
    <span mx-4 h-12 flex items-center text-xl truncate>{{ room.room.roomName }}</span>
  </div>
  <Teleport to="#app">
    <KeepAlive :key="refresh">
      <ChatDialog :className="'md:w-3/5 max-md:w-full  max-md:mx-4 max-w-180'" :title="$t(`main.room_diglog_title`)"
        v-if="active" @close="close">
        <ChatModifyInfo v-bind="modify" :icon="room.room.roomIcon" @close="close">
          <ChatModifyRoom @close="close" />
        </ChatModifyInfo>
      </ChatDialog>
    </KeepAlive>
  </Teleport>
</template>
<script setup lang="ts">
import { fetchModifyRoom, fetchGetRoomInfo } from '@/apis';
import { RoomStore } from '@/stores';
import type { UpdateRoomIcon } from '@/types/ws-res-data';
import { useWS } from '@/utils';

// 获取聊天室信息
const room = RoomStore()

// 监听是否切换房间
const route = useRoute()
watch(route, () => (getRoom(), modify.value.params.roomId = room.room.roomId))

// 请求房间信息信息
const { run: getRoom } = useRequest(() => fetchGetRoomInfo(room.room.roomId), { onSuccess: ({ data }) => room.setRoom(data) })

// 设置上传图片的属性
const modify = ref({ "fetchModify": fetchModifyRoom, type: "room", "name": 'roomIcon', "formIcon": 'roomIcon', 'params': { roomId: room.room.roomId } })

//激活弹窗
const active = ref(false)

//刷新缓存组件
const refresh = ref(Date.now())

// 关闭弹窗
const close = (value: string) => {
  active.value = false
  value === 'inside' && (refresh.value = Date.now())
}

// 获取最新的消息
const { data: res } = useWS()
watch(res, () => {
  const resData: UpdateRoomIcon = JSON.parse(res.value!)
  const { wsData, type, operation } = resData.data
  if (type === "room" && operation === "updateIcon") {
    if (room.room.roomId === wsData.roomId) {
      room.room.roomIcon = wsData.roomIcon
    }
  }
})
</script>

<template>
  <div flex w-full>
    <div flex flex-grow justify-center items-center p-2 py-3 rounded dark:box-shadow-black box-shadow-white m-8 mb-0>
      <div relative flex justify-center items-center h-8 w-8 rounded dark:border-slate-700 ref="box">
        <div rounded-full overflow-hidden bg-white h-8 w-8 @click="activeUser = true">
          <img :src=userIcon w-full h-full>
        </div>
        <ChatListUserDiglog @icon="getIcon" />
      </div>
      <div mx-2 h-8 flex-grow>
        <input type="text" rounded w-full h-full bg-inherit border-2 v-model="roomName"
          :placeholder="$t('main.search_placeholder')">
      </div>
      <div flex justify-center items-center h-8 w-8 rounded dark:border-slate-700 cursor-pointer
        @click="activeRoom = true">
        <Icon-ic:baseline-plus text-5 />
      </div>
      <ChatRoomDiglog />
    </div>
  </div>
</template>

<script setup lang="ts">
// 传递筛选的组名
const roomName = ref("")

// 搜索房间 通过全局事件总线去通知
const instance = getCurrentInstance()
watch(roomName, () => instance!.proxy!.$Bus.emit("room-name", roomName.value))

// 弹窗激活，并注入全局
const [activeRoom, activeUser] = [ref(false), ref(false)]
provide("activeRoom", activeRoom)
provide("activeUser", activeUser)


// 获取用户头像
const userIcon = ref("")
const getIcon = (icon: string) => userIcon.value = icon
</script>

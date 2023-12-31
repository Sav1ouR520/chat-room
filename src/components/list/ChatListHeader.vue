<template>
  <div flex justify-center items-center p-2 rounded dark:box-shadow-black box-shadow-white mx-8>
    <div relative flex justify-center items-center h-8 w-8 rounded dark:border-slate-700 ref="box">
      <div rounded-full overflow-hidden bg-white h-8 w-8 @click="activeUser = true">
        <img :src=userIcon>
      </div>
      <ChatListUserDiglog @icon="getIcon" />
    </div>
    <div mx-2 h-8>
      <input type="text" rounded w-full h-full bg-inherit border-2 v-model="roomName"
        :placeholder="$t('main.search_placeholder')">
    </div>
    <div flex justify-center items-center h-8 w-8 rounded dark:border-slate-700 cursor-pointer @click="activeRoom = true">
      <Icon-ic:baseline-plus text-5 />
    </div>
    <ChatRoomDiglog />
  </div>
</template>

<script setup lang="ts">
// 传递筛选的组名
const roomName = ref("")

// 搜索房间
const emit = defineEmits<{ getValue: [value: string] }>()
watch(roomName, () => emit('getValue', roomName.value))

// 弹窗激活，并注入全局
const [activeRoom, activeUser] = [ref(false), ref(false)]
provide("activeRoom", activeRoom)
provide("activeUser", activeUser)

const userIcon = ref('')
const getIcon = (icon: string) => userIcon.value = icon
</script>

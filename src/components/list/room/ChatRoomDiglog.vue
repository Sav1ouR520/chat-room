<template>
  <Teleport to="#app">
    <KeepAlive :key="refresh">
      <ChatDialog :className="'md:w-100 max-md:w-full max-md:mx-4 '"
        :title="$t(`main.${value ? 'creation' : 'invitation'}_diglog_title`)" v-if="active" @close="close">
        <KeepAlive :key="refresh">
          <ChatAddRoom v-if="value" @close="close">
            <button ml-4 bg-green-500 text-white px-2 rounded @click="toggle()">{{ $t('main.switch_button')
            }}</button>
          </ChatAddRoom>
          <ChatJoinRoom v-else @close="close">
            <button ml-4 bg-green-500 text-white px-2 rounded @click="toggle()">{{ $t('main.switch_button')
            }}</button>
          </ChatJoinRoom>
        </KeepAlive>
      </ChatDialog>
    </KeepAlive>
  </Teleport>
</template>

<script setup lang="ts">
// 切换创建/加入房间
const [value, toggle] = useToggle()

//刷新缓存组件
const refresh = ref(Date.now())

// 获取全局room的激活弹窗
const active = inject<Ref<boolean>>('activeRoom')

// 获取全局注入 refreshRoom
const refreshRoom = inject<Ref<number>>('refreshRoom', ref(Date.now()))


// 关闭弹窗
const close = (value: string) => {
  active!.value = false
  if (value === 'inside' || value === 'update') refresh.value = Date.now()
  value === 'update' && (refreshRoom.value = Date.now())
}
</script>

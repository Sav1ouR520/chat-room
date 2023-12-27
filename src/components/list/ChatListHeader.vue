<template>
  <div flex justify-center items-center p-2 rounded dark:box-shadow-black box-shadow-white>
    <div relative flex justify-center items-center h-8 w-8 rounded dark:border-slate-700>
      <div text-3 font-bold ref="box">{{ $t('main.list_header_title') }}</div>
      <ChatSetting ref="setting" v-if="show" />
    </div>
    <div h-8 flex-grow mx-2>
      <input type="text" rounded w-full h-full bg-inherit border-2 v-model="roomName"
        :placeholder="$t('main.search_placeholder')">
    </div>
    <div flex justify-center items-center h-8 w-8 rounded dark:border-slate-700 cursor-pointer @click="active = true">
      <Icon-ic:baseline-plus text-5 />
    </div>
    <Teleport to="#app">
      <KeepAlive :key="refresh">
        <ChatDialog :className="'md:w-100 max-md:w-full max-md:mx-4 '"
          :title="$t(`main.${value ? 'creation' : 'invitation'}_diglog_title`)" v-if="active" @close="close">
          <KeepAlive :key="refresh">
            <ChatCreateRoom v-if="value" @close="close">
              <button ml-4 bg-green-500 text-white px-2 rounded @click="toggle()">{{ $t('main.switch_button') }}</button>
            </ChatCreateRoom>
            <ChatJoinRoom v-else @close="close">
              <button ml-4 bg-green-500 text-white px-2 rounded @click="toggle()">{{ $t('main.switch_button') }}</button>
            </ChatJoinRoom>
          </KeepAlive>
        </ChatDialog>
      </KeepAlive>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
// 传递筛选的组名
const roomName = ref("")
const emit = defineEmits<{ getValue: [value: string] }>()
watch(roomName, () => emit('getValue', roomName.value))

// 切换创建/加入房间
const [value, toggle] = useToggle()

//激活弹窗
const active = ref(false)

//刷新缓存组件
const refresh = ref(Date.now())

// 关闭弹窗
const close = (value: string) => {
  active.value = false
  refresh.value = value === 'inside' ? Date.now() : refresh.value
}

// 浮动设置
const setting = ref()
const box = ref()
const { isOutside: settingIsOutSide } = useMouseInElement(setting)
const { isOutside: boxIsOutSide } = useMouseInElement(box)
const show = ref(false)
watch(settingIsOutSide, () => show.value = !settingIsOutSide.value)
watch(boxIsOutSide, () => show.value = !boxIsOutSide.value ? !boxIsOutSide.value : show.value)
</script>

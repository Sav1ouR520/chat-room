<template>
  <div px-8 w-full relative>
    <div dark:box-shadow-black box-shadow-white p-2 rounded-xl ref="box" @click="active = true">
      <ChatCardInfo :name="user?.userName" :icon="user?.userIcon" cursor-pointer />
    </div>
    <HoverUserInfo :account="user?.account" :register-time="user?.registerTime" ref="info" v-show="show" />
    <Teleport to="#app">
      <KeepAlive :key="refresh">
        <ChatDialog :className="'md:w-3/5 max-md:w-full  max-md:mx-4 max-w-180'" :title="$t(`main.user_diglog_title`)"
          v-if="active" @close="close">
          <ChatUserInfo :icon="user?.userIcon" @close="close">
            <ChatModifyPwd v-if="value" @close="close">
              <button ml-4 bg-green-500 text-white px-2 rounded @click="toggle()">{{ $t('main.switch_button')
              }}</button>
            </ChatModifyPwd>
            <ChatModifyName :userName="user?.userName" @close="close" v-else>
              <button ml-4 bg-green-500 text-white px-2 rounded @click="toggle()">{{ $t('main.switch_button')
              }}</button>
            </ChatModifyName>
          </ChatUserInfo>
        </ChatDialog>
      </KeepAlive>
    </Teleport>
  </div>
</template>

<script lang="ts" setup>
import { fetchUserInfo, type UserInfo } from '@/apis';

// 获取当前账号的信息
const user = ref<UserInfo>()
useRequest(fetchUserInfo, { onSuccess: ({ data }) => user.value = data })

// 浮动的用户信息提示
const info = ref()
const box = ref()
const { isOutside: infoIsOutSide } = useMouseInElement(info)
const { isOutside: boxIsOutSide } = useMouseInElement(box)
const show = ref(false)
watch(infoIsOutSide, () => show.value = !infoIsOutSide.value)
watch(boxIsOutSide, () => show.value = !boxIsOutSide.value ? !boxIsOutSide.value : show.value)

// 切换修改用户名/密码
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
</script>

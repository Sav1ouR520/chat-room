<template>
  <Teleport to="#app">
    <KeepAlive :key="refresh">
      <ChatDialog :className="'md:w-3/5 max-md:w-full  max-md:mx-4 max-w-180'" :title="$t(`main.user_diglog_title`)"
        v-if="active" @close="close">
        <ChatModifyInfo v-bind="modify" @close="close">
          <ChatModifyPwd v-if="value" @close="close">
            <button ml-4 font-bold bg-green-500 text-white px-2 rounded @click="toggle()">{{
              $t('main.switch_button')
            }}</button>
          </ChatModifyPwd>
          <ChatModifyUser v-bind="user?.data" @close="close" v-else>
            <button ml-4 font-bold bg-green-500 text-white px-2 rounded @click="toggle()">{{
              $t('main.switch_button')
            }}</button>
          </ChatModifyUser>
        </ChatModifyInfo>
      </ChatDialog>
    </KeepAlive>
  </Teleport>
</template>

<script lang="ts" setup>
import { fetchModifyUser, fetchUserInfo } from '@/apis';

// 获取当前账号的信息
const { data: user, run } = useRequest(fetchUserInfo, { onSuccess: ({ data }) => (modify.value.icon = data.userIcon, emit('icon', data.userIcon)) })

// 设置上传图片的属性
const modify = ref({ "fetchModify": fetchModifyUser, type: "user", "name": "userIcon", "icon": "", "formIcon": 'userIcon' })

// 切换修改用户名/密码
const [value, toggle] = useToggle()

// 获取全局user的激活弹窗
const active = inject<Ref<boolean>>('activeUser')

//刷新缓存组件
const refresh = ref(Date.now())

// 关闭弹窗
const close = (value: string) => {
  active!.value = false
  if (value === 'inside' || value === 'update') refresh.value = Date.now()
  value === 'update' && (run(), emit('icon', modify.value.icon))
}
const emit = defineEmits<{ icon: [string] }>()
</script>

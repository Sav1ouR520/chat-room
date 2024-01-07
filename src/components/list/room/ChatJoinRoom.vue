<template>
  <InputItem v-bind="vaild" />
  <div flex>
    <ButtonItem flex-grow :readying="readying" :name="$t('main.invitation_button')" @click="onSubmit" />
    <slot />
  </div>
</template>

<script setup lang="ts">
import { type JoinRoomRequest, fetchJoinRoom } from '@/apis';
import { type InputAttr } from '@/types';

import * as yup from "yup"
const { t } = useI18n()

// 获取全局room的激活弹窗
const active = inject<Ref<boolean>>('activeRoom')

// 设置input属性
const vaild: InputAttr = { id: "main", name: "invitation", type: "text", position: 'left' }

// 输入验证
const { handleSubmit, resetForm } = useForm<JoinRoomRequest>({
  validationSchema: yup.object({
    invitation: yup.string().required(() => t("main.invitation_empty")),
  }),
})

// 按钮防止过频繁点击
const [readying, toggle] = useToggle()

// 手动触发网络请求，并在成功后重置表单
const { run } = useRequest(fetchJoinRoom, {
  onSuccess: ({ action }) => { if (action) { emit('close', 'update'), active!.value = false, resetForm() } },
  onFinally: () => toggle(), manual: true
})

// 验证表单 成功就发送请求
const onSubmit = handleSubmit((values) => (toggle(), run(values)))

// 向父组件发送关闭消息
const emit = defineEmits<{ close: ['update'] }>()
</script>


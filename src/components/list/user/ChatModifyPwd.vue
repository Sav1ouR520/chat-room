<template>
  <div flex flex-col h-full>
    <div flex-grow>
      <div flex justify-center items-center mb-4>{{ $t('main.modify_password_title') }}</div>
      <InputItem v-bind="password" />
      <InputItem v-bind="newPassword" />
    </div>
    <div flex>
      <ButtonItem flex-grow :readying="readying" :name="$t('main.submit_button')" @click="onSubmit" />
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { fetchModifyUser } from '@/apis';
import type { InputAttr } from '@/types';
import { password_valid } from '@/utils';
import { useToast } from 'vue-toastification';

import * as yup from "yup"
const { t } = useI18n()
const toast = useToast();

// 获取全局user的激活弹窗
const active = inject<Ref<boolean>>('activeUser')


// 按钮防止过频繁点击
const [readying, toggle] = useToggle()

// 设置input属性
const password: InputAttr = { id: "main", name: 'password', type: 'password', position: 'left' }
const newPassword: InputAttr = { id: "main", name: 'new_password', type: 'password', position: 'left' }

// 表单认证
const { handleSubmit, resetForm } = useForm<{ password: string, new_password: string }>({
  validationSchema: yup.object({
    password: yup.string().required(() => t('main.password_error_empty')),
    new_password: yup.string().required(() => t('main.new_password_error_empty')).matches(password_valid, () => t('main.new_password_error_strength')),
  })
})

// 手动触发网络请求，并在成功后重置表单
const { run } = useRequest(fetchModifyUser, {
  onSuccess: ({ data, message }) =>
    data.verify ?
      (toast.success(message), active!.value = false, emit('close', 'inside'), resetForm()) :
      toast.error(message)
  , onFinally: () => toggle(), manual: true
})

// 验证表单 成功就发送请求
const onSubmit = handleSubmit((values) => (toggle(), run(values)))

// 向父组件发送关闭消息
const emit = defineEmits<{ close: ['inside'] }>()
</script>

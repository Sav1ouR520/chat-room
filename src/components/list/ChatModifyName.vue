<template>
  <div w-full>
    <div flex justify-center items-center h-16>{{ $t('main.modify_userName_title') }}</div>
    <InputItem v-bind="form.userName" />
  </div>
  <div flex>
    <ButtonItem flex-grow :readying="readying" :name="$t('main.submit_button')" @click="onSubmit" />
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { fetchModifyUser } from '@/apis';
import type { InputAttr } from '@/types';
import { useToast } from 'vue-toastification';

import * as yup from "yup"
const { t } = useI18n()
const toast = useToast();

// 获取用户名
const props = withDefaults(defineProps<{ userName: string }>(), { userName: "" })

// 按钮防止过频繁点击
const [readying, toggle] = useToggle()

// 设置input属性
const form: { userName: InputAttr } = { userName: { id: "main", name: 'userName', type: 'text', position: 'left' } }

// 表单认证
const { handleSubmit, resetForm, setFieldValue } = useForm<{ userName: string }>({
  validationSchema: yup.object({ userName: yup.string().required(() => t("main.userName_error_empty")).max(20, () => t("main.userName_error_length")) })
})

// 设置用户名默认值
setFieldValue('userName', props.userName)

// 手动触发网络请求，并在成功后重置表单
const { run } = useRequest(fetchModifyUser, {
  onSuccess: ({ data, message }) => {
    if (data.verify) {
      toast.success(message)
      resetForm()
      useTimeoutFn(() => emit('close', 'inside'), 1000)
    } else {
      toast.error(message)
    }
  },
  onFinally: () => toggle()
  , manual: true
})

// 验证表单 成功就发送请求
const onSubmit = handleSubmit((value) => {
  toggle()
  run(value)
})

// 向父组件发送关闭消息
const emit = defineEmits<{ close: ['inside'] }>()
</script>

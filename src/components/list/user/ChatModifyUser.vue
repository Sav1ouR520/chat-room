<template>
  <div flex flex-col h-full>
    <div flex-grow font-bold>
      <div flex justify-center items-center mb-2>{{ $t('main.modify_userName_title') }}</div>
      <InputItem v-bind="form.userName" />
      <div flex justify-between items-center border-2 bg-gray-300 dark:bg-gray-500 rounded px-2 py-1 w-full mb-4>
        <div mr-4>{{ $t('main.account') }}</div>
        <div>{{ account }}</div>
      </div>
      <div flex justify-between items-center border-2 bg-gray-300 dark:bg-gray-500 rounded px-2 py-1 w-full mb-4>
        <div mr-4> {{ $t('main.register_time') }}</div>
        <div>{{ dayjs(registerTime).format("YYYY-MM-DD hh:MM:ss") }}</div>
      </div>
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
import dayjs from 'dayjs';
import { useToast } from 'vue-toastification';

import * as yup from "yup"
const { t } = useI18n()
const toast = useToast();

// 获取全局user的激活弹窗
const active = inject<Ref<boolean>>('activeUser')

// 获取用户名
const props = withDefaults(defineProps<{ userName: string, account: string, registerTime: Date | string }>(),
  { userName: "", registerTime: "", account: "" })

// 按钮防止过频繁点击
const [readying, toggle] = useToggle()

// 设置input属性
const form: { userName: InputAttr } = { userName: { id: "main", name: 'userName', type: 'text', position: 'top' } }

// 表单认证
const { handleSubmit, resetForm, setFieldValue } = useForm<{ userName: string }>({
  validationSchema: yup.object({ userName: yup.string().required(() => t("main.userName_error_empty")).max(20, () => t("main.userName_error_length")) })
})

// 设置用户名默认值
setFieldValue('userName', props.userName)

// 手动触发网络请求，并在成功后重置表单
const { run } = useRequest(fetchModifyUser, {
  onSuccess: ({ data, message }) =>
    data.verify ?
      (toast.success(message), resetForm(), emit('close', 'update'), active!.value = false) :
      toast.error(message)
  , onFinally: () => toggle(), manual: true
})

// 验证表单 成功就发送请求
const onSubmit = handleSubmit((value) => (toggle(), run(value)))

// 向父组件发送关闭消息
const emit = defineEmits<{ close: ['update'] }>()
</script>

<template>
  <div w-full>
    <div flex justify-center items-center h-16>{{ $t('main.modify_room_title') }}</div>
    <InputItem v-bind="form.roomName" />
  </div>
  <div flex>
    <ButtonItem flex-grow :readying="readying" :name="$t('main.submit_button')" @click="onSubmit" />
  </div>
</template>

<script lang="ts" setup>
import { fetchModifyRoom } from '@/apis';
import type { InputAttr } from '@/types';
import { useToast } from 'vue-toastification';

import * as yup from "yup"
const { t } = useI18n()
const toast = useToast();

// 获取聊天室Id
const route = useRoute()
const roomId = ref(route.params['id'] as string)

// 获取聊天室名
const props = withDefaults(defineProps<{ roomName: string }>(), { roomName: "" })

// 按钮防止过频繁点击
const [readying, toggle] = useToggle()

// 设置input属性
const form: { roomName: InputAttr } = { roomName: { id: "main", name: 'roomName', type: 'text', position: 'left' } }

// 表单认证
const { handleSubmit, resetForm, setFieldValue } = useForm<{ roomName: string }>({
  validationSchema: yup.object({
    roomName: yup.string().required(() => t('main.roomName_error_empty')).max(20, () => t('main.roomName_error_empty'))
  })
})

// 设置聊天室名默认值
setFieldValue('roomName', props.roomName)

// 手动触发网络请求，并在成功后重置表单
const { run } = useRequest(fetchModifyRoom, {
  onSuccess: ({ data, message }) =>
    data.verify ? (toast.success(message), emit('close', 'inside'),  resetForm()) : toast.error(message)
  , onFinally: () => toggle()
  , manual: true
})

// 验证表单 成功就发送请求
const onSubmit = handleSubmit((values) => (toggle(), run({ ...values, roomId: roomId.value })))

// 向父组件发送关闭消息
const emit = defineEmits<{ close: ['inside'] }>()
</script>

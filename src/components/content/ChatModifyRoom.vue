<template>
  <div flex flex-col h-full>
    <div flex-grow font-bold>
      <div flex justify-center items-center mb-2>{{ $t('main.modify_room_title') }}</div>
      <InputItem v-bind="form.roomName" />
      <div flex justify-between items-center border-2 bg-gray-300 dark:bg-gray-500 rounded px-2 py-1 w-full mb-4>
        <div mr-4>{{ $t('main.room_owner') }}</div>
        <div flex items-center flex-col>
          <span text-2.5>{{ room.room.owner.memberName }}</span>
          <span text-1.5>{{ room.room.owner.memberId }}</span>
        </div>
      </div>
      <div flex justify-between items-center border-2 bg-gray-300 dark:bg-gray-500 rounded px-2 py-1 w-full mb-4>
        <div mr-4> {{ $t('main.room_created_time') }}</div>
        <div>{{ dayjs(room.room.createdTime).format("YYYY-MM-DD hh:MM:ss") }}</div>
      </div>
    </div>
    <div flex>
      <ButtonItem flex-grow :readying="readying" :name="$t('main.submit_button')" @click="onSubmit" />
      <button ml-4 bg-gray-800 font-bold text-white px-2 rounded @click="onDelete">{{ $t('main.delete_button') }}</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { fetchDeleteRoom, fetchModifyRoom, } from '@/apis';
import type { InputAttr } from '@/types';
import { useToast } from 'vue-toastification';
import dayjs from 'dayjs';

import * as yup from "yup"
import { RoomStore } from '@/stores';
const { t } = useI18n()
const toast = useToast();
const router = useRouter()

// 获取聊天室信息
const room = RoomStore()

// 按钮防止过频繁点击
const [readying, toggle] = useToggle()

// 设置input属性
const form: { roomName: InputAttr } = { roomName: { id: "main", name: 'roomName', type: 'text', position: 'top' } }

// 表单认证
const { handleSubmit, resetForm, setFieldValue } = useForm<{ roomName: string }>({
  validationSchema: yup.object({
    roomName: yup.string().required(() => t('main.roomName_error_empty')).max(20, () => t('main.roomName_error_empty'))
  })
})

// 设置聊天室名默认值
setFieldValue('roomName', room.room.roomName)

// 手动触发网络请求，并在成功后重置表单
const { run: modifyRoom } = useRequest(fetchModifyRoom, {
  onSuccess: ({ data, message }) => {
    if (data.verify) {
      emit('close', 'update')
      toast.success(message)
      resetForm()
    } else {
      toast.error(message)
    }
  },
  onFinally: () => toggle(),
  manual: true
})

// 验证表单 成功就发送请求
const onSubmit = handleSubmit((values) => (toggle(), modifyRoom({ ...values, roomId: room.room.roomId })))

// 向父组件发送关闭消息
const emit = defineEmits<{ close: ['update'] }>()

// 删除聊天室
const { run: deleteRoom } = useRequest(() => fetchDeleteRoom(room.room.roomId), {
  onSuccess: ({ data, message }) => {
    if (data.verify) {
      toast.success(message)
      emit('close', 'update')
      router.push({ name: "main" })
    } else {
      toast.error(message)
    }
  },
  onFinally: () => toggle(),
  manual: true
},)
const onDelete = () => deleteRoom()
</script>

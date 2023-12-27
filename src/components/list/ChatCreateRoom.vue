<template>
  <InputItem v-bind="room.roomName" />
  <div relative w-full h-60 rounded overflow-hidden v-if="option.img">
    <vueCropper ref="cropper" v-bind="option" />
  </div>
  <UploadItem v-bind="room.roomIcon" ref="upload">
    <div flex justify-between items-center border-2 border-gray-300 rounded p-2 v-for="(item, index) in upload?.files"
      :key=index>
      <div truncate>{{ item.name }}</div>
      <div cursor-pointer @click="upload?.remove(index)"><Icon-material-symbols:close /></div>
    </div>
  </UploadItem>
  <div flex mt-4>
    <ButtonItem flex-grow :readying="readying" :name="$t('main.creation_button')" @click="onSubmit" />
    <slot />
  </div>
</template>

<script setup lang="ts">
import vueCropper from '@/module/vue-cropper'
import { fetchCreateRoom, } from '@/apis';
import { type InputAttr, type UploadAttr } from '@/types';
import { useToast } from 'vue-toastification';

import * as yup from "yup"
import type UploadItemVue from '../form/UploadItem.vue';
const { t } = useI18n()
const toast = useToast();

// 设置input属性
const room: { roomName: InputAttr; roomIcon: UploadAttr } = {
  roomIcon: { id: "main", name: "creation_icon", accept: "image/*", uploadShow: false },
  roomName: { id: "main", name: "creation_name", type: "text", position: 'left' },
}

// 表单认证
const { handleSubmit, resetForm } = useForm<{ creation_name: string, creation_icon: Blob }>({
  validationSchema: yup.object({ creation_name: yup.string().required(() => t("main.creation_name_empty")) })
})

// 按钮防止过频繁点击
const [readying, toggle] = useToggle()

// 手动触发网络请求，并在成功后重置表单
const { run } = useRequest(fetchCreateRoom, {
  onSuccess: ({ data, message }) => {
    if (data.verify) {
      toast.success(message)
      resetForm()
      option.img = ""
      option.canMoveBox = true
      upload.value?.clear()
      useTimeoutFn(() => emit('close', 'inside'), 1000)
    } else {
      toast.error(message)
    }
  },
  onFinally: () => toggle()
  , manual: true
})

// 验证表单 成功就发送请求
const onSubmit = handleSubmit(({ creation_name: roomName }, actions) => {
  // 图片单独验证
  if (option.img == "") {
    actions.setErrors({ creation_icon: t("main.creation_icon_empty") })
  } else {
    toggle()
    option.canMoveBox = false
    cropper.value.getCropBlob((roomIcon: Blob) => run({ roomName, roomIcon }))
  }
})

// 向父组件发送关闭消息
const emit = defineEmits<{ close: ['inside'] }>()

// 截图相关设置
const cropper = ref()
const option = reactive({
  img: "", canMove: false, canMoveBox: true,
  autoCrop: true, centerBox: true, fixedBox: true,
  autoCropWidth: 200, autoCropHeight: 200, info: false
})

// 获取截图
onMounted(() => watch(upload.value!.files, () => {
  const files = upload.value!.files
  option.img = files.length != 0 ? URL.createObjectURL(files[files.length - 1]) : ""
}))

// 获取文件上传组件
const upload = ref<InstanceType<typeof UploadItemVue>>()
</script>

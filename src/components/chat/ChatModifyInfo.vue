<template>
  <div flex max-lg:flex-col max-lg:items-center>
    <UploadItem hidden v-bind="userIcon" ref="upload" />
    <label flex justify-center items-center cursor-pointer w-70 h-70 overflow-hidden lg:mr-4 :for="name"
      v-if="!option.img">
      <div bg-white rounded-full><img rounded-full w-70 h-70 :src='icon'></div>
    </label>
    <div flex w-full max-md:flex-col v-else>
      <div overflow-hidden rounded flex-grow h-70 max-md:mb-2>
        <vueCropper ref="cropper" v-bind="option" @realTime="realTime" />
      </div>
      <div flex flex-col justify-between md:w-50 md:ml-4>
        <div flex justify-center h-50 rounded overflow-hidden max-md:hidden><img :src='previews'></div>
        <FileListItem :remove="upload!.remove" :files="upload!.files" />
        <ButtonItem max-md:mt-2 :readying="readying" :name="$t('main.submit_button')" @click="onSubmit" />
      </div>
    </div>
    <div flex flex-col max-lg:w-full justify-between flex-grow v-if="!option.img">
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts">
import type { ResponseData, UploadAttr } from '@/types';
import type UploadItemVue from '../form/UploadItem.vue';
import vueCropper from '@/module/cropper'
import { useWS } from '@/utils';

// 设置默认图片
const props = withDefaults(defineProps<{
  icon: string, name: string, formIcon: string, params?: object, type: string
  fetchModify: (...arg: any[]) => Promise<ResponseData>
}>(), { icon: "" })

// 设置input属性
const userIcon: UploadAttr = { id: "main", name: props.name, accept: "image/*", uploadShow: false }

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

// 实时展示图片
const previews = ref()
const realTime = () => cropper.value.getCropBlob((blob: Blob) => {
  var reader = new FileReader();
  reader.readAsDataURL(blob);
  reader.onload = () => previews.value = reader.result
})

// 获取文件上传组件
const upload = ref<InstanceType<typeof UploadItemVue>>()

// 按钮防止过频繁点击
const [readying, toggle] = useToggle()

// 手动触发网络请求，并在成功后重置表单
const { run } = useRequest(props.fetchModify, {
  onSuccess: ({ action }) => {
    if (action) {
      emit('close', 'update')
      option.img = ""
      upload.value?.clear()
      send(JSON.stringify({ type: props.type, operation: props.formIcon, data: props.params }))
    }
  }, onFinally: () => toggle(), manual: true
})

// 发送更新消息给其他人
const { send } = useWS()

// 验证表单 成功就发送请求
const onSubmit = () => {
  toggle()
  option.canMoveBox = false
  cropper.value.getCropBlob((blob: Blob) => {
    const obj: any = {};
    obj[props.formIcon] = blob;
    props.params ? run({ ...obj, ...props.params }) : run(obj)
  })
}

// 向父组件发送关闭消息
const emit = defineEmits<{ close: ['update'] }>()
</script>

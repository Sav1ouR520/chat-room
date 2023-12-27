<template>
  <div flex w-full flex-col>
    <div v-show="props.uploadShow ? props.uploadShow : files.length == 0">
      <div flex :class="position === 'left' ? '' : 'flex-col'">
        <div flex items-center mr-2 pb-1 :class="position === 'left' ? ' mb-4' : ''">
          <label :for=name>{{ $t(id + '.' + name) }}</label>
        </div>
        <div flex flex-col flex-grow>
          <div relative flex justify-center items-center h-10 border-2 bg-white rounded
            @dragover="text = $t(`${id}.${name}_leave`)" @dragleave="text = $t(`${id}.${name}_hover`)">
            <label leading-9 text-center h-full cursor-pointer w-full :for=name text-blue-500>{{ text }}</label>
            <Field hidden :id=name :name=name :accept=accept type="file" @change="handleFileUpload" :multiple="more" />
          </div>
          <div h-4>
            <ErrorMessage text-red-500 text-sm :name="name" />
          </div>
        </div>
      </div>
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { Field, ErrorMessage } from 'vee-validate';
import type { UploadAttr } from '@/types';
const { t } = useI18n()
const props = withDefaults(defineProps<UploadAttr>(),
  { uploadShow: true, more: false, accept: '*', position: 'left' })

// 检测文件更新
const handleFileUpload = (event: any) => {
  const target = event.target as HTMLInputElement;
  if (target.files) props.more ? files.push(...target.files) : files[0] = target.files[0]
}

// 存储上传的文件
const files = reactive<File[]>([])

// 设置拖拽文件文字
const text = ref(t(`${props.id}.${props.name}_hover`))

// 删除上传的文件
const remove = (index: number) => { files.splice(index, 1) }

// 清空文件
const clear = () => files.splice(0, files.length)

// 暴露属性
defineExpose({ remove, clear, files })
</script>

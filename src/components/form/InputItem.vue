<template>
  <div flex flex-col h-25>
    <div flex justify-between>
      <label pb-2 font-medium :for=tag.name>{{ $t(tag.id + '.' + tag.label) }}</label>
      <slot name="label"></slot>
    </div>
    <div flex relative items-center>
      <Field h-10 w-full rounded-md focus:ring-2 focus:ring-green-500 text-black :name=tag.name :id=tag.name
        :placeholder="$t(tag.id + '.' + tag.placeholder + '_placeholder')" :type="visible ? 'text' : tag.type" />
      <div absolute right-4 cursor-pointer @click="toggle()">
        <Icon-ant-design:eye-outlined text-5 text-gray v-if="tag.visible" />
      </div>
      <slot name="input"></slot>
    </div>
    <ErrorMessage text-red-500 text-sm :name="tag.name" />
  </div>
</template>

<script lang="ts" setup>
import type { InputAttr } from '@/types';
import { Field, ErrorMessage } from 'vee-validate';
defineProps<{ tag: InputAttr }>()
const [visible, toggle] = useToggle()
</script>

<template>
  <div flex flex-col h-30>
    <div flex justify-between>
      <label pb-2 font-medium :for=tag.name>{{ tag.label }}</label>
      <slot></slot>
    </div>
    <Field w-full rounded-md focus:ring-2 focus:ring-green-500 text-black shadow-sm :name=tag.name :id=tag.name
      :placeholder=tag.placeholder :type="tag.type" />
    <ErrorMessage text-red-500 text-sm :name="tag.name" />
  </div>
</template>

<script lang="ts" setup>
import type { InputAttr } from '@/types';
import { Field, ErrorMessage } from 'vee-validate';
defineProps<{ tag: InputAttr }>()
</script>

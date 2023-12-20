<template>
  <div flex flex-col h-25>
    <div flex justify-between>
      <label pb-2 font-medium :for=tag.name>{{ tag.label }}</label>
      <slot name="label"></slot>
    </div>
    <div flex>
      <Field h-10 w-full rounded-md focus:ring-2 focus:ring-green-500 text-black shadow-sm :name=tag.name :id=tag.name
        :placeholder=tag.placeholder :type="tag.type" />
      <slot name="input"></slot>
    </div>
    <ErrorMessage text-red-500 text-sm :name="tag.name" />
  </div>
</template>

<script lang="ts" setup>
import type { InputAttr } from '@/types';
import { Field, ErrorMessage } from 'vee-validate';
defineProps<{ tag: InputAttr }>()
</script>

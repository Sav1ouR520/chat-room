<template>
  <div flex flex-col>
    <div flex :class="position === 'left' ? '' : 'flex-col'">
      <div flex justify-between items-center pb-1 mr-2 :class="position === 'left' ? ' mb-8' : ''">
        <label font-medium :for=name>{{ $t(id + '.' + name) }}</label>
        <slot name="label"></slot>
      </div>
      <div flex flex-col flex-grow relative>
        <div flex>
          <Field h-10 flex-grow border-2 border-gray-200 rounded-md text-black :type="visible && value ? 'text' : type"
            :name=name :id=name :placeholder="$t(`${id}.${name}_placeholder`)" />
          <div absolute top-2 right-2 cursor-pointer text-5 text-gray @click="toggle()" v-if="visible">
            <Icon-ant-design:eye-outlined v-if="value" /> <Icon-ant-design:eye-invisible-filled v-else />
          </div>
          <slot name="input"></slot>
        </div>
        <div h-8>
          <ErrorMessage text-red-500 text-sm :name="name" />
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
import type { InputAttr } from '@/types';
import { Field, ErrorMessage } from 'vee-validate';
withDefaults(defineProps<InputAttr>(), { position: 'top' })
const [value, toggle] = useToggle()
</script>

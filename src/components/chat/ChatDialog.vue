<template>
  <div absolute flex items-center justify-center top-0 left-0 z-9999 w-full h-full class="mask"
    @click="emit('close', 'outside')">
    <div flex flex-col rounded-xl dark:bg-gray-600 bg-gray-200 :class="className" p-4 @click.stop>
      <div flex justify-between text-6 pb-4 font-bold><span>{{ title }}</span>
        <span cursor-pointer @click="emit('close', 'inside')"><Icon-mdi:cancel-box /></span>
      </div>
      <slot @close="emit('close', 'inside')" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ title: string, className: string }>()
const emit = defineEmits<{ close: ['outside' | 'inside'] }>()
</script>

<style scoped>
.mask {
  background-color: rgba(255, 255, 255, 0.5);
}
</style>

<template>
  <div flex justify-center flex-col>
    <button h-full p-2 rounded font-semibol text-white font-semibold :disabled="readying"
      :class="readying ? 'bg-gray-500' : 'hover:bg-green-400 bg-green-500'">
      {{ name }}
    </button>
  </div>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{ readying?: boolean, name: string }>(), { readying: false })
</script>

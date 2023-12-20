<template>
  <div flex justify-center flex-col>
    <button px-3 py-1.5 rounded font-semibol text-white font-semibold :disabled="readying"
      :class="readying ? 'bg-gray-500' : 'hover:bg-green-400 bg-green-500'">
      {{ $t("login.l_button") }}
    </button>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{ readying?: boolean }>(), { readying: false })
</script>

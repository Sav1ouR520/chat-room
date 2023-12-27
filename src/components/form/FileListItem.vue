<template>
  <div flex justify-between items-center border-2 border-gray-300 rounded px-2 v-for="(item, index) in files" :key=index>
    <div truncate>{{ item.name }}</div>
    <div cursor-pointer @click="remove(index)"><Icon-material-symbols:close /></div>
  </div>
</template>
<script setup lang="ts">
defineProps<{ remove: Function, files: File[] }>()
</script>

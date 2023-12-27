<template>
  <div flex items-center>
    <div rounded-full w-12 h-12 overflow-hidden bg-white><img :src="icon" onerror="this.style.display='none';"></div>
    <span mx-4 h-12 flex items-center text-xl truncate>{{ name }}</span>
  </div>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{ name: string, icon: string }>(), { name: "", icon: "" })
</script>

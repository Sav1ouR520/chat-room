<template>
  <button @click="switchTheme()" flex items-center justify-center w-25 bg-blue h-10 border-0 rounded-lg m-4>
    <Icon-ph:moon /><span>换主题</span>
  </button>
</template>

<script setup lang="ts">
import { switchTheme } from '@/module';
</script>

<style></style>

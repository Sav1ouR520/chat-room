<template>
  <button @click="switchTheme()" flex items-center justify-center w-25 h-10 rounded-lg
    :class="isDark ? 'bg-gray-700' : 'bg-white'">
    <div flex items-center v-show="!isDark"><Icon-ph:sun mr-1 /><span>Light</span></div>
    <div flex items-center dark:text-white v-show="isDark"><Icon-ph:moon mr-1 /><span>Dark</span></div>
  </button>
</template>

<script setup lang="ts">
import { switchTheme, isDark } from '@/module';
</script>


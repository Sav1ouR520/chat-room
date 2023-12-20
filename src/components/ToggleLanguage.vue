<template>
  <template v-for="language in languageList" :key="language.value">
    <button @click="locale = language.value" w-25 bg-blue h-10 border-0 rounded-lg m-4>{{ language.label
    }}</button>
  </template>
</template>

<script setup lang="ts">
import { type LanguageOptions, languageList as languageListRaw } from '@/types';
const { locale } = useI18n()
const languageList = ref<LanguageOptions>(languageListRaw)
</script>

<style></style>

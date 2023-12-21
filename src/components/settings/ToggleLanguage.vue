<template>
  <template v-for="language in languageList" :key="language.value">
    <button @click="locale = language.value" :class="isDark ? 'bg-gray-700' : 'bg-white'" flex items-center justify-center
      w-25 h-10 rounded-lg v-show="language.value != locale">{{
        language.label
      }}</button>
  </template>
</template>

<script setup lang="ts">
import { type LanguageOptions, languageList as languageListRaw } from '@/types';
import { isDark } from '@/module';
const { locale } = useI18n()
const languageList = ref<LanguageOptions>(languageListRaw)
</script>

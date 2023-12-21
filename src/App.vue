<template>
  <RouterView />
</template>

<script setup lang="ts">
import { mountI18n, setupUseReq, setupVee, checkTheme } from '@/module';
checkTheme()
mountI18n()
setupUseReq()
setupVee()
</script>

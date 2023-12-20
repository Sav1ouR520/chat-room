<template>
  <RouterView />
</template>

<script setup lang="ts">
import { mountI18n, setupUseReq, setupVee } from '@/module';

mountI18n()
setupUseReq()
setupVee()

</script>

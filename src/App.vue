<template>
    <RouterView />
</template>

<script setup lang="ts">
import { mountI18n, setupUseReq } from '@/module';
mountI18n()
setupUseReq()

</script>

<style scoped></style>

<template>
  <div flex flex-row w-full p-2 :title="memberId">
    <div w-6 h-6 rounded-full flex-shrink-0 bg-white overflow-hidden><img :src="user.userIcon"
        onerror="this.style.display='none';">
    </div>
    <div ml-2 truncate overflow-hidden>{{ memberName }}</div>
  </div>
</template>
<script setup lang="ts">
defineProps<{ memberId: string, user: { userIcon: string }, memberName: string }>()
</script>

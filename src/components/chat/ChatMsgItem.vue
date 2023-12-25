<template>
  <div>
    <div flex items-center mb-2>
      <div w-6 h-6 overflow-hidden rounded-full><img :src="msg.userIcon"></div>
      <h2 mx-4>{{ msg.userName }}</h2>
      <span text-2 text-gray-500>{{ msg.time }}</span>
    </div>
    <div inline-block dark:bg-zinc-700 bg-gray-200 rounded px-4 py-2 class="max-w-4/5">
      <p>{{ msg.message }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{ msg: { messageId: string, userId: string, userIcon: string, userName: string, time: Date, message: string } }>()
</script>

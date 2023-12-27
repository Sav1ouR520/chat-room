<template>
  <div>
    <div flex items-center mb-2>
      <div w-6 h-6 overflow-hidden rounded-full bg-white><img :src="user.userIcon" onerror="this.style.display='none';">
      </div>
      <h2 mx-4>{{ memberName }}</h2>
      <span text-2 text-gray-500>{{ sendTime }}</span>
    </div>
    <div inline-block dark:bg-zinc-700 bg-gray-200 rounded px-4 py-2 class="max-w-4/5">
      <p>{{ message }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{ messageId: string, memberId: string, memberName: string, sendTime: string, message: string, user: { userIcon: string, } }>()
</script>

<template>
  <div flex items-center rounded-xl w-full p-2 py-4 dark:box-shadow-black box-shadow-white
    :class="$route.params['id'] === roomId ? ' dark:bg-zinc-700 bg-zinc-300 ' : 'dark:hover:bg-gray-800 hover:bg-gray-300'">
    <div rounded-full w-12 h-12 overflow-hidden bg-white><img :src="roomIcon" onerror="this.style.display='none';"></div>
    <div flex flex-col ml-2 flex-grow>
      <div flex items-begin justify-between h-6>
        <span>{{ roomName }}</span>
        <span><Icon-material-symbols-light:star text-gray-300 /></span>
      </div>
      <div flex items-end justify-between text-gray-500 h-6 text-2.5>
        <div truncate w-40>
          <span dark:text-gray-300>{{ userName + ": " }}</span>
          <span>{{ message }}</span>
        </div>
        <span>{{ sendTime }} </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{ roomId: string, roomIcon: string, roomName: string, message: string, userName: string, sendTime: string }>()
</script>




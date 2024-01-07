<template>
  <div flex items-center rounded-xl p-2 py-4 dark:box-shadow-black box-shadow-white
    :class="$route.params['id'] === roomId ? ' dark:bg-zinc-700 bg-zinc-300 ' : 'dark:hover:bg-gray-800 hover:bg-gray-300'">
    <div rounded-full w-12 h-12 flex-shrink-0 overflow-hidden bg-white><img :src="roomIcon" w-full h-full
        onerror="this.style.display='none';"></div>
    <div flex flex-col ml-2 flex-grow h-12>
      <div flex items-center justify-between h-6>
        <span>{{ roomName }}</span>
        <span><Icon-material-symbols-light:star text-gray-300 /></span>
      </div>
      <div flex items-end justify-between text-gray-500 h-6 text-2.5 v-if="message">
        <div truncate w-40>
          <span dark:text-gray-300>{{ message.memberName + ": " }}</span>
          <span>{{ message.message }}</span>
        </div>
        <span flex-shrink-0>{{ dayjs(message.sendTime).format("HH:mm a") }} </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

import type { ChatListItem } from "@/apis";
import dayjs from "dayjs"
defineProps<ChatListItem>()
</script>




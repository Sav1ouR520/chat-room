<template>
  <div flex :class="room.member.memberId === member.memberId ? 'flex-row-reverse' : ''">
    <div w-8 h-8 flex-shrink-0 overflow-hidden rounded-full bg-white>
      <img :src="user.userIcon" onerror="this.style.display='none';" w-full h-full>
    </div>
    <div flex flex-col mx-2 flex-grow>
      <div flex mb-1 :class="room.member.memberId === member.memberId ? 'flex-row-reverse' : ''">{{ member.memberName }}
      </div>
      <div flex items-end :class="room.member.memberId === member.memberId ? 'flex-row-reverse' : ''">
        <div inline-block dark:bg-zinc-700 bg-gray-200 rounded px-3 py-1 class="max-w-4/5"> {{ message }}</div>
        <div mx-2 text-2 text-gray-500>{{ dayjs(sendTime).format("HH:mm a") }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ChatMessageItem } from "@/apis";
import { RoomStore } from "@/stores";
import dayjs from "dayjs"
defineProps<ChatMessageItem>()

// 获取聊天室信息
const room = RoomStore()
</script>

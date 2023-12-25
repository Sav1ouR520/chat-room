<template>
  <div px-8 w-full>
    <div dark:box-shadow-black box-shadow-white p-2 rounded-xl>
      <ChatCardInfo :name="user?.userName" :icon="user?.userIcon" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { fetchUserInfo, type UserInfo } from '@/apis';

// 获取当前账号的信息
const user = ref<UserInfo>()
useRequest(fetchUserInfo, { onSuccess: ({ data }) => user.value = data })
</script>

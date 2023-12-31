<template>
  <div flex flex-row justify-between p-2>
    <div flex items-center flex-grow truncate>
      <div flex items-center justify-center mr-2 w-4 h-4 border-2 border-gray-900 dark:border-gray-100 rounded
        cursor-pointer v-show="modify" @click="toggle()">
        <Icon-mdi:check-bold text-2 v-show="value" />
      </div>
      <div w-6 h-6 rounded-full flex-shrink-0 bg-white overflow-hidden :title="memberId"><img :src="user.userIcon"
          onerror="this.style.display='none';">
      </div>
      <div ml-2 truncate>{{ memberName }}</div>
    </div>
    <div flex items-center justify-center>
      <div rounded px-1 text-3 font-bold
        :class="[memeberRole === 'user' ? 'bg-green' : 'bg-yellow', !modify ? 'cursor-pointer' : '']" @click="ChangeRole"
        :title="dayjs(joinTime).format('YYYY-MM-DD HH:mm:ss')">
        {{ memeberRole }}
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import dayjs from "dayjs"
import type { Member } from '@/apis';

// 所需参数 切换选中/取消
const props = defineProps<Member & { modify: boolean, reverse: boolean }>()
const [value, toggle] = useToggle()

// 监听memberId变化，变化发送被选中的memberId
const emit = defineEmits<{ member: [{ memberId: string, value: boolean }] }>()
watch(value, () => emit('member', { memberId: props.memberId, value: value.value }))

// 监听是否发生了取反事件
const reverse = ref(props.reverse)
const modify = ref(props.modify)
watch(props, () => {
  props.reverse !== reverse.value && (reverse.value = props.reverse, toggle())
  modify.value !== props.modify && (modify.value = props.modify, value.value && toggle())
})

// 修改权限 仅当modify关闭才行
const memeberRole = ref(props.role)
const ChangeRole = () => { if (!props.modify) memeberRole.value = memeberRole.value === 'admin' ? 'user' : 'admin' }
</script>

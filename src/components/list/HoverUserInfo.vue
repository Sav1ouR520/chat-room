<template>
  <div absolute top--24 left-0 px-8 w-full>
    <div dark:bg-zinc-800 bg-gray-200 rounded p-2>
      <div flex items-center h-10>
        <span mr-2>{{ $t('main.account') }}</span>
        <span truncate>{{ account }}</span>
      </div>
      <div flex items-center h-10>
        <span mr-2>{{ $t('main.register_time') }}</span>
        <span>{{ format_date }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs"
const props = withDefaults(defineProps<{ registerTime: Date | string, account: string | undefined }>(), { registerTime: "", icon: "" })
const format_date = ref()
watch(props, () => format_date.value = dayjs(props.registerTime).format("YYYY-MM-DD HH:mm:ss"))
</script>

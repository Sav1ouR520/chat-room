<template>
  <div flex h-full md:p-8>
    <div flex w-full justify-center dark:bg-zinc-900 bg-gray-100 md:rounded-xl>
      <ChatList :class="$route.name !== 'main' ? ' max-md:hidden ' : ''" />
      <ChatContext :class="$route.name === 'main' ? ' max-md:hidden ' : ''" />
    </div>
  </div>
</template>


<script setup lang="ts">

</script>

<template>
  <div flex flex-col items-center :class="$route.name === 'main' ? 'max-md:w-full' : ''">
    <ChatListHeader />
    <ChatListContent />
  </div>
</template>


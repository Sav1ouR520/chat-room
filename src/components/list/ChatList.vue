<template>
  <div flex flex-col items-center my-8 :class="$route.name === 'main' ? 'max-md:w-full' : ''">
    <ChatListHeader />
    <ChatListContent />
  </div>
</template>


<template>
  <div flex flex-col w-full justify-between overflow-auto px-8 py-4>
    <div flex justify-between items-center>
      <ChatRoomHeader />
      <ChatContextMembers />
    </div>
    <ChatContextMessage my-4 />
    <ChatContextSend max-md:mb-2 />
  </div>
</template>


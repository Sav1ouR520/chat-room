<template>
  <div absolute bottom-4 left-4 z-2023 ref="box">
    <div flex items-center h-15 hover:bg-gray-100 rounded-xl>
      <div flex justify-center items-center w-full hover:animate-spin transform-gpu h-full
        :class="show ? 'text-black' : 'text-white'" ref="icon">
        <Icon-tdesign:setting-1 text-8 mx-2 />
      </div>
      <div flex items-center v-show="show" mr-2>
        <ToggleDarkMode mr-2 />
        <ToggleLanguage />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const icon = ref(null)
const box = ref(null)
const { isOutside: iconIsOutSide } = useMouseInElement(icon)
const { isOutside: boxIsOutSide } = useMouseInElement(box)
const show = ref(false)
watch(iconIsOutSide, () => {
  if (!iconIsOutSide.value) show.value = true
})
watch(boxIsOutSide, () => {
  if (!iconIsOutSide.value) show.value = true
  if (boxIsOutSide.value && iconIsOutSide.value) show.value = false
})
</script>

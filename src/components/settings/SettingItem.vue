<template>
  <div flex items-center h-15 hover:bg-gray-100 rounded-xl ref="box">
    <div flex justify-center items-center w-full hover:animate-spin transform-gpu h-full
      :class="!isDark || show ? 'text-black' : 'text-white'" ref="icon">
      <Icon-tdesign:setting-1 text-8 mx-2 />
    </div>
    <div flex items-center v-show="show" mr-2 :class="show ? 'animated animated-fade-in' : ''">
      <DarkModeItem mr-2 />
      <LanguageItem />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { isDark } from '@/module';

// 浮动的颜色/主题切换显示
const [icon, box] = [ref(), ref()]
const { isOutside: iconIsOutSide } = useMouseInElement(icon)
const { isOutside: boxIsOutSide } = useMouseInElement(box)
const show = ref(false)
watch(iconIsOutSide, () => !iconIsOutSide.value && (show.value = true))
watch(boxIsOutSide, () => {
  !iconIsOutSide.value && (show.value = true)
  boxIsOutSide.value && iconIsOutSide.value && (show.value = false)
})
</script>

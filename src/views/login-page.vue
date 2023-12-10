<template>
    <div flex h-full justify-center flex-col items-center>
        <h1 text-center text-lg>{{ $t('login.title') }}</h1>
        <div flex justify-center>
            <button @click="switchTheme()" w-25 bg-blue h-10 border-0 rounded-lg m-4>换主题</button>
            <template v-for="language in languageList" :key="language.value">
                <button @click="locale = language.value" w-25 bg-blue h-10 border-0 rounded-lg m-4>{{ language.label
                }}</button>
            </template>
        </div>
        <div>
            <button w-25 bg-blue h-10 border-0 rounded-lg m-4>请求数据</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { LoginRequest } from '@/apis/user';
import { switchTheme } from '@/module';
import { login } from '@/services/user/login';
import { type LanguageOptions, languageList as languageListRaw } from '@/types';
const { locale } = useI18n()
const languageList = ref<LanguageOptions>(languageListRaw)
const user = ref<LoginRequest>({ account: 'root', password: 'root' })
// onBeforeMount(async () => {
//     const [res] = await login(user.value)
//     console.log(res?.action)
// })
login(user.value)
</script>

<style scoped></style>
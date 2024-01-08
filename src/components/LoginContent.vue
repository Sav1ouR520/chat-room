<template>
  <div flex h-full flex-col justify-center items-center p-10 min-h-135>
    <form sm-w-120 w-full @submit.prevent>
      <h1 text-center text-2xl font-bold pb-5>{{ $t("login.introduce") }}</h1>
      <InputItem v-bind="vaild.account" />
      <InputItem v-bind="vaild.password">
        <template v-slot:label>
          <a tabindex="-1" text-sm font-medium text-green-500 hover:text-green-400 href="/forge">{{
            $t("login.f_password") }}
          </a>
        </template>
      </InputItem>
      <ButtonItem mt-2 :readying="readying" :name="$t('login.l_button')" @click="onSubmit" />
      <div flex justify-center items-center h-10 text-sm>
        <span mr-2>{{ $t("login.n_account") }}</span>
        <a ml-2 font-medium text-green-500 hover:text-green-400 href="/register">{{ $t("login.r_link") }}</a>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { fetchLogin, type LoginRequest } from '@/apis';
import type { Convert, InputAttr } from "@/types"

import * as yup from "yup"
const { t } = useI18n()
const router = useRouter()

// 设置input属性
const vaild: Convert<LoginRequest, InputAttr> = {
  account: { id: "login", name: "account", type: "text" },
  password: { id: "login", name: "password", type: "password" },
}

// 输入验证
const { handleSubmit, resetForm } = useForm<LoginRequest>({
  validationSchema: yup.object({
    account: yup.string().required(() => t("login.account_error_empty")),
    password: yup.string().required(() => t("login.password_error_empty")),
  }),
})

// 按钮防止过频繁点击
const [readying, toggle] = useToggle()

// 手动触发网络请求，并在成功后重置表单
const { run } = useRequest(fetchLogin, {
  onSuccess: ({ action }) => { if (action) { resetForm(), router.push('/main') } },
  onFinally: () => toggle(), manual: true
})

// 提交请求
const onSubmit = handleSubmit((values) => (toggle(), run(values)))
</script>

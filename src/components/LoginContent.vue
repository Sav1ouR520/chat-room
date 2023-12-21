<template>
  <div flex h-full flex-col justify-center items-center p-10 min-h-135>
    <div sm-w-120 w-full>
      <h1 text-center text-2xl font-bold pb-5>{{ $t("login.introduce") }}</h1>
      <form @submit="onSubmit">
        <InputItem :tag="vaild.account" />
        <InputItem :tag="vaild.password">
          <template v-slot:label>
            <a tabindex="-1" text-sm font-medium text-green-500 hover:text-green-400 href="#">{{ $t("login.f_password") }}
            </a>
          </template>
        </InputItem>
        <ButtonItem mt-2 :readying="readying" :name="$t('login.l_button')" />
        <div flex justify-center items-center h-10 text-sm>
          <span mr-2>{{ $t("login.n_account") }}</span>
          <a ml-2 font-medium text-green-500 hover:text-green-400 href="/register">{{ $t("login.r_link") }}</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { fetchLogin, type LoginRequest } from '@/apis';
import type { Convert, InputAttr } from "@/types"
import { useToast } from "vue-toastification";
import { setLocale } from 'yup';


import * as yup from "yup"
const { t } = useI18n()
const toast = useToast();

// 验证属性
type LoginVaild = Convert<LoginRequest, InputAttr>

// 设置input属性
const vaild = reactive<LoginVaild>({
  account: { id: "login", label: "account", placeholder: "a", name: "account", type: "text" },
  password: { id: "login", label: "assword", placeholder: "p", name: "password", type: "password" },
})

// 输入验证
const { handleSubmit, resetForm } = useForm<LoginRequest>({
  validationSchema: yup.object({
    account: yup.string().required(() => t("login.a_error_empty")),
    password: yup.string().required(() => t("login.p_error_empty")),
  }),
})

// 按钮防止过频繁点击
const [readying, toggle] = useToggle()

// 手动触发网络请求，并在成功后重置表单
const { run, } = useRequest(fetchLogin, {
  onSuccess: ({ data, message }) => {
    if (data.verify) {
      toast.success(message)
      resetForm()
    } else {
      toast.error(message)
    }
  },
  onFinally: () => toggle()
  , manual: true
})

// 提交请求
const onSubmit = handleSubmit((values) => {
  toggle()
  run(values)
})
</script>

<template>
  <div flex h-full flex-col justify-center items-center p-10 min-h-135>
    <form sm-w-120 w-full>
      <h1 text-center text-2xl font-bold pb-5>{{ $t("forge.introduce") }}</h1>
      <InputItem v-bind="vaild.account" />
      <InputItem v-bind="vaild.code">
        <template v-slot:input>
          <ButtonItem :name="sendEmailButton" @click="sendEmail" :readying="isActive" @click.stop></ButtonItem>
        </template>
      </InputItem>
      <InputItem v-bind="vaild.password" />
      <ButtonItem mt-2 :readying="sumbit_readying" :name="$t('forge.l_button')" @click="onSubmit" />
      <div flex justify-center items-center h-10 text-sm>
        <span mr-2>{{ $t("forge.n_account") }}</span>
        <a ml-2 font-medium text-green-500 hover:text-green-400 href="/">{{ $t("forge.r_link") }}</a>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { fetchForge, fetchSendEmail, type ForgeRequest } from '@/apis';
import type { Convert, InputAttr } from "@/types"
import { email_valid, password_valid } from "@/utils"

import * as yup from "yup"
const { t } = useI18n()
const router = useRouter()

// 设置input属性
const vaild: Convert<ForgeRequest, InputAttr> = {
  account: { id: "forge", name: "account", type: "text" },
  password: { id: "forge", name: "password", type: "password", visible: true },
  code: { id: "forge", name: "code", type: "text" },
}

// 输入验证
type ForgeForm = ForgeRequest & { repassword: string }
const { handleSubmit, resetForm } = useForm<ForgeForm>({
  validationSchema: yup.object({
    account: yup.string().required(() => t('forge.account_error_empty')).matches(email_valid, () => t('forge.account_error_email')),
    password: yup.string().required(() => t('forge.password_error_empty')).matches(password_valid, () => t('forge.password_error_strength')),
    code: yup.string().required(() => t('forge.code_error_empty')).length(4, () => t('forge.code_error_length'))
  }),
})

// 按钮防止过频繁点击
const [sumbit_readying, sumbit_toggle] = useToggle()

// 手动触发网络请求，并在成功后重置表单
const { run: sumbit } = useRequest(fetchForge, {
  onSuccess: ({ action }) => { if (action) { resetForm(), router.push('/') } },
  onFinally: () => sumbit_toggle(), manual: true
})

// 提交请求
const onSubmit = handleSubmit((value) => (sumbit_toggle(), sumbit(value)))

// 发送邮箱请求
const sendEmailButton = ref()

// 存储时间到本地【时间戳】，60秒后
const nextTime = useLocalStorage("nextTime", 0)

// 计算倒计时时间
const getTick = () => Math.ceil((nextTime.value - Date.now()) / 1000)

// 发现本地缓存时间大于现在时间则继续暂停
const setButton = () => {
  sendEmailButton.value = tick.value <= 0 ? t('forge.c_button') : tick.value + "s"
  tick.value <= 0 ? pause() : resume()
}

// 倒计时时间
const tick = ref(getTick())

// 计时，防止重复发邮箱请求
const { resume, isActive, pause } = useIntervalFn(() => (tick.value = getTick(), setButton()), 1000)

// 默认开启检测
setButton()

// 发送邮箱请求
const { run: sendEmail } = useRequest(fetchSendEmail, {
  onBefore: () => (nextTime.value = Date.now() + 60 * 1000, resume()),
  onSuccess: ({ data }) => (nextTime.value = data.nextTime),
  manual: true
})
</script>

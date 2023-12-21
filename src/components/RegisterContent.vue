<template>
  <div flex h-full flex-col justify-center items-center p-10 min-h-135>
    <div sm-w-120 w-full>
      <h1 text-center text-2xl font-bold pb-5>{{ $t("register.introduce") }}</h1>
      <form @submit="onSubmit">
        <InputItem :tag="vaild.account" />
        <InputItem :tag="vaild.code">
          <template v-slot:input>
            <ButtonItem :name="sendEmailButton" @click="sendEmail" :readying="isActive" @click.prevent.stop></ButtonItem>
          </template>
        </InputItem>
        <InputItem :tag="vaild.password" />
        <InputItem :tag="vaild.repassword" />
        <ButtonItem mt-2 :readying="sumbit_readying" :name="$t('register.l_button')" />
        <div flex justify-center items-center h-10 text-sm>
          <span mr-2>{{ $t("register.n_account") }}</span>
          <a ml-2 font-medium text-green-500 hover:text-green-400 href="/">{{ $t("register.r_link") }}</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { fetchRegister, fetchSendEmail, type RegisterRequest } from '@/apis';
import type { Convert, InputAttr } from "@/types"
import { email_valid, password_valid } from "@/utils"
import { useToast } from "vue-toastification";
import * as yup from "yup"
const { t } = useI18n()
const toast = useToast();
const router = useRouter()

// 设置input属性
type RegisterVaild = Convert<RegisterRequest & { repassword: string }, InputAttr>
const vaild = reactive<RegisterVaild>({
  account: { id: "register", label: "account", placeholder: "a", name: "account", type: "text" },
  password: { id: "register", label: "password", placeholder: "p", name: "password", type: "password" },
  repassword: { id: "register", label: "repassword", placeholder: "r", name: "repassword", type: "password" },
  code: { id: "register", label: "code", placeholder: "c", name: "code", type: "text" },
})

// 输入验证
type RegisterForm = RegisterRequest & { repassword: string }
const { handleSubmit, resetForm } = useForm<RegisterForm>({
  validationSchema: yup.object({
    account: yup.string().required(() => t('register.a_error_empty')).matches(email_valid, () => t('register.a_error_email')),
    password: yup.string().required(() => t('register.p_error_empty')).matches(password_valid, () => t('register.p_error_strength')),
    repassword: yup.string().required(() => t('register.r_error_empty')).equals([yup.ref('password')], () => t('register.r_error_no_equal')),
    code: yup.string().required(() => t('register.c_error_empty')).length(4, () => t('register.c_error_length'))
  }),
})

// 按钮防止过频繁点击
const [sumbit_readying, sumbit_toggle] = useToggle()

// 手动触发网络请求，并在成功后重置表单
const { run: sumbit } = useRequest(fetchRegister, {
  onSuccess: ({ data, message }) => {
    if (data.verify) {
      toast.success(message);
      resetForm()
      router.push('/')
    } else {
      toast.error(message)
    }
  },
  onFinally: () => sumbit_toggle(), manual: true
})

// 提交请求
const onSubmit = handleSubmit((value) => {
  sumbit_toggle()
  const { account, password, code } = value
  sumbit({ account, password, code })
})

// 发送邮箱请求
const sendEmailButton = ref()
const nextTime = useLocalStorage("nextTime", 0)
const getTick = () => Math.ceil((nextTime.value - Date.now()) / 1000)
const setButton = () => {
  sendEmailButton.value = tick.value <= 0 ? t('register.c_button') : tick.value + "s"
  tick.value <= 0 ? pause() : resume()
}
const tick = ref(getTick())

const { resume, isActive, pause } = useIntervalFn(() => {
  tick.value = getTick()
  setButton()
}, 1000)

setButton()
const { run: sendEmail } = useRequest(fetchSendEmail, {
  onBefore: () => {
    nextTime.value = Date.now() + 60 * 1000
    resume()
  },
  onSuccess: ({ message, data }) => {
    toast.success(message)
    nextTime.value = data.nextTime
  }, manual: true
})
</script>

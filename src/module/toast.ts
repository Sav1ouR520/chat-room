import type { App } from "vue"
import Toast, { type PluginOptions } from "vue-toastification"

const options: PluginOptions = {
  timeout: 1000, //超时时间
  pauseOnHover: false, // 开启/关闭悬浮暂停
  closeButton: false, // 显示/隐藏关闭按钮
  closeOnClick: true, // 开启/关闭点击关闭
  pauseOnFocusLoss: false, // 开启/关闭失去焦点暂停
  draggablePercent: 0.6, // 拖动距离
  showCloseButtonOnHover: true, // 只有碰到了才显示x
  hideProgressBar: true, //隐藏进度条
  rtl: false, //左对齐
  draggable: true, //可拖动
  transition: "Vue-Toastification__bounce", //动画
  maxToasts: 20, //最大展示数量
  newestOnTop: true, //最新消息置于顶部
}

const setupToast = (app: App) => {
  app.use(Toast, options)
}

export { setupToast }

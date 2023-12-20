import { useRequestProvider } from "vue-hooks-plus"

const setupUseReq = () =>
  useRequestProvider({
    throttleWait: 2000, // 节流
    debounceWait: 1000, // 防抖
    retryCount: 3, // 重试次数
    loading: true, // 等待数据
    // refreshOnWindowFocus: true, //切换页面刷新
    // focusTimespan: 5000, //切换页面间隔
  })
export { setupUseReq }

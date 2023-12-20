import { configure } from "vee-validate"

const setupVee = () =>
  configure({
    validateOnBlur: true,
    validateOnChange: true,
    validateOnInput: true,
    validateOnModelUpdate: true,
  })
export { setupVee }

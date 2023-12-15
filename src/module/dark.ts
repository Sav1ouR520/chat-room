import { useDarkMode } from "vue-hooks-plus"
const [darkMode, setDarkMode] = useDarkMode()

const switchTheme = () => {
  setDarkMode(!darkMode.value)
  checkTheme()
}

const checkTheme = () => {
  document.documentElement.classList.toggle("dark", darkMode.value)
}

export { switchTheme, checkTheme }

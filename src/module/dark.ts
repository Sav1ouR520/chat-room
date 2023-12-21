const isDark = useDark()

const toggleDark = useToggle(isDark)
const switchTheme = () => {
  toggleDark()
  checkTheme()
}

const checkTheme = () => {
  document.documentElement.classList.toggle("dark", isDark.value)
}

export { switchTheme, isDark, checkTheme }

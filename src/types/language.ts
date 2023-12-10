interface LanguageOptionsItem {
  label: string
  value: string
}

export type LanguageOptions = LanguageOptionsItem[]

export const languageList: LanguageOptions = [
  { label: "简体中文", value: "zh-CN" },
  { label: "English", value: "en" },
]

export const DEFAULT_LANGUAGE = languageList[0].value

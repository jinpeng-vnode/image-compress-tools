import { createI18n } from 'vue-i18n'
import en from './en.json'
import zh from './zh.json'

export const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: { en, zh }
})

export const SUPPORTED_LOCALES = ['en', 'zh'] as const
export type SupportedLocale = typeof SUPPORTED_LOCALES[number]

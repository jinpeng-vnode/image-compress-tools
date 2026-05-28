// src/composables/useSeo.ts — SEO meta 管理
import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const SITE_URL = 'https://imagecompresstools.com'

interface SeoConfig {
  titleKey: string
  descriptionKey: string
  keywords: string[]
  path: string
  dynamicTitle?: string
  dynamicDesc?: string
}

export function useSeo(config: SeoConfig) {
  const { t, locale } = useI18n()
  const route = useRoute()

  const canonicalUrl = computed(() => `${SITE_URL}/${locale.value}${config.path}`)
  const alternateEn = computed(() => `${SITE_URL}/en${config.path}`)
  const alternateZh = computed(() => `${SITE_URL}/zh${config.path}`)

  const title = computed(() => {
    const base = config.dynamicTitle || t(config.titleKey)
    return `${base} - Image Compress Tools`
  })
  const description = computed(() => config.dynamicDesc || t(config.descriptionKey))

  useHead({
    title,
    meta: [
      { name: 'description', content: description },
      { name: 'keywords', content: config.keywords.join(', ') },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: canonicalUrl },
      { property: 'og:site_name', content: 'Image Compress Tools' }
    ],
    link: [
      { rel: 'canonical', href: canonicalUrl },
      { rel: 'alternate', hreflang: 'en', href: alternateEn },
      { rel: 'alternate', hreflang: 'zh', href: alternateZh },
      { rel: 'alternate', hreflang: 'x-default', href: alternateEn }
    ],
    script: [
      {
        type: 'application/ld+json',
        innerHTML: computed(() => JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: title.value,
          description: description.value,
          applicationCategory: 'MultimediaApplication',
          operatingSystem: 'Any',
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }
        }))
      }
    ]
  })
}

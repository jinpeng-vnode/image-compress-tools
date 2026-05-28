<template>
  <!-- Schema.org JSON-LD 通过 useHead 注入到 <head>，无需渲染 DOM -->
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { computed } from 'vue'

const props = defineProps<{
  name: string
  description: string
}>()

const jsonLd = computed(() => JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: props.name,
  description: props.description,
  applicationCategory: 'MultimediaApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }
}))

useHead({
  script: [{ type: 'application/ld+json', innerHTML: jsonLd }]
})
</script>

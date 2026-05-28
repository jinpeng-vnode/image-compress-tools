<template>
  <article class="max-w-3xl mx-auto px-4 py-8 prose prose-sm sm:prose lg:prose-lg">
    <slot />
  </article>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue'

const props = defineProps<{
  title: string
  description: string
  slug: string
  datePublished: string
  dateModified?: string
}>()

useHead({
  title: props.title,
  meta: [
    { name: 'description', content: props.description },
    { property: 'og:title', content: props.title },
    { property: 'og:description', content: props.description },
    { property: 'og:type', content: 'article' },
    { property: 'og:url', content: `https://imagecompresstools.com/en/blog/${props.slug}` },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: props.title,
        description: props.description,
        datePublished: props.datePublished,
        dateModified: props.dateModified || props.datePublished,
        author: { '@type': 'Organization', name: 'Image Compress Tools' },
        publisher: { '@type': 'Organization', name: 'Image Compress Tools', url: 'https://imagecompresstools.com' },
        mainEntityOfPage: { '@type': 'WebPage', '@id': `https://imagecompresstools.com/en/blog/${props.slug}` }
      })
    }
  ]
})
</script>

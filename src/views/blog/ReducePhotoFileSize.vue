<template>
  <article class="max-w-4xl mx-auto px-4 py-8 prose prose-lg">
    <h1 class="text-3xl font-bold mb-4">How to Reduce Photo File Size Without Losing Quality</h1>
    <p class="text-gray-500 text-sm mb-6">Updated: May 2025 · 5 min read</p>

    <p>Modern smartphones capture stunning photos — but at a cost. A single photo from an iPhone 15 or Samsung Galaxy can be 5-12MB. When you need to email photos, upload them to forms, or store hundreds on limited cloud storage, reducing file size becomes essential. Here's how to shrink your photos while keeping them looking great.</p>

    <h2 class="text-2xl font-semibold mt-8 mb-3">Why Are Phone Photos So Large?</h2>
    <p>Several factors contribute to large photo file sizes:</p>
    <ul class="list-disc pl-6 space-y-2">
      <li><strong>High resolution</strong> — 12-200 megapixel sensors produce massive files</li>
      <li><strong>HDR processing</strong> — Computational photography adds data for better dynamic range</li>
      <li><strong>Metadata</strong> — GPS location, camera settings, depth maps, and Live Photo data</li>
      <li><strong>Minimal compression</strong> — Phones prioritize quality over file size by default</li>
      <li><strong>HEIC/HEIF format</strong> — While efficient, these files are still large at maximum quality</li>
    </ul>

    <h2 class="text-2xl font-semibold mt-8 mb-3">5 Methods to Reduce Photo Size</h2>

    <h3 class="text-xl font-medium mt-6 mb-2">1. Compress with Quality Adjustment</h3>
    <p>The most effective method. Our <router-link to="/en/jpeg-compress" class="text-blue-600 hover:underline">JPEG compressor</router-link> uses MozJPEG to reduce photos by 60-80% at quality 80, which is visually indistinguishable from the original for most viewers.</p>
    <p><strong>Best for:</strong> Email attachments, social media uploads, web galleries</p>

    <h3 class="text-xl font-medium mt-6 mb-2">2. Resize Dimensions</h3>
    <p>A 48MP photo (8000×6000 pixels) is overkill for most uses. <router-link to="/en/image-resize" class="text-blue-600 hover:underline">Resizing to 2000×1500</router-link> reduces the pixel count by 94% — and the file size drops proportionally.</p>
    <p><strong>Best for:</strong> Web use, social media, presentations</p>

    <h3 class="text-xl font-medium mt-6 mb-2">3. Convert to a More Efficient Format</h3>
    <p>Converting JPEG photos to <router-link to="/en/webp-convert" class="text-blue-600 hover:underline">WebP</router-link> saves 25-35% with identical visual quality. <router-link to="/en/avif-convert" class="text-blue-600 hover:underline">AVIF</router-link> saves even more (40-50%).</p>
    <p><strong>Best for:</strong> Website images, apps that support modern formats</p>

    <h3 class="text-xl font-medium mt-6 mb-2">4. Strip Metadata</h3>
    <p>EXIF data (camera model, GPS coordinates, timestamps, thumbnails) can add 50-200KB per photo. Removing it is completely lossless — no pixel changes at all.</p>
    <p><strong>Best for:</strong> Privacy-conscious sharing, when every KB counts</p>

    <h3 class="text-xl font-medium mt-6 mb-2">5. Combine Methods</h3>
    <p>For maximum reduction, combine resize + compress + format conversion. A 10MB phone photo can easily become 100-200KB while still looking excellent on screen.</p>

    <h2 class="text-2xl font-semibold mt-8 mb-3">Recommended Sizes by Use Case</h2>
    <div class="overflow-x-auto">
      <table class="min-w-full border-collapse border border-gray-300 text-sm">
        <thead>
          <tr class="bg-gray-100">
            <th class="border border-gray-300 px-4 py-2 text-left">Use Case</th>
            <th class="border border-gray-300 px-4 py-2 text-left">Max Dimensions</th>
            <th class="border border-gray-300 px-4 py-2 text-left">Target File Size</th>
            <th class="border border-gray-300 px-4 py-2 text-left">Quality Setting</th>
          </tr>
        </thead>
        <tbody>
          <tr><td class="border border-gray-300 px-4 py-2">Email attachment</td><td class="border border-gray-300 px-4 py-2">1600×1200</td><td class="border border-gray-300 px-4 py-2">200-500KB</td><td class="border border-gray-300 px-4 py-2">80</td></tr>
          <tr><td class="border border-gray-300 px-4 py-2">Social media post</td><td class="border border-gray-300 px-4 py-2">1080×1080</td><td class="border border-gray-300 px-4 py-2">100-300KB</td><td class="border border-gray-300 px-4 py-2">80-85</td></tr>
          <tr><td class="border border-gray-300 px-4 py-2">Website hero image</td><td class="border border-gray-300 px-4 py-2">1920×1080</td><td class="border border-gray-300 px-4 py-2">150-300KB</td><td class="border border-gray-300 px-4 py-2">75-80</td></tr>
          <tr><td class="border border-gray-300 px-4 py-2">Online form/application</td><td class="border border-gray-300 px-4 py-2">800×600</td><td class="border border-gray-300 px-4 py-2">50-100KB</td><td class="border border-gray-300 px-4 py-2">80</td></tr>
          <tr><td class="border border-gray-300 px-4 py-2">Print (4×6 inches)</td><td class="border border-gray-300 px-4 py-2">1800×1200</td><td class="border border-gray-300 px-4 py-2">500KB-1MB</td><td class="border border-gray-300 px-4 py-2">90-95</td></tr>
        </tbody>
      </table>
    </div>

    <h2 class="text-2xl font-semibold mt-8 mb-3">Step-by-Step Guide</h2>
    <ol class="list-decimal pl-6 space-y-2">
      <li>Determine your target: What's the maximum file size allowed? What dimensions do you need?</li>
      <li>If the photo is much larger than needed, <router-link to="/en/image-resize" class="text-blue-600 hover:underline">resize it first</router-link></li>
      <li>Open our <router-link to="/en/jpeg-compress" class="text-blue-600 hover:underline">JPEG compressor</router-link> (or <router-link to="/en/png-compress" class="text-blue-600 hover:underline">PNG compressor</router-link> for screenshots)</li>
      <li>Upload your photo and set quality to 80 (adjust up if needed)</li>
      <li>Download and verify the result meets your size requirement</li>
    </ol>

    <h2 class="text-2xl font-semibold mt-8 mb-3">Tips for Specific Platforms</h2>
    <ul class="list-disc pl-6 space-y-2">
      <li><strong>Gmail</strong> — 25MB total attachment limit. Compress photos to under 1MB each for smooth sending.</li>
      <li><strong>Instagram</strong> — Automatically compresses uploads. Pre-compressing to 1080px wide at quality 85 gives you control over the final quality.</li>
      <li><strong>LinkedIn</strong> — Profile photos: 400×400, under 8MB. Post images: 1200×627 for best display.</li>
      <li><strong>Passport/visa applications</strong> — Usually require 100-500KB, specific dimensions. Check requirements first, then resize and compress to match.</li>
    </ul>

    <h2 class="text-2xl font-semibold mt-8 mb-3">FAQ</h2>
    <h3 class="text-xl font-medium mt-4 mb-2">How do I reduce a photo from 5MB to 100KB?</h3>
    <p>Resize to approximately 1200×900 pixels, then compress at JPEG quality 75-80. This combination typically achieves a 95%+ reduction while maintaining good visual quality for screen viewing.</p>

    <h3 class="text-xl font-medium mt-4 mb-2">Will compressed photos look bad when printed?</h3>
    <p>For printing, keep quality at 90+ and maintain at least 300 DPI at print size. A 4×6 inch print needs 1800×1200 pixels minimum. For screen-only use, you can compress much more aggressively.</p>

    <h3 class="text-xl font-medium mt-4 mb-2">Is it safe to compress photos online?</h3>
    <p>With our tool, yes — all processing happens in your browser. Your photos never leave your device. This is especially important for personal photos, documents, and sensitive images.</p>

    <div class="mt-10 p-6 bg-blue-50 rounded-lg">
      <p class="font-semibold text-lg mb-2">Reduce your photo sizes now</p>
      <p>Use our <router-link to="/en/jpeg-compress" class="text-blue-600 hover:underline font-medium">free photo compressor</router-link> — works with any image format, processes locally in your browser, no signup needed.</p>
    </div>
  </article>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue'

useHead({
  title: 'How to Reduce Photo File Size Without Losing Quality | ImageCompressTools',
  meta: [
    { name: 'description', content: 'Learn 5 methods to reduce photo file size without losing quality. Compress, resize, and convert photos for email, web, and social media.' },
    { name: 'keywords', content: 'reduce photo file size, shrink photo size, compress photo, reduce image file size, photo compressor' },
    { property: 'og:title', content: 'How to Reduce Photo File Size Without Losing Quality' },
    { property: 'og:description', content: '5 methods to reduce photo file size without losing quality. Free online tools.' },
    { property: 'og:type', content: 'article' },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'How to Reduce Photo File Size Without Losing Quality',
        description: 'Learn 5 methods to reduce photo file size for email, web, and social media without visible quality loss.',
        datePublished: '2025-05-01',
        dateModified: '2025-05-28',
        author: { '@type': 'Organization', name: 'ImageCompressTools' },
        publisher: { '@type': 'Organization', name: 'ImageCompressTools', url: 'https://imagecompresstools.com' },
        mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://imagecompresstools.com/en/blog/reduce-photo-file-size' }
      })
    }
  ]
})
</script>

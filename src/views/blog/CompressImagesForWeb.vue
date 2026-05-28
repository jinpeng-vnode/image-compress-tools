<template>
  <article class="max-w-4xl mx-auto px-4 py-8 prose prose-lg">
    <h1 class="text-3xl font-bold mb-4">How to Compress Images for Web: The Developer's Guide</h1>
    <p class="text-gray-500 text-sm mb-6">Updated: May 2025 · 6 min read</p>

    <p>Web performance starts with images. They account for over 50% of page weight on average, and poorly optimized images are the #1 reason websites fail Core Web Vitals. Whether you're building a blog, e-commerce store, or portfolio site, this guide covers everything you need to know about compressing images for the web.</p>

    <h2 class="text-2xl font-semibold mt-8 mb-3">Target File Sizes for Web Images</h2>
    <p>Before diving into techniques, here are the targets you should aim for:</p>
    <ul class="list-disc pl-6 space-y-2">
      <li><strong>Hero/banner images</strong> — Under 200KB (ideally 100-150KB)</li>
      <li><strong>Content images</strong> — Under 100KB</li>
      <li><strong>Thumbnails</strong> — Under 30KB</li>
      <li><strong>Icons/logos</strong> — Under 10KB (use SVG when possible)</li>
      <li><strong>Total page images</strong> — Under 1MB for the initial viewport</li>
    </ul>

    <h2 class="text-2xl font-semibold mt-8 mb-3">The Modern Image Format Stack</h2>
    <p>In 2025, the best practice is serving multiple formats with the <code class="bg-gray-100 px-2 py-1 rounded">&lt;picture&gt;</code> element:</p>
    <pre class="bg-gray-100 p-4 rounded text-sm overflow-x-auto"><code>&lt;picture&gt;
  &lt;source srcset="image.avif" type="image/avif" /&gt;
  &lt;source srcset="image.webp" type="image/webp" /&gt;
  &lt;img src="image.jpg" alt="Description" width="800" height="600" loading="lazy" /&gt;
&lt;/picture&gt;</code></pre>
    <p>This serves AVIF to browsers that support it (smallest files), WebP as fallback (wide support), and JPEG as the universal fallback.</p>

    <h2 class="text-2xl font-semibold mt-8 mb-3">Compression Settings by Format</h2>
    <div class="overflow-x-auto">
      <table class="min-w-full border-collapse border border-gray-300 text-sm">
        <thead>
          <tr class="bg-gray-100">
            <th class="border border-gray-300 px-4 py-2 text-left">Format</th>
            <th class="border border-gray-300 px-4 py-2 text-left">Quality for Web</th>
            <th class="border border-gray-300 px-4 py-2 text-left">Encoder</th>
            <th class="border border-gray-300 px-4 py-2 text-left">Tool</th>
          </tr>
        </thead>
        <tbody>
          <tr><td class="border border-gray-300 px-4 py-2">JPEG</td><td class="border border-gray-300 px-4 py-2">75-80</td><td class="border border-gray-300 px-4 py-2">MozJPEG</td><td class="border border-gray-300 px-4 py-2"><router-link to="/en/jpeg-compress" class="text-blue-600 hover:underline">Compress</router-link></td></tr>
          <tr><td class="border border-gray-300 px-4 py-2">PNG</td><td class="border border-gray-300 px-4 py-2">Level 4-6</td><td class="border border-gray-300 px-4 py-2">OxiPNG</td><td class="border border-gray-300 px-4 py-2"><router-link to="/en/png-compress" class="text-blue-600 hover:underline">Compress</router-link></td></tr>
          <tr><td class="border border-gray-300 px-4 py-2">WebP</td><td class="border border-gray-300 px-4 py-2">75-80</td><td class="border border-gray-300 px-4 py-2">libwebp</td><td class="border border-gray-300 px-4 py-2"><router-link to="/en/webp-convert" class="text-blue-600 hover:underline">Convert</router-link></td></tr>
          <tr><td class="border border-gray-300 px-4 py-2">AVIF</td><td class="border border-gray-300 px-4 py-2">60-70</td><td class="border border-gray-300 px-4 py-2">libavif</td><td class="border border-gray-300 px-4 py-2"><router-link to="/en/avif-convert" class="text-blue-600 hover:underline">Convert</router-link></td></tr>
        </tbody>
      </table>
    </div>

    <h2 class="text-2xl font-semibold mt-8 mb-3">Step-by-Step Web Image Workflow</h2>
    <ol class="list-decimal pl-6 space-y-2">
      <li><strong>Resize</strong> — <router-link to="/en/image-resize" class="text-blue-600 hover:underline">Resize images</router-link> to maximum display width × 2 (for retina). A 600px column needs at most 1200px images.</li>
      <li><strong>Choose format</strong> — Photos → JPEG/WebP/AVIF. Graphics → PNG/WebP/SVG.</li>
      <li><strong>Compress</strong> — Use the quality settings above. Start at 75 and increase only if you see artifacts.</li>
      <li><strong>Generate multiple sizes</strong> — Create 400w, 800w, 1200w versions for responsive srcset.</li>
      <li><strong>Add lazy loading</strong> — All images below the fold get <code class="bg-gray-100 px-2 py-1 rounded">loading="lazy"</code>.</li>
      <li><strong>Set dimensions</strong> — Always include width/height to prevent Cumulative Layout Shift (CLS).</li>
    </ol>

    <h2 class="text-2xl font-semibold mt-8 mb-3">Common Web Image Mistakes</h2>
    <ul class="list-disc pl-6 space-y-2">
      <li><strong>Serving 4000px images in 400px containers</strong> — The browser downloads the full file even if CSS scales it down. Always resize to actual display size.</li>
      <li><strong>Using PNG for photographs</strong> — PNG is lossless and produces huge files for photos. Use JPEG or WebP instead.</li>
      <li><strong>Not using modern formats</strong> — WebP has 96%+ browser support. There's no reason not to use it in 2025.</li>
      <li><strong>Forgetting about retina</strong> — Serve 2x images for high-DPI screens, but not larger. 3x is rarely needed for photos.</li>
      <li><strong>Loading all images eagerly</strong> — A page with 20 images shouldn't download all 20 on initial load. Lazy load everything below the fold.</li>
      <li><strong>Missing width/height attributes</strong> — Without explicit dimensions, images cause layout shift as they load, hurting CLS scores.</li>
    </ul>

    <h2 class="text-2xl font-semibold mt-8 mb-3">Build Pipeline Integration</h2>
    <p>For production websites, automate image optimization in your build process:</p>
    <ul class="list-disc pl-6 space-y-2">
      <li><strong>Vite/Webpack</strong> — Use vite-imagetools or image-webpack-loader for automatic optimization during build</li>
      <li><strong>Next.js</strong> — Built-in Image component handles optimization, resizing, and format conversion</li>
      <li><strong>Gatsby</strong> — gatsby-plugin-image with Sharp for automatic responsive image generation</li>
      <li><strong>Manual workflow</strong> — Use our <router-link to="/en/" class="text-blue-600 hover:underline">online tools</router-link> for quick one-off optimization without build setup</li>
    </ul>

    <h2 class="text-2xl font-semibold mt-8 mb-3">Measuring Results</h2>
    <p>After optimizing, verify your improvements:</p>
    <ol class="list-decimal pl-6 space-y-2">
      <li>Run Google PageSpeed Insights — check the "Properly size images" and "Serve images in next-gen formats" audits</li>
      <li>Check Chrome DevTools Network tab — filter by "Img" and sort by size</li>
      <li>Monitor Core Web Vitals — LCP should improve with smaller hero images</li>
      <li>Test on slow connections — Chrome DevTools can simulate 3G to show real-world impact</li>
    </ol>

    <h2 class="text-2xl font-semibold mt-8 mb-3">FAQ</h2>
    <h3 class="text-xl font-medium mt-4 mb-2">What's the best image format for websites in 2025?</h3>
    <p>WebP is the best default choice — it's 25-35% smaller than JPEG with 96%+ browser support. Use AVIF for even better compression where supported, with WebP/JPEG fallbacks.</p>

    <h3 class="text-xl font-medium mt-4 mb-2">How much does image optimization improve page speed?</h3>
    <p>Typically 2-5 seconds on initial load for image-heavy pages. For a page with 2MB of unoptimized images, proper optimization can reduce that to 300-500KB — a 75% improvement in image transfer size.</p>

    <div class="mt-10 p-6 bg-blue-50 rounded-lg">
      <p class="font-semibold text-lg mb-2">Compress your web images now</p>
      <p>Use our <router-link to="/en/" class="text-blue-600 hover:underline font-medium">free compression tools</router-link> to optimize images for your website. Supports JPEG, PNG, WebP, and AVIF — all processing happens locally in your browser.</p>
    </div>
  </article>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue'

useHead({
  title: 'How to Compress Images for Web - Developer Guide | ImageCompressTools',
  meta: [
    { name: 'description', content: 'Complete guide to compressing images for web performance. Learn target file sizes, format selection, compression settings, and build pipeline integration.' },
    { name: 'keywords', content: 'compress images for web, web image optimization, image compression for website, optimize images for web, web performance images' },
    { property: 'og:title', content: 'How to Compress Images for Web - Developer Guide' },
    { property: 'og:description', content: 'Complete guide to compressing images for web performance and Core Web Vitals.' },
    { property: 'og:type', content: 'article' },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'How to Compress Images for Web: The Developer\'s Guide',
        description: 'Complete guide to compressing images for web performance including format selection, compression settings, and build pipeline integration.',
        datePublished: '2025-05-01',
        dateModified: '2025-05-28',
        author: { '@type': 'Organization', name: 'ImageCompressTools' },
        publisher: { '@type': 'Organization', name: 'ImageCompressTools', url: 'https://imagecompresstools.com' },
        mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://imagecompresstools.com/en/blog/compress-images-for-web' }
      })
    }
  ]
})
</script>

<template>
  <article class="max-w-4xl mx-auto px-4 py-8 prose prose-lg">
    <h1 class="text-3xl font-bold mb-4">Best Image Optimization Practices for Web Performance in 2025</h1>
    <p class="text-gray-500 text-sm mb-6">Updated: May 2025 · 7 min read</p>

    <p>Images make up over 50% of the average web page's total size. Optimizing them is the single most impactful thing you can do for page speed, Core Web Vitals scores, and user experience. This comprehensive guide covers the best image optimization strategies used by top-performing websites in 2025.</p>

    <h2 class="text-2xl font-semibold mt-8 mb-3">Why Image Optimization Matters</h2>
    <p>Google's research shows that 53% of mobile users abandon pages that take longer than 3 seconds to load. Since images are the heaviest assets on most pages, optimizing them directly impacts:</p>
    <ul class="list-disc pl-6 space-y-2">
      <li><strong>Core Web Vitals</strong> — LCP (Largest Contentful Paint) is often an image. Smaller images = faster LCP.</li>
      <li><strong>SEO rankings</strong> — Page speed is a confirmed Google ranking factor</li>
      <li><strong>Conversion rates</strong> — Every 100ms of load time improvement increases conversions by 1%</li>
      <li><strong>Bandwidth costs</strong> — Optimized images reduce CDN and hosting bills</li>
      <li><strong>User experience</strong> — Fast pages feel more professional and trustworthy</li>
    </ul>

    <h2 class="text-2xl font-semibold mt-8 mb-3">The Image Optimization Checklist</h2>

    <h3 class="text-xl font-medium mt-6 mb-2">1. Choose the Right Format</h3>
    <p>Format selection is the foundation of image optimization:</p>
    <ul class="list-disc pl-6 space-y-2">
      <li><strong>AVIF</strong> — Best compression for both photos and graphics. Use as primary format with fallbacks. <router-link to="/en/avif-convert" class="text-blue-600 hover:underline">Convert to AVIF</router-link></li>
      <li><strong>WebP</strong> — Excellent all-rounder with 96%+ browser support. Great default choice. <router-link to="/en/webp-convert" class="text-blue-600 hover:underline">Convert to WebP</router-link></li>
      <li><strong>JPEG</strong> — Universal fallback for photographs. Use MozJPEG for best results. <router-link to="/en/jpeg-compress" class="text-blue-600 hover:underline">Compress JPEG</router-link></li>
      <li><strong>PNG</strong> — Only for images requiring transparency or pixel-perfect graphics. <router-link to="/en/png-compress" class="text-blue-600 hover:underline">Compress PNG</router-link></li>
      <li><strong>SVG</strong> — For icons, logos, and simple illustrations (vector format, infinitely scalable)</li>
    </ul>

    <h3 class="text-xl font-medium mt-6 mb-2">2. Serve Responsive Images</h3>
    <p>Don't serve a 2000px image to a 400px mobile screen. Use the HTML <code class="bg-gray-100 px-2 py-1 rounded">srcset</code> attribute to serve different sizes:</p>
    <pre class="bg-gray-100 p-4 rounded text-sm overflow-x-auto"><code>&lt;img srcset="image-400.webp 400w,
             image-800.webp 800w,
             image-1200.webp 1200w"
     sizes="(max-width: 600px) 400px,
            (max-width: 1000px) 800px,
            1200px"
     src="image-800.webp"
     alt="Description" /&gt;</code></pre>

    <h3 class="text-xl font-medium mt-6 mb-2">3. Lazy Load Below-the-Fold Images</h3>
    <p>Images not visible on initial page load should use lazy loading:</p>
    <pre class="bg-gray-100 p-4 rounded text-sm overflow-x-auto"><code>&lt;img src="photo.webp" loading="lazy" alt="Description" /&gt;</code></pre>
    <p>This prevents the browser from downloading images until the user scrolls near them, dramatically improving initial page load time.</p>

    <h3 class="text-xl font-medium mt-6 mb-2">4. Compress Aggressively</h3>
    <p>Modern encoders can compress much more aggressively than you might think:</p>
    <ul class="list-disc pl-6 space-y-2">
      <li>JPEG quality 75-80 is visually indistinguishable at typical web sizes</li>
      <li>WebP quality 75 matches JPEG quality 85 visually</li>
      <li>AVIF quality 60-65 matches JPEG quality 80</li>
    </ul>

    <h3 class="text-xl font-medium mt-6 mb-2">5. Resize to Display Dimensions</h3>
    <p>Always <router-link to="/en/image-resize" class="text-blue-600 hover:underline">resize images</router-link> to their maximum display size (accounting for 2x retina). A hero image displayed at 1200px wide needs at most a 2400px source image for retina screens.</p>

    <h3 class="text-xl font-medium mt-6 mb-2">6. Use a CDN with Image Optimization</h3>
    <p>Content Delivery Networks like Cloudflare, Fastly, or AWS CloudFront can automatically optimize and cache images at edge locations worldwide, reducing latency for global audiences.</p>

    <h2 class="text-2xl font-semibold mt-8 mb-3">Image Optimization Tools Compared</h2>
    <div class="overflow-x-auto">
      <table class="min-w-full border-collapse border border-gray-300 text-sm">
        <thead>
          <tr class="bg-gray-100">
            <th class="border border-gray-300 px-4 py-2 text-left">Tool</th>
            <th class="border border-gray-300 px-4 py-2 text-left">Type</th>
            <th class="border border-gray-300 px-4 py-2 text-left">Best For</th>
            <th class="border border-gray-300 px-4 py-2 text-left">Privacy</th>
          </tr>
        </thead>
        <tbody>
          <tr><td class="border border-gray-300 px-4 py-2">ImageCompressTools (this site)</td><td class="border border-gray-300 px-4 py-2">Browser-based</td><td class="border border-gray-300 px-4 py-2">Quick compression, privacy</td><td class="border border-gray-300 px-4 py-2">100% local</td></tr>
          <tr><td class="border border-gray-300 px-4 py-2">Squoosh</td><td class="border border-gray-300 px-4 py-2">Browser-based</td><td class="border border-gray-300 px-4 py-2">Side-by-side comparison</td><td class="border border-gray-300 px-4 py-2">100% local</td></tr>
          <tr><td class="border border-gray-300 px-4 py-2">TinyPNG</td><td class="border border-gray-300 px-4 py-2">Cloud-based</td><td class="border border-gray-300 px-4 py-2">PNG optimization</td><td class="border border-gray-300 px-4 py-2">Server upload</td></tr>
          <tr><td class="border border-gray-300 px-4 py-2">ImageOptim</td><td class="border border-gray-300 px-4 py-2">Desktop app</td><td class="border border-gray-300 px-4 py-2">Batch processing</td><td class="border border-gray-300 px-4 py-2">100% local</td></tr>
          <tr><td class="border border-gray-300 px-4 py-2">Sharp (Node.js)</td><td class="border border-gray-300 px-4 py-2">Library</td><td class="border border-gray-300 px-4 py-2">Build pipeline</td><td class="border border-gray-300 px-4 py-2">Self-hosted</td></tr>
        </tbody>
      </table>
    </div>

    <h2 class="text-2xl font-semibold mt-8 mb-3">Measuring Image Optimization Impact</h2>
    <p>Use these tools to measure your optimization results:</p>
    <ul class="list-disc pl-6 space-y-2">
      <li><strong>Google PageSpeed Insights</strong> — Shows specific image optimization opportunities</li>
      <li><strong>WebPageTest</strong> — Detailed waterfall showing image load times</li>
      <li><strong>Chrome DevTools Network tab</strong> — See actual transferred sizes</li>
      <li><strong>Lighthouse</strong> — Audits for properly sized images, modern formats, and efficient encoding</li>
    </ul>

    <h2 class="text-2xl font-semibold mt-8 mb-3">Quick Wins: Optimize Images in 5 Minutes</h2>
    <ol class="list-decimal pl-6 space-y-2">
      <li>Identify your largest images (Chrome DevTools → Network → filter by Img → sort by Size)</li>
      <li>Compress the top 5 largest images using our <router-link to="/en/" class="text-blue-600 hover:underline">free tools</router-link></li>
      <li>Add <code class="bg-gray-100 px-2 py-1 rounded">loading="lazy"</code> to all images below the fold</li>
      <li>Add explicit <code class="bg-gray-100 px-2 py-1 rounded">width</code> and <code class="bg-gray-100 px-2 py-1 rounded">height</code> attributes to prevent layout shift</li>
      <li>Re-run PageSpeed Insights and compare scores</li>
    </ol>

    <h2 class="text-2xl font-semibold mt-8 mb-3">FAQ</h2>
    <h3 class="text-xl font-medium mt-4 mb-2">How much should I compress images for web?</h3>
    <p>Aim for images under 200KB for hero images and under 100KB for content images. Most photos can hit these targets at JPEG quality 75-80 or WebP quality 75.</p>

    <h3 class="text-xl font-medium mt-4 mb-2">Should I use AVIF or WebP?</h3>
    <p>Use both with the <code class="bg-gray-100 px-2 py-1 rounded">&lt;picture&gt;</code> element: AVIF as primary (smaller files), WebP as fallback (wider support), JPEG as final fallback. This gives you the best compression for each browser.</p>

    <div class="mt-10 p-6 bg-blue-50 rounded-lg">
      <p class="font-semibold text-lg mb-2">Optimize your images now</p>
      <p>Start with our <router-link to="/en/" class="text-blue-600 hover:underline font-medium">free image compression tools</router-link> — supporting JPEG, PNG, WebP, and AVIF. All processing happens in your browser.</p>
    </div>
  </article>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue'

useHead({
  title: 'Best Image Optimization Practices for Web 2025 | ImageCompressTools',
  meta: [
    { name: 'description', content: 'Complete guide to image optimization for web performance. Learn best practices for format selection, compression, responsive images, and Core Web Vitals.' },
    { name: 'keywords', content: 'best image optimization, image optimization for web, optimize images for website, web image compression, image performance' },
    { property: 'og:title', content: 'Best Image Optimization Practices for Web Performance 2025' },
    { property: 'og:description', content: 'Complete guide to image optimization for web performance in 2025.' },
    { property: 'og:type', content: 'article' },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Best Image Optimization Practices for Web Performance in 2025',
        description: 'Complete guide to image optimization including format selection, compression, responsive images, and performance measurement.',
        datePublished: '2025-05-01',
        dateModified: '2025-05-28',
        author: { '@type': 'Organization', name: 'ImageCompressTools' },
        publisher: { '@type': 'Organization', name: 'ImageCompressTools', url: 'https://imagecompresstools.com' },
        mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://imagecompresstools.com/en/blog/best-image-optimization' }
      })
    }
  ]
})
</script>

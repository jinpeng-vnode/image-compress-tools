<template>
  <BlogLayout
    title="How to Compress Images for Website - Speed Up Your Site (2025)"
    description="Learn how to compress images for your website to improve page speed, SEO rankings, and user experience. Practical guide with size targets and format recommendations."
    slug="how-to-compress-images-for-web"
    datePublished="2025-05-28"
  >
    <h1>How to Compress Images for Your Website</h1>

    <p>Unoptimized images are the #1 cause of slow websites. A single uncompressed hero image can be 5MB — that's 3+ seconds of loading on a mobile connection. This guide shows you how to <strong>compress images for web</strong> to achieve fast load times without sacrificing visual quality.</p>

    <h2>Target File Sizes for Web Images</h2>

    <table>
      <thead>
        <tr><th>Image Type</th><th>Target Size</th><th>Max Width</th></tr>
      </thead>
      <tbody>
        <tr><td>Hero/banner image</td><td>100-200KB</td><td>1920px</td></tr>
        <tr><td>Content image</td><td>50-150KB</td><td>1200px</td></tr>
        <tr><td>Thumbnail</td><td>10-30KB</td><td>400px</td></tr>
        <tr><td>Logo</td><td>5-20KB</td><td>300px</td></tr>
        <tr><td>Background image</td><td>100-300KB</td><td>1920px</td></tr>
      </tbody>
    </table>

    <h2>Step 1: Resize Before Compressing</h2>

    <p>Never serve images larger than their display size. If your content area is 800px wide, there's no reason to serve a 4000px image. Use our <a href="/en/image-resize">image resizer</a> to match your layout dimensions. For retina displays, use 2× the CSS display size.</p>

    <h2>Step 2: Choose the Right Format</h2>

    <ul>
      <li><strong>Photographs</strong>: Use JPEG (quality 75-82) or <a href="/en/webp-convert">convert to WebP</a> for 30% savings</li>
      <li><strong>Graphics/logos</strong>: Use <a href="/en/png-compress">optimized PNG</a> or SVG</li>
      <li><strong>Modern browsers</strong>: Serve <a href="/en/avif-convert">AVIF</a> with JPEG fallback</li>
    </ul>

    <h2>Step 3: Apply Compression</h2>

    <p>Use our browser-based tools for instant compression:</p>

    <ol>
      <li><a href="/en/jpeg-compress">Compress JPEG</a> — MozJPEG encoder, quality 75-82 for web</li>
      <li><a href="/en/png-compress">Optimize PNG</a> — lossless OxiPNG, saves 20-50%</li>
      <li><a href="/en/webp-convert">Convert to WebP</a> — best size-to-quality ratio</li>
    </ol>

    <h2>Step 4: Implement Lazy Loading</h2>

    <p>Only load images when they enter the viewport. Add the <code>loading="lazy"</code> attribute to images below the fold:</p>

    <pre><code>&lt;img src="photo.webp" loading="lazy" alt="Description" width="800" height="600"&gt;</code></pre>

    <p>Always include <code>width</code> and <code>height</code> attributes to prevent layout shift (CLS).</p>

    <h2>Step 5: Serve Responsive Images</h2>

    <p>Use <code>srcset</code> to serve different sizes based on viewport:</p>

    <pre><code>&lt;img srcset="photo-400.webp 400w, photo-800.webp 800w, photo-1200.webp 1200w"
     sizes="(max-width: 600px) 400px, (max-width: 1000px) 800px, 1200px"
     src="photo-800.webp" alt="Description"&gt;</code></pre>

    <h2>Impact on Core Web Vitals</h2>

    <ul>
      <li><strong>LCP (Largest Contentful Paint)</strong>: Compressed hero images load faster, directly improving LCP</li>
      <li><strong>CLS (Cumulative Layout Shift)</strong>: Proper width/height prevents layout jumps</li>
      <li><strong>FID/INP</strong>: Smaller images mean less main thread work for decoding</li>
    </ul>

    <h2>Common Mistakes to Avoid</h2>

    <ul>
      <li>❌ Using PNG for photographs (10× larger than needed)</li>
      <li>❌ Serving 4000px images in 400px containers</li>
      <li>❌ Not setting width/height attributes</li>
      <li>❌ Loading all images eagerly (no lazy loading)</li>
      <li>❌ Using only one image size for all viewports</li>
    </ul>

    <h2>Conclusion</h2>

    <p>Image optimization is the highest-impact performance improvement for most websites. Start by compressing your largest images with our free tools — <a href="/en/jpeg-compress">JPEG</a>, <a href="/en/png-compress">PNG</a>, or <a href="/en/webp-convert">WebP</a> — and watch your page speed scores improve immediately.</p>
  </BlogLayout>
</template>

<script setup lang="ts">
import BlogLayout from './BlogLayout.vue'
</script>

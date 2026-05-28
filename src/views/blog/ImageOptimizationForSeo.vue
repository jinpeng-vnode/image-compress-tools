<template>
  <BlogLayout
    title="Image Optimization for SEO: Complete Guide to Ranking in Google Images (2025)"
    description="Master image SEO optimization. Learn file naming, alt text, compression, structured data, and technical best practices to rank higher in Google Image Search."
    slug="image-optimization-for-seo"
    datePublished="2025-05-28"
  >
    <h1>Image Optimization for SEO: Rank Higher in Google Images</h1>

    <p>Google Images drives 22% of all web searches. Properly optimized images improve your page rankings, appear in image search results, and enhance user experience. This guide covers every aspect of <strong>image SEO optimization</strong>.</p>

    <h2>Why Image SEO Matters</h2>

    <ul>
      <li><strong>22.6% of searches</strong> happen on Google Images</li>
      <li><strong>Page speed is a ranking factor</strong> — images are the heaviest page elements</li>
      <li><strong>Core Web Vitals</strong> directly affected by image loading performance</li>
      <li><strong>Rich results</strong> — optimized images appear in featured snippets and knowledge panels</li>
    </ul>

    <h2>1. File Size Optimization</h2>

    <p>The most impactful SEO improvement is reducing image file sizes. Google's PageSpeed Insights specifically flags unoptimized images.</p>

    <ul>
      <li>Compress JPEGs to quality 75-82 using our <a href="/en/jpeg-compress">JPEG compressor</a></li>
      <li>Optimize PNGs with <a href="/en/png-compress">lossless compression</a></li>
      <li>Convert to <a href="/en/webp-convert">WebP format</a> for 30% additional savings</li>
      <li>Target: hero images under 200KB, content images under 150KB</li>
    </ul>

    <h2>2. Descriptive File Names</h2>

    <p>Google uses file names to understand image content. Use descriptive, keyword-rich names:</p>

    <ul>
      <li>❌ <code>IMG_20250101_001.jpg</code></li>
      <li>❌ <code>photo1.png</code></li>
      <li>✅ <code>blue-running-shoes-nike-2025.jpg</code></li>
      <li>✅ <code>how-to-compress-png-screenshot.webp</code></li>
    </ul>

    <p>Use hyphens to separate words. Keep names concise but descriptive.</p>

    <h2>3. Alt Text Best Practices</h2>

    <p>Alt text is the single most important image SEO element. It tells Google what the image shows:</p>

    <ul>
      <li>Be specific and descriptive (8-15 words ideal)</li>
      <li>Include your target keyword naturally</li>
      <li>Don't start with "Image of..." or "Picture of..."</li>
      <li>Describe what's actually in the image</li>
      <li>Every non-decorative image needs alt text</li>
    </ul>

    <h2>4. Image Dimensions and Responsive Serving</h2>

    <ul>
      <li>Always specify <code>width</code> and <code>height</code> attributes (prevents CLS)</li>
      <li>Use <code>srcset</code> for responsive images</li>
      <li><a href="/en/image-resize">Resize images</a> to match actual display dimensions</li>
      <li>Serve 2× resolution for retina displays</li>
    </ul>

    <h2>5. Modern Format with Fallbacks</h2>

    <pre><code>&lt;picture&gt;
  &lt;source srcset="image.avif" type="image/avif"&gt;
  &lt;source srcset="image.webp" type="image/webp"&gt;
  &lt;img src="image.jpg" alt="Descriptive alt text" width="800" height="600" loading="lazy"&gt;
&lt;/picture&gt;</code></pre>

    <h2>6. Lazy Loading</h2>

    <p>Use <code>loading="lazy"</code> for below-the-fold images. Keep above-the-fold images eager-loaded (or use <code>fetchpriority="high"</code> for LCP images).</p>

    <h2>7. Image Sitemap</h2>

    <p>Include images in your XML sitemap to help Google discover them. Each URL entry can include <code>&lt;image:image&gt;</code> tags with location, caption, and title.</p>

    <h2>8. Structured Data</h2>

    <p>Use Schema.org markup to provide context about your images. For product images, recipe images, or article images, structured data helps Google display rich results.</p>

    <h2>9. CDN and Caching</h2>

    <ul>
      <li>Serve images from a CDN for faster global delivery</li>
      <li>Set long cache headers (<code>Cache-Control: max-age=31536000</code>) for static images</li>
      <li>Use content-based URLs for cache busting when images change</li>
    </ul>

    <h2>Image SEO Checklist</h2>

    <ul>
      <li>☐ Compressed to optimal file size</li>
      <li>☐ Descriptive file name with keywords</li>
      <li>☐ Meaningful alt text (8-15 words)</li>
      <li>☐ Width and height attributes set</li>
      <li>☐ Modern format (WebP/AVIF) with fallback</li>
      <li>☐ Lazy loading for below-fold images</li>
      <li>☐ Included in sitemap</li>
      <li>☐ Responsive srcset for multiple sizes</li>
    </ul>

    <h2>Conclusion</h2>

    <p>Image SEO is a combination of technical optimization and content best practices. Start with the highest-impact change: <a href="/en/jpeg-compress">compress your images</a> to improve page speed. Then work through the checklist above to maximize your visibility in Google Image Search.</p>
  </BlogLayout>
</template>

<script setup lang="ts">
import BlogLayout from './BlogLayout.vue'
</script>

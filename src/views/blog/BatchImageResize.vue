<template>
  <article class="max-w-4xl mx-auto px-4 py-8 prose prose-lg">
    <h1 class="text-3xl font-bold mb-4">How to Batch Resize Images: Tools and Techniques for 2025</h1>
    <p class="text-gray-500 text-sm mb-6">Updated: May 2025 · 5 min read</p>

    <p>Need to resize dozens or hundreds of images to the same dimensions? Whether you're preparing product photos for an e-commerce store, creating thumbnails for a gallery, or optimizing images for a website redesign, batch resizing saves hours of manual work. This guide covers the best methods for resizing multiple images at once.</p>

    <h2 class="text-2xl font-semibold mt-8 mb-3">Why Batch Resize Images?</h2>
    <ul class="list-disc pl-6 space-y-2">
      <li><strong>E-commerce consistency</strong> — Product images need uniform dimensions for clean grid layouts</li>
      <li><strong>Website performance</strong> — Serving properly sized images instead of relying on CSS scaling saves bandwidth</li>
      <li><strong>Social media preparation</strong> — Each platform has optimal image dimensions</li>
      <li><strong>Email campaigns</strong> — Newsletter images need specific widths to display correctly</li>
      <li><strong>Print preparation</strong> — Batch resize to exact print dimensions and DPI requirements</li>
    </ul>

    <h2 class="text-2xl font-semibold mt-8 mb-3">Method 1: Online Batch Resize (Quick & Easy)</h2>
    <p>For small batches (1-20 images), our <router-link to="/en/image-resize" class="text-blue-600 hover:underline">image resize tool</router-link> handles individual images quickly. Process each image in seconds — all resizing happens in your browser with no uploads to external servers.</p>
    <ol class="list-decimal pl-6 space-y-2">
      <li>Open our <router-link to="/en/image-resize" class="text-blue-600 hover:underline">image resize tool</router-link></li>
      <li>Upload your image</li>
      <li>Set target width and height</li>
      <li>Download the resized image</li>
      <li>Repeat for each image</li>
    </ol>

    <h2 class="text-2xl font-semibold mt-8 mb-3">Method 2: Command Line (Power Users)</h2>
    <p>For large batches, command-line tools are fastest. Here are the most popular options:</p>

    <h3 class="text-xl font-medium mt-4 mb-2">ImageMagick</h3>
    <pre class="bg-gray-100 p-4 rounded text-sm overflow-x-auto"><code># Resize all JPGs in current directory to 800px wide (maintain aspect ratio)
mogrify -resize 800x *.jpg

# Resize to exact dimensions (may distort)
mogrify -resize 800x600! *.jpg

# Resize to fit within 800x600 (maintain aspect ratio)
mogrify -resize 800x600 *.jpg

# Resize and output to different directory
mkdir resized
mogrify -resize 800x -path resized *.jpg</code></pre>

    <h3 class="text-xl font-medium mt-4 mb-2">Sharp (Node.js)</h3>
    <pre class="bg-gray-100 p-4 rounded text-sm overflow-x-auto"><code>const sharp = require('sharp');
const glob = require('glob');

const files = glob.sync('./images/*.{jpg,png,webp}');
for (const file of files) {
  await sharp(file)
    .resize(800, 600, { fit: 'inside' })
    .toFile(file.replace('images/', 'resized/'));
}</code></pre>

    <h3 class="text-xl font-medium mt-4 mb-2">FFmpeg (also handles images)</h3>
    <pre class="bg-gray-100 p-4 rounded text-sm overflow-x-auto"><code># Resize single image
ffmpeg -i input.jpg -vf scale=800:-1 output.jpg

# Batch with shell loop
for f in *.jpg; do ffmpeg -i "$f" -vf scale=800:-1 "resized/$f"; done</code></pre>

    <h2 class="text-2xl font-semibold mt-8 mb-3">Method 3: Desktop Applications</h2>
    <ul class="list-disc pl-6 space-y-2">
      <li><strong>IrfanView (Windows)</strong> — File → Batch Conversion/Rename. Set resize parameters, select files, process.</li>
      <li><strong>Preview (macOS)</strong> — Select multiple images, Tools → Adjust Size. Simple but effective.</li>
      <li><strong>GIMP</strong> — Script-Fu batch processing for complex resize operations with filters.</li>
      <li><strong>Adobe Photoshop</strong> — File → Automate → Batch with a resize action recorded.</li>
    </ul>

    <h2 class="text-2xl font-semibold mt-8 mb-3">Resize Dimensions for Common Platforms</h2>
    <div class="overflow-x-auto">
      <table class="min-w-full border-collapse border border-gray-300 text-sm">
        <thead>
          <tr class="bg-gray-100">
            <th class="border border-gray-300 px-4 py-2 text-left">Platform</th>
            <th class="border border-gray-300 px-4 py-2 text-left">Image Type</th>
            <th class="border border-gray-300 px-4 py-2 text-left">Recommended Size</th>
          </tr>
        </thead>
        <tbody>
          <tr><td class="border border-gray-300 px-4 py-2">Instagram</td><td class="border border-gray-300 px-4 py-2">Square post</td><td class="border border-gray-300 px-4 py-2">1080×1080</td></tr>
          <tr><td class="border border-gray-300 px-4 py-2">Instagram</td><td class="border border-gray-300 px-4 py-2">Portrait post</td><td class="border border-gray-300 px-4 py-2">1080×1350</td></tr>
          <tr><td class="border border-gray-300 px-4 py-2">Facebook</td><td class="border border-gray-300 px-4 py-2">Shared image</td><td class="border border-gray-300 px-4 py-2">1200×630</td></tr>
          <tr><td class="border border-gray-300 px-4 py-2">Twitter/X</td><td class="border border-gray-300 px-4 py-2">In-stream image</td><td class="border border-gray-300 px-4 py-2">1600×900</td></tr>
          <tr><td class="border border-gray-300 px-4 py-2">LinkedIn</td><td class="border border-gray-300 px-4 py-2">Post image</td><td class="border border-gray-300 px-4 py-2">1200×627</td></tr>
          <tr><td class="border border-gray-300 px-4 py-2">E-commerce</td><td class="border border-gray-300 px-4 py-2">Product image</td><td class="border border-gray-300 px-4 py-2">1000×1000</td></tr>
          <tr><td class="border border-gray-300 px-4 py-2">Website</td><td class="border border-gray-300 px-4 py-2">Hero/banner</td><td class="border border-gray-300 px-4 py-2">1920×1080</td></tr>
          <tr><td class="border border-gray-300 px-4 py-2">Website</td><td class="border border-gray-300 px-4 py-2">Blog content</td><td class="border border-gray-300 px-4 py-2">800×600</td></tr>
          <tr><td class="border border-gray-300 px-4 py-2">Email</td><td class="border border-gray-300 px-4 py-2">Newsletter</td><td class="border border-gray-300 px-4 py-2">600×400</td></tr>
        </tbody>
      </table>
    </div>

    <h2 class="text-2xl font-semibold mt-8 mb-3">Best Practices for Batch Resizing</h2>
    <ul class="list-disc pl-6 space-y-2">
      <li><strong>Always keep originals</strong> — Resize to a new directory, never overwrite source files</li>
      <li><strong>Maintain aspect ratio</strong> — Stretching images looks unprofessional. Use "fit inside" or crop instead.</li>
      <li><strong>Account for retina displays</strong> — For web use, create images at 2x the display size (e.g., 1600px for an 800px display slot)</li>
      <li><strong>Compress after resizing</strong> — Resize first, then <router-link to="/en/jpeg-compress" class="text-blue-600 hover:underline">compress</router-link> for maximum file size reduction</li>
      <li><strong>Use consistent naming</strong> — Rename files systematically (product-001.jpg, product-002.jpg) for easy management</li>
      <li><strong>Test on target platform</strong> — Verify resized images display correctly before publishing the full batch</li>
    </ul>

    <h2 class="text-2xl font-semibold mt-8 mb-3">Resize + Compress: The Optimal Workflow</h2>
    <p>For maximum file size reduction, combine resizing with compression:</p>
    <ol class="list-decimal pl-6 space-y-2">
      <li><router-link to="/en/image-resize" class="text-blue-600 hover:underline">Resize</router-link> to target dimensions (biggest size reduction)</li>
      <li><router-link to="/en/jpeg-compress" class="text-blue-600 hover:underline">Compress</router-link> at quality 75-85 (further 60-75% reduction)</li>
      <li>Optionally <router-link to="/en/webp-convert" class="text-blue-600 hover:underline">convert to WebP</router-link> (additional 25-35% savings)</li>
    </ol>
    <p>A 10MB phone photo → resize to 1200px → compress at q80 → convert to WebP = approximately 80-150KB. That's a 98% reduction.</p>

    <h2 class="text-2xl font-semibold mt-8 mb-3">FAQ</h2>
    <h3 class="text-xl font-medium mt-4 mb-2">Does resizing reduce image quality?</h3>
    <p>Downsizing (making smaller) is generally safe — you're removing pixels that won't be displayed anyway. Upsizing (making larger) reduces quality because the software must invent new pixels. Never upsize images for web use.</p>

    <h3 class="text-xl font-medium mt-4 mb-2">What's the best resampling algorithm?</h3>
    <p>Lanczos (or Lanczos3) produces the sharpest results for downsizing. Bicubic is a good general-purpose choice. Nearest-neighbor preserves hard edges (pixel art) but creates jagged edges on photos.</p>

    <div class="mt-10 p-6 bg-blue-50 rounded-lg">
      <p class="font-semibold text-lg mb-2">Resize your images now</p>
      <p>Use our <router-link to="/en/image-resize" class="text-blue-600 hover:underline font-medium">free image resize tool</router-link> — set exact dimensions, maintain aspect ratio, and download instantly. No signup required.</p>
    </div>
  </article>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue'

useHead({
  title: 'How to Batch Resize Images - Tools & Techniques 2025 | ImageCompressTools',
  meta: [
    { name: 'description', content: 'Learn how to batch resize images using online tools, command line, and desktop apps. Includes platform-specific dimensions and best practices.' },
    { name: 'keywords', content: 'batch image resize, resize multiple images, bulk image resizer, batch resize photos, resize images online' },
    { property: 'og:title', content: 'How to Batch Resize Images - Tools & Techniques 2025' },
    { property: 'og:description', content: 'Complete guide to batch resizing images with multiple methods and platform dimensions.' },
    { property: 'og:type', content: 'article' },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'How to Batch Resize Images: Tools and Techniques for 2025',
        description: 'Complete guide to batch resizing images using online tools, command line, and desktop applications.',
        datePublished: '2025-05-01',
        dateModified: '2025-05-28',
        author: { '@type': 'Organization', name: 'ImageCompressTools' },
        publisher: { '@type': 'Organization', name: 'ImageCompressTools', url: 'https://imagecompresstools.com' },
        mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://imagecompresstools.com/en/blog/batch-image-resize' }
      })
    }
  ]
})
</script>

<template>
  <div class="ad-banner bg-gray-100 text-center py-2 text-xs text-gray-400 min-h-[60px] flex items-center justify-center">
    <!-- 广告位预留: {{ position }} -->
    <span>Ad Space</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{ position: string }>()
</script>

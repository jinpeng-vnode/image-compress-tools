<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    <main class="flex-1 max-w-7xl mx-auto w-full px-4 py-6 flex gap-6">
      <div class="flex-1">
        <router-view />
      </div>
      <AdSidebar />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import AdSidebar from '@/components/ads/AdSidebar.vue'
</script>

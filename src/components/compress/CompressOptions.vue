<template>
  <div class="space-y-4 p-4 bg-gray-50 rounded-lg">
    <slot />
    <button
      :disabled="disabled"
      class="w-full py-2 px-4 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed"
      @click="$emit('compress')"
    >
      {{ compressing ? t('compress.processing') : t('compress.compress') }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
defineProps<{ disabled: boolean; compressing: boolean }>()
defineEmits<{ compress: [] }>()
</script>

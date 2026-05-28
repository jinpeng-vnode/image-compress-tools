<template>
  <div class="space-y-4 p-4 bg-gray-50 rounded-lg">
    <slot />
    <button
      :disabled="disabled"
      class="w-full py-2 px-4 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed"
      @click="$emit('compress')"
    >
      {{ compressing ? t('compress.processing') : t(buttonKey) }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const props = withDefaults(defineProps<{ disabled: boolean; compressing: boolean; buttonKey?: string }>(), {
  buttonKey: 'compress.compress'
})
defineEmits<{ compress: [] }>()
</script>

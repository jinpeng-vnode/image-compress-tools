// src/composables/useFileUpload.ts — 文件上传/拖拽逻辑
import { ref } from 'vue'

const MAX_SIZE = 50 * 1024 * 1024 // 50MB
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif']

export function useFileUpload() {
  const file = ref<File | null>(null)
  const preview = ref<string | null>(null)
  const error = ref<string | null>(null)
  const isDragging = ref(false)

  function validate(f: File): boolean {
    if (!ACCEPTED_TYPES.includes(f.type)) {
      error.value = 'invalidType'
      return false
    }
    if (f.size > MAX_SIZE) {
      error.value = 'tooLarge'
      return false
    }
    return true
  }

  function setFile(f: File) {
    error.value = null
    if (!validate(f)) { file.value = null; preview.value = null; return }
    file.value = f
    if (preview.value) URL.revokeObjectURL(preview.value)
    preview.value = URL.createObjectURL(f)
  }

  function onDrop(e: DragEvent) {
    isDragging.value = false
    const f = e.dataTransfer?.files[0]
    if (f) setFile(f)
  }

  function onDragOver() { isDragging.value = true }
  function onDragLeave() { isDragging.value = false }

  function onFileInput(e: Event) {
    const input = e.target as HTMLInputElement
    const f = input.files?.[0]
    if (f) setFile(f)
  }

  function reset() {
    file.value = null
    if (preview.value) URL.revokeObjectURL(preview.value)
    preview.value = null
    error.value = null
  }

  return { file, preview, error, isDragging, onDrop, onDragOver, onDragLeave, onFileInput, reset }
}

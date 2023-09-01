<script setup lang="ts">
import { PrefectureCheckBox } from '@/store/prefectureList';


const props = defineProps<PrefectureCheckBox>()
const emits = defineEmits<{
  (e: "change", checked: boolean): void
}>()
const handleChange = (checked: boolean) => {
  emits("change", checked)
}
</script>

<template>
  <div class="prefecture-area">
    <span>{{ props.name }}</span>
    <input
      :value="props.isCheck"
      type="checkbox"
      @change="handleChange(($event.target as HTMLInputElement).checked)"
    />
  </div>
</template>

<style scoped>
.prefecture-area {
  display: flex;
}
</style>

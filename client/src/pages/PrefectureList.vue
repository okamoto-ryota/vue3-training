<script setup lang="ts">
import { onMounted, watch } from "vue"
import PrefectureCheck from "@/components/organisims/PrefectureCheck.vue"
import { usePrefectureStore } from "@/store/prefectureList"

const { prefectures, checkedPrefectures, initPrefectures, handleChecked } =
  usePrefectureStore()

onMounted(() => {
  initPrefectures()
})

watch(checkedPrefectures, (newPrefectures) => {
  console.log({ checkedPrefectures, newPrefectures })
})
</script>

<template>
  <div class="prefecture-container">
    <div class="prefecture-flex">
      <div class="flex flex-col">
        <PrefectureCheck
          v-for="pref in prefectures"
          :key="pref.prefCode"
          :pref-code="pref.prefCode"
          :name="pref.name"
          :is-check="pref.isCheck"
          @change="handleChecked(pref.prefCode, $event)"
        ></PrefectureCheck>
      </div>
      <div>{{ checkedPrefectures }}</div>
    </div>
  </div>
</template>

<style scoped>
.prefecture-container {
  max-width: 900px;
  width: 100%;
}
.prefecture-flex {
  display: grid;
  grid-template-columns: 33% 33% 33%;
}
</style>

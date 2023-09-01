import { defineStore } from "pinia"
import { ref, computed } from "vue"

export type PrefectureCheckBox = {
  prefCode: number
  name: string
  isCheck: boolean
}

export const usePrefectureStore = defineStore("prefectureList", () => {
  const prefectures = ref<PrefectureCheckBox[]>([])

  const checkedPrefectures = computed(() => {
    return prefectures.value.filter((x) => x.isCheck)
  })

  const initPrefectures = async () => {
    const res = await fetch(
      "https://opendata.resas-portal.go.jp/api/v1/prefectures",
      {
        headers: {
          "X-API-KEY": import.meta.env.VITE_RESAS_API_KEY
        }
      }
    )
    const prefs = (await res.json()) as {
      message: string | null
      result: { prefCode: number; prefName: string }[]
    }
    prefectures.value = prefs.result.map(
      (x): PrefectureCheckBox => ({
        prefCode: x.prefCode,
        name: x.prefName,
        isCheck: false
      })
    )
  }

  const handleChecked = (prefCode: number, checked: boolean) => {
    prefectures.value = prefectures.value.map((x) => ({
      ...x,
      isCheck: x.prefCode === prefCode ? checked : x.isCheck
    }))
  }

  return { prefectures, checkedPrefectures, initPrefectures, handleChecked }
})

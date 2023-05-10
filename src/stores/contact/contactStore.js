import { computed, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useContactStore = defineStore('contact', () => {
  const state = reactive({ list: [], load: true, errorMessage: '' })

  const ADD = (data) => {
    state.list.push(data)
    console.log(state.list)
  }

  const CANCEL = (id) => {
    state.list.forEach((el) => {
      if (el.id == id) {
        el.status = false
      }
    })
  }

  const LIST = computed(() => state.list)

  return { LIST, ADD, CANCEL }
})

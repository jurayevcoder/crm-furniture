import { computed, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useContactStore = defineStore('contact', () => {
  const state = reactive({ list: [], load: true, errorMessage: '' })

  const CANCEL = (id) => {
    state.list.forEach((el) => {
      if (el.id == id) {
        el.status = false
        console.log(state.list);
      }
    })
  }

  const SET_LIST = (list) => {
    state.list = list
  }

  const LIST = computed(() => state.list)

  return { LIST, CANCEL, SET_LIST }
})

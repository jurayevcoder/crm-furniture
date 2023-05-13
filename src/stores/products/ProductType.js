import { computed, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useProductTypeStore = defineStore('productType', () => {
  const state = reactive({ list: [], type_list: [], load: true, errorMessage: '' })

  const ADD = (data) => {
    state.list.push(data)
  }

  const SET_LIST = (list) => {
    state.type_list = list
  }

  const LIST = computed(() => state.list)

  const TYPE_LIST = computed(() => state.type_list)

  return { LIST, ADD, SET_LIST, TYPE_LIST }
})
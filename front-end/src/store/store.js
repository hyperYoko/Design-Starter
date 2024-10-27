import { defineStore } from 'pinia';

export const useStore = defineStore('myStore', {
  state: () => ({ 
		chatSmall: false,
	}),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++
    },
  },
})
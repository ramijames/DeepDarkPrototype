// store.js
import { defineStore } from 'pinia';

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    user: null,
    state: null
  }),
  actions: {
    setUser(user) {
      this.user = user;
    },
    setState(state) {
      this.state = state;
    }
  }
});
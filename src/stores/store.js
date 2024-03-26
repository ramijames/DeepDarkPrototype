// store.js
import { defineStore } from 'pinia';

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    state: JSON.parse(localStorage.getItem('state')) || null
  }),
  actions: {
    setUser(user) {
      this.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    setState(state) {
      this.state = state;
      localStorage.setItem('state', JSON.stringify(state));
    }
  }
});
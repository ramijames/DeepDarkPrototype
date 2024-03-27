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
      if (user) {
        const { username } = user;
        this.user = { username };
        localStorage.setItem('user', JSON.stringify({ username }));
      } else {
        this.user = null;
        localStorage.removeItem('user');
      }
    },
    setState(state) {
      this.state = state;
      localStorage.setItem('state', JSON.stringify(state));
    }
  }
});
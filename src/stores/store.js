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
        const { email, username } = user;
        this.user = { email, username };
        localStorage.setItem('user', JSON.stringify({ email, username }));
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
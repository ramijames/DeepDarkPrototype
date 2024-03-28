// store.js
import { defineStore } from 'pinia';

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    state: JSON.parse(localStorage.getItem('state')) || null,
    sessionId: JSON.parse(localStorage.getItem('sessionId')) || null
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
    },
    setSessionId(sessionId) {
      this.sessionId = sessionId;
      localStorage.setItem('sessionId', JSON.stringify(sessionId));
    },
    getSessionId() {
      return this.sessionId;
    }
  }
});
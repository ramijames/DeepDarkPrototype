<template>
  <div v-if="userStore.user" class="absolute top-0 right-0">
    <button @click="logout" class="px-12 bg-black text-white py-2 rounded">Log out</button>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/store.js';

export default {
  data() {
    return {

    };
  },
  setup() {
    const userStore = useUserStore();

    console.log('User state: ' + userStore.user);

    return {
      userStore
    };
  },
  methods: {
    async logout() {
      try {
        const response = await fetch('http://localhost:3000/auth/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          this.userStore.setUser(null);
          this.notification = null;
          this.showform = true;
        }

      } catch (error) {
        console.error('Error:', error);
      }
    }
  }
}

</script>
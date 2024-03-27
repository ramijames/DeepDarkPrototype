<template>
  <button v-if="userStore.user" @click="logout" class="absolute w-full bottom-0 bg-crt-8 text-white py-2">Log out</button>
</template>

<script>
import { useUserStore } from '@/stores/store.js';
import { useRouter } from 'vue-router';

export default {
  data() {
    return {

    };
  },
  setup() {
    const userStore = useUserStore();
    const router = useRouter();
    console.log('User state: ' + userStore.user);

    return {
      userStore,
      router
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
          this.router.push('/auth');
        }

      } catch (error) {
        console.error('Error:', error);
      }
    }
  }
}

</script>
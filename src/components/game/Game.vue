<template>
  <main class="p-6 relative w-full h-full">
    <!-- Check if the user is logged in -->
    <div v-if="userStore.user">
      <Portal />
      <LogOut />
      <div class="text-white text-center text-7xl p-6 w-full h-full">Game View</div>
    </div>

    <!-- If the user is not logged in, redirect to the auth view -->
    <div v-else>
      <router-link to="/auth" class="text-white text-center text-7xl p-6 w-full h-full">Please log in</router-link>
    </div>

    
  </main>
</template>

<script>
import { watch } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/store.js';
import Portal from '../Portal.vue';
import LogOut from '../LogOut.vue';

export default {
  components: {
    LogOut,
    Portal
  },
  setup() {
    const userStore = useUserStore();
    const router = useRouter();

    watch(() => userStore.user, (user) => {
      if (user) {
        router.push('/game');
      }
    });

    return {
      userStore
    };
  }
};

</script>
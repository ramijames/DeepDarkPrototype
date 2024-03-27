<template>
  <main class="relative w-full h-full flex flex-row">
    <!-- Check if the user is logged in -->
    <div v-if="userStore.user" class="relative border-4 b-crt-4 h-full w-1/5">
      <div class="p-6">
        <div class="text-crt-4">Hello, {{ userStore.user.username }}</div>
        <Portal />
      </div>
      <LogOut />
    </div>
    <div v-if="userStore.user" class="text-white text-center text-7xl p-6 w-full h-full">
      Game View
    </div>

    <!-- If the user is not logged in, redirect to the auth view -->
    <div v-if="!userStore.user" class="flex flex-col justify-center w-full h-full bg-crt-4">
      <img src="/balrog.png" alt="Balrog" class="w-1/3 mx-auto" />
      <h1 class="text-7xl text-crt-0 text-center">You shall not pass!</h1>
      <router-link to="/auth" class="text-crt-0 underline text-center">Please log in</router-link>
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
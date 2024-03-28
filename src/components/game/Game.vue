<template>
  <main class="relative w-full h-full flex flex-row gap-4">
    <!-- Check if the user is logged in -->
    <div v-if="userStore.user" class="relative b-crt-4 h-full w-60">
      <section class=" w-full border-4 b-crt-4 text-center flex flex-col justify-between min-h-44">
        character view
        <div class="text-white text-base text-center bg-crt-4">{{ userStore.user.username }}</div>
      </section>  
      <Portal />
      <LogOut />
    </div>
    <div v-if="userStore.user" class="w-full h-full border-8 border-crt-4 border-double">
      <router-view></router-view>
      <!-- Home view. Will show: 
      <ul class="w-44 mx-auto text-left">
        <li class="list-disc">user leaderboard</li>
        <li class="list-disc">popular dungeons</li>
      </ul> -->
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
import { watch, onMounted } from 'vue';
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
    const sessionId = userStore.getSessionId();
    const router = useRouter();

    const fetchUser = async () => {
      const response = await fetch('http://localhost:3000/auth/current', {
        headers: {
          'Authorization': `Bearer ${sessionId}`
        },
        credentials: 'include'
      });
      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }
      const user = await response.json();
      userStore.setUser(user);
    };

    onMounted(fetchUser);

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
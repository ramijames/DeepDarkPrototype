<template>
  <div id="auth" class="w-full h-full relative">
    <LogOut />

    <div v-if="!userStore.user" class="h-full w-96 mx-auto flex flex-col justify-center">
      <!-- Two links to switch between create account and login -->
      <div class="flex flex-row mb-8">
        <div @click="showCreateForm" class="cursor-pointer w-1/2 rounded-l-lg border-r-0 border-gray-200 border text-black text-center py-2" :class="loggedout ? 'text-black' : 'bg-black text-white'">Create Account</div>
        <div @click="showLoginForm" class="cursor-pointer w-1/2 rounded-r-lg border-gray-200 border text-center py-2" :class="loggedout ? 'bg-black text-white' : 'text-black'">Login</div>
      </div>

      <div v-if="notification && response && !response.ok">
        <p class="text-white text-center rounded bg-red-500 w-full p-2 mb-4">{{ error }}</p>
      </div>
      <div v-if="notification">
        <p class="text-white text-center rounded bg-green-500 w-full p-2 mb-4">User created successfully</p>
      </div>

      <LoginForm />
    </div>
    

    <!-- Show user details if logged in -->
    <!-- <div v-if="userStore.user" class="flex flex-col gap-4">
      <p>Username: {{ userStore.user.username }}</p>
      <p>Email: {{ userStore.user.email }}</p>
    </div> -->
  </div>
</template>

<script>
import { useUserStore } from '../stores/store.js';
import LoginForm from './LoginForm.vue';
import LogOut from './LogOut.vue';

/* 

The auth module checks whether the user has 
an account, is logged in, and if yes, shows 
the user a profil of their information.

At its highest level, the auth module is
is an access manager.

There should be components that the auth manager
pulls into this template and shows accourdinly.

- Create account form
- Login form
- User profile
- Log out button
- Error messages
- Success messages

*/

export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      notification: null,
      response: null,
      showform: true,
      error: null,
      loggedout: true
    };
  },
  setup() {
    const userStore = useUserStore();

    console.log('User state: ' + userStore.user);

    return {
      userStore
    };
  },
  components: {
    LoginForm,
    LogOut
  }
};
</script>
<template>
  <div id="auth" class="w-full h-full relative">
    <LogOut />

    <div v-if="!userStore.user" @click="toggleForm" class="w-full md:w-1/2 flex flex-row mx-auto">
      <div class="cursor-pointer w-1/2 border-r-0 border-crt-4 border-4 text-black text-center py-2 text-white" :class="loggingin ? '' : 'bg-crt-4'">Create Account</div>
      <div class="cursor-pointer w-1/2 border-crt-4 border-4 border text-center py-2 text-white" :class="loggingin ? 'bg-crt-4' : ''">Login</div>
    </div>
    <!-- If the user isn't logged in, show switcher and forms -->
    <div v-if="!userStore.user" class="h-full w-full md:w-1/2 mx-auto flex flex-col justify-center">

      <div v-if="notification && response && !response.ok">
        <p class="text-white text-center rounded bg-red-500 w-full p-2 mb-4">{{ error }}</p>
      </div>
      <div v-if="notification">
        <p class="text-white text-center rounded bg-green-500 w-full p-2 mb-4">User created successfully</p>
      </div>

      <LoginForm v-if="loggingin" />
      <CreateAccountForm v-else />
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
import CreateAccountForm from './CreateAccountForm.vue';
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
      loggedout: true,
      loggingin: false
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
    toggleForm() {
      this.loggingin = !this.loggingin;
    }
  },
  components: {
    CreateAccountForm,
    LoginForm,
    LogOut
  }
};
</script>
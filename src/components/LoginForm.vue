<template>
  <form v-if="!userStore.user" @submit="submitLoginForm" class="flex flex-col gap-1">
    <label for="username" class="text-crt-4 uppercase">Username:</label>
    <input type="text" class="border-b-4 bg-crt-0 border-crt-4 mb-8 text-white" id="username" v-model="username" placeholder="Pick a username" required>    
    
    <label for="password" class="text-crt-4 uppercase">Password:</label>
    <input type="password" class="border-b-4 bg-crt-0 border-crt-4 mb-8 text-white" id="password" v-model="password" required>
    
    <button type="submit" class="w-full bg-crt-9 text-white py-2 mt-4">Submit</button>
  </form>
</template>

<script>
import { useUserStore } from '@/stores/store.js';

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
  methods: {
    submitLoginForm(event) {
      event.preventDefault();

      const user = {
        username: this.username,
        email: this.email,
        password: this.password
      };

      this.loginUser(user);
    },
    async loginUser(user) {
      try {
        const response = await fetch('http://localhost:3000/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
        });

        this.response = response;

        if (!response.ok) {
          if (response.status === 409) {
            this.error = 'User or email already exists';
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        } else {
          // User is created succcesfully on the server
          // We can now update the userStore with the new user
          this.userStore.setUser(user);
          console.log(this.userStore.user);
          const userData = await response.json();
          this.notification = `User ${userData.username} was successfully created!`;
          this.showform = false;
        }

      } catch (error) {
        console.error('Error:', error);
      }
    }
  },
  showCreateForm() {
    
  },
}

</script>
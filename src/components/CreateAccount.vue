<template>
  <div id="create" class="w-72 mx-auto">
    <div v-if="notification && response && !response.ok">
      <p class="text-white text-center rounded bg-red-500 w-full p-2 mb-4">{{ error }}</p>
    </div>
    <div v-if="notification">
      <p class="text-white text-center rounded bg-green-500 w-full p-2 mb-4">User created successfully</p>
    </div>

    <form v-if="!userStore.user" @submit="submitCreateUserForm" class="flex flex-col gap-4">
      <label for="username">Username:</label>
      <input type="text" class="border p-1" id="username" v-model="username" required>
      
      <label for="email">Email:</label>
      <input type="email" class="border p-1" id="email" v-model="email" required>
      
      <label for="password">Password:</label>
      <input type="password" class="border p-1" id="password" v-model="password" required>
      
      <button type="submit" class="w-full bg-black text-white py-4 rounded mt-4">Submit</button>
    </form>

    <!-- Show user details if logged in -->
    <div v-if="userStore.user" class="flex flex-col gap-4">
      <p>Username: {{ userStore.user.username }}</p>
      <p>Email: {{ userStore.user.email }}</p>
    </div>

    <!-- Log out button that points to /auth/logout -->
    <div v-if="userStore.user" class="flex flex-col gap-4">
      <button @click="logout" class="w-full bg-black text-white py-4 rounded mt-4">Log out</button>
    </div>
  </div>
</template>

<script>
import { useUserStore } from '../stores/store.js';

export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      notification: null,
      response: null,
      showform: true,
      error: null
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
    submitCreateUserForm(event) {
      event.preventDefault();

      const user = {
        username: this.username,
        email: this.email,
        password: this.password
      };

      this.createUser(user);
    },
    async createUser(user) {
      try {
        const response = await fetch('http://localhost:3000/users/create', {
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
    },
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
};
</script>
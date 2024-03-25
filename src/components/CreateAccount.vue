<template>
  <div id="create" class="w-72 mx-auto">
    <form @submit="createUser" class="flex flex-col gap-4">
      <label for="username">Username:</label>
      <input type="text" class="border p-1" id="username" v-model="username" required>
      
      <label for="email">Email:</label>
      <input type="email" class="border p-1" id="email" v-model="email" required>
      
      <label for="password">Password:</label>
      <input type="password" class="border p-1" id="password" v-model="password" required>
      
      <button type="submit" class="w-full bg-black text-white py-4 rounded mt-4">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      email: '',
      password: ''
    };
  },
  methods: {
    async createUser(user) {
      try {
        const response = await fetch('http://localhost:3000/users/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const userData = await response.json();

        console.log(userData);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }
};
</script>
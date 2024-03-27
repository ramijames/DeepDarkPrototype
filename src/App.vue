<script>

// import { ref } from 'vue';
// import { useUserStore } from './stores/store.js';

// export default {
//   setup() {
//     const userStore = useUserStore();

//     console.log(userStore.user);

//     // You can now access the user and state properties with userStore.user and userStore.state,
//     // and update them with userStore.setUser and userStore.setState.

//     return {
//       userStore
//     };
//   }
// };

</script>

<template>
  <main class="h-full w-full bg-crt-0">
    <RouterView />
  </main>
</template>


<style>
html, body, #app {
  height:100%;
}
</style>


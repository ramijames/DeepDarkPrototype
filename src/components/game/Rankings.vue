<template>
  <main class="text-white overflow-y-scroll h-full w-full p-6">
    <!-- Get a list of all the players -->
    <h2>Rankings</h2>
    <ul>
      <li v-for="player in players" :key="player.id">
        <span>{{ player.username }}</span>
        <!-- <span>{{ player.score }}</span> -->
      </li>
    </ul>
  </main>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  data() {
    return {

    };
  },
  setup() {
    const players = ref([]);

    const fetchPlayers = async () => {
      const response = await fetch('http://localhost:3000/users');
      if (!response.ok) {
        throw new Error('Failed to fetch players');
      }
      players.value = await response.json();
    };

    onMounted(fetchPlayers);

    return {
      players
    };
  },
  methods: {
    async fetchPlayers() {
      // Fetch all the players
      try {
        const response = await fetch('http://localhost:3000/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const players = await response.json();
          console.log(players);
        }

      } catch (error) {
        console.error('Error:', error);
      }
    }
  }
};

</script>
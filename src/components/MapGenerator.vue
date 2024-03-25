<template>
  <div id="MapGenerator" class="w-full flex flex-col justify-center">
    <!-- <button @click="findPath">Highlight Path</button> -->
    <div v-for="(row, i) in map" :key="i" class="flex flex-row justify-center">
      <div v-for="(tile, j) in row" :key="j" :class="tile" class="text-xs overflow tile flex flex-col justify-center text-center">{{ j }}</div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'MapGenerator',
  data() {
    return {
      map: [],
      tileTypes: ['wall', 'ground', 'item', 'door'],
      doors: [],
    };
  },
  setup() {
    const mapSize = ref({
      width: 8,
      height: 8,
    });
    

    return {
      mapSize,
    };
  },
  methods: {
    generateMap() {

      this.map = [];
      this.doors = [];

      // Step 1: Generate outer walls
      for (let i = 0; i < this.mapSize.height; i++) {
        this.map[i] = [];
        for (let j = 0; j < this.mapSize.width; j++) {
          if (i === 0 || j === 0 || i === this.mapSize.height - 1 || j === this.mapSize.width - 1) {
            this.map[i][j] = 'wall';
          } else {
            this.map[i][j] = 'ground';
          }
        }
      }

      // Step 2: Generate two random positions for the doors
      const firstEdge = Math.floor(Math.random() * 4);
      const secondEdge = (firstEdge + 2) % 4; // Opposite wall
      const edges = [firstEdge, secondEdge];

      for (let i = 0; i < 2; i++) {
        const edge = edges[i];
        let x, y;

        switch (edge) {
          case 0: // Top edge
            x = Math.floor(Math.random() * (this.mapSize.width - 2)) + 1;
            y = 0;
            break;
          case 1: // Right edge
            x = this.mapSize.width - 1;
            y = Math.floor(Math.random() * (this.mapSize.height - 2)) + 1;
            break;
          case 2: // Bottom edge
            x = Math.floor(Math.random() * (this.mapSize.width - 2)) + 1;
            y = this.mapSize.height - 1;
            break;
          case 3: // Left edge
            x = 0;
            y = Math.floor(Math.random() * (this.mapSize.height - 2)) + 1;
            break;
        }

        this.map[y][x] = 'door';
        this.doors.push({ x, y });
      }

      // Step 3: Set the center of the map to 'ground'
      const centerX = Math.floor(this.mapSize.width / 2);
      const centerY = Math.floor(this.mapSize.height / 2);
      this.map[centerY][centerX] = 'ground';
    },

    // generateMaze() {
    //   // Initialize the maze with all walls
    //   const maze = [];
    //   for (let i = 0; i < this.mapSize.height; i++) {
    //     maze[i] = [];
    //     for (let j = 0; j < this.mapSize.width; j++) {
    //       maze[i][j] = 'wall';
    //     }
    //   }

    //   // Start from a random point and mark it as ground
    //   const startX = Math.floor(Math.random() * (this.mapSize.width - 2)) + 1;
    //   const startY = Math.floor(Math.random() * (this.mapSize.height - 2)) + 1;
    //   maze[startY][startX] = 'ground';

    //   // Initialize the list of walls
    //   const walls = [
    //     { x: startX - 1, y: startY },
    //     { x: startX, y: startY - 1 },
    //     { x: startX + 1, y: startY },
    //     { x: startX, y: startY + 1 },
    //   ];

    //   // While there are walls in the list
    //   while (walls.length > 0) {
    //     // Pick a random wall from the list
    //     const randomIndex = Math.floor(Math.random() * walls.length);
    //     const wall = walls[randomIndex];

    //     // If the wall separates two ground cells, remove it from the list
    //     if (
    //       (maze[wall.y - 1] && maze[wall.y - 1][wall.x] === 'ground' && maze[wall.y + 1] && maze[wall.y + 1][wall.x] === 'ground') ||
    //       (maze[wall.y][wall.x - 1] === 'ground' && maze[wall.y][wall.x + 1] === 'ground')
    //     ) {
    //       walls.splice(randomIndex, 1);
    //       continue;
    //     }

    //     // Otherwise, make the wall a ground cell and add its neighboring walls to the list
    //     maze[wall.y][wall.x] = 'ground';
    //     if (maze[wall.y - 1] && maze[wall.y - 1][wall.x] === 'wall') {
    //       walls.push({ x: wall.x, y: wall.y - 1 });
    //     }
    //     if (maze[wall.y + 1] && maze[wall.y + 1][wall.x] === 'wall') {
    //       walls.push({ x: wall.x, y: wall.y + 1 });
    //     }
    //     if (maze[wall.y][wall.x - 1] === 'wall') {
    //       walls.push({ x: wall.x - 1, y: wall.y });
    //     }
    //     if (maze[wall.y][wall.x + 1] === 'wall') {
    //       walls.push({ x: wall.x + 1, y: wall.y });
    //     }

    //     // Remove the wall from the list
    //     walls.splice(randomIndex, 1);
    //   }

    //   return maze;
    // },

    // getNeighbors(cell) {
    //   const directions = [
    //     { x: 0, y: -1 }, // Up
    //     { x: 1, y: 0 }, // Right
    //     { x: 0, y: 1 }, // Down
    //     { x: -1, y: 0 }, // Left
    //   ];

    //   const neighbors = [];

    //   for (const direction of directions) {
    //     const x = cell.x + direction.x;
    //     const y = cell.y + direction.y;

    //     if (this.map[y] && this.map[y][x] && this.map[y][x] !== 'wall') {
    //       neighbors.push({ x, y });
    //     }
    //   }

    //   return neighbors;
    // },

    // heuristic(cell, goal) {
    //   return Math.abs(cell.x - goal.x) + Math.abs(cell.y - goal.y);
    // },

    // findPath() {
    //   const start = this.doors[0];
    //   const goal = this.doors[1];

    //   console.log(start, goal);

    //   const frontier = [start];
    //   const cameFrom = { [`${start.x},${start.y}`]: null };
    //   const costSoFar = { [`${start.x},${start.y}`]: 0 };

    //   while (frontier.length > 0) {
    //     const current = frontier.shift();

    //     if (current.x === goal.x && current.y === goal.y) {
    //       break;
    //     }

    //     for (const next of this.getNeighbors(current)) {
    //       const newCost = costSoFar[`${current.x},${current.y}`] + 1;

    //       if (!costSoFar[`${next.x},${next.y}`] || newCost < costSoFar[`${next.x},${next.y}`]) {
    //         costSoFar[`${next.x},${next.y}`] = newCost;
    //         const priority = newCost + this.heuristic(next, goal);
    //         frontier.push(next);
    //         cameFrom[`${next.x},${next.y}`] = current;
    //       }
    //     }
    //   }

    //   let current = goal;
    //   const path = [];

    //   while (current) {
    //     path.unshift(current);
    //     current = cameFrom[`${current.x},${current.y}`];
    //   }

    //   this.path = path;
    // },
  
  },
  mounted() {
    this.generateMap();
  },
};
</script>

<style scoped>
.tile {
  width: 40px;
  height: 40px;
}

.wall {
  background-color: gray;
}

.ground {
  background-color: green;
}

.item {
  background-color: yellow;
}

.door {
  background-color: brown;
}

.path {
  background-color: blue;
}
</style>
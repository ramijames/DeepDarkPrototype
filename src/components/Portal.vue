<template>
  <section id="portal">
    <nav class="text-white my-6">
      <a v-for="item in portal" :key="item.name" class="block px-2 hover:bg-crt-4" :href="item.href" >{{ item.name }}</a>
      <!-- <p>{{ item.description }}</p> -->
    </nav>
  </section>
</template>

<script setup>
import { ref } from "vue";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/vue";

const portal = [
  {
    name: "Rankings",
    description: "The best of the best",
    href: "/game/rankings",
    icon: null,
  },
  {
    name: "Characters",
    description: "Show us who you really are",
    href: "/game/characters",
    icon: null,
  },
  {
    name: "Dungeonforge",
    description: "Create dungeons and compete in the rankings",
    href: "/game/dungeonforge",
    icon: null,
  },
  {
    name: "Adventure",
    description: "Enter the dungeon and fight monsters",
    href: "/game/adventure",
    icon: null,
  },
];

const mobileMenuOpen = ref(false);
</script>
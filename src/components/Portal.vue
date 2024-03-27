<template>
  <nav class="text-white">
    <ul v-for="item in portal" :key="item.name">
      <li>
        <a :href="item.href">{{ item.name }}</a>
        <!-- <p>{{ item.description }}</p> -->
      </li>
    </ul>
  </nav>
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
    name: "Player",
    description: "Show us who you really are",
    href: "/player",
    icon: null,
  },
  {
    name: "Dungeoncraft",
    description: "Create dungeons for other players",
    href: "/dungeon/craft",
    icon: null,
  },
];

const mobileMenuOpen = ref(false);
</script>
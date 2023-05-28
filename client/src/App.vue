<template>
  <v-app class="mobile-screen">
    <router-view />
  </v-app>
</template>

<script setup>
import { useAppStore } from './store/app';

const store = useAppStore()
store.month = ('0' + (new Date().getMonth() + 1)).slice(-2)
store.year = new Date().getFullYear()
store.date = `${store.year}-${store.month}`;
</script>

<style>
.mobile-screen {
  margin: 0 auto;
  max-width: 480px;
  min-width: 340px;
  box-shadow: rgba(99, 99, 99, .2) 0 2px 8px 0;
  overflow: hidden;
}

.rtl {
    direction: rtl;
}
</style>

<template>
    <v-app>
        <TopNavigator />
        <v-main class="mt-1 bg-primary">
            <slot />
        </v-main>
        <BottomNavigator />
    </v-app>
</template>

<script setup>
import BottomNavigator from '@/components/BottomNavigator.vue'
import TopNavigator from '@/components/TopNavigator.vue';
</script>
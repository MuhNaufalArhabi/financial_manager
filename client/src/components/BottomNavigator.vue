<template>
    <v-bottom-navigation bg-color="primary" :elevation="2" class="mx-auto" height="55" elevate-on-scrol max-width="480"
        clipped-left clipped-right grow style="position: fixed; width: 480px; right: 0px;">
        <v-btn @click="$router.push('/')" :active="$route.name === 'home'">
            <v-icon>mdi-home</v-icon>
            Data Harian
        </v-btn>
        <v-btn @click="navigate('/account')" :active="$route.name === 'Rekening'">
            <v-icon>mdi-application-outline</v-icon>
            Rekening
        </v-btn>
        <v-btn @click="navigate('/rekap')" :active="$route.name === 'Rekap'">
            <v-icon>mdi-poll</v-icon>
            <span>Rekap</span>
        </v-btn>
        <v-btn @click="navigate('/menu')" :active="$route.name === 'Menu'">
            <v-icon>mdi-view-sequential</v-icon>
            <span>Menu</span>
        </v-btn>
    </v-bottom-navigation>
</template>

<script setup>
import { useAppStore } from '@/store/app';
import { useRouter } from 'vue-router';

const store = useAppStore()
const router = useRouter()
function navigate(to){
    store.defaultPage = true
    store.categoryPage = false
    router.push(to)
}
</script>

<style>
</style>
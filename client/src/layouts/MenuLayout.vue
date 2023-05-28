<template>
    <v-app-bar class="px-3 py-1 mx-auto" height="50" elevate-on-scrol color="primary" max-width="480" clipped-left
        clipped-right app flat style="position: fixed; max-width: 480px; right: 0px;">
        <div>
            <h4 style="font-weight: 500; font-size: 18px;">{{ $route.name }}</h4>
        </div>
        <v-spacer></v-spacer>
        <v-btn icon="mdi-logout" class="mr-0" @click="logout"></v-btn>
    </v-app-bar>
    <v-main class="bg-primary">
        <slot />
    </v-main>
    <BottomNavigator />
</template>

<script setup>
import BottomNavigator from '@/components/BottomNavigator.vue';
import { useRouter } from 'vue-router';
import { googleLogout } from 'vue3-google-login'
const router = useRouter()
function logout(){
    sessionStorage.clear()
    googleLogout()
    router.push('/login')
}
</script>
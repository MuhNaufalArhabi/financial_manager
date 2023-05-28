<template>
    <div class="d-flex flex-column justify-center align-center bg-primary h-100">
        <div class=" d-flex justify-center mt-10">
            <h2>Register</h2>
        </div>
        <div class="d-flex flex-column  justify-center" style="width: 70%;">
            <form @submit.prevent="register">
                <div class="mt-2 ">
                    <v-text-field type="text" hide-details density="compact" variant="outlined" label="Name"
                        v-model="inputRegis.surename"></v-text-field>
                </div>
                <div class="mt-2 ">
                    <v-text-field type="email" hide-details density="compact" variant="outlined" label="Email"
                        v-model="inputRegis.email"></v-text-field>
                </div>
                <div class="mt-2">
                    <v-text-field hide-details density="compact" variant="outlined" label="Password"
                        :append-inner-icon="change ? 'mdi-eye-off' : 'mdi-eye'" :type="change ? 'password' : 'text'"
                        @click:append-inner="() => change = !change" v-model="inputRegis.password"></v-text-field>
                    <div class="d-flex justify-center mt-5">
                        <v-btn type="submit" class="no-text-transform">Register</v-btn>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router'

const router = useRouter()
const inputRegis = ref({
    surename: '',
    email: '',
    password: ''
});
const change = ref(true);

async function register(){
    try {
        await axios({
            method: 'POST',
            url: 'http://localhost:3000/users/register',
            data: inputRegis.value
        })
        router.push('/login')
    } catch (error) {
        console.log(error)
    }
}
</script>

<style>
.no-text-transform {
    text-transform: none !important;
    letter-spacing: normal !important;
}
</style>
  

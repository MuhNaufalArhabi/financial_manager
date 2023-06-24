<template>
    <div class="d-flex flex-column justify-center align-center bg-primary h-100">
        <div class=" d-flex justify-center mt-10">
            <h2>Login</h2>
        </div>
        <div class="d-flex flex-column  justify-center" style="width: 70%;">
            <form @submit.prevent="login">
                <div class="my-2 ">
                    <v-text-field hide-details density="compact" variant="outlined" label="Email" v-model="inputLogin.email"></v-text-field>
                </div>
                <div class="">
                    <v-text-field 
                    hide-details 
                    density="compact" 
                    variant="outlined" 
                    label="password"
                    :append-inner-icon="change ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="change ? 'password': 'text'"
                    @click:append-inner="()=> change = !change"
                    v-model="inputLogin.password"
                    ></v-text-field>
                    <div class="container" style="position:relative; height:50px;">
                        <button class="forgotPw">Lupa Password</button>
                    </div>
                    <div class="d-flex justify-center">
                        <v-btn type="submit" class="no-text-transform">Login</v-btn>
                    </div>
                </div>
            </form>
            <p class="atau" style="text-align: center; margin-top:24px; font-family:Nunito; font-size:14px;">Atau</p>
            <div class="d-flex justify-center mt-5">
                <GoogleLogin :callback="loginGoogle">
                </GoogleLogin>
            </div>
            <div class="toRegister">
                <p class="belumPunya"
                    style="margin-top:72px; font-size:14px; text-align:center; color: white; font-family:Nunito">Belum
                    punya akun ?</p>
                <a href="/register"
                    style="margin-top:72px; font-size:14px; text-align:center;color: rgb(29, 158, 29); text-decoration:none;">Daftar
                    sekarang</a>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAppStore } from '@/store/app';
import axios from 'axios';
import { api } from '@/plugins/axios';

const store = useAppStore()
const router = useRouter()
const change = ref(true);
const inputLogin = ref({
    email: '',
    password: ''
});

async function login(){
    try {
        const { data } = await api.post('/users/login', inputLogin.value)
        sessionStorage.setItem('access_token', data.access_token)
        store.accountName = data.username
        store.isLogin = true
        router.push('/')
    } catch (error) {
        console.log(error)
    }
}

const loginGoogle = async(response) => {
      try {
        store.load(3500)
        const {data} = await api.post('/users/sign-in',undefined,{headers:{
            google_token :response.credential
        }})
        sessionStorage.setItem('access_token', data.access_token)
        store.accountName = data.username
        store.isLogin = true
        router.push('/')
      } catch (error) {
        console.log(error)
      }
    };
</script>

<style>
.no-text-transform{
    text-transform: none !important;
    letter-spacing: normal !important;
}
.toRegister {
    display: flex;
    justify-content: center;
    align-items: center;
}

.toRegister p {
    margin-right: 5px;
}

.forgotPw {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    background-color: transparent;
    margin-top: 16px;
    margin-right: 0px;
    font-family: Nunito;
    font-size: 14px;
    font-weight: 400;
    line-height: 19px;
}
</style>
  

<template>
    <page-layout>
        <v-container class="mt-3 d-flex flex-column">
            <form @submit.prevent="handleAddAccount">
                <v-text-field placeholder="Masukkan nama dompet/rekening" hide-details variant="outlined" density="compact"
                    class="text-white" v-model="accountAdd.name"></v-text-field>
                <v-text-field type="number" placeholder="Saldo" hide-details variant="outlined" density="compact"
                    class="text-white mt-3" v-model="accountAdd.saldo"></v-text-field>
                <div class="rtl">
                    <v-btn class="__text mt-2 bg-primary" type="submit">Simpan</v-btn>
                </div>
            </form>
        </v-container>
    </page-layout>
</template>

<script setup>
import { ref } from 'vue';
import PageLayout from '@/layouts/PageLayout.vue'
import { api } from '@/plugins/axios';
import { useRouter } from 'vue-router';
import { useAppStore } from '@/store/app';

const store = useAppStore()
const accountAdd = ref(typeof store.updateAccount === 'object'? store.updateAccount : {
    name: '',
    saldo: ''
});
const router = useRouter()

async function handleAddAccount(){
    try {
        if(accountAdd.value.id){
            await api.put('/accounts/' + accountAdd.value.id, accountAdd.value, {headers: {
                access_token : sessionStorage.access_token
            }})
        } else {
            await api.post('/accounts', accountAdd.value, {headers: {
                access_token : sessionStorage.access_token
            }})
        }
        store.getAccount()
        store.defaultPage = true
        router.push('/account')
    } catch (error) {
        console.log(error)
    }
};
</script>

<style>
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>
<template>
    <page-layout>
        <v-container>
            <form @submit.prevent="handleAddCategory">
                <v-text-field placeholder="Masukkan kategori" hide-details variant="outlined" density="compact"
                    class="text-white" v-model="name"></v-text-field>
                <div class="rtl">
                    <v-btn class="__text mt-2 bg-primary no-text-transform" type="submit">Simpan</v-btn>
                </div>
            </form>
        </v-container>
    </page-layout>
</template>

<script setup>
import PageLayout from '@/layouts/PageLayout.vue';
import { api } from '@/plugins/axios';
import { useAppStore } from '@/store/app';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const name = ref('');
const store = useAppStore()
async function handleAddCategory(){
    const status = store.pageStatus? 'income': 'spending'
    try {
        await api.post('/categories', {name : name.value, status}, {headers: {
            access_token : sessionStorage.access_token
        }})
        router.go(-1)
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
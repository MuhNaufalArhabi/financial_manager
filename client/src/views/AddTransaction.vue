<template>
    <page-layout :default="false">
        <v-container class="d-flex justify-center align-center">
            <v-btn-toggle v-model="toggleOne" elevation="3" color="accent" variant="outlined" density="compact"
                class="text-white __text mt-5" rounded @click="handleButtonSwitch" >
                <v-btn class="__text">
                    Pengeluaran
                </v-btn>
                <v-btn class="__text">
                    Pemasukan
                </v-btn>
                <v-btn class="__text">
                    Pindah saldo
                </v-btn>
            </v-btn-toggle>
        </v-container>
        <v-container v-if="toggleOne !== undefined">
            <form @submit.prevent="handleInputTrans">
                <v-text-field type="date" density="compact" variant="outlined" hide-details class="text-white"
                    v-model="inputTran.date"></v-text-field>
                <!-- <v-select hide-details density="compact" class="text-white mt-3" :items="store.accounts" item-title="name"
                    variant="outlined" item-value="id" v-model="inputTran.AccountId"></v-select> -->
                <!-- <v-select hide-details density="compact" class="text-white mt-3"
                    :items="sortingCategory(store.categories, toggleOne)" item-title="name" variant="outlined"
                    item-value="id" v-model="inputTran.CategoryId"></v-select> -->
                <div id="Rekening" class="__border-input d-flex w-100" @click="handleSelect('Rekening')">
                    <p class="px-3" :style="account === 'Pilih Rekening' && {filter : 'brightness(.7)'}">{{ account }}</p>
                    <v-spacer></v-spacer>
                    <p class="mr-2">&#9660</p>
                </div>
                <div id="Kategori" class="__border-input d-flex w-100" @click="handleSelect('Kategori')">
                    <p class="px-3" :style="category === 'Pilih Kategori' && {filter : 'brightness(.7)'}">{{ category }}</p>
                    <v-spacer></v-spacer>
                    <p class="mr-2">&#9660</p>
                </div>
                <v-text-field type="text" density="compact" variant="outlined" hide-details class="text-white mt-3"
                    label="Jumlah" v-model="inputTran.saldo"></v-text-field>
                <v-text-field type="text" density="compact" variant="outlined" hide-details class="text-white mt-3"
                    label="Masukkan Judul" v-model="inputTran.title"></v-text-field>
                <div class="rtl">
                    <v-btn class="__text mt-2 bg-primary" type="submit">Simpan</v-btn>
                </div>
            </form>
        </v-container>
        <v-dialog v-model="showDialog" max-width="480px" :content-class="'__type-dialog'" location="bottom">
            <div class="bg-primary" style=" width: 100%; height: auto;">
                <div class="__container-dialog d-flex align-center">
                    <p>{{ titleDialog }}</p>
                    <v-spacer></v-spacer>
                    <v-icon icon="mdi-pencil-box-outline" @click="handleAdd"></v-icon>
                </div>
                <v-row no-gutters class="my-5">
                    <v-col v-for="data in contentDialog" cols="4" class="d-flex justify-center align-center">
                        <div class="__content-dialog" @click="selectInput(data.name, data.id)">
                            <p>{{ data.name }}</p>
                        </div>
                    </v-col>
                </v-row>
            </div>
        </v-dialog>
    </page-layout>
</template>

<script setup>
import PageLayout from '@/layouts/PageLayout.vue'
import { ref, watch, onMounted } from 'vue';
import { useAppStore } from '@/store/app';
import { formatDate, sortingCategory } from '@/services/helpers'
import axios from 'axios';
import { useRouter } from 'vue-router';
import { api } from '@/plugins/axios';

const titleDialog = ref('')
const contentDialog = ref('')
const router = useRouter()
const store = useAppStore()
const account = ref('Pilih Rekening')
const category = ref('Pilih Kategori')
const showDialog = ref(false)
const inputTran = ref(typeof store.updateTrans === 'object' ? store.updateTrans : {
    title: '',
    saldo: '',
    date: formatDate(new Date()),
    status: 'spending',
    AccountId: false,
    CategoryId: false
})
const toggleOne = ref(0);

watch(toggleOne, () => {
    inputTran.value.status = toggleOne.value === 0 ? 'spending' : 'income'
})

function handleButtonSwitch() {
    const rekening = document.querySelector('#Rekening')
    const kategori = document.querySelector('#Kategori')
    account.value = 'Pilih Rekening'
    category.value = 'Pilih Kategori'
}

function handleSelect(to) {
    if (to === 'Rekening') {
        showDialog.value = true
        titleDialog.value = 'Pilih Rekening'
        contentDialog.value = store.accounts
    }

    if (to === 'Kategori' && toggleOne.value === 0) {
        showDialog.value = true
        titleDialog.value = 'Pilih Kategori Pengeluaran'
        contentDialog.value = sortingCategory(store.categories, toggleOne.value)
    }

    if (to === 'Kategori' && toggleOne.value === 1) {
        showDialog.value = true
        titleDialog.value = 'Pilih Kategori Pemasukan'
        contentDialog.value = sortingCategory(store.categories, toggleOne.value)
    }
}

function handleAdd() {
    const title = titleDialog.value.split(' ')[1]
    const status = toggleOne.value === 0 ? 'spending' : 'income'

    if (title === 'Rekening') {
        router.push('/account')
    }

    if (title === 'Kategori' && status === 'spending') {
        store.pageStatus = false
        router.push('/category')
    }

    if (title === 'Kategori' && status === 'income') {
        store.pageStatus = true
        router.push('/category')
    }
}

function selectInput(value, id) {
    let title = titleDialog.value.split(' ')[1]
    if (title === 'Rekening') {
        account.value = value
        inputTran.value.AccountId = id
    } else {
        category.value = value
        inputTran.value.CategoryId = id
    }
    showDialog.value = false
}

async function handleInputTrans() {
    try {
        if (inputTran.value.id) {
            await api.put('/transaction/' + inputTran.value.id, inputTran.value, {headers: {
                access_token: sessionStorage.access_token
            }})
        } else {
            await api.post('/transaction', inputTran.value, {headers: {
                access_token: sessionStorage.access_token
            }})
        }
        store.getTransaction()
        router.go(-1)
    } catch (error) {
        console.log(error)
    }
}

async function getAccountById(id){
    try {
        const { data } = await api.get('/accounts/' + id, { headers: {
            access_token: sessionStorage.access_token
        }})
        account.value = data.name
    } catch (error) {
        console.log(error)
    }
}

async function getCategoryById(id){
    try {
        const { data } = await api.get('/categories/' + id, {headers: {
            access_token: sessionStorage.access_token
        }})
        category.value = data.name
    } catch (error) {
        console.log(error)
    }
}

onMounted(() => {
    toggleOne.value = inputTran.value.status === 'spending'? 0: 1
    getAccountById(inputTran.value.AccountId)
    getCategoryById(inputTran.value.CategoryId)
    console.log('ini Rekening:' ,account.value)
});
</script>


<style>
.__content-dialog {
    width: 90%;
    padding: 7px 16px;
    border: 1px solid white;
    border-radius: 5px;
    margin-top: 10px;
    text-align: center;
    font-size: 14px;
}

.__container-dialog {
    height: 45px;
    padding: 7px 16px;
    box-shadow: 0px 10px 8px 0px rgba(0, 0, 0, 0.6);
    -webkit-box-shadow: 0px 10px 8px 0px rgba(0, 0, 0, 0.6);
    -moz-box-shadow: 0px 10px 8px 0px rgba(0, 0, 0, 0.6);
}

.__type-dialog {
    position: fixed;
    margin: auto !important;
    right: 0;
    left: 0;
    bottom: 0;
}

.__border-input {
    height: 40px;
    border: 1px solid #7C7C7D;
    border-radius: 4px;
    padding: 7px 5px 7px 5px;
    margin-top: 13px;
    cursor: pointer;
}



.__text {
    font-size: 15px;
    text-transform: none !important;
    letter-spacing: normal !important;
}

.no-text-transform{
    text-transform: none !important;
    letter-spacing: normal !important;
}

input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>
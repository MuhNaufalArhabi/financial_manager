<template>
    <menu-layout>
        <div class="d-flex mt-2 flex-column">
            <div class="__header">
                <h5>Akun</h5>
            </div>
            <div class="__menu">
                <div class="__menu-content d-flex flex-column">
                    <h5>Info</h5>
                    <h6 style="filter: brightness(.8);">{{ store.accountName }}</h6>
                </div>
            </div>
            <div class="__header">
                <h5>Referensi</h5>
            </div>
            <div class="__menu">
                <div class="__menu-content" @click="navigate('/category', true, false)">
                    <h5>Kategori Pengeluaran</h5>
                    <span class="pr-3 pt-4 pl-1" style="font-size: 10px; font-weight: 300; color: #fff;">&gt</span>
                </div>
                <v-divider />
                <div class="__menu-content" @click="navigate('/category', true, true)">
                    <h5>Kategori Pemasukan</h5>
                    <span class="pr-3 pt-4 pl-1" style="font-size: 10px; font-weight: 300; color: #fff;">&gt</span>
                </div>
            </div>
        </div>
    </menu-layout>
</template>

<script setup>
import MenuLayout from '@/layouts/MenuLayout.vue';
import { useAppStore } from '@/store/app';
import { useRouter } from 'vue-router';

const router = useRouter()
const store = useAppStore();
function navigate(to, category, status){
    store.defaultPage = false
    store.pageStatus = status
    store.categoryPage = category
    router.push(to)
}
</script>

<style>
.__header{
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    padding: 7px 16px;
    border-top: 1px solid #7C7C7D;
    border-bottom: 1px solid #7C7C7D ;
}

.__menu{
    width: 100%;
    height: auto;
    background-color: #404449;
}

.__menu-content{
    position: relative;
    width: 100%;
    height: auto;
    padding: 10px 16px 7px 16px;
    display: flex;
    flex-direction: row;
    cursor: pointer;
}

.__menu-content:hover{
    background-color: rgb(40, 59, 40);
    filter:brightness(.7);
}

.__menu-content:active{
    filter: brightness(.9);
}

.__menu-content-account{
    position: relative;
    width: 100%;
    height: 50px;
    padding: 7px 16px 7px 16px;
    display: flex;
    flex-direction: row;
    cursor: pointer;
}
.__menu-content > span{
    position: absolute;
    right: 0;
    bottom: 30%;
}
</style>
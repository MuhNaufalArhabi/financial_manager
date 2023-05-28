<template>
    <page-layout>
        <div class="mt-1">
            <v-row no-gutters v-for="account in store.accounts">
                <div class="w-100 text-white pa-2 __account" @click="updateAccount(account)">
                    <v-row class="py-2">
                        <v-col>
                            {{ account.name }}
                        </v-col>
                        <v-col class="d-flex justify-end px-0">
                            {{ formatNumber(account.saldo) }}
                        </v-col>
                        <span class="pr-3 pt-4 pl-1" style="font-size: 10px; font-weight: 300; color: #fff;">&gt</span>
                    </v-row>
                </div>
                <v-divider />
            </v-row>
        </div>
        <div class="rtl">
            <div class="btn-add">
                <FloatingButton :add="'Account'" />
            </div>
        </div>
    </page-layout>
</template>

<script setup>
import PageLayout from '@/layouts/PageLayout.vue'
import FloatingButton from '@/components/FloatingButton.vue';
import { useAppStore } from '@/store/app';
import { formatNumber } from '@/services/helpers'
import { useRouter } from 'vue-router';
import router from '@/router';

const ruter = useRouter()
const store = useAppStore();
function updateAccount(payload){
    store.updateAccount = payload
    store.defaultPage = false
    router.push('/add-account')
};
</script>

<style> 
.__border-top {
     border-top: 1px solid lightgray;
}

.btn-add {
     bottom: 92px;
     position: fixed;
     direction: ltr;
     display: flex;
     align-items: center;
}

.__account {
    cursor: pointer;
}

.__account:hover{
    background-color: rgb(40, 59, 40);
    filter:brightness(.7);
}

.__account:active{
    filter: brightness(.9);
}
</style>
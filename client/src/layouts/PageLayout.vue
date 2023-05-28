<template>
    <v-app-bar class="px-3 py-1 mx-auto" height="50" elevate-on-scrol color="primary" max-width="480" clipped-left
        clipped-right app style="position: fixed; width: 480px; right: 0px;">
        <v-btn width="10" height="full" style="margin-left: -10px;" v-if="!store.defaultPage" @click="handleBack">
            <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <div v-if="store.defaultPage && !store.categoryPage">
            <h4 style="font-weight: 500; font-size: 18px;">{{ $route.name }}</h4>
        </div>
        <div v-if="!store.defaultPage && !store.categoryPage">
            <h4 style="font-weight: 500; font-size: 18px;">{{ sliceName($route.name)}}</h4>
        </div>
        <div v-if="!store.defaultPage && !store.pageStatus && store.categoryPage">
            <h4 style="font-weight: 500; font-size: 18px;">{{ sliceName($route.name )}} Pengeluaran</h4>
        </div>
        <div v-if="!store.defaultPage && store.pageStatus && store.categoryPage">
            <h4 style="font-weight: 500; font-size: 18px;">{{ sliceName($route.name )}} Pemasukan</h4>
        </div>
        <v-spacer v-if="store.updateTrans !== false"></v-spacer>
        <v-btn icon="mdi-trash-can-outline" v-if="store.updateTrans !== false" @click="deleteTransaction(store.updateTrans.id)"></v-btn>
    </v-app-bar>
    <v-main class="bg-primary">
        <slot />
    </v-main>
    <BottomNavigator v-if="store.defaultPage" />
</template>

<script setup>
import BottomNavigator from '@/components/BottomNavigator.vue'
import { api } from '@/plugins/axios';
import { sliceName } from '@/services/helpers'
import { useAppStore } from '@/store/app';
import { useRouter } from 'vue-router';

const store = useAppStore()
const router = useRouter()
const props = defineProps({
    default: {
        type: Boolean,
        default: true
    }
});

function handleBack(){
    store.updateTrans = false
    store.updateAccount = false
    if(store.categoryPage){
        store.defaultPage = false
    } else {
        store.defaultPage = true
    }
    store.categoryPage = false
    router.go(-1)
}

async function deleteTransaction(id){
    try {
        await api.delete('/transaction/' + id)
        store.updateTrans = false
        router.go(-1)
    } catch (error) {
        console.log(error)
    }
}


</script>
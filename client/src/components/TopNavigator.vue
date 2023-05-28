<template>
    <v-app-bar 
    class="px-3 py-1 mx-auto" 
    height="50" 
    elevate-on-scrol 
    color="primary" 
    max-width="480" 
    clipped-left
    clipped-right 
    app      
    style="position: fixed; max-width: 480px; right: 0px;">
        <div class="d-flex justify-center align-center">
            <v-text-field 
            type="month" 
            hide-details
            v-model="store.date"
            variant="solo" 
            bg-color="primary"
            density="compact" 
            flat
            prepend-icon="mdi-menu-left"
            append-icon="mdi-menu-right"
            @click:prepend="monthDown"
            @click:append="monthUp"
            ></v-text-field>
        </div>
        <v-spacer/>
        <v-spacer/>
        <v-btn icon="mdi-magnify"></v-btn>
    </v-app-bar>
</template>

<script setup>
import { useAppStore } from '@/store/app';

const store = useAppStore()

function monthUp(){
    store.month = ('0' + (+store.month +1)).slice(-2)
            if(store.month === '13'){
                store.month = '01'
                store.year = store.year + 1
            }
            store.date = `${store.year}-${store.month}`
            store.getTransaction()
}
function monthDown(){
    store.month = ('0' + (+store.month -1)).slice(-2)
            if(store.month === '00'){
                store.month = '12'
                store.year = store.year - 1
            }
            store.date = `${store.year}-${store.month}`
            store.getTransaction()
}

</script>

<style>
.v-field__input::-webkit-calendar-picker-indicator {
  opacity: 0;
  cursor: pointer;
}
</style>
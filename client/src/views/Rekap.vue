<template>
    <page-layout>
        <v-row no-gutters v-for="data in store.rekap" class="my-1">
            <div style="background-color: #404449;" class="pa-5 w-100">
                <div class="d-flex justify-center mb-5">
                    <h4>{{ formatDateRekap(data.month_start) }} - {{ formatDateRekap(data.month_end) }}</h4>
                </div>
                <v-row>
                    <v-col>
                        <h5>Saldo Awal</h5>
                    </v-col> 
                    <v-col class="d-flex justify-end">
                        <h5>{{ formatNumber(data.saldo_awal) }}</h5>
                    </v-col>                 
                </v-row>
                <v-row>
                    <v-col>
                        <h5>Total Pengeluaran</h5>
                    </v-col> 
                    <v-col class="d-flex justify-end">
                        <h5 v-if="data.spending > 0">-{{ formatNumber(data.spending) }}</h5>
                        <h5 v-if="!data.spending">{{ data.spending }}</h5>
                    </v-col>                 
                </v-row>
                <v-row>
                    <v-col>
                        <h5>Total Pemasukan</h5>
                    </v-col> 
                    <v-col class="d-flex justify-end">
                        <h5 class="text-accent">+{{ formatNumber(data.income) }}</h5>
                    </v-col>                 
                </v-row>
                <v-row>
                    <v-col>
                        <h5>Selisih</h5>
                    </v-col> 
                    <v-col class="d-flex justify-end">
                        <h5 class="text-accent" v-if="data.income > data.spending">+{{ formatNumber(data.selisih) }}</h5>
                        <h5 v-if="data.income < data.spending">-{{ formatNumber(data.selisih) }}</h5>
                    </v-col>                 
                </v-row>
                <v-row>
                    <v-col>
                        <h5>Saldo Akhir</h5>
                    </v-col> 
                    <v-col class="d-flex justify-end">
                        <h5>{{ formatNumber(data.saldo_akhir) }}</h5>
                    </v-col>                 
                </v-row>
            </div>
        </v-row>
    </page-layout>
</template>

<script setup>
import PageLayout from '@/layouts/PageLayout.vue'
import { useAppStore } from '@/store/app';
import { formatDateRekap, formatNumber } from '@/services/helpers';

const store = useAppStore();
</script>

<style scoped>
.v-col{
    padding: 4px 10px !important;
}

h5{
    font-weight: 500 !important;
}

h4{
    font-weight: 600 !important;
}
</style>
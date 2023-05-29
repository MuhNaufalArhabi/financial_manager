<template>
    <MainLayout>
        <v-row no-gutters v-for="data in store.transactions" class="my-1">
            <div style="background-color: #404449;" class="pa-2 w-100">
                <v-row class="d-flex justify-end">
                    <v-col>
                        <div class="__time">
                            <div class="__date">
                                <p>{{ getDate(data.date) }}</p> <!-- tanggal -->
                            </div>
                            <div class="__month">
                                <p>{{ getMonth(data.date) }} {{ getYear(data.date) }}</p> <!-- bulan tahun -->
                                <p class="__day">{{ getDay(data.date) }}</p> <!-- hari -->
                            </div>
                        </div>
                    </v-col>
                    <v-col class="d-flex justify-end align-center">
                        <p class="text-accent">{{ totalNumberPlus(data.json_agg) }}</p> <!-- total income -->
                    </v-col>
                    <v-col class="d-flex justify-end align-center">
                        <p class="pr-3">{{ totalNumberMinus(data.json_agg) }}</p> <!-- total spending -->
                    </v-col>
                </v-row>
                <v-divider class="mb-2"></v-divider>
                <div v-for="trans in data.json_agg">
                    <TransactionDetail :title="trans.title" :saldo="trans.saldo" :status="trans.status"
                        :category="trans.category" @click="updateTrans(trans)" style="cursor: pointer;" />
                </div>
            </div>
        </v-row>
        <div class="rtl">
            <div class="btn-add">
                <FloatingButton :add="'Transaction'" />
            </div>
        </div>
    </MainLayout>
</template>

<script setup>
import MainLayout from '@/layouts/MainLayout.vue'
import TransactionDetail from '@/components/TransactionDetail.vue'
import FloatingButton from '@/components/FloatingButton.vue'
import { ref, onMounted } from 'vue'
import { getDate, getDay, getMonth, getYear, totalNumberMinus, totalNumberPlus, formatDate } from '@/services/helpers'
import { useAppStore } from '@/store/app'
import { useRouter } from 'vue-router'

const store = useAppStore();
const router = useRouter()

async function updateTrans(payload) {
    store.load()
    store.updateTrans = payload
    store.updateTrans.date = store.updateTrans.date.split('T')[0]
    store.defaultPage = false
    router.push('/add-transaction')
}

onMounted(() => {
    store.getTransaction();
    store.getAccount();
    store.getCategory()
    store.getRekap()
});
</script>

<style>
.__time {
    display: flex;
}

.__date {
    display: flex;
    flex-direction: column;
    font-size: 30px;
    font-weight: 700;
    margin-right: 5px;
}

.__month {
    display: flex;
    flex-direction: column;
    font-size: 12px;
    justify-content: center;
    line-height: 1;
}

.__day {
    background-color: lightgray;
    color: black;
    border-radius: 4px;
    font-weight: 500;
    text-align: center;
}

.__line-height {
    line-height: 1;
}

.btn-add {
    bottom: 92px;
    position: fixed;
    direction: ltr;
    display: flex;
    align-items: center;
}
</style>

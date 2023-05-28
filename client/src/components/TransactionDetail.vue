<template>
    <v-row class="__transaction">
        <v-col class="__line-height">
            <h5 style="font-size: 13px;">{{ category }}</h5>
            <p style="font-size: 11px;" class="pt-1">{{ title }}</p>
        </v-col>
        <v-col class="d-flex justify-end align-center relative"
            :style="status === 'income' ? { color: '#54B435' } : { color: 'white' }">
            {{ numberSign(saldo, status) }}
            <span class="px-1 pt-4" style="font-size: 10px; font-weight: 300; color: #fff;">&gt</span>
        </v-col>
    </v-row>
</template>

<script>
import { mapState } from 'pinia'
import { useAppStore } from '@/store/app.js'
export default {
    props: {
        title: String,
        saldo: Number,
        status: String,
        category: String
    },
    computed: {
        ...mapState(useAppStore, [])
    },
    methods: {
        numberSign(num, status) {
            if (status === "income") {
                return "+" + this.formatNumber(num)
            } else {
                return "-" + this.formatNumber(num)
            }
        },
        formatNumber(num) {
            return num.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
        }
    }
}
</script>

<style>
.__transaction:hover{
    background-color: rgb(40, 59, 40);
    filter:brightness(.7);
}

.__transaction:active{
    filter: brightness(.9);
}
</style>
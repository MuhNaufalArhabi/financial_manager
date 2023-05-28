<template>
    <div class="__fab" :style="!store.defaultPage && store.categoryPage && {bottom: '-60px'}">
        <v-btn class="bg-white" rounded="2xl" color="black" icon="mdi-plus" @click="navigation">
        </v-btn>
    </div>
</template>

<script setup>
import { useAppStore } from '@/store/app';
import { useRouter } from 'vue-router';
const props = defineProps({
    add: {
        type: String,
        default: 'Transaction'
    }
});
const router = useRouter()
const store = useAppStore()

function navigation() {
    store.defaultPage = false
    switch (props.add) {
        case 'Transaction':
            return router.push('/add-transaction')
        case 'Account':
            return router.push('/add-account')
        case 'Category':
            return router.push('/add-category')
        default:
            break;
    }
};
</script>

<style>
.__fab {
    position: absolute;
    bottom: 17%;
    right: 20px;
}
</style>
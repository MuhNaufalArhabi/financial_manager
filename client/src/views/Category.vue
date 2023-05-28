<template>
    <page-layout>
        <div class="mt-1">
            <v-row no-gutters v-for="category in sortingCategory(store.categories, status)">
                <div class="w-100 text-white pa-2 __category">
                    <v-row class="py-2">
                        <v-col>
                            {{ category.name }}
                        </v-col>
                        <span class="pr-3 pt-4 pl-1" style="font-size: 10px; font-weight: 300; color: #fff;">&gt</span>
                    </v-row>
                </div>
                <v-divider />
            </v-row>
        </div>
        <div class="rtl">
            <div class="btn-add">
                <FloatingButton :add="'Category'" />
            </div>
        </div>
    </page-layout>
</template>

<script setup>
import PageLayout from '@/layouts/PageLayout.vue'
import FloatingButton from '@/components/FloatingButton.vue';
import { sortingCategory } from '@/services/helpers'
import { useAppStore } from '@/store/app';
import { ref } from 'vue';
import { onMounted } from 'vue';

const store = useAppStore();
const status = ref(!store.pageStatus ? 0 : 1);

onMounted(() => {
    store.getCategory()
});
</script>

<style> 

.btn-add {
     bottom: 92px;
     position: fixed;
     direction: ltr;
     display: flex;
     align-items: center;
}

.__category {
    cursor: pointer;
}

.__category:hover{
    background-color: rgb(40, 59, 40);
    filter:brightness(.7);
}

.__category:active{
    filter: brightness(.9);
}
</style>
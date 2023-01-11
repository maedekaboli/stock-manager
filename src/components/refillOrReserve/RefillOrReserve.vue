<script setup lang="ts">
import { ref } from 'vue'
import axios from '../../api'
import ProductType from '../product/ProductType'

const props = defineProps<{
    tabValue: number,
    stock: number,
    productId: number,
    actionType: string
}>()

const emit = defineEmits<{
    (e: 'newStockAmount', val: ProductType): void
}>()
const stockAmount = ref(1)
const snackbar = ref(false)
const snackbarMsg = ref<null | string>(null)
const loading = ref(false)

const submitStock = () => {
    if (props.actionType == 'reserve' && stockAmount.value > props.stock) {
        snackbar.value = true
        snackbarMsg.value = "Reserved amount is greater than current stock amount!"
    }
    else {
        loading.value = true
        axios.put<ProductType>(`${props.productId}/${props.actionType}?amount=${stockAmount.value}`).then(res => {
            loading.value = false
            emit('newStockAmount', { stock: res?.data?.stock, id: props.productId, reservations: res?.data?.reservations })
        }).catch(err => {
            loading.value = false
            snackbar.value = true
            snackbarMsg.value = err
        })
    }
}
</script>

<template>
    <v-window-item :value="props.tabValue">
        <div class="px-4 pb-5">
            <h5 class="mb-2">How many stocks would you
                {{ props.actionType }}
                ?
            </h5>
            <v-text-field v-model.number="stockAmount" type="number" min="1" variant="outlined"></v-text-field>
            <v-btn @click="submitStock" class="mr-2" size="small" :loading="loading" :disabled="loading" rounded="pill"
                color="success">
                {{ props.actionType }}
            </v-btn>
        </div>
        <v-snackbar v-model="snackbar" :timeout="5000" color="red accent-1" location="top">
            {{ snackbarMsg }}
        </v-snackbar>
    </v-window-item>
</template>
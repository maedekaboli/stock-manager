<script setup>
import { ref } from 'vue'
import axios from '../../api'

const props = defineProps({
    tabValue: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    productId: {
        type: Number,
        required: true
    }
})
const emit = defineEmits(['newStockAmount'])

const stockAmount = ref(props.stock)

const loading = ref(false)
const buyProduct = () => {
    loading.value = true
    axios.put(`${props.productId}/buy?amount=${stockAmount.value}`).then(res => {
        loading.value = false
        emit('newStockAmount', { newStock: res?.data?.stock, id: props.productId, reservations: res?.data?.reservations })
    }).catch(err => {
        loading.value = false
    })
}
</script>

<template>
    <v-window-item :value="props.tabValue">
        <div class="px-4 py-5">
            <div v-if="props.stock > 0">
                <h5>How many stocks would you buy?</h5>
                <v-slider thumb-label="always" v-model="stockAmount" class="align-center mt-8" :max="props.stock"
                    :min="1" step="1" hide-details>
                </v-slider>
            </div>
            <v-btn v-if="props.stock > 0" class="mr-2" size="small" @click="buyProduct" :loading="loading"
                :disabled="loading" rounded="pill" color="success">
                Buy
            </v-btn>
            <h5 v-else class="mb-5">There isn't any stock to buy!</h5>
        </div>
    </v-window-item>
</template>
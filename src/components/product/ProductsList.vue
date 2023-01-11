<script setup>
import axios from '../../api'
import { ref, defineAsyncComponent } from 'vue'
const Product = defineAsyncComponent(() => import('./Product.vue'));

const snackbar = ref(false)
const snackbarMsg = ref(null)

const products = ref([])
await axios.get().then(res => {
  //because of better UX, data has been sliced
  products.value = res?.data.slice(0, 100)
}).catch(err => {
  snackbar.value = true
  snackbarMsg.value = err
})

const editStockAmount = (val) => {
  const foundIndex = products.value.findIndex(x => x.id === val.id);
  const newItem = products.value[foundIndex];
  products.value[foundIndex] = { ...newItem, stock: val.newStock, reservations: val.reservations }
}
</script>

<template>
  <div class="d-flex flex-row flex-wrap">
    <Product v-for="product in products" :key="product.id" :product="product" @editStockAmount="editStockAmount">
    </Product>
  </div>
  <v-snackbar v-model="snackbar" :timeout="5000" color="red accent-1" location="top">
    {{ snackbarMsg }}
  </v-snackbar>
</template>


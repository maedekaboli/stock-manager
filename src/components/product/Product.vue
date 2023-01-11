<script setup>
import { ref, defineAsyncComponent } from 'vue'
const Reservations = defineAsyncComponent(() => import('../reservation/Reservations.vue'));
const BuyProduct = defineAsyncComponent(() => import('./BuyProduct.vue'));
const RefillOrReserve = defineAsyncComponent(() => import('../RefillOrReserve.vue'));

defineProps({
    product: {
        type: Object,
        required: true
    }
})
const tabsBtns = ref([
    { value: 2, color: 'info', icon: 'mdi-bookmark-plus-outline' },
    { value: 3, color: 'success', icon: 'mdi-currency-usd' },
    { value: 4, color: 'purple', icon: 'mdi-database-plus-outline' }
])
const show = ref(false)
const tabs = ref(null)

const showReservation = (val) => {
    show.value = val;
}

const stockChanged = ref(false)
const emit = defineEmits(['editStockAmount'])
const newStockAmount = (val) => {
    emit('editStockAmount', val)
    showReservation(false)
    setTimeout(() => {
        stockChanged.value = false
    }, 3000);
    stockChanged.value = true
}

</script>


<template>
    <v-col cols="md-4 Product">
        <v-card class="mx-auto">
            <v-card-title>
                {{ product.name }}
            </v-card-title>

            <v-card-subtitle>
                stock amount: <strong :class="[stockChanged ? 'new-stock' : '', 'px-2']">{{ product.stock }}</strong>
            </v-card-subtitle>
            <v-card-actions>
                <v-toolbar color="transparent" class="px-0">
                    <template v-slot:extension>
                        <v-tabs v-model="tabs" grow>

                            <v-tab v-if="product.reservations['length'] > 0" :value="1" @click="showReservation(true)">
                                <v-btn color="blue-lighten-1" class="text-subtitle-2" variant="text">
                                    <v-icon :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"></v-icon>
                                    Reservations
                                </v-btn>
                            </v-tab>

                            <v-tab v-for="(btn, index) in tabsBtns" :key="index" :value="btn.value"
                                @click="showReservation(true)">
                                <v-btn :color="btn.color" :icon="btn.icon" size="x-small" variant="outlined">
                                </v-btn>
                            </v-tab>

                        </v-tabs>
                    </template>
                </v-toolbar>
            </v-card-actions>

            <v-window v-model="tabs" v-if="show">
                <v-divider></v-divider>
                <div class="d-flex justify-end">
                    <v-btn icon="mdi-close" @click="showReservation(false)" size="x-small" class="mx-3 mt-3">
                    </v-btn>
                </div>
                <Reservations :tabValue="1" :reservations="product.reservations" />
                <RefillOrReserve :tabValue="2" :productId="product.id" :actionType="'reserve'" :stock="product.stock"
                    @newStockAmount="newStockAmount" />
                <BuyProduct :tabValue="3" :stock="product.stock" :productId="product.id"
                    @newStockAmount="newStockAmount" />
                <RefillOrReserve :tabValue="4" :productId="product.id" :actionType="'refill'"
                    @newStockAmount="newStockAmount" />
            </v-window>
        </v-card>
    </v-col>
</template>


<style>
.Product .new-stock {
    background-color: rgb(0, 32, 175) !important;
    border-radius: 6px;
    color: white;
}

.Product .v-tab.v-tab {
    min-width: auto !important;
}

.Product .v-toolbar__content,
.Product .v-tab__slider {
    display: none !important;
}
</style>
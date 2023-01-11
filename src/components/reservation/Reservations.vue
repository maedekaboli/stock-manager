<script setup>
import {  defineAsyncComponent } from 'vue'
const ReservedItem = defineAsyncComponent(() => import('./ReservedItem.vue'));

defineProps({
    tabValue: {
        type: Number,
        required: true
    },
    reservations: {
        type: Array,
        required: true
    }
})
</script>


<template>
    <v-window-item :value="tabValue">
        <v-timeline density="compact" align="start" class="mx-2 mb-5">
            <v-timeline-item v-for="reservedItem in reservations" :key="reservedItem.id"
                dot-color="deep-purple-lighten-1" size="x-small">
                <ReservedItem :reservedItem="reservedItem" />
            </v-timeline-item>
        </v-timeline>
    </v-window-item>
</template>
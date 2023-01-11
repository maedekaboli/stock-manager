<script setup>
import { computed } from 'vue';

const props = defineProps({
    reservedItem: {
        type: Object,
        required: true
    }
})

const reservedItemDate = computed(() => {
    return (new Date(props.reservedItem.pointOfTime)).toLocaleString()
})

</script>


<template>
    <div class="mb-4">
        <div class="font-weight-normal">
            <strong>{{ reservedItem.amount }}</strong> items reserved
        </div>
        <small> <v-icon icon="mdi-clock-outline"></v-icon> {{ reservedItemDate }}</small>
    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import ReservedItemType from './ReservedItemType'


const props = defineProps<{
    reservedItem: ReservedItemType
}>()

const reservedItemDate = computed((): string => {
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
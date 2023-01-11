<script setup>
import {  defineAsyncComponent } from 'vue'
const ProductsList = defineAsyncComponent(() => import('./components/product/ProductsList.vue'))
</script>

<template>
  <v-app>
    <v-app-bar :elevation="2" color="primary" absolute>
      <v-app-bar-title class="d-flex justify-space-around">Welcome to Stock Management!</v-app-bar-title>
    </v-app-bar>
    <v-main>
      <v-container class="my-10">
        <Suspense>
          <ProductsList />
          <template #fallback>
            <v-row class="fill-height" align-content="center" justify="center">
              <v-col class="text-subtitle-1 text-center" cols="12">
                Getting stocks, please wait!
              </v-col>
              <v-col cols="6" class="d-flex justify-center ">
                <v-progress-circular :size="50" :width="2" color="purple" indeterminate></v-progress-circular>
              </v-col>
            </v-row>
          </template>
        </Suspense>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.v-application {
  background-color: #edeff3 !important;
}
</style>


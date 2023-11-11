<template>
  <BCard v-b-color-mode="currentColor">
    <BButton @click="changeColor"> Current color: {{ currentColor }} </BButton>
  </BCard>
</template>

<script setup lang="ts">
import {vBColorMode} from 'bootstrap-vue-next'

// Unlike the composable variant, this is not strongly typed by default!
const currentColor = ref<'light' | 'dark'>('light')

const changeColor = () => {
  currentColor.value = currentColor.value === 'dark' ? 'light' : 'dark'
}
</script>
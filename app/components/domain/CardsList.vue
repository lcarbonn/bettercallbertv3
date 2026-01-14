<template>
  <UPageGrid class="mt-2">
    <DomainCard v-for="card in cards" :card="card"/>
  </UPageGrid>
</template>

<script setup lang="ts">
  // props
  const props = defineProps<{
      cards:Array<ICard>;
  }>()
</script>

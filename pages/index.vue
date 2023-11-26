<template>
    <DomainListCards :cards="cards"/>
</template>

<script setup lang="ts">

const cards = useCards()

onMounted(async () => {
  getCards()
})
</script>
<template>
  <div>
    <DomainCardsList :cards="cards"/>
  </div>
</template>

<script setup lang="ts">

  // middleware
  definePageMeta({
    // middleware: 'auth'
  })

  const cards = await getAllCards()


</script>
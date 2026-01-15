<template>

  <DomainCardDetail :card="card" class="mt-2"/>

</template>
<script setup lang="ts">

  const id:number = Number(useRoute().params.id).valueOf()
  const card = await getCard(id)

</script>

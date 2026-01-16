<template>
  <UPageCard
    :title="card.title"
    :to="'/card/'+card.id"
    variant="subtle"
    spotlight
    spotlight-color="primary">
    <img :src="card.src"/>
  </UPageCard>
</template>

<script setup lang="ts">

  // props
  const props = defineProps<{
      card:ICard;
  }>()

  // const bgColor = computed (() => {
  //   return "bg-"+props.card.color
  // })

</script>

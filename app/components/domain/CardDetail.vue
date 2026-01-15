<template>
  <UPageCard
    :title="card.title"
    :to="card.link"
    variant="subtle"
    :class="bgColor"
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

  const bgColor = computed (() => {
    return "bg-"+props.card.color
  })

  const nav2card = async (id:number) => {
    await navigateTo("/card/"+id)
  }

</script>

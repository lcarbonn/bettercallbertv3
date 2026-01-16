<template>
  <UPageCard
    :title="card.title"
    :to="'/card/'+card.id"
    variant="subtle"
    :class="bgColor">
    <img :src="card.src" :alt="card.title"/>
  </UPageCard>
</template>

<script setup lang="ts">

  // props
  const props = defineProps<{
      card:ICard;
  }>()

  const bgColor = computed (() => {
    return getBgColor(props.card.color)
  })

</script>

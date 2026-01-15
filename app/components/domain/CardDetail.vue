<template>
  <UCarousel
    ref="carousel"
    class="mt-2"
    :items="items"
    arrows
    :prev="{ onClick: gotoPrevious }"
    :next="{ onClick: gotoNext }">
    <UPageCard
      :title="card.title"
      :to="card.link"
      variant="subtle"
      :class="bgColor"
      spotlight
      spotlight-color="primary">
      <img :src="card.src"/>
    </UPageCard>
  </UCarousel>
</template>

<script setup lang="ts">

  // props
  const props = defineProps<{
      card:ICard;
  }>()

  const carousel = useTemplateRef('carousel')

  const items = computed (() => {
    carousel.value?.emblaApi?.scrollTo(1)
    return ["", props.card, ""]
  })

  const bgColor = computed (() => {
    return "bg-"+props.card.color
  })

  const gotoPrevious = async () => {
    const id = props.card.id - 1
    await navigateTo("/card/"+id)
  }
  const gotoNext = async () => {
    const id = props.card.id + 1
    await navigateTo("/card/"+id)
  }

</script>

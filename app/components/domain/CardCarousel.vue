<template>
  <UCarousel
    ref="carousel"
    class="mt-2"
    :items="items"
    v-slot="{ item }"
    :start-index = "index"
    arrows
    loop
    :prev="{ onClick: gotoPrevious }"
    :next="{ onClick: gotoNext }"
    @select="gotoCard">
    <UPageCard
      :title="item.title"
      :to="item.link"
      target="_blank"
      variant="subtle"
      :class="bgColor"
      spotlight
      spotlight-color="primary">
      <img :src="item.src"/>
    </UPageCard>
  </UCarousel>
</template>

<script setup lang="ts">

  // props
  const props = defineProps<{
      items:ICard[];
      index:number
  }>()

  const carousel = useTemplateRef('carousel')

  const bgColor = computed (() => {
    return "bg-"+props.items[1]?.color
  })

  const gotoPrevious = async () => {
    const id = props.items[0]?.id
    if(id) await navigateTo("/card/"+id)
  }
  const gotoNext = async () => {
    const id = props.items[(props.items.length-1)]?.id
    if(id) await navigateTo("/card/"+id)
  }
  const gotoCard = (index:number) => {
    console.log("select:", index, "items:", props.items.length)
    if(index==0) {
      gotoPrevious()
    }
    if(index==(props.items.length-1)) {
      gotoNext()
    }
  }

</script>

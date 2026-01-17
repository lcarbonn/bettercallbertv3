<template>
  <div>
    <DomainCardsList :cards="cards"/>
  </div>
</template>

<script setup lang="ts">

  const id:number = Number(useRoute().params.id).valueOf()
  const cards = ref<ICard[]>()

  // inital calls
  const filter = ref<Filter>()
  filter.value = {}
  filter.value.theme = id
  cards.value = await getAllCards(filter.value)

  // listening to search card
  const searchText = useSearchText()
  watch(() => searchText.value, async (text) => {
    filter.value = {}
    // filter.value.theme = id
    filter.value.title = text
    cards.value = await getAllCards(filter.value)
  })
</script>
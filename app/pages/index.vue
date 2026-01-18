<template>
  <div>
    <DomainCardsList :cards="cards"/>
  </div>
</template>

<script setup lang="ts">

  const cards = ref<ICard[]>()
  const themes = ref<ITheme[]>()
  const filter = ref<Filter>()
  const searchText = useSearchText()

  // inital calls
  filter.value = {}
  filter.value.title = searchText.value?searchText.value:undefined
  cards.value = await getAllCards(filter.value)

  // listening to search card
  watch(() => searchText.value, async (text) => {
    filter.value = {}
    filter.value.title = text
    cards.value = await getAllCards(filter.value)
  })
</script>
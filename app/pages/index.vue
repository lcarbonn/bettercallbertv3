<template>
  <div>
    <DomainThemes :themes="themes" @select-theme="selectTheme"/>
    <DomainCardsList :cards="cards"/>
  </div>
</template>

<script setup lang="ts">

  const cards = ref<ICard[]>()
  const themes = ref<ITheme[]>()

  // inital calls
  cards.value = await getAllCards()
  themes.value = await getThemes()

  // listening to search card
  const searchText = useSearchText()
  const filter = ref<Filter>()
  watch(() => searchText.value, async (text) => {
    filter.value = {}
    filter.value.title = text
    cards.value = await getAllCards(filter.value)
  })

  const selectTheme = async (themeId:number) => {
    filter.value = {}
    filter.value.theme = themeId
    cards.value = await getAllCards(filter.value)
  }
</script>
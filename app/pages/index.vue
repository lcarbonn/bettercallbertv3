<template>
  <div>
    <DomainCardsList v-if="cards" :cards="cards"/>
  </div>
</template>

<script setup lang="ts">

  const cards = ref<ICard[]>()
  const pagination = ref<Pagination>({
    pageIndex : 0,
    pageSize : 200
  })
  
  // inital call
  cards.value = await getAllCards(pagination.value)

  // listening to search card
  const searchText = useSearchText()
  const filter = ref<Filter>()
  watch(() => searchText.value, async (text) => {
    console.log("search changed:", text)
    filter.value = {}
    filter.value.title = text
    cards.value = await getAllCards(pagination.value, filter.value)
  })

</script>
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
  
  cards.value = await getAllCards(pagination.value)

    // pagination méthod
  const paginate = async (pageIndex:number) => {
    pagination.value.pageIndex = pageIndex
    cards.value = await getAllCards(pagination.value)
  }


</script>
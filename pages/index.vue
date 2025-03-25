<template>
    <DomainListCards :cards="cards"/>
</template>

<script setup lang="ts">
  
  const cards = useCards()

  onMounted(() => {
    const isSinglePage = useSinglePage()
    isSinglePage.value = false
  })
  
</script>
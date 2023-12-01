<template>
    <div>
      <DomainListCards :cards="cards"/>
    </div>
</template>

<script setup lang="ts">
  
  const cards = useCards()

  onMounted(() => {
    const isSinglePage = useSinglePage()
    isSinglePage.value = false
  })
  
</script>
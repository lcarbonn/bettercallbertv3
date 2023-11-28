<template>
  <div>
    <BaseNavBar  @filter-cards="filterCards"></BaseNavBar>
    <BContainer fluid>
      <NuxtPage />
    </BContainer>
    <BaseFooter :appVersion="version"></BaseFooter>
    <BaseSnackbar></BaseSnackbar>
  </div>
</template>
<script setup lang="ts">

  import { version } from '~/package.json';
  console.debug("appVersion:",version)

  
  onMounted(() => {
    getCards()
    getThemes()
  })
  
  const filterCards = (idTheme:string) => {
    console.log("filterCards=", idTheme)
    serviceFilterCards(idTheme)
  }
    
</script>
<template>
  <div class="d-flex flex-column justify-content-between min-vh-100">
    <VitePwaManifest/>
    <div>
      <BaseNavBar  @filter-cards="filterCards" @search-cards="searchCards"></BaseNavBar>
      <BContainer fluid>
        <NuxtPage />
      </BContainer>
    </div>
    <div class="d-flex flex-column justify-content-end">
      <BaseFooter :appVersion="version"></BaseFooter>
      <BaseSnackbar></BaseSnackbar>
    </div>
  </div>
</template>
<script setup lang="ts">

  // imports
  import { version } from '~/package.json';

  console.debug("appVersion:",version)

  const cards = useFullCards()
  // nuxt cycle hook
  onMounted(() => {
    console.log("bettercallbert starting")
    try {
      getCardsWithImage()
      getThemes()
    } catch (error) {
      console.log("error on startin bcb ", error)      
    }
  })

  // methods
  const filterCards = (idTheme:string) => {
    console.log("filterCards=", idTheme)
    filterCardsOnTheme(idTheme)
  }

  const searchCards = (textsearch:string) => {
    console.log("searchCards=", textsearch)
    searchCardsOnTitle(textsearch)
  }

</script>
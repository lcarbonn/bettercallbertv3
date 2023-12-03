<template>
  <div class="d-flex flex-column justify-content-between min-vh-100">
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
import { getCardsWithImage } from './composables/useCardsServices';
  console.debug("appVersion:",version)

  const cards = useFullCards()
  // nuxt cycle hook
  onMounted(() => {
    getCardsWithImage()
    getThemes()
  })

  // methods
  const filterCards = (idTheme:string) => {
    console.log("filterCards=", idTheme)
    serviceFilterCards(idTheme)
  }

  const searchCards = (textsearch:string) => {
    console.log("searchCards=", textsearch)
    serviceSearchCards(textsearch)
  }

</script>
<template>
  <div class="d-flex flex-column justify-content-between min-vh-100">
    <VitePwaManifest/>
    <div>
      <BaseNavBar  @filter-cards="filterCards" @search-cards="searchCards"></BaseNavBar>
      <BContainer fluid v-if="firebaseUser">
        <NuxtPage />
      </BContainer>
      <div v-else class="text-center">
        <BSpinner variant="primary" label="Spinning"/>
      </div>
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

  const firebaseUser = useFirebaseUser()

  // nuxt cycle hook
  onMounted(() => {
      getCardsWithImage()
      getThemes()
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
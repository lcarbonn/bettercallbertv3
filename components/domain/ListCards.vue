<template>
    <BRow cols="1"
         cols-lg="2"
         cols-xl="5">
      <BCol v-if="!cards"><BSpinner label="Loading..."></BSpinner></BCol>
      <BCol v-else
            v-for="card in cards"
            :key="card.id"
            class="py-3">
        <nuxt-link :to="'/cards/' + card.id"
                  class="nodecoLink">
          <BSpinner v-if="!card.img"
                    label="Loading..."></BSpinner>
          <DomainCard :card="card"></DomainCard>
        </nuxt-link>
      </BCol>
    </BRow>
</template>

<script setup lang="ts">
    // props
    const props = defineProps({
        cards: {
            type: Array<CardType>,
            default: undefined
        },
    })
</script>
<style scoped>
.nodecoLink {
  text-decoration: none !important;
}
</style>

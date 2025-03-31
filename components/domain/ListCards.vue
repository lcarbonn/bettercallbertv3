<template>
  <div>
    <BRow v-if="cards?.length>0" cols="1"
         cols-lg="2"
         cols-xl="5">
      <BCol v-for="card in cards"
            :key="card.id"
            class="py-3">
        <nuxt-link :to="'/cards/' + card.id"
                  class="nodecoLink">
          <DomainCard :card="card as Card"></DomainCard>
        </nuxt-link>
      </BCol>
    </BRow>
    <BRow v-else>
      <BCol align-h="center" class="text-center">
        <span>No search result</span>
      </BCol>
    </BRow>
  </div>
</template>

<script setup lang="ts">
    // props
    const props = defineProps<{
        cards?:Array<ICard>
    }>()
</script>
<style scoped>
.nodecoLink {
  text-decoration: none !important;
}
</style>

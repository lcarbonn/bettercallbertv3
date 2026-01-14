<template>
  <UPageCard
    variant="subtle"
    :class="'text-xs ' +  'bg-themeone'">
    <template #header>
      <h1><b>{{card.title}}</b></h1>
    </template>
    <template #body>
      <NuxtLink @click="nav2card(card.id)" to="#">
        <img v-if="card.src?.startsWith('http')" :src="card.src"/>
      </NuxtLink>
    </template>
    <template #footer class="justify-items-center">
      <!-- <UButton icon="streamline-color:pencil" @click="nav2facture(card.id)" class="mr-1" size="sm"></UButton>
      <UButton icon="streamline-color:recycle-bin-2-flat" @click="deleteFacture(card)" class="mr-1" size="sm"></UButton>
      <UButton icon="streamline-color:copy-paste-flat" @click="copyFacture(card)"size="sm"></UButton> -->
    </template>
  </UPageCard>
</template>

<script setup lang="ts">

  // props
  const props = defineProps<{
      card:ICard;
  }>()

  const nav2card = async (id:number) => {
    await navigateTo("/cards/"+id)
  }

</script>

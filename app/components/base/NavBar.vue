<template>
  <UHeader mode="modal" toggle-side="right">
    <template #title>
      <UAvatar
        class="rounded-none"
        src="/icon-64x64.png"/>Better Call Bert
    </template>
    <UNavigationMenu :items="items"/>
    <template #right>
      <UFieldGroup>
        <UInput v-model="searchText" icon="i-lucide-search" trim @keyup="searchCards()"/>
        <UButton
            icon="i-lucide-x"
            size="sm"
            variant="subtle"
            @click="searchText = undefined; searchCards()"
          />
      </UFieldGroup>
      <UiColorModePicker size="sm"/>
      <NuxtLink
        :to="baseUrl + baseId +'/table/' + tableId"
        target="_blank">
        <UTooltip text="Open on Baserow">
          <UAvatar 
            class="rounded-none"
            src="/baserow-logo-64x64.png"/>
        </UTooltip>
      </NuxtLink>
    </template>
    <template #body>
      <UNavigationMenu :items="items" orientation="vertical" class="-mx-2.5" />
    </template>    
  </UHeader>
</template>
<script setup lang="ts">

  import type { NavigationMenuItem } from '@nuxt/ui'

  // get env variables from config
  const config = useRuntimeConfig()
  const baseUrl = computed(() => {
    return config.public.baseUrl
  })
  const baseId = computed(() => {
    return config.public.baseId
  })
  const tableId = computed(() => {
    return config.public.tableCard
  })

  const searchText = ref<string>()
  const searchCards = async () => {
    useSearchText().value = searchText.value
  }

  // get user session
  const { loggedIn, user, clear: clearSession } = useUserSession()

  const userEmail = computed(() => {
    return user.value?.username
  })

  const items = computed<NavigationMenuItem[]>(() => {
    const items:NavigationMenuItem[] = []
    // // add color selector
    // items.push(
    //   {
    //     icon:"streamline-color:user-circle-single-flat",
    //     slot: 'colorpicker' as const
    //   },
    // )

    if (!loggedIn.value) return []
    else {
      items.push(
        {
          label: userEmail.value,
          icon:"streamline-color:user-circle-single-flat",
          children: [
            {
            label: 'Sign Out',
            icon: 'streamline-color:logout-1-flat',
            onSelect: () => {
              signOut()
            },
          }]
        },
      )
    }
    return items
  })

  const signOut = async () => {
    await clearSession()
    await navigateTo('/login')
    messageToSnack("Signed out")
  }

</script>
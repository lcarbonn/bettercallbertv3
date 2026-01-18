<template>
  <UHeader mode="modal" toggle-side="right">
    <template #title>
      <UAvatar
        class="rounded-none"
        src="/icon-64x64.png"/><span >BetterCallBert</span>
    </template>

    <UNavigationMenu 
      :items="items">
    </UNavigationMenu>

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
        :to=baseUrl
        target="_blank">
        <UTooltip text="Open on Baserow">
          <UAvatar 
            class="rounded-none"
            src="/baserow-logo-64x64.png"/>
        </UTooltip>
      </NuxtLink>
    </template>
   
    <template #body>
      <UNavigationMenu
        :items="items"
        orientation="vertical">
        <template #colorpicker>
          <UiColorModePicker size="sm"/>
        </template>
      </UNavigationMenu>
    </template>    
  </UHeader>
</template>
<script setup lang="ts">

  import type { NavigationMenuItem } from '@nuxt/ui'

  // get env variables from config
  const config = useRuntimeConfig()
  const baseUrl = config.public.baseUrl + config.public.baseId + '/table/' + config.public.tableCard

  // for search
  const searchText = ref<string>()
  const searchCards = async () => {
    useSearchText().value = searchText.value
    await navigateTo('/')
  }

  // get user session
  const { loggedIn, user, clear: clearSession } = useUserSession()

  const userEmail = computed(() => {
    return user.value?.username
  })

  // get themes
  const themes = await getThemes()


  // set th elist of navigation items
  const items = computed<NavigationMenuItem[]>(() => {
    const items:NavigationMenuItem[] = []

    // add themes
    items.push(
      {
        label: 'All',
        to: '/',
        onSelect:  () => {
          searchText.value = undefined
          useSearchText().value = searchText.value
        }
      },
    )

    themes?.forEach(theme => {
      items.push(
        {
          label: theme.title,
          to: '/theme/'+theme.id,
          onSelect:  () => {
            searchText.value = undefined
            useSearchText().value = searchText.value
          }
        },
      )
    });

    // loggedIn/logout mngt
    if (!loggedIn.value) return items
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
    await navigateTo('/')
    messageToSnack("Signed out")
  }

</script>
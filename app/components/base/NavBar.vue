<template>
  <UHeader mode="modal" toggle-side="left">
    <template #title>
      <UAvatar
        class="rounded-none"
        src="/icon-64x64.png"/>Better Call Bert
    </template>

    <UNavigationMenu 
      :items="items">
      <template #colorpicker>
        <UiColorModePicker size="sm"/>
      </template>        
    </UNavigationMenu>

    <template #right>
      <UFieldGroup>
        <UInput v-model="searchText" icon="i-lucide-search" trim @keyup="searchCards()" class="w-30"/>
        <UButton
            icon="i-lucide-x"
            size="sm"
            variant="subtle"
            @click="searchText = undefined; searchCards()"
          />
      </UFieldGroup>
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

  const themes = await getThemes()

  const items = computed<NavigationMenuItem[]>(() => {
    const items:NavigationMenuItem[] = []

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

    // add color selector
    items.push(
      {
        slot: 'colorpicker' as const,
      },
    )
    items.push(
      {
        avatar: {
          src: '/baserow-logo-64x64.png'
        },
        to: baseUrl,
        target: '_blank',
      }
    )

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
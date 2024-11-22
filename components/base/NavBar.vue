<template>
  <client-only>
    <BNavbar toggleable="lg" variant="primary" sticky='top' v-b-color-mode="'dark'">
      <BNavbarBrand @click="goHome" href="/">
        <BAvatar rounded src="/icon.png"></BAvatar> BetterCallBert
      </BNavbarBrand>
      <BNavbarToggle target="nav-collapse" />
      <BCollapse id="nav-collapse" isNav>
        <BNavbarNav small fill v-if="themes">
            <BNavItem v-for="theme in themes"
              :key="theme.id"
              :id="theme.id"
              :active="isCurrentTheme(theme.id)"
              @click="filterCards(theme.id)"
              >
            <span style="border-bottom-style: solid;" :class="themeColor(theme.id)">{{ theme.title.toUpperCase() }}</span>
          </BNavItem>
        </BNavbarNav>
        <BNavbarNav class="ms-auto mb-2 mb-lg-0">
          <BNavForm class="d-flex">
            <BInputGroup>
              <BFormInput placeholder="Search" 
                  v-b-color-mode="'light'"
                  v-model="textsearch"
                  @keyup="searchCards()"/>
              <BInputGroupAppend>
                  <BButton :disabled="!textsearch"
                            @click="textsearch = null; searchCards()"><X/></BButton>
                </BInputGroupAppend>
            </BInputGroup>
          </BNavForm>
          <BNavItemDropdown text="Settings"
                                v-show="!isAnonymous"
                                v-b-color-mode="'light'">
              <BDropdownItem @click="newCard()" variant="primary"
                              >Add card</BDropdownItem>
          </BNavItemDropdown>
          <BNavItemDropdown right  v-b-color-mode="'light'">
              <!-- Using 'button-content' slot -->
              <template #button-content>
                <em>{{userEmail}}<Person/></em>
              </template>
              <BDropdownItem v-show="isAnonymous" href="/login" variant="primary">Sign In</BDropdownItem>
              <BDropdownItem v-show="!isAnonymous" @click="signOut()" variant="primary">Sign Out</BDropdownItem>
          </BNavItemDropdown>
        </BNavbarNav>
      </BCollapse>
    </BNavbar>
  </client-only>
</template>

<script setup lang="ts">

  // icons
  import Person from '~icons/bi/person'
  import X from '~icons/bi/x'
  import {vBColorMode} from 'bootstrap-vue-next'
  
  // emits declaration
  const emit = defineEmits(['filterCards', 'searchCards'])

  // global states
  const firebaseUser = useFirebaseUser()
  const themes = useThemes()
  const isSinglePage = useSinglePage()

  // Local states
  const currentTheme = useCurrentTheme()

  const textsearch = ref()

  // computed properties
  const isAnonymous = computed(() => {
    return firebaseUser.value?.isAnonymous
  })

  const userEmail = computed(() => {
    return firebaseUser.value?.email
  })

  // methods
  const goHome = async () => {
    textsearch.value = null
    currentTheme.value = ""
    resetCards()
    // await navigateTo('/')
  }

  const signOut = () => {
    signOutUser().then(async () => {
      await navigateTo('/')
    })
  }

  const isCurrentTheme = (idTheme:string) => {
    if(currentTheme) return idTheme == currentTheme.value
    else return false
  }

  const themeColor = (idTheme:string) => {
    return "border-" + getThemeColor(idTheme)
   }

  const filterCards = async (idTheme:string) => {
    textsearch.value = null
    if (isCurrentTheme(idTheme)) {
      emit('filterCards')
      currentTheme.value = ""
    } else {
      emit('filterCards', idTheme)
      currentTheme.value = idTheme
    }
    if(isSinglePage.value) await navigateTo('/')
  }

  const searchCards = async () => {
    currentTheme.value = ""
    emit('searchCards', textsearch.value)
    if(isSinglePage.value) await navigateTo('/')
  }

  const newCard = () => {
      filterCards("")
      createDbCard().then((id) => {
        navigateTo('/admin/' + id)
      })
  }

</script>

<style scoped>
.nodecoLink {
  text-decoration: none !important;
}
</style>

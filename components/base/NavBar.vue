<template>
  <client-only>
    <BNavbar :toggleable="true" variant="primary" sticky='top' v-b-color-mode="'dark'">
      <BNavbarBrand>
        <BLink @click="goHome" to="/" class="navbar-brand">
          <BAvatar rounded src="/icon.png"></BAvatar> BetterCallBert
        </BLink>
      </BNavbarBrand>
      <BNavbarNav>
        <BNavForm class="d-flex">
          <BInputGroup>
            <BFormInput placeholder="Search" 
                v-b-color-mode="'light'"
                v-model="textsearch"
                @keyup="searchCards()"/>
                <template #append>
                <BButton :disabled="!textsearch"
                          @click="textsearch = null; searchCards()"><X/></BButton>
                </template>
          </BInputGroup>
        </BNavForm>
      </BNavbarNav>
      <BNavbarToggle target="nav-collapse" />
      <BOffcanvas id="nav-collapse"
        isNav
        v-model="show"
        placement="end"
        title="Better Call Bert"
        style="background-color:var(--bs-primary);color:var(--bs-white)"
       >
       
        <BNavbarNav small v-if="themes">
          <BNavItem
            key=""
            id=""
            @click="goHome()"
            >
            <span style="border-bottom-style: solid;">All</span>
          </BNavItem>
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
              <BDropdownItem v-show="isAnonymous" to="/login" variant="primary">Sign In</BDropdownItem>
              <BDropdownItem v-show="!isAnonymous" @click="signOut()" variant="primary">Sign Out</BDropdownItem>
          </BNavItemDropdown>
          <BaseThemeItemDropdown @clicked="show=!show"/>
        </BNavbarNav>
      </BOffcanvas>
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
  const show = ref(false)
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
  const goHome = () => {
    show.value = false
    textsearch.value = null
    currentTheme.value = ""
    resetCards()
  }

  const signOut = () => {
    signOutUser().then(() => {
      show.value = false
      navigateTo('/')
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
    show.value = false
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
      show.value = false
      filterCards("")
      addCard().then((id) => {
        navigateTo('/admin/' + id)
      })
  }

</script>

<style scoped>
.nodecoLink {
  text-decoration: none !important;
}
</style>

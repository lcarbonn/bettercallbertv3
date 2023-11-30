<template>
  <BNavbar toggleable="lg" variant="primary" sticky='top' v-b-color-mode="'dark'">
    <BNavbarBrand href="/">
      <BAvatar rounded
                  src="/icon.png"></BAvatar> BetterCallBert
    </BNavbarBrand>
    <BNavbarToggle target="nav-collapse" />
    <BCollapse id="nav-collapse" is-nav>
      <BNavbarNav small fill v-if="themes">
          <BNavItem v-for="theme in themes"
            :key="theme.id"
            :id="theme.id"
            :active="isCurrentTheme(theme.id)"
            @click="filterCards(theme.id)"
            href="#">
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
      <BNavItemDropdown right>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <em><Person/></em>
          </template>
          <BDropdownItem v-show="isAnonymous" href="/login">Sign In</BDropdownItem>
          <BDropdownItem v-show="!isAnonymous" @click="signOut()">Sign Out</BDropdownItem>
        </BNavItemDropdown>
      </BNavbarNav>
      <!-- <BNavForm class="d-flex">
        <BFormInput class="me-2" placeholder="Search" v-b-color-mode="'light'" />
        <BButton type="submit">Search</BButton>
      </BNavForm> -->
    </BCollapse>
  </BNavbar>
</template>

<script setup lang="ts">
  import Person from '~icons/bi/person'
  import X from '~icons/bi/x'
  import {vBColorMode} from 'bootstrap-vue-next'

  const emit = defineEmits(['filterCards', 'searchCards'])

  const firebaseUser = useFirebaseUser()
  const themes = useThemes()

  const currentTheme = ref()

  const textsearch = ref()

  // computed properties
  const isAnonymous = computed(() => {
    return firebaseUser.value?.isAnonymous
  })

  // methods
  const signOut = async () => {
    await signOutUser();
    // navigateTo('/')
  };

  const isCurrentTheme = (idTheme:string) => {
    if(currentTheme) return idTheme == currentTheme.value
    else return false
  }

  const themeColor = (idTheme:string) => {
    return "border-" + getThemeColor(idTheme)
   }

  const filterCards = (idTheme:string) => {
    textsearch.value = null
    if (isCurrentTheme(idTheme)) {
      emit('filterCards')
      currentTheme.value = null
    } else {
      emit('filterCards', idTheme)
      currentTheme.value = idTheme
    }
  }

  const searchCards = () => {
    currentTheme.value = null
     emit('searchCards', textsearch.value)
  }

</script>


<template>
  <BNavbar toggleable="lg" variant="primary" sticky='top' v-b-color-mode="'dark'">
    <BNavbarBrand href="/">
      <BAvatar rounded
                  src="/icon.png"></BAvatar> BetterCallBert
    </BNavbarBrand>
    <BNavbarToggle target="nav-collapse" />
    <BCollapse id="nav-collapse" is-nav>
      <BNavbarNav class="ms-auto mb-2 mb-lg-0">
        <BNavItemDropdown right>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <em><Person/></em>
          </template>
          <BDropdownItem href="/login">Sign In</BDropdownItem>
          <BDropdownItem @click="signOut()">Sign Out</BDropdownItem>
        </BNavItemDropdown>
      </BNavbarNav>
      <!-- <BNavForm class="d-flex">
        <BFormInput class="me-2" placeholder="Search" v-b-color-mode="'light'" />
        <BButton type="submit">Search</BButton>
      </BNavForm> -->
    </BCollapse>
  </BNavbar>
</template>

<script setup>
  import Person from '~icons/bi/person'
  import {vBColorMode} from 'bootstrap-vue-next'

  const firebaseUser = useFirebaseUser()
  console.log("firebaseUser navbar",firebaseUser)
  
  const signOut = async () => {
    await signOutUser();
    navigateTo('/')
  };
</script>


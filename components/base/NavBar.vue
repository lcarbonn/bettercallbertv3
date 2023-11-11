<template>
  <BNavbar toggleable="lg" variant="primary" sticky='top' v-b-color-mode="'dark'">
    <BNavbarBrand href="/">
      <BAvatar rounded
                  src="/icon.png"></BAvatar> BetterCallBert
    </BNavbarBrand>
    <BNavbarToggle target="nav-collapse" />
    <BCollapse id="nav-collapse" is-nav>
      <BNavbarNav small fill>
        <BNavItem href="#"><Person/></BNavItem>
      </BNavbarNav>
      <!-- Right aligned nav items -->
      <BNavbarNav class="ms-auto mb-2 mb-lg-0">
        <BNavItemDropdown text="Lang" right>
          <BDropdownItem href="#">EN</BDropdownItem>
          <BDropdownItem href="#">ES</BDropdownItem>
          <BDropdownItem href="#">RU</BDropdownItem>
          <BDropdownItem href="#">FA</BDropdownItem>
        </BNavItemDropdown>
        <BNavItemDropdown right>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <em>User</em>
          </template>
          <BDropdownItem href="#">Profile</BDropdownItem>
          <BDropdownItem href="#">Sign Out</BDropdownItem>
        </BNavItemDropdown>
      </BNavbarNav>
      <BNavForm class="d-flex">
        <BFormInput class="me-2" placeholder="Search" v-b-color-mode="'light'" />
        <BButton type="submit">Search</BButton>
      </BNavForm>
    </BCollapse>
  </BNavbar>
</template>

<script setup>
  import Person from '~icons/bi/person'
  import {vBColorMode} from 'bootstrap-vue-next' 
</script>


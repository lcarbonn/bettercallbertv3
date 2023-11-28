<template>
  <div>
    <BaseNavBar></BaseNavBar>
    <BContainer fluid>
      <NuxtPage />
    </BContainer>
    <BaseFooter :appVersion="version"></BaseFooter>
    <BaseSnackbar></BaseSnackbar>
  </div>
</template>
<script setup>
  import { version } from '../package.json';
  console.debug("appVersion:",version)
</script>
<template>
  <div>
    <BaseNavBar></BaseNavBar>
    <BContainer>
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
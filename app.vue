<template>
  <div>
    <BaseNavBar></BaseNavBar>
    <BContainer>
      <NuxtPage />
    </BContainer>
    <BContainer>
      <span>{{firebaseUser}}</span>
    </BContainer>
    <BaseFooter :appVersion="version"></BaseFooter>
  </div>
</template>
<script setup>
  import { version } from '../package.json';
  console.debug("appVersion:",version)
  const firebaseUser = useFirebaseUser();
</script>
<template>
  <div>
    <BaseNavBar></BaseNavBar>
    <BContainer>
      <NuxtPage />
    </BContainer>
    <BaseFooter :appVersion="appVersion"></BaseFooter>
  </div>
</template>
<script>
import { version } from '../package.json';
export default {  
  data: () => ({
    appVersion: version
  }),

  created() {
    console.debug("appVersion:"+this.appVersion)
  }
}
</script>
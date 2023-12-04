<template>
  <div>
    <!-- hidden input to help alert to react (bug?) -->
    <input :value="message" type="hidden"/>
    <BAlert v-model="dismissCountDown"
             class="position-fixed fixed-bottom m-0 rounded-0"
             style="z-index: 2000;"
             variant="primary"
             dismissible
             ref="myAlert"
             @close-countdown="countdown = $event">
      <div class="d-flex flex-wrap justify-content-md-center">{{ message }}</div>
      <BProgress variant="primary" :max="dismissCountDown" :value="countdown" height="4px" />
    </BAlert>
  </div>
</template>

<script setup lang="ts">
  import type {BAlert} from 'bootstrap-vue-next'
  const myAlert = ref<null | InstanceType<typeof BAlert>>(null)

  const dismissCountDown = ref(0)
  const countdown = ref(0)
  const snackbarMessage = useSnackBarMessage()

  const message = computed(() => {
    const mess = snackbarMessage.value
    if(snackbarMessage.value !="") {
      dismissCountDown.value = 4000
      myAlert.value?.restart()
    } else {
      dismissCountDown.value = 0
      myAlert.value?.stop()
    }// reset snackbar state
    snackbarMessage.value = ""
    // return commited message to componats
    return mess
  })

</script>

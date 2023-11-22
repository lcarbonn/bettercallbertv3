<template>
  <div>
    <!-- hidden input to help alert to react (bug?) -->
    <BFormInput v-model="message" type="hidden" ></BFormInput>
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
    console.log("snackbarMessage", snackbarMessage)
    if(snackbarMessage.value !=null) {
      console.log("snackbarMessage restart")
      dismissCountDown.value = 4000
      myAlert.value?.restart()
    } else {
      console.log("snackbarMessage stop")
      dismissCountDown.value = 0
      myAlert.value?.stop()
    }
    return snackbarMessage.value
  })

</script>

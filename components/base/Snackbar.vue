<template>
  <div>
    <BAlert v-model="dismissCountDown"
             class="position-fixed fixed-bottom m-0 rounded-0"
             style="z-index: 2000;"
             variant="primary"
             dismissible
             ref="myAlert"
             @close-countdown="countdown = $event">
      <div class="d-flex flex-wrap justify-content-md-center">{{ snackbarMessage }}</div>
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

    // watch the message
    watch(() => snackbarMessage.value, (newMessage) => {
      // console.log("newMessage:"+newMessage)
      if(newMessage != "") {
        dismissCountDown.value = 4000
        myAlert.value?.restart()
      } else {
        dismissCountDown.value = 0
        myAlert.value?.stop()
      }
    })

</script>

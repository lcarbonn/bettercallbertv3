<template>
    <BToastOrchestrator />
</template>
<script setup lang="ts">

    const {show} = useToastController()
    const snackbarMessage = useSnackBarMessage()

    // watch the message
    watch(() => snackbarMessage.value, (newMessage) => {
      // console.log("newMessage:"+newMessage)
      if(newMessage?.message != "") {
        if(newMessage.isError)
            show?.({props: {title:'Error', body: ''+newMessage.message , variant:'danger'}})
        else
            show?.({props: {title:'Idealicious', body: ''+newMessage.message}})
      }
    })
</script>
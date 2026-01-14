<template>
  <div>
    <USeparator type="dashed" color="primary"
      :avatar="{
        src: '/icon-64x64.png'
      }"/>
    <UFooter class="text-xs md:text-base">Copyright © {{year}} - Agilisé à Toulouse, France - V{{appVersion}}</UFooter>
   </div>
</template>

<script setup>
  const props = defineProps({
    appVersion: {
        type: String,
        default: ''
      }
  });
  const year = new Date().getFullYear()
</script>

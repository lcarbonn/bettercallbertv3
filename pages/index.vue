<template>
  <div>
    <p>{{ cards }}</p>
    <p>{{ user }}</p>
  </div>
</template>

<script setup lang="ts">

const user = useFirebaseUser()
const cards = useCards()

onMounted(async () => {
  getCards()
})
</script>
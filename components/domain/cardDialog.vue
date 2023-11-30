<template>
    <BModal v-model="programmaticModal" id ="modal-card"
             :title="title"
             centered
             body-bg-variant="secondary"
             header-text-variant="white"
             :header-bg-variant="theme"
             size="xl"
             ok-only>
        <p class="text-center">
            <img v-if="img"
                 :title="title"
                 :alt="title"
                 :src="img">
        </p>
    </BModal>
</template>

<script setup lang="ts">

    const props = defineProps({
            title: {
                type: String,
                default: null
            },
            img: {
                type: String,
                default: null
            },
            theme: {
                type: String,
                default: null
            }
    })

    const programmaticModal = ref(false)

</script>

<style scoped>
    img {
        height: 72vh;
        max-width: 100%;
    }
</style>

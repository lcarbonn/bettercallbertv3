<template>
    <BModal v-model="programmaticModal" id ="modal-card"
             :title="title"
             centered
             body-bg-variant="secondary"
             header-text-variant="white"
             :headerBgVariant="theme"
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
                default: undefined
            },
            img: {
                type: String,
                default: undefined
            },
            theme: {
                type: String,
                default: undefined
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

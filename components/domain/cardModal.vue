<template>
    <BModal v-model="propShow.show" id ="modal-card"
             :title="title"
             centered
             body-bg-variant="secondary"
             header-text-variant="white"
             :class="themeColor"
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

    //props
    const props = defineProps({
            title: {
                type: String,
                default: undefined
            },
            img: {
                type: String,
                default: undefined
            },
            themeColor: {
                type: String,
                default: undefined
            },
            propShow: {
                type: Object,
                default: {show:false}
            }
    })

</script>

<style scoped>
    img {
        height: 72vh;
        max-width: 100%;
    }
</style>

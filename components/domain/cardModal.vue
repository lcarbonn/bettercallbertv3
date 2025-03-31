<template>
    <BModal v-model="propShow.show" id ="modal-card"
             :title="title"
             centered
             :body-class="themeColor"
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
    const props = defineProps<{
            title:string,
            img?:string,
            themeColor?:string,
            propShow:{show:boolean}
    }>()

</script>

<style scoped>
    img {
        height: 72vh;
        max-width: 100%;
    }
</style>

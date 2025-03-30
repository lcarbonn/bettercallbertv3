<template>
    <BCard v-if="card"
            bgVariant="secondary"
            text-variant="white"
            :class="themeColor"
            imgBottom
            align="center">
        <template #header>
            <small>{{ card.title }}</small>
        </template>
        <BCardBody>
            <BButton v-if="previousId"
                    @click="goToPrevious()"
                    size="lg">
                <ArrowLeftSquare variant="primary"/>
            </BButton>
            <BButton v-if="card.link"
                      :href="card.link"
                      target="_blank"
                      variant="primary">Jump to source</BButton>
            <BButton v-else disabled
                variant="primary">No source</BButton>
            <BButton v-if="nextId"
                    @click="goToNext()"
                    size="lg">
                <ArrowRightSquare variant="primary"/>
            </BButton>
        </BCardBody>
        <BButton v-if="card.img" @click="show">
            <BCardImg :src="card.img"
                            :alt="card.title"
                            class="BCard-img"></BCardImg>
        </BButton>
        <DomainCardModal :title="card.title"
                          :img="card.img"
                          :themeColor="themeColor"
                          :propShow="propShow">
        </DomainCardModal>
    </BCard>
</template>

<script setup lang="ts">

    // icons
    import ArrowRightSquare from '~icons/bi/arrowRightSquare'
    import ArrowLeftSquare from '~icons/bi/arrowLeftSquare'

    //props
    const props = defineProps({
        card: {
            type: Card,
            default: null
        },
        nextId: {
            type: String,
            default: null
        },
        previousId: {
            type: String,
            default: null
        },
    })

    // refs and method for modal since useModal doesn't work in sub componenent
    const propShow = ref({show:false})

    const show = () => {
        propShow.value.show = !propShow.value.show
    }

    //computed properties
    const themeColor = computed(() => {
        return getThemeColor(props.card.idTheme)
    })

    // nuxt cycle hooks
    onMounted(() => {
        // keyboard arrows
        document.addEventListener("keyup", eventHandler)
    })
    onBeforeUnmount(() => {
        document.removeEventListener("keyup", eventHandler)
    })

    //methods
    const eventHandler = (e:KeyboardEvent) => {
        if (e.code == "ArrowLeft" && props.previousId) goToCardPage(props.previousId)
        if (e.code == "ArrowRight" && props.nextId) goToCardPage(props.nextId)
    }

    const goToPrevious = () => {
        goToCardPage(props.previousId)
    }
    const goToNext = () => {
        goToCardPage(props.nextId)
    }

</script>
<style scoped>
.BCard-img {
    width: unset;
    max-height: 100vh;
    max-width: 100%;
}
@media (max-width: 400px) {
    .BCard-img {
        width: unset;
        max-height: 60vh;
        max-width: 100%;
    }
}
</style>

<template>
    <BCard v-if="card"
            bgVariant="secondary"
            text-variant="white"
            :headerBgVariant="theme"
            imgBottom
            align="center">
        <template #header>
            <small>{{ card.title }}</small>
        </template>
        <BCard-body>
            <BButton v-if="previousId"
                      :href="'/cards/' + previousId"
                      size="lg">
                <ArrowLeftSquare variant="primary"/>
            </BButton>
            <BButton v-if="card.link"
                      :href="card.link"
                      target="_blank"
                      variant="primary">Jump to source</BButton>
            <BButton v-if="nextId"
                      :href="'/cards/' + nextId"
                      size="lg">
                <ArrowRightSquare variant="primary"/>
            </BButton>
        </BCard-body>

        <BLink href="#" @click="show">
            <BCard-img :src="card.img"
                            :alt="card.title"
                            class="BCard-img"></BCard-img>
        </BLink>
        <DomainCardModal :title="card.title"
                          :img="card.img"
                          :theme="theme">
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

    // refs
    const {show} = useModal('modal-card')

    //computed properties
    const theme = computed(() => {
        return getThemeColor(props.card.idTheme)
    })

    //methods
    const eventHandler = async (e:KeyboardEvent) => {
            if (e.code == "ArrowLeft" && props.nextId) await navigateTo('/cards/' + props.nextId)
            if (e.code == "ArrowRight" && props.previousId) await navigateTo('/cards/' + props.previousId)
        }
    const swipeRightHandler = async () => {
            if (props.previousId) await navigateTo('/cards/' + props.previousId)
        }
    const swipeLeftHandler = async () => {
            if (props.nextId) await navigateTo('/cards/' + props.nextId)
        }

    // nuxt cycle hooks
    onMounted(() => {
        // keyboard arrows
        document.addEventListener("keyup", eventHandler)
        // swiped-left
        document.addEventListener('swiped-left', swipeLeftHandler)
        // swiped-right
        document.addEventListener('swiped-right', swipeRightHandler)
    })
    onBeforeUnmount(() => {
        document.removeEventListener("keyup", eventHandler)
        document.removeEventListener('swiped-left', swipeLeftHandler)
        document.removeEventListener('swiped-right', swipeRightHandler)
    })

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
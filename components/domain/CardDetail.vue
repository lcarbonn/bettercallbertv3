<template>
    <BCard v-if="card"
            bgVariant="secondary"
            text-variant="white"
            :headerBgVariant="theme"
            img-bottom
            align="center">
        <template #header>
            <small>{{ card.title }}</small>
        </template>

        <BLink href="#" @click="show">
            <BCard-img :src="card.img"
                            :alt="card.title"
                            class="BCard-img"></BCard-img>
        </BLink>
        <DomainCardModal :title="card.title"
                          :img="card.img"
                          :theme="theme">
        </DomainCardModal>

                        <!-- <BCard-body>
            <BButton v-if="previousId"
                      :href="'/cards/' + previousId"
                      size="lg">
                <b-icon icon="arrow-left-square"
                        variant="primary" />
            </BButton>
            <BButton v-if="card.link"
                      :href="card.link"
                      target="_blank"
                      variant="primary">Jump to source</BButton>
            <BButton v-if="nextId"
                      :href="'/cards/' + nextId"
                      size="lg">
                <b-icon icon="arrow-right-square"
                        variant="primary" />
            </BButton>
        </BCard-body> -->
        <!-- <BLink href="#"
                @click="showDialog">
            <BCard-img :src="img"
                        :alt="card.title"
                        class="BCard-img"></BCard-img>
        </BLink> -->
        <!-- <DomainCardDialog :title="card.title"
                          :img="img"
                          :theme="theme">
        </DomainCardDialog> -->
    </BCard>
</template>

<script setup lang="ts">

    //props
    const props = defineProps({
        card: {
            type: Card,
            default: null
        },
    })

    // refs
    const {show} = useModal('modal-card')

    //computed properties
    const theme = computed(() => {
        return getThemeColor(props.card.idTheme)
    })

// export default {
//     name: "CardDetail",
//     components: {
//         BIcon,
//         BIconArrowRightSquare,
//         BIconArrowLeftSquare
//     },

//     props: {
//         card: {
//             type: Object,
//             default: null
//         },
//         nextId: {
//             type: String,
//             default: null
//         },
//         previousId: {
//             type: String,
//             default: null
//         },
//         img: {
//             type: String,
//             default: null
//         },
//         theme: {
//             type: String,
//             default: null
//         },

//     },

//     mounted() {
//         this.setupListeners()
//     },
//     destroyed() {
//         document.removeEventListener("keyup", this.eventHandler)
//         document.removeEventListener('swiped-left', this.swipeLeftHandler)
//         document.removeEventListener('swiped-right', this.swipeRightHandler)
//     },
//     methods: {
//         showDialog() {
//             this.$bvModal.show('modal-card')
//         },
//         setupListeners() {
//             document.addEventListener("keyup", this.eventHandler)
//             // swiped-left
//             document.addEventListener('swiped-left', this.swipeLeftHandler)

//             // swiped-right
//             document.addEventListener('swiped-right', this.swipeRightHandler)
//         },
//         eventHandler(e) {
//             if (e.keyCode == "39" && this.nextId) this.$router.push('/cards/' + this.nextId)
//             if (e.keyCode == "37" && this.previousId) this.$router.push('/cards/' + this.previousId)
//         },
//         swipeRightHandler(e) {
//             if (this.previousId) this.$router.push('/cards/' + this.previousId)
//         },
//         swipeLeftHandler(e) {
//             if (this.nextId) this.$router.push('/cards/' + this.nextId)
//         }
//     }
// }
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

<template>
    <BContainer>
        <!-- <BButton v-show="!isAnonymous"
                  id="updateButton"
                  variant="secondary"
                  :to='"/admin/" + id'>
                  <Gear/>
        </BButton> -->
        <!-- <BTooltip target="updateButton"
                   triggers="hover">Update</BTooltip> -->
        <DomainCardDetail :card="card"
                class="py-3" />

        <!-- <DomainCardDetail :card="card"
                          :nextId="nextId"
                          :previousId="previousId"
                          :img="img"
                          :theme="getVariantTheme(card)"
                          class="py-3" /> -->
    </BContainer>
</template>

<script setup lang="ts">
    // import Gear from '~icons/bi/gear'

    const route = useRoute()
    console.log('id=', route.params.id)
    const id:string = route.params.id as string
    onMounted(() => {
        getCard(id)
    })
    const card = useCard()

// export default {
//     name: "cardPage",

//     components: {
//         BIcon,
//         BIconGear
//     },

//     mounted() {
//         this.$store.commit('navbar/setSinglePage', true)
//         this.$store.dispatch("cards/getCard", this.id)
//         this.$store.dispatch("themes/getThemes")
//     },

//     computed: {
//         id() {
//             return this.$route.params.id
//         },
//         card() {
//             return this.$store.getters['cards/card']
//         },
//         nextId() {
//             return this.$store.getters['cards/nextId']
//         },
//         previousId() {
//             return this.$store.getters['cards/previousId']
//         },
//         img() {
//             return this.$store.getters['cards/img']
//         },
//         isAnonymous() {
//             return this.$store.getters['auth/isAnonymous']
//         },
//         themes() {
//             return this.$store.getters['themes/themes']
//         }
//     },
//     methods: {
//         getVariantTheme(card) {
//             if (card) return getThemeColor(card.idTheme, this.themes)
//             return null
//         }
//     }
// }
</script>
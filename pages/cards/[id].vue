<template>
    <BContainer 
        v-touch:swipe.right="swipeRightHandler"
        v-touch:swipe.left="swipeLeftHandler">
        <BButton v-show="!isAnonymous"
                  id="updateButton"
                  variant="secondary"
                  :to='"/admin/" + id'>
                  <Gear/>
        </BButton>
        <BTooltip target="updateButton"
                   triggers="hover">Update</BTooltip>
        <DomainCardDetail :card="card" 
                          :nextId="nextId"
                          :previousId="previousId"
                class="py-3" />
    </BContainer>
</template>

<script setup lang="ts">

    // icons
    import Gear from '~icons/bi/gear'

    // const
    const id:string = useRoute().params.id as string

    // use states
    const card = useCard()
    const cards = useFullCards()
    const firebaseUser = useFirebaseUser()

    // nuxt cycle hooks
    onMounted(() => {
        getCardWithImage(id)
        const isSinglePage = useSinglePage()
        isSinglePage.value = true
        const currentTheme = useCurrentTheme()
        currentTheme.value = ""        
    })

    //computed properties
    const previousId = computed(() => {
        return getCardPreviousId(card.value, cards.value)
    })
    const nextId = computed(() => {
        return getCardNextId(card.value, cards.value)
    })
    const isAnonymous = computed(() => {
        return firebaseUser.value?.isAnonymous
    })

    const swipeRightHandler = () => {
        console.log("swipe right")
            if (previousId) goToCardPage(previousId.value)
        }
    const swipeLeftHandler = () => {
        console.log("swipe left")
            if (nextId) goToCardPage(nextId.value)
        }
</script>
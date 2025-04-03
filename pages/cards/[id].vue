<template>
    <BContainer 
        v-touch:swipe.right="swipeRightHandler"
        v-touch:swipe.left="swipeLeftHandler">
        <BButton v-show="!isAnonymous"
                  id="updateButton"
                  variant="primary"
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
    const authUser = useAuthUser()

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
        return card.value?.getCardPreviousId(cards.value)
    })
    const nextId = computed(() => {
        return card.value?.getCardNextId(cards.value)
    })
    const isAnonymous = computed(() => {
        return authUser.value?.isAnonymous
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
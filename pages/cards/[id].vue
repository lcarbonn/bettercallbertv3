<template>
    <BContainer>
        <BButton v-show="!isAnonymous"
                  id="updateButton"
                  variant="secondary"
                  @click='goToAdmin()'>
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

    // nuxt cycle hooks
    onMounted(() => {
        getCard(id)
        const isSinglePage = useSinglePage()
        isSinglePage.value = true
        const currentTheme = useCurrentTheme()
        currentTheme.value = ""        
    })

    // use states
    const card = useCard()
    const cards = useFullCards()
    const firebaseUser = useFirebaseUser()

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

    // methods
    const goToAdmin = async () => {
        await navigateTo("/admin/" + id)
    }

</script>
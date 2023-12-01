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
                          :nextId="nextId"
                          :previousId="previousId"
                class="py-3" />
    </BContainer>
</template>

<script setup lang="ts">
    // import Gear from '~icons/bi/gear'

    // const
    const id:string = useRoute().params.id as string

    // nuxt cycle hooks
    onMounted(() => {
        getCards()
        getCard(id)
        const isSinglePage = useSinglePage()
        isSinglePage.value = true
        const currentTheme = useCurrentTheme()
        currentTheme.value = ""        
    })

    // use states
    const card = useCard()
    const cards = useCards()

    //computed properties
    const previousId = computed(() => {
        return getCardPreviousId(card.value, cards.value)
    })
    const nextId = computed(() => {
        return getCardNextId(card.value, cards.value)
    })

</script>
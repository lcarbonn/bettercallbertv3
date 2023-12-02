<template>
    <BContainer>
        <BButton
                  id="backButton"
                  variant="secondary"
                  :to='"/cards/" + id'>
            <ArrowUpLeftSquare/>
        </BButton>
        <BTooltip target="backButton"
                   triggers="hover">Back</BTooltip>

        <DomainCardForm :card="card"
            >
                        <!-- :imageUrl="imageUrl"
                        :themes="themes"
                        :imagePath="imagePath"
                        :theme="getVariantTheme(card)"
                        @saveCard="saveCard"
                        @deleteCard="deleteCard"
                        @uploadImageFile="uploadImageFile"
                        @resetImagePath="resetImagePath" /> -->
        </DomainCardForm>
        <DomainCardDetail :card="card"></DomainCardDetail>
    </BContainer>
</template>

<script setup lang="ts">
    // icons
    import ArrowUpLeftSquare from '~icons/bi/arrowUpLeftSquare'

    // const
    const id:string = useRoute().params.id as string
    
    // nuxt cycle hooks
    onMounted(() => {
        getCard(id)
        const isSinglePage = useSinglePage()
        isSinglePage.value = true
    })

    // use states
    const card = useCard()

</script>

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
            @save-card="saveCardForm"
            @delete-card="deleteCardForm"
            @reset-card="resetCardForm"
            @upload-image-file="uploadImageFileForm"
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
    
    // use states
    const card = useCard()
    const isSinglePage = useSinglePage()

    // nuxt cycle hooks
    onMounted(() => {
        getCard(id).then(() => {
            setCardImageSrc(card.value)
        })
        isSinglePage.value = true
    })

    // methods
    const saveCardForm = () => {
        console.log("saveCard=", card.value.id)
        saveCard(card.value)
    }

    const deleteCardForm = async () => {
        console.log("deleteCard=", card.value.id)
        await deleteCard(card.value)
        //refresh full cards list
        getCardsWithImage()
        await navigateTo('/')
    }

    const resetCardForm = () => {
        console.log("resetCard=", card.value.id)
        getCard(id)
    }

    const uploadImageFileForm = (file:File) => {
        console.log("uploadImageFile=", file)
        uploadImageFile(file).then((paths) => {
            card.value.src = paths.imagePath
            card.value.img = paths.imageUrl
        })
    }

</script>

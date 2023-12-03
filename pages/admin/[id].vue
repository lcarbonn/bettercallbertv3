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
            @upload-image-file="uploadImageFileForm">
        </DomainCardForm>
        <DomainCardDetail :card="card"></DomainCardDetail>
        <!-- <BModal v-model="modal" title="Without saving" @ok="keepNavigate"> Really ? </BModal> -->
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

    // local ref
    const modal = ref(false)
    const nextPath = ref()
    const forceNext = ref(false)

    // nuxt cycle hooks
    onMounted(() => {
        getCardWithImage(id)
        isSinglePage.value = true
    })

    // onBeforeRouteLeave((leaveGuard) => {
    //     console.log("route leaving :", leaveGuard)
    //     modal.value = true
    //     nextPath.value = leaveGuard.fullPath
    //     if(!forceNext.value) abortNavigation()
    // })

    // // methods
    // const keepNavigate = async () => {
    //     console.log("keepNavigate:", nextPath.value)
    //     forceNext.value = true
    //     await navigateTo(nextPath.value)
    // }

    const saveCardForm = () => {
        console.log("saveCard=", card.value.id)
        saveDbCard(card.value)
    }

    const deleteCardForm = async () => {
        console.log("deleteCard=", card.value.id)
        await deleteDbCard(card.value)
        //refresh full cards list
        getCardsWithImage()
        await navigateTo('/')
    }

    const resetCardForm = () => {
        console.log("resetCard=", card.value.id)
        getDbCard(id)
    }

    const uploadImageFileForm = (file:File) => {
        console.log("uploadImageFile=", file)
        uploadStorageImageFile(file).then((paths) => {
            card.value.src = paths.imagePath
            card.value.img = paths.imageUrl
        })
    }

</script>

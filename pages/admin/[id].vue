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
        <BModal v-model="modal" title="Without saving" @ok="keepNavigate"> You have unsaved information on your card, do you really want to leave ? </BModal>
    </BContainer>
</template>

<script setup lang="ts">

    // icons
    import ArrowUpLeftSquare from '~icons/bi/arrowUpLeftSquare'

    // const
    const id:string = useRoute().params.id as string
    let initialCard:ICard
    
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
        initialCard = card.value
        isSinglePage.value = true
    })

    onBeforeUnmount(() => {
        console.log("before unmount :")
    })
    onBeforeRouteLeave(async (leaveGuard) => {
        //if nothing change, keep on leabing
        if(initialCard.equals(card.value)) return true
        // else ask for
        const user = useFirebaseUser()
        if(user.value.isAnonymous) {
            forceNext.value = true
            modal.value = false
        } else {
            modal.value = true
            nextPath.value = leaveGuard.fullPath
        }
        if(!forceNext.value) return false
        return true
    })

    // methods
    const keepNavigate = async () => {
        forceNext.value = true
        await navigateTo(nextPath.value)
    }

    const saveCardForm = () => {
        console.log("saveCard=", card.value.id)
        saveDbCard(card.value).then(() => {
            if (card.value?.src?.indexOf("http") == -1) {
                setCardImageSrc(card.value)
                .catch((e) => {
                    const snackBarMessage = useSnackBarMessage()
                    snackBarMessage.value = "Image Source non disponible dans le store"
                })
            }
            initialCard = card.value
        })
    }

    const deleteCardForm = async () => {
        console.log("deleteCard=", card.value.id)
        await deleteDbCard(card.value.id)
        //refresh full cards list
        getCardsWithImage()
        await navigateTo('/')
    }

    const resetCardForm = () => {
        console.log("resetCard=", card.value.id)
        getCardWithImage(id)
    }

    const uploadImageFileForm = (file:File) => {
        console.log("uploadImageFile=", file)
        uploadStorageImageFile(file).then((paths) => {
            card.value.src = paths.imagePath
            card.value.img = paths.imageUrl
        })
    }

</script>
